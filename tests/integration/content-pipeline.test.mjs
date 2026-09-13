import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { runMigrations } from '../../scripts/run-migrations.mjs';
import { createDatabase } from '../../db/postgres/index.ts';
import {
  planPipeline,
  stagePipeline,
  publishPipeline,
  verifyPipeline,
  canonicalHash,
} from '../../scripts/content-pipeline.mjs';
import { PostgresContentRepository } from '../../lib/content/content-repository.ts';
import { lessons, lessonRevisions, evidenceClaims, evidenceClaimSources } from '../../db/postgres/schema.ts';
import { eq } from 'drizzle-orm';

const TEST_DB_URL =
  process.env.DATABASE_URL_TEST ||
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/endokrynologia_test';

test('Content Publishing Pipeline Integration & Invariants', async (t) => {
  const { db, client, close } = createDatabase(TEST_DB_URL);

  try {
    await client`SELECT 1`;
  } catch (err) {
    throw new Error(`Integration test requires reachable Postgres at ${TEST_DB_URL}: ${err.message}`);
  }

  // 1. Reset & prepare test database
  await t.test('Applies schema migrations and resets tables', async () => {
    await runMigrations(TEST_DB_URL);
    await client`TRUNCATE TABLE lesson_revisions, lessons, modules, courses, content_assets, content_sources, evidence_claims, widget_presets CASCADE;`;
  });

  // 2. Plan before staging
  await t.test('planPipeline: correctly identifies unmigrated lessons as needs staging', async () => {
    const plan = await planPipeline('nadnercza', db);
    assert.equal(plan.totalUpToDate, 0);
    assert.equal(plan.totalNeedsStaging, 16);
    assert.equal(plan.totalStagedReady, 0);
  });

  // 3. Stage without publishing
  let staged = [];
  await t.test('stagePipeline: creates revisions with status="review" without touching publishedRevisionId', async () => {
    staged = await stagePipeline('nadnercza', db);
    assert.equal(staged.length, 16);

    for (const item of staged) {
      const [rev] = await db.select().from(lessonRevisions).where(eq(lessonRevisions.id, item.id)).limit(1);
      assert.ok(rev, `Staged revision ${item.id} should exist`);
      assert.equal(rev.status, 'review');
      assert.equal(rev.version, 1);
      assert.ok(rev.sourceCommitSha);

      const [lessonRow] = await db.select().from(lessons).where(eq(lessons.id, item.lessonId)).limit(1);
      assert.ok(lessonRow);
      assert.equal(
        lessonRow.publishedRevisionId,
        null,
        `Lesson "${item.lessonId}" must NOT have publishedRevisionId set after staging!`
      );
    }
  });

  // 4. Plan after staging
  await t.test('planPipeline: identifies staged revisions as STAGED_READY', async () => {
    const plan = await planPipeline('nadnercza', db);
    assert.equal(plan.totalStagedReady, 16);
    assert.equal(plan.totalNeedsStaging, 16);
  });

  // 5. Verification fails before publishing
  await t.test('verifyPipeline: fails when lessons are staged but not published', async () => {
    await assert.rejects(
      async () => {
        await verifyPipeline('nadnercza', db);
      },
      /Verification failed/
    );
  });

  // 6. Runtime repository returns null for unpublished lesson
  await t.test('PostgresContentRepository: returns null for unpublished staged lesson (never falls back to latest)', async () => {
    const repo = new PostgresContentRepository(db);
    const doc = await repo.getLesson('nadnercza-anatomia');
    assert.equal(doc, null, 'Unpublished lesson must return null in runtime repository');
  });

  // 7. Publish single revision
  let firstPublishedRevId;
  await t.test('publishPipeline: publishes single revision transactionally with status="published"', async () => {
    const sample = staged.find((s) => s.lessonId === 'nadnercza-anatomia');
    assert.ok(sample);
    firstPublishedRevId = sample.id;

    const res = await publishPipeline({ revisionId: sample.id }, db);
    assert.equal(res.length, 1);

    const [rev] = await db.select().from(lessonRevisions).where(eq(lessonRevisions.id, sample.id)).limit(1);
    assert.equal(rev.status, 'published');
    assert.ok(rev.publishedAt);

    const [lessonRow] = await db.select().from(lessons).where(eq(lessons.id, sample.lessonId)).limit(1);
    assert.equal(lessonRow.publishedRevisionId, sample.id);

    // Runtime repo now retrieves it
    const repo = new PostgresContentRepository(db);
    const doc = await repo.getLesson('nadnercza-anatomia');
    assert.ok(doc);
    assert.equal(doc.id, 'nadnercza-anatomia');
  });

  // 8. Invariant: Cannot publish a revision that is already published
  await t.test('publishPipeline: rejects publishing an already published revision', async () => {
    await assert.rejects(
      async () => {
        await publishPipeline({ revisionId: firstPublishedRevId }, db);
      },
      /Cannot publish revision .* with status "published"/
    );
  });

  // 9. Invariant: STAGED_REVISION_STALE detection
  await t.test('publishPipeline: rejects stale staging revision with STAGED_REVISION_STALE', async () => {
    // Create a fake staged revision with altered content hash
    const fakeRevId = crypto.randomUUID();
    const fakeDoc = {
      id: 'nadnercza-diagnostyka',
      moduleId: 'nadnercza',
      title: 'Stale Diagnostics Title',
      subtitle: 'Stale subtitle',
      group: 'Fundamenty',
      minutes: 15,
      goals: ['Stale goal'],
      sections: [{ title: 'S1', text: 'Text' }],
      table: { headers: ['H1'], rows: [['R1']] },
      advanced: 'Adv',
      summary: 'Sum',
      sourceIds: ['pte_nadnercza'],
      questions: [],
    };
    const fakeHash = canonicalHash(fakeDoc);

    await db.insert(lessonRevisions).values({
      id: fakeRevId,
      lessonId: 'nadnercza-diagnostyka',
      version: 99,
      contentHash: fakeHash,
      document: fakeDoc,
      status: 'review',
      sourceCommitSha: 'stale-sha',
      changeSummary: 'Stale test',
    });

    await assert.rejects(
      async () => {
        await publishPipeline({ revisionId: fakeRevId }, db);
      },
      /STAGED_REVISION_STALE/
    );

    // Clean up fake staged revision so subsequent all-staged test doesn't see it
    await db.delete(lessonRevisions).where(eq(lessonRevisions.id, fakeRevId));
  });

  // 10. Publish all remaining staged revisions in module
  await t.test('publishPipeline: publishes all remaining staged revisions for module', async () => {
    const res = await publishPipeline({ moduleId: 'nadnercza', allStaged: true }, db);
    assert.equal(res.length, 15); // 16 minus 1 already published

    const verify = await verifyPipeline('nadnercza', db);
    assert.equal(verify.passed, 16);
    assert.equal(verify.failed, 0);
  });

  // 11. Invariant: Re-staging an updated lesson archives previous published on publish
  await t.test('publishPipeline: re-staging and publishing archives previous revision', async () => {
    const [oldPub] = await db.select().from(lessonRevisions).where(eq(lessonRevisions.id, firstPublishedRevId)).limit(1);
    assert.equal(oldPub.status, 'published');

    // Create v2 revision in review
    const v2RevId = crypto.randomUUID();
    await db.insert(lessonRevisions).values({
      id: v2RevId,
      lessonId: 'nadnercza-anatomia',
      version: 2,
      contentHash: oldPub.contentHash, // matches authoring source
      document: oldPub.document,
      status: 'review',
      sourceCommitSha: 'head-sha',
      changeSummary: 'Update v2',
    });

    await publishPipeline({ revisionId: v2RevId }, db);

    const [oldArchived] = await db.select().from(lessonRevisions).where(eq(lessonRevisions.id, firstPublishedRevId)).limit(1);
    assert.equal(oldArchived.status, 'archived', 'Previous revision must be set to archived upon new publish');

    const [newPub] = await db.select().from(lessonRevisions).where(eq(lessonRevisions.id, v2RevId)).limit(1);
    assert.equal(newPub.status, 'published');

    const [lessonRow] = await db.select().from(lessons).where(eq(lessons.id, 'nadnercza-anatomia')).limit(1);
    assert.equal(lessonRow.publishedRevisionId, v2RevId);
  });

  // 12. Batch Atomicity Invariant: 15 valid review + 1 stale => throws STAGED_REVISION_STALE and 0 revisions published
  await t.test('publishPipeline: batch atomic invariant - stale revision aborts entire batch without partial publish', async () => {
    // Stage przytarczyce
    const ptStaged = await stagePipeline('przytarczyce', db);
    assert.equal(ptStaged.length, 16);

    // Corrupt one staged revision's contentHash to simulate stale review
    const victim = ptStaged[0];
    const [victimRev] = await db
      .select()
      .from(lessonRevisions)
      .where(eq(lessonRevisions.id, victim.id))
      .limit(1);
    const originalHash = victimRev.contentHash;

    await db
      .update(lessonRevisions)
      .set({ contentHash: '0000000000000000000000000000000000000000000000000000000000000000' })
      .where(eq(lessonRevisions.id, victim.id));

    // Attempt to publish all staged for przytarczyce
    await assert.rejects(
      async () => {
        await publishPipeline({ moduleId: 'przytarczyce', allStaged: true }, db);
      },
      /STAGED_REVISION_STALE/
    );

    // Verify 0 revisions were published and all remain null
    const ptLessons = await db.select().from(lessons).where(eq(lessons.moduleId, 'przytarczyce'));
    assert.equal(ptLessons.length, 16);
    for (const l of ptLessons) {
      assert.equal(
        l.publishedRevisionId,
        null,
        `Lesson ${l.id} must NOT have publishedRevisionId set after aborted batch publish!`
      );
    }

    const ptRevs = await db.select().from(lessonRevisions).where(eq(lessonRevisions.status, 'published'));
    const publishedPt = ptRevs.filter((r) => r.lessonId.startsWith('przytarczyce') || r.document.moduleId === 'przytarczyce');
    assert.equal(publishedPt.length, 0, 'Zero przytarczyce revisions should be published after failure');

    // Restore correct hash and publish successfully
    await db
      .update(lessonRevisions)
      .set({ contentHash: originalHash })
      .where(eq(lessonRevisions.id, victim.id));

    const publishedRes = await publishPipeline({ moduleId: 'przytarczyce', allStaged: true }, db);
    assert.equal(publishedRes.length, 16);

    const verifyPt = await verifyPipeline('przytarczyce', db);
    assert.equal(verifyPt.passed, 16);
    assert.equal(verifyPt.failed, 0);
  });

  // 13. M:N Evidence Claims and Claim Sources
  await t.test('evidenceClaims & evidenceClaimSources: multi-source claims preserve all M:N relationships', async () => {
    const multiSourceClaim = await db
      .select()
      .from(evidenceClaims)
      .where(eq(evidenceClaims.id, 'claim-pt-cccr-overlap-zone'))
      .limit(1);
    assert.ok(multiSourceClaim.length > 0, 'claim-pt-cccr-overlap-zone must exist');

    const sources = await db
      .select()
      .from(evidenceClaimSources)
      .where(eq(evidenceClaimSources.claimId, 'claim-pt-cccr-overlap-zone'));

    assert.equal(sources.length, 2, 'Claim should be mapped to exactly 2 sources');
    const sourceIds = sources.map((s) => s.sourceId).sort();
    assert.deepEqual(sourceIds, ['ese_phpt', 'fhh_consensus']);
  });

  await close();
});
