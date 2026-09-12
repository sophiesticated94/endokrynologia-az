import type { Lesson, LessonExperienceV2 } from '../../course-types.ts';
import { buildPsychiatryLessonExperience } from './builder.ts';

export function getSafetyEmergenciesExperiences(lessonsMap: Map<string, Lesson>): Record<string, LessonExperienceV2> {
  const experiences: Record<string, LessonExperienceV2> = {};

  const lPrev = lessonsMap.get('profilaktyka-dzialan-niepozadanych');
  if (lPrev) {
    experiences[lPrev.id] = buildPsychiatryLessonExperience(lPrev, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-monitoring-intervals-baseline', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'microcase-metabolic-syndrome-monitoring', kind: 'micro-case', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lSs = lessonsMap.get('ostre-stany-toksyczne-zespol-serotoninowy');
  if (lSs) {
    experiences[lSs.id] = buildPsychiatryLessonExperience(lSs, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'diagram-serotonin-nms-hunter', kind: 'diagram', placement: 'after-text' },
          { id: 'deeplink-serotonin-hunter', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'serotonin-hunter-001' },
        ],
        1: [{ id: 'widget-hunter-criteria-evaluator', kind: 'interactive-widget', placement: 'after-text' }],
      },
      widgetIds: ['lab-workbench', 'pathway-builder'],
    });
  }

  const lNms = lessonsMap.get('zlosliwy-zespol-neuroleptyczny-nms');
  if (lNms) {
    experiences[lNms.id] = buildPsychiatryLessonExperience(lNms, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'diagram-serotonin-nms-hunter', kind: 'diagram', placement: 'after-text' },
          { id: 'deeplink-nms-differential', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'nms-differential-001' },
        ],
        1: [{ id: 'panel-lead-pipe-vs-clonus-differentiation', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['pathway-builder', 'lab-workbench'],
    });
  }

  const lQtc = lessonsMap.get('bezpieczenstwo-kardiometaboliczne-qtc-prolaktyna');
  if (lQtc) {
    experiences[lQtc.id] = buildPsychiatryLessonExperience(lQtc, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'widget-fridericia-qtc-calculator', kind: 'interactive-widget', placement: 'after-text' },
          { id: 'deeplink-qtc-crediblemeds', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'qtc-crediblemeds-001' },
        ],
        1: [{ id: 'panel-prolactin-hyperprolactinemia-workup', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lEps = lessonsMap.get('zaburzenia-ruchowe-polekowe-eps-dysdyskinezy');
  if (lEps) {
    experiences[lEps.id] = buildPsychiatryLessonExperience(lEps, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-akathisia-vs-anxiety-vs-parkinsonism', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'panel-tardive-dyskinesia-vmat2-treatment', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['pathway-builder', 'timeline'],
    });
  }

  const lClz = lessonsMap.get('lekoopornosc-i-klozapina');
  if (lClz) {
    experiences[lClz.id] = buildPsychiatryLessonExperience(lClz, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'panel-trs-definition-criteria', kind: 'evidence-panel', placement: 'after-text' },
          { id: 'deeplink-clozapine-smoking', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'clozapine-smoking-001' },
        ],
        1: [{ id: 'panel-anc-monitoring-hematology', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['timeline', 'lab-workbench'],
    });
  }

  const lBio = lessonsMap.get('interwencje-biologiczne-ect-rtms-ketamina');
  if (lBio) {
    experiences[lBio.id] = buildPsychiatryLessonExperience(lBio, {
      inlineEnhancementsBySection: {
        0: [{ id: 'diagram-bdnf-trkb', kind: 'diagram', placement: 'after-text' }],
        1: [{ id: 'panel-ect-seizure-efficacy-hemodynamics', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['pathway-builder', 'timeline'],
    });
  }

  return experiences;
}
