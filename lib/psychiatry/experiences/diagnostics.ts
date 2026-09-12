import type { Lesson, LessonExperienceV2 } from '../../course-types.ts';
import { buildPsychiatryLessonExperience } from './builder.ts';

export function getDiagnosticExperiences(lessonsMap: Map<string, Lesson>): Record<string, LessonExperienceV2> {
  const experiences: Record<string, LessonExperienceV2> = {};

  const lMse = lessonsMap.get('wywiad-psychiatryczny-mse');
  if (lMse) {
    experiences[lMse.id] = buildPsychiatryLessonExperience(lMse, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'diagram-mse-map', kind: 'diagram', placement: 'after-text' },
          { id: 'deeplink-mse-preset', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'mse-young-adult-001' },
        ],
        1: [{ id: 'panel-affect-differentiation', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lClass = lessonsMap.get('klasyfikacje-dsm5-icd11');
  if (lClass) {
    experiences[lClass.id] = buildPsychiatryLessonExperience(lClass, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-dsm-icd-comparison', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'microcase-boundary-disorder', kind: 'micro-case', placement: 'before-checkpoint' }],
      },
      widgetIds: ['pathway-builder', 'timeline'],
    });
  }

  const lPsychopath = lessonsMap.get('psychopatologia-objawow');
  if (lPsychopath) {
    experiences[lPsychopath.id] = buildPsychiatryLessonExperience(lPsychopath, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-hallucination-pseudohallucination', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'diagram-psychosis-differential', kind: 'diagram', placement: 'after-text' }],
      },
      widgetIds: ['pathway-builder', 'lab-workbench'],
    });
  }

  const lSubst = lessonsMap.get('substancje-i-secondary-causes');
  if (lSubst) {
    experiences[lSubst.id] = buildPsychiatryLessonExperience(lSubst, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-tox-withdrawal-timeline', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'microcase-delirium-tremens', kind: 'micro-case', placement: 'before-checkpoint' }],
      },
      widgetIds: ['timeline', 'lab-workbench'],
    });
  }

  const lScales = lessonsMap.get('skale-kliniczne-w-psychiatrii');
  if (lScales) {
    experiences[lScales.id] = buildPsychiatryLessonExperience(lScales, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-madrs-hamd-cutoffs', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'widget-panss-dimensions', kind: 'interactive-widget', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'pathway-builder'],
    });
  }

  const lSuicide = lessonsMap.get('ocena-ryzyka-samobojczego-agresji');
  if (lSuicide) {
    experiences[lSuicide.id] = buildPsychiatryLessonExperience(lSuicide, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-cssrs-stratification', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'microcase-acute-agitation-deescalation', kind: 'micro-case', placement: 'before-checkpoint' }],
      },
      widgetIds: ['pathway-builder', 'lab-workbench'],
    });
  }

  const lDdx = lessonsMap.get('diagnostyka-roznicowa-algorytmy');
  if (lDdx) {
    experiences[lDdx.id] = buildPsychiatryLessonExperience(lDdx, {
      inlineEnhancementsBySection: {
        0: [{ id: 'diagram-psychosis-differential', kind: 'diagram', placement: 'after-text' }],
        1: [{ id: 'panel-organic-red-flags', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['pathway-builder', 'timeline'],
    });
  }

  const lInteg = lessonsMap.get('przypadki-integracyjne-diagnostyka');
  if (lInteg) {
    experiences[lInteg.id] = buildPsychiatryLessonExperience(lInteg, {
      inlineEnhancementsBySection: {
        0: [{ id: 'microcase-multimorbid-psych', kind: 'micro-case', placement: 'after-text' }],
        1: [{ id: 'panel-longitudinal-formulation', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['timeline', 'lab-workbench'],
    });
  }

  return experiences;
}
