import type { Lesson, LessonExperienceV2 } from '../../course-types.ts';
import { buildPsychiatryLessonExperience } from './builder.ts';

export function getAffectiveExperiences(lessonsMap: Map<string, Lesson>): Record<string, LessonExperienceV2> {
  const experiences: Record<string, LessonExperienceV2> = {};

  const lDep = lessonsMap.get('depresja-fenotypy-i-kryteria');
  if (lDep) {
    experiences[lDep.id] = buildPsychiatryLessonExperience(lDep, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'panel-melancholic-vs-atypical', kind: 'evidence-panel', placement: 'after-text' },
          { id: 'deeplink-depressive-diff', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'depressive-differential-001' },
        ],
        1: [{ id: 'diagram-bdnf-trkb', kind: 'diagram', placement: 'after-text' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lMan = lessonsMap.get('mania-hipomania-spektrum');
  if (lMan) {
    experiences[lMan.id] = buildPsychiatryLessonExperience(lMan, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'diagram-mood-timeline', kind: 'diagram', placement: 'after-text' },
          { id: 'deeplink-bipolar-timeline', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'bipolar-timeline-001' },
        ],
        1: [{ id: 'panel-mixed-state-criteria', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['timeline', 'pathway-builder'],
    });
  }

  const lPsych = lessonsMap.get('psychoza-i-szlaki-dopaminy');
  if (lPsych) {
    experiences[lPsych.id] = buildPsychiatryLessonExperience(lPsych, {
      inlineEnhancementsBySection: {
        0: [{ id: 'diagram-d2-pathways', kind: 'diagram', placement: 'after-text' }],
        1: [{ id: 'diagram-psychosis-differential', kind: 'diagram', placement: 'after-text' }],
      },
      widgetIds: ['pathway-builder', 'lab-workbench'],
    });
  }

  const lAnx = lessonsMap.get('zaburzenia-lekowe-gad-napadowy');
  if (lAnx) {
    experiences[lAnx.id] = buildPsychiatryLessonExperience(lAnx, {
      inlineEnhancementsBySection: {
        0: [{ id: 'diagram-fear-circuit', kind: 'diagram', placement: 'after-text' }],
        1: [{ id: 'panel-panic-vs-somatization', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['timeline', 'lab-workbench'],
    });
  }

  const lOcd = lessonsMap.get('ocd-i-petla-cstc');
  if (lOcd) {
    experiences[lOcd.id] = buildPsychiatryLessonExperience(lOcd, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'diagram-cstc-loop', kind: 'diagram', placement: 'after-text' },
          { id: 'deeplink-ocd-cstc', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'ocd-cstc-preset-001' },
        ],
        1: [{ id: 'panel-y-bocs-dimensions', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['pathway-builder', 'lab-workbench'],
    });
  }

  const lPtsd = lessonsMap.get('ptsd-trauma-stres');
  if (lPtsd) {
    experiences[lPtsd.id] = buildPsychiatryLessonExperience(lPtsd, {
      inlineEnhancementsBySection: {
        0: [{ id: 'diagram-fear-circuit', kind: 'diagram', placement: 'after-text' }],
        1: [{ id: 'panel-ptsd-vs-cptsd-icd11', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['timeline', 'pathway-builder'],
    });
  }

  const lAdhd = lessonsMap.get('adhd-dorosli-i-rozwojowe');
  if (lAdhd) {
    experiences[lAdhd.id] = buildPsychiatryLessonExperience(lAdhd, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'panel-diva-5-criteria', kind: 'evidence-panel', placement: 'after-text' },
          { id: 'deeplink-adhd-adult', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'adhd-adult-preset-001' },
        ],
        1: [{ id: 'microcase-executive-dysfunction', kind: 'micro-case', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lPd = lessonsMap.get('zaburzenia-osobowosci-wymiarowe');
  if (lPd) {
    experiences[lPd.id] = buildPsychiatryLessonExperience(lPd, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-icd11-personality-severity', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'panel-dsm-clusters-vs-dimensions', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['pathway-builder', 'timeline'],
    });
  }

  return experiences;
}
