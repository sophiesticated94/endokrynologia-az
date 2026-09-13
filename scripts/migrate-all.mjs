import { getAllModuleIds, resolveCourseModuleSource } from '../lib/content/source-adapter.ts';
import { migrateModule } from './migrate-module.mjs';

export async function migrateAllModules(options = {}) {
  const isApply = options.apply || false;
  const isVerify = options.verify || false;
  const databaseUrl = options.databaseUrl || process.env.DATABASE_URL;

  const moduleIds = getAllModuleIds();
  console.log(`[migrate-all] Starting sequential processing for ${moduleIds.length} modules...`);
  console.log(`[migrate-all] Mode: ${isApply ? 'APPLY (writing to database)' : isVerify ? 'VERIFY (checking parity)' : 'DRY RUN (simulation)'}`);

  const results = [];
  let totalLessons = 0;
  let totalInserted = 0;
  let totalSkipped = 0;
  let totalVerified = 0;

  for (let i = 0; i < moduleIds.length; i++) {
    const moduleId = moduleIds[i];
    const source = resolveCourseModuleSource(moduleId);
    console.log(`\n==================================================`);
    console.log(`[${i + 1}/${moduleIds.length}] Course: ${source.course.id.toUpperCase()} | Module: ${source.module.name} (${moduleId})`);
    console.log(`==================================================`);

    try {
      const res = await migrateModule({
        module: moduleId,
        apply: isApply,
        verify: isVerify,
        databaseUrl,
      });

      results.push({
        moduleId,
        courseId: source.course.id,
        lessonCount: source.lessons.length,
        inserted: res.insertedRevisions || 0,
        skipped: res.skippedRevisions || 0,
        verified: res.verified || false,
        success: true,
      });

      totalLessons += source.lessons.length;
      totalInserted += res.insertedRevisions || 0;
      totalSkipped += res.skippedRevisions || 0;
      if (res.verified) totalVerified += source.lessons.length;
    } catch (err) {
      console.error(`[migrate-all] FAILED for module ${moduleId}:`, err);
      results.push({
        moduleId,
        courseId: source.course.id,
        lessonCount: source.lessons.length,
        success: false,
        error: err instanceof Error ? err.message : String(err),
      });
      throw err;
    }
  }

  console.log(`\n==================================================`);
  console.log(`[migrate-all] SUMMARY OF ALL ${moduleIds.length} MODULES`);
  console.log(`==================================================`);
  console.table(
    results.map((r) => ({
      Course: r.courseId,
      Module: r.moduleId,
      Lessons: r.lessonCount,
      Inserted: r.inserted,
      Skipped: r.skipped,
      Verified: r.verified ? 'YES (100%)' : 'N/A',
      Status: r.success ? 'OK' : 'FAILED',
    }))
  );

  console.log(
    `Total Lessons: ${totalLessons} | Revisions Inserted: ${totalInserted} | Skipped: ${totalSkipped} | Verified: ${totalVerified}`
  );

  return {
    success: true,
    modulesProcessed: moduleIds.length,
    totalLessons,
    totalInserted,
    totalSkipped,
    totalVerified,
    results,
  };
}

if (
  process.argv[1] &&
  process.argv[1].replace(/\\/g, '/').endsWith('scripts/migrate-all.mjs')
) {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');
  const verify = args.includes('--verify');
  const dbUrlArg = args.find((a) => a.startsWith('--database-url='))?.split('=')[1];

  migrateAllModules({
    apply,
    verify,
    databaseUrl: dbUrlArg,
  }).catch((err) => {
    console.error('[migrate-all] Fatal error:', err);
    process.exit(1);
  });
}
