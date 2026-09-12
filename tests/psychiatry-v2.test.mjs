import test from 'node:test';
import assert from 'node:assert/strict';
import { psychiatryLessons } from '../lib/course-psychiatry.ts';
import { psychiatryCases } from '../lib/cases-psychiatry.ts';
import { psychiatrySources } from '../lib/course-psychiatry-sources.ts';
import { COURSES } from '../lib/courses-registry.ts';
import {
  psychiatryLessonExperiences,
  PSYCHIATRY_LESSON_ENHANCEMENTS,
  ALL_PSYCHIATRY_PRESETS,
  PATIENT_THREADS,
} from '../lib/psychiatry/index.ts';
import { isLessonCoreComplete, requiredCompletionActivityIds } from '../lib/lesson-v2.ts';

test('all 38 psychiatry lessons use the complete v2 active learning structure', () => {
  assert.equal(psychiatryLessons.length, 38);
  assert.equal(Object.keys(psychiatryLessonExperiences).length, 38);

  const psychBundle = COURSES.psychiatry;
  assert.ok(psychBundle.lessonExperiences, 'CourseBundle psychiatry must have lessonExperiences');
  assert.equal(Object.keys(psychBundle.lessonExperiences).length, 38);

  const allActivityIds = new Set();

  for (const lesson of psychiatryLessons) {
    const exp = psychiatryLessonExperiences[lesson.id];
    assert.ok(exp, `Missing experience for lesson: ${lesson.id}`);
    assert.equal(exp.experienceVersion, 2);
    assert.ok(exp.objectives.length >= 2 && exp.objectives.length <= 4, `Lesson ${lesson.id} objectives count`);
    assert.equal(exp.blocks.length, lesson.sections.length, `Lesson ${lesson.id} blocks must match sections`);
    assert.equal(exp.activities.length, 2, `Lesson ${lesson.id} activities count`);
    assert.equal(exp.exitTicket.length, 2, `Lesson ${lesson.id} exitTicket count`);
    assert.equal(exp.teachBack.type, 'recall');
    assert.ok(exp.widgetIds.length >= 1, `Lesson ${lesson.id} widgetIds count`);

    const reasoning = new Set([...exp.activities, ...exp.exitTicket].map(a => a.reasoning));
    assert.ok(reasoning.has('mechanism'), `Lesson ${lesson.id} missing mechanism reasoning`);
    assert.ok(reasoning.has('interpretation'), `Lesson ${lesson.id} missing interpretation reasoning`);
    assert.ok(reasoning.has('decision'), `Lesson ${lesson.id} missing decision reasoning`);

    const scoredObjectiveIds = new Set([...exp.activities, ...exp.exitTicket].flatMap(a => a.objectiveIds));
    assert.ok(
      exp.objectives.every(obj => scoredObjectiveIds.has(obj.id)),
      `Lesson ${lesson.id} has objectives not covered in scored activities`,
    );

    const allActivities = [exp.diagnostic, ...exp.activities, exp.teachBack, ...exp.exitTicket];
    for (const act of allActivities) {
      assert.ok(!allActivityIds.has(act.id), `Duplicate activity ID: ${act.id}`);
      allActivityIds.add(act.id);

      assert.ok(act.objectiveIds.length > 0, `Activity ${act.id} has no objectiveIds`);
      assert.ok(
        act.objectiveIds.every(id => exp.objectives.some(o => o.id === id)),
        `Activity ${act.id} references invalid objective ID`,
      );

      assert.ok(act.sourceIds.length > 0, `Activity ${act.id} has empty sourceIds`);
      assert.ok(
        act.sourceIds.every(sId => psychiatrySources[sId]),
        `Activity ${act.id} references unknown source ID: ${act.sourceIds.join(', ')}`,
      );

      if ('options' in act) {
        assert.ok(act.options.length >= 3, `Activity ${act.id} options length`);
        assert.ok(act.optionFeedback && act.optionFeedback.length === act.options.length);
        assert.ok(act.optionFeedback.every(f => typeof f === 'string' && f.length > 10));
      }
    }

    const required = requiredCompletionActivityIds(exp);
    assert.equal(isLessonCoreComplete(exp, new Set(required)), true);
    assert.equal(isLessonCoreComplete(exp, new Set(required.slice(1))), false);
  }
});

test('psychiatry lesson enhancement registry covers all 38 lessons with valid deep links and evidence', () => {
  assert.equal(Object.keys(PSYCHIATRY_LESSON_ENHANCEMENTS).length, 38);

  const caseIds = new Set(psychiatryCases.map(c => c.id));
  const threadIds = new Set(Object.keys(PATIENT_THREADS));

  for (const [lessonId, enh] of Object.entries(PSYCHIATRY_LESSON_ENHANCEMENTS)) {
    assert.equal(enh.lessonId, lessonId);
    assert.ok(enh.experience, `Enhancement for ${lessonId} missing experience`);
    assert.ok(Array.isArray(enh.diagrams));
    assert.ok(Array.isArray(enh.inlineWidgets));

    if (enh.workbenchPresetId) {
      assert.ok(
        ALL_PSYCHIATRY_PRESETS[enh.workbenchPresetId],
        `Lesson ${lessonId} preset ${enh.workbenchPresetId} not found in ALL_PSYCHIATRY_PRESETS`,
      );
    }

    if (enh.caseId) {
      assert.ok(caseIds.has(enh.caseId), `Lesson ${lessonId} case ${enh.caseId} not found in psychiatryCases`);
    }

    if (enh.recurringPatientId) {
      assert.ok(
        threadIds.has(enh.recurringPatientId),
        `Lesson ${lessonId} thread ${enh.recurringPatientId} not found in LONGITUDINAL_PATIENT_THREADS`,
      );
    }

    if (enh.whatChangesYourMind) {
      assert.ok(enh.whatChangesYourMind.knownFacts.length >= 1);
      assert.ok(enh.whatChangesYourMind.unknownFactors.length >= 1);
      assert.ok(enh.whatChangesYourMind.criticalDifferentiatingFactor.length > 15);
    }
  }
});
