import type { Lesson, LessonExperienceV2 } from '../../course-types.ts';
import { buildPsychiatryLessonExperience } from './builder.ts';

export function getClinicalPharmacotherapyExperiences(lessonsMap: Map<string, Lesson>): Record<string, LessonExperienceV2> {
  const experiences: Record<string, LessonExperienceV2> = {};

  const lMood = lessonsMap.get('normotymiki-lit-walproinian-lamotrygina');
  if (lMood) {
    experiences[lMood.id] = buildPsychiatryLessonExperience(lMood, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'widget-lithium-tdm-interpreter', kind: 'interactive-widget', placement: 'after-text' },
          { id: 'deeplink-lithium-preset', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'lithium-tdm-measured-001' },
        ],
        1: [{ id: 'panel-valproate-lamotrigine-safety', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lAntipsy = lessonsMap.get('leki-przeciwpsychotyczne-generacje');
  if (lAntipsy) {
    experiences[lAntipsy.id] = buildPsychiatryLessonExperience(lAntipsy, {
      inlineEnhancementsBySection: {
        0: [{ id: 'diagram-d2-pathways', kind: 'diagram', placement: 'after-text' }],
        1: [{ id: 'panel-fga-sga-tga-profiles', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'pathway-builder'],
    });
  }

  const lBzd = lessonsMap.get('benzodiazepiny-leki-z-tapering');
  if (lBzd) {
    experiences[lBzd.id] = buildPsychiatryLessonExperience(lBzd, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-ashton-manual-principles', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'microcase-alprazolam-to-diazepam-switch', kind: 'micro-case', placement: 'before-checkpoint' }],
      },
      widgetIds: ['timeline', 'lab-workbench'],
    });
  }

  const lAdhdPharm = lessonsMap.get('farmakoterapia-adhd-stymulanty');
  if (lAdhdPharm) {
    experiences[lAdhdPharm.id] = buildPsychiatryLessonExperience(lAdhdPharm, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-mph-vs-ldx-kinetics', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'panel-cardiovascular-baseline-workup', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lTdm = lessonsMap.get('monitorowanie-stezen-tdm');
  if (lTdm) {
    experiences[lTdm.id] = buildPsychiatryLessonExperience(lTdm, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'panel-agnp-2026-recommendation-grades', kind: 'evidence-panel', placement: 'after-text' },
          { id: 'deeplink-tdm-preset', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'lithium-tdm-measured-001' },
        ],
        1: [{ id: 'widget-tdm-timing-validator', kind: 'interactive-widget', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lPgx = lessonsMap.get('farmakogenetyka-cyp-pgx');
  if (lPgx) {
    experiences[lPgx.id] = buildPsychiatryLessonExperience(lPgx, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'diagram-cyp-network', kind: 'diagram', placement: 'after-text' },
          { id: 'deeplink-cyp-pgx', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'cyp-interaction-001' },
        ],
        1: [{ id: 'panel-cpic-phenotype-dosing', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'pathway-builder'],
    });
  }

  const lSwitch = lessonsMap.get('zamiana-lekow-switching-cross-tapering');
  if (lSwitch) {
    experiences[lSwitch.id] = buildPsychiatryLessonExperience(lSwitch, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-cross-tapering-washout-rules', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'microcase-ssri-to-vortioxetine', kind: 'micro-case', placement: 'before-checkpoint' }],
      },
      widgetIds: ['timeline', 'pathway-builder'],
    });
  }

  const lAug = lessonsMap.get('racjonalna-polipragmazja-i-augmentacja');
  if (lAug) {
    experiences[lAug.id] = buildPsychiatryLessonExperience(lAug, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-evidence-based-augmentation-pyramid', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'microcase-lithium-vs-aripiprazole-trd', kind: 'micro-case', placement: 'before-checkpoint' }],
      },
      widgetIds: ['pathway-builder', 'lab-workbench'],
    });
  }

  return experiences;
}
