import type { Lesson, LessonExperienceV2 } from '../../course-types.ts';
import { buildPsychiatryLessonExperience } from './builder.ts';

export function getNeuroGeriatricExperiences(lessonsMap: Map<string, Lesson>): Record<string, LessonExperienceV2> {
  const experiences: Record<string, LessonExperienceV2> = {};

  const lDelirium = lessonsMap.get('delirium-rozpoznanie-i-dynamika');
  if (lDelirium) {
    experiences[lDelirium.id] = buildPsychiatryLessonExperience(lDelirium, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'diagram-delirium-timeline', kind: 'diagram', placement: 'after-text' },
          { id: 'deeplink-delirium-preset', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'preset-delirium-jan-postop' },
        ],
        1: [{ id: 'widget-4at-calculator', kind: 'interactive-widget', placement: 'before-checkpoint' }],
        2: [{ id: 'panel-delirium-evidence', kind: 'evidence-panel', placement: 'after-text' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lDelVsDem = lessonsMap.get('delirium-vs-otepienie-vs-depresja');
  if (lDelVsDem) {
    experiences[lDelVsDem.id] = buildPsychiatryLessonExperience(lDelVsDem, {
      inlineEnhancementsBySection: {
        0: [{ id: 'diagram-delirium-dementia-matrix', kind: 'diagram', placement: 'after-text' }],
        1: [{ id: 'microcase-delirium-superimposed', kind: 'micro-case', placement: 'before-checkpoint' }],
        2: [{ id: 'deeplink-jan-superimposed', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'preset-delirium-superimposed-jan' }],
      },
      widgetIds: ['timeline', 'lab-workbench'],
    });
  }

  const lDiagDel = lessonsMap.get('diagnostyka-ostrego-zaburzenia-swiadomosci');
  if (lDiagDel) {
    experiences[lDiagDel.id] = buildPsychiatryLessonExperience(lDiagDel, {
      inlineEnhancementsBySection: {
        0: [{ id: 'widget-cause-hunt', kind: 'interactive-widget', placement: 'before-checkpoint' }],
        1: [{ id: 'panel-4at-performance', kind: 'evidence-panel', placement: 'after-text' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lMci = lessonsMap.get('zaburzenia-poznawcze-mci-a-otepienie');
  if (lMci) {
    experiences[lMci.id] = buildPsychiatryLessonExperience(lMci, {
      inlineEnhancementsBySection: {
        0: [{ id: 'deeplink-helena-mci', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'preset-helena-mci-early-ad' }],
        1: [{ id: 'microcase-mci-iadl-boundary', kind: 'micro-case', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'pathway-builder'],
    });
  }

  const lAd = lessonsMap.get('choroba-alzheimera-wzorzec-i-progresja');
  if (lAd) {
    experiences[lAd.id] = buildPsychiatryLessonExperience(lAd, {
      inlineEnhancementsBySection: {
        0: [{ id: 'diagram-hippocampal-network-progression', kind: 'diagram', placement: 'after-text' }],
        1: [{ id: 'panel-chei-indication', kind: 'evidence-panel', placement: 'after-text' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lVad = lessonsMap.get('naczyniowe-zaburzenia-poznawcze-vad');
  if (lVad) {
    experiences[lVad.id] = buildPsychiatryLessonExperience(lVad, {
      inlineEnhancementsBySection: {
        0: [{ id: 'diagram-neurocognitive-differential-map', kind: 'diagram', placement: 'after-text' }],
        1: [{ id: 'microcase-csvd-binswanger', kind: 'micro-case', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lDlb = lessonsMap.get('otepienie-z-cialami-lewyego-i-parkinson');
  if (lDlb) {
    experiences[lDlb.id] = buildPsychiatryLessonExperience(lDlb, {
      inlineEnhancementsBySection: {
        0: [{ id: 'diagram-dlb-pathway', kind: 'diagram', placement: 'after-text' }],
        1: [
          { id: 'panel-dlb-neuroleptic-sensitivity', kind: 'evidence-panel', placement: 'before-checkpoint' },
          { id: 'deeplink-dlb-preset', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'preset-dlb-hallucinations' },
        ],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lFtd = lessonsMap.get('otepienie-czolowo-skroniowe-bvftd');
  if (lFtd) {
    experiences[lFtd.id] = buildPsychiatryLessonExperience(lFtd, {
      inlineEnhancementsBySection: {
        0: [{ id: 'deeplink-marek-ftd', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'preset-marek-bvftd' }],
        1: [{ id: 'microcase-bvftd-morality', kind: 'micro-case', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'pathway-builder'],
    });
  }

  const lRpd = lessonsMap.get('szybko-postepujace-zespoly-otepienne');
  if (lRpd) {
    experiences[lRpd.id] = buildPsychiatryLessonExperience(lRpd, {
      inlineEnhancementsBySection: {
        0: [{ id: 'widget-neuro-clock', kind: 'interactive-widget', placement: 'before-checkpoint' }],
        1: [
          { id: 'panel-rpd-autoimmune-redflags', kind: 'evidence-panel', placement: 'after-text' },
          { id: 'deeplink-autoimmune-preset', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'preset-autoimmune-encephalitis' },
        ],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lBpsd = lessonsMap.get('bpsd-objawy-behawioralne-i-psychologiczne');
  if (lBpsd) {
    experiences[lBpsd.id] = buildPsychiatryLessonExperience(lBpsd, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'widget-bpsd-cause-hunt', kind: 'interactive-widget', placement: 'before-checkpoint' },
          { id: 'deeplink-helena-bpsd', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'preset-helena-bpsd-uti' },
        ],
        1: [{ id: 'panel-antipsychotics-dementia-blackbox', kind: 'evidence-panel', placement: 'after-text' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lGerPharm = lessonsMap.get('psychofarmakologia-wieku-podeszlego');
  if (lGerPharm) {
    experiences[lGerPharm.id] = buildPsychiatryLessonExperience(lGerPharm, {
      inlineEnhancementsBySection: {
        0: [{ id: 'diagram-anticholinergic-burden-consequences', kind: 'diagram', placement: 'after-text' }],
        1: [
          { id: 'widget-geriatric-med-review', kind: 'interactive-widget', placement: 'before-checkpoint' },
          { id: 'panel-acb-burden', kind: 'evidence-panel', placement: 'after-text' },
          { id: 'deeplink-geriatric-polypharmacy', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'preset-geriatric-polypharmacy' },
        ],
        2: [{ id: 'panel-beers-2023', kind: 'evidence-panel', placement: 'after-text' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lDepGer = lessonsMap.get('depresja-wieku-podeszlego-i-poznanie');
  if (lDepGer) {
    experiences[lDepGer.id] = buildPsychiatryLessonExperience(lDepGer, {
      inlineEnhancementsBySection: {
        0: [{ id: 'microcase-geriatric-depression-mask', kind: 'micro-case', placement: 'before-checkpoint' }],
        1: [{ id: 'panel-suicide-risk-elderly', kind: 'evidence-panel', placement: 'after-text' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lCap = lessonsMap.get('zdolnosc-decyzyjna-capacity-i-safeguarding');
  if (lCap) {
    experiences[lCap.id] = buildPsychiatryLessonExperience(lCap, {
      inlineEnhancementsBySection: {
        0: [{ id: 'widget-capacity-evaluator', kind: 'interactive-widget', placement: 'before-checkpoint' }],
        1: [{ id: 'panel-capacity-framework', kind: 'evidence-panel', placement: 'after-text' }],
      },
      widgetIds: ['lab-workbench', 'pathway-builder'],
    });
  }

  return experiences;
}
