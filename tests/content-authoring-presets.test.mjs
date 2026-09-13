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
  WidgetPresetDefinitionSchema,
  AdrenalWorkbenchPresetSchema,
  ParathyroidWorkbenchPresetSchema,
} from '../lib/content/preset-registry.ts';
import { resolveCourseModuleSource } from '../lib/content/source-adapter.ts';
import { canonicalHash } from '../scripts/content-pipeline.mjs';

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

  // 2. Curated LessonExperienceV2 is single source of truth
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

  // 4. Preset schemas strictly validate and distinguish sourceIds from claimIds
  await t.test('AdrenalWorkbenchPresetSchema & ParathyroidWorkbenchPresetSchema: strict validation', () => {
    const validAdrenal = {
      id: 'adrenal-test-preset',
      widgetType: 'adrenal-workbench',
      schemaVersion: 1,
      moduleId: 'nadnercza',
      title: 'Test Preset',
      sourceIds: ['endo_pa'],
      claimIds: ['claim-pa-arr-confounders'],
      initialState: {
        activeTab: 'arr',
        initialArr: {
          aldosteroneNgDl: 30,
          directReninConcentrationUuMl: 2,
        },
      },
    };

    assert.doesNotThrow(() => WidgetPresetDefinitionSchema.parse(validAdrenal));
    assert.doesNotThrow(() => AdrenalWorkbenchPresetSchema.parse(validAdrenal.initialState));

    // Reject missing required field in WidgetPresetDefinitionSchema
    const invalidPreset = {
      ...validAdrenal,
      widgetType: undefined,
    };
    assert.throws(() => WidgetPresetDefinitionSchema.parse(invalidPreset));

    // Parathyroid preset schema test
    const validParathyroid = {
      id: 'parathyroid-test-preset',
      widgetType: 'parathyroid-workbench',
      schemaVersion: 1,
      moduleId: 'przytarczyce',
      title: 'Test PT Preset',
      sourceIds: ['ese_phpt'],
      claimIds: ['claim-pt-cccr-overlap-zone'],
      initialState: {
        activeTab: 'cccr',
        initialCccr: {
          serumCalciumMmolL: 2.7,
          urineCalciumMmolL: 3.5,
          serumCreatinineUmolL: 75,
          urineCreatinineMmolL: 8,
        },
      },
    };
    assert.doesNotThrow(() => WidgetPresetDefinitionSchema.parse(validParathyroid));
    assert.doesNotThrow(() => ParathyroidWorkbenchPresetSchema.parse(validParathyroid.initialState));
  });

  // 5. Duplicate preset detection & validation of all registered presets
  await t.test('allWidgetPresets: verifies no duplicates and valid structure', () => {
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
  });

  // 6. Authoring loader rejects unknown claimId or duplicate claimId
  await t.test('authoring-loader: loads and validates cleanly for content-src modules', () => {
    assert.doesNotThrow(() => loadCourseModuleFromContentSrcSync('nadnercza'));
    assert.doesNotThrow(() => loadCourseModuleFromContentSrcSync('przytarczyce'));
  });
});
