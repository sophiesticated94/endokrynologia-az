import test from 'node:test';
import assert from 'node:assert/strict';
import {
  discoverContentSrcModulesSync,
  isContentSrcModule,
  loadCourseModuleFromContentSrcSync,
} from '../lib/content/authoring-loader.ts';
import {
  allWidgetPresets,
  getPreset,
  getPresetsForModule,
  WidgetPresetDefinitionSchema,
  AdrenalWorkbenchPresetSchema,
  ParathyroidWorkbenchPresetSchema,
} from '../lib/content/preset-registry.ts';
import { resolveCourseModuleSource } from '../lib/content/source-adapter.ts';
import { canonicalHash } from '../scripts/content-pipeline.mjs';
import { lessonExperiences } from '../lib/course.ts';

test('Content Authoring & Presets Invariants', async (t) => {
  // 1. Dynamic module discovery
  await t.test('authoring-loader: discovers nadnercza and przytarczyce dynamically', () => {
    const mods = discoverContentSrcModulesSync();
    assert.ok(mods.length >= 2, 'Should discover at least nadnercza and przytarczyce');
    const modIds = mods.map((m) => m.moduleId);
    assert.ok(modIds.includes('nadnercza'));
    assert.ok(modIds.includes('przytarczyce'));
    assert.ok(isContentSrcModule('nadnercza'));
    assert.ok(isContentSrcModule('przytarczyce'));
    assert.equal(isContentSrcModule('non-existent-module-xyz'), false);
  });

  // 2. Curated LessonExperienceV2 is single source of truth in course.ts & source-adapter.ts
  await t.test('resolveCourseModuleSource: uses curated content-src experiences for nadnercza and przytarczyce', () => {
    const nadnerczaSrc = resolveCourseModuleSource('nadnercza');
    assert.ok(nadnerczaSrc.claims, 'nadnercza must have claims loaded');
    assert.ok(Object.keys(nadnerczaSrc.claims).length > 0);

    // Check zespol-conna curated experience
    const connaExp = nadnerczaSrc.lessonExperiences['zespol-conna'];
    assert.ok(connaExp, 'zespol-conna experience must exist');
    assert.equal(connaExp.experienceVersion, 2);
    assert.equal(connaExp.review?.status, 'source-checked');
    assert.deepEqual(connaExp.widgetConfig, {
      'adrenal-workbench': { presetId: 'adrenal-pa-arr-interference' },
    });

    const przytarczyceSrc = resolveCourseModuleSource('przytarczyce');
    assert.ok(przytarczyceSrc.claims, 'przytarczyce must have claims loaded');
    assert.ok(Object.keys(przytarczyceSrc.claims).length > 0);

    const fhhExp = przytarczyceSrc.lessonExperiences['fhh-hiperkalcemia'];
    assert.ok(fhhExp, 'fhh-hiperkalcemia experience must exist');
    assert.equal(fhhExp.experienceVersion, 2);
    assert.deepEqual(fhhExp.widgetConfig, {
      'parathyroid-workbench': { presetId: 'parathyroid-phpt-fhh-cccr' },
    });

    // In course.ts, curated experiences override generated pilot experiences
    assert.equal(lessonExperiences['zespol-conna'].review?.status, 'source-checked');
    assert.deepEqual(lessonExperiences['zespol-conna'].widgetConfig, {
      'adrenal-workbench': { presetId: 'adrenal-pa-arr-interference' },
    });
    assert.deepEqual(lessonExperiences['fhh-hiperkalcemia'].widgetConfig, {
      'parathyroid-workbench': { presetId: 'parathyroid-phpt-fhh-cccr' },
    });
  });

  // 3. Modifying experience JSON changes canonical contentHash
  await t.test('canonicalHash: changes when experience JSON is modified', () => {
    const nadnerczaSrc = resolveCourseModuleSource('nadnercza');
    const lesson = nadnerczaSrc.lessons.find((l) => l.id === 'zespol-conna');
    const exp = nadnerczaSrc.lessonExperiences['zespol-conna'];

    const doc1 = {
      ...lesson,
      experienceVersion: exp.experienceVersion,
      objectives: exp.objectives,
      diagnostic: exp.diagnostic,
      activities: exp.activities,
      exitTicket: exp.exitTicket,
      clinicalSummary: exp.clinicalSummary,
      widgetIds: exp.widgetIds,
      widgetConfig: exp.widgetConfig,
      review: exp.review,
    };
    const hash1 = canonicalHash(doc1);

    // Modify experience slightly
    const modifiedExp = {
      ...exp,
      review: { ...exp.review, checkedAt: '2026-12-31' },
    };
    const doc2 = {
      ...lesson,
      experienceVersion: modifiedExp.experienceVersion,
      objectives: modifiedExp.objectives,
      diagnostic: modifiedExp.diagnostic,
      activities: modifiedExp.activities,
      exitTicket: modifiedExp.exitTicket,
      clinicalSummary: modifiedExp.clinicalSummary,
      widgetIds: modifiedExp.widgetIds,
      widgetConfig: modifiedExp.widgetConfig,
      review: modifiedExp.review,
    };
    const hash2 = canonicalHash(doc2);

    assert.notEqual(hash1, hash2, 'Canonical contentHash must change when experience content changes');
  });

  // 4. Strict Preset Schemas: reject unknown fields & validate canonical naming
  await t.test('AdrenalWorkbenchPresetSchema & ParathyroidWorkbenchPresetSchema: strict validation', () => {
    // Valid Adrenal preset
    const validAdrenalState = {
      focusSection: 'incidentaloma',
      visibleControls: ['sizeMm', 'unenhancedHu', 'postDstCortisol'],
      lockedFields: ['sizeMm'],
      initialIncidentaloma: {
        sizeMm: 26,
        unenhancedHu: 6,
        postDstCortisolUgDl: 2.2,
      },
    };
    assert.doesNotThrow(() => AdrenalWorkbenchPresetSchema.parse(validAdrenalState));

    // REJECT old field name nativeDensityHu
    assert.throws(
      () =>
        AdrenalWorkbenchPresetSchema.parse({
          focusSection: 'incidentaloma',
          initialIncidentaloma: {
            sizeMm: 26,
            nativeDensityHu: 6, // Disallowed old name!
          },
        }),
      /unrecognized_keys/
    );

    // REJECT unknown control ID in visibleControls
    assert.throws(
      () =>
        AdrenalWorkbenchPresetSchema.parse({
          focusSection: 'primary_aldosteronism',
          visibleControls: ['unknown_control_xyz'],
        }),
      /invalid_enum_value/
    );

    // REJECT unknown field in WidgetPresetDefinition
    assert.throws(
      () =>
        WidgetPresetDefinitionSchema.parse({
          id: 'test',
          widgetType: 'adrenal-workbench',
          schemaVersion: 1,
          moduleId: 'nadnercza',
          title: 'Test',
          initialState: {},
          extraUnauthorizedField: 123,
        }),
      /unrecognized_keys/
    );

    // Valid Parathyroid preset with canonical naming
    const validPtState = {
      focusSection: 'hungry_bone',
      visibleControls: ['preopCalcium', 'preopPth', 'alkalinePhosphatase', 'patientAge'],
      lockedFields: ['patientAge'],
      initialHungryBone: {
        preopCalciumMmolL: 3.2,
        preopPthPgMl: 540,
        alkalinePhosphataseUPerL: 320,
        patientAge: 62,
      },
    };
    assert.doesNotThrow(() => ParathyroidWorkbenchPresetSchema.parse(validPtState));

    // REJECT old field names preopAlpUL and ageYears
    assert.throws(
      () =>
        ParathyroidWorkbenchPresetSchema.parse({
          focusSection: 'hungry_bone',
          initialHungryBone: {
            preopAlpUL: 320, // Disallowed old name!
            ageYears: 62, // Disallowed old name!
          },
        }),
      /unrecognized_keys/
    );
  });

  // 5. Duplicate preset detection & validation of all registered presets
  await t.test('allWidgetPresets: verifies no duplicates, correct module matching, and valid claims', () => {
    const ids = new Set();
    for (const preset of Object.values(allWidgetPresets)) {
      assert.ok(!ids.has(preset.id), `Duplicate preset ID detected: ${preset.id}`);
      ids.add(preset.id);
      if (preset.sourceIds) {
        assert.ok(Array.isArray(preset.sourceIds), `Preset ${preset.id} must have sourceIds array`);
      }
      if (preset.claimIds) {
        assert.ok(Array.isArray(preset.claimIds), `Preset ${preset.id} must have claimIds array`);
      }
    }

    // Verify retrieval via getPreset
    const arrPreset = getPreset('adrenal-pa-arr-interference');
    assert.ok(arrPreset);
    assert.equal(arrPreset.widgetType, 'adrenal-workbench');
    assert.ok(arrPreset.claimIds.includes('claim-adn-pa-screening-2025'));

    const fhhPreset = getPreset('parathyroid-phpt-fhh-cccr');
    assert.ok(fhhPreset);
    assert.equal(fhhPreset.widgetType, 'parathyroid-workbench');
    assert.ok(fhhPreset.claimIds.includes('claim-pt-cccr-overlap-zone'));

    // Check all module presets for nadnercza and przytarczyce
    const nadnerczaPresets = getPresetsForModule('nadnercza');
    assert.ok(nadnerczaPresets.length >= 4);
    const nadnerczaSrc = loadCourseModuleFromContentSrcSync('nadnercza');
    for (const p of nadnerczaPresets) {
      if (p.claimIds) {
        for (const cid of p.claimIds) {
          assert.ok(nadnerczaSrc.claims[cid], `Preset ${p.id} references missing claim ${cid}`);
        }
      }
      if (p.sourceIds) {
        for (const sid of p.sourceIds) {
          assert.ok(nadnerczaSrc.sources[sid], `Preset ${p.id} references missing source ${sid}`);
        }
      }
    }

    const ptPresets = getPresetsForModule('przytarczyce');
    assert.ok(ptPresets.length >= 3);
    const ptSrc = loadCourseModuleFromContentSrcSync('przytarczyce');
    for (const p of ptPresets) {
      if (p.claimIds) {
        for (const cid of p.claimIds) {
          assert.ok(ptSrc.claims[cid], `Preset ${p.id} references missing claim ${cid}`);
        }
      }
      if (p.sourceIds) {
        for (const sid of p.sourceIds) {
          assert.ok(ptSrc.sources[sid], `Preset ${p.id} references missing source ${sid}`);
        }
      }
    }
  });

  // 6. Authoring loader loads and validates cleanly for content-src modules
  await t.test('authoring-loader: loads and validates cleanly for content-src modules', () => {
    assert.doesNotThrow(() => loadCourseModuleFromContentSrcSync('nadnercza'));
    assert.doesNotThrow(() => loadCourseModuleFromContentSrcSync('przytarczyce'));
  });
});
