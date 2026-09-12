import type { Lesson, LessonExperienceV2 } from '../../course-types.ts';
import { buildPsychiatryLessonExperience } from './builder.ts';

export function getPharmacologyReceptorsExperiences(lessonsMap: Map<string, Lesson>): Record<string, LessonExperienceV2> {
  const experiences: Record<string, LessonExperienceV2> = {};

  const lPk = lessonsMap.get('farmakokinetyka-oun-bariera');
  if (lPk) {
    experiences[lPk.id] = buildPsychiatryLessonExperience(lPk, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-pgp-efflux-mechanisms', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'microcase-p-gp-drug-interaction', kind: 'micro-case', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lTransp = lessonsMap.get('transportery-monoamin-sert-net-dat');
  if (lTransp) {
    experiences[lTransp.id] = buildPsychiatryLessonExperience(lTransp, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'diagram-monoamine-synapse', kind: 'diagram', placement: 'after-text' },
          { id: 'deeplink-sert-occupancy', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'sert-occupancy-001' },
        ],
        1: [{ id: 'panel-meyer-pet-curves', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'pathway-builder'],
    });
  }

  const lD2 = lessonsMap.get('receptory-dopaminowe-okno-kapura');
  if (lD2) {
    experiences[lD2.id] = buildPsychiatryLessonExperience(lD2, {
      inlineEnhancementsBySection: {
        0: [
          { id: 'diagram-d2-pathways', kind: 'diagram', placement: 'after-text' },
          { id: 'deeplink-d2-evidence', kind: 'workbench-deeplink', placement: 'end-of-block', presetId: 'd2-evidence-001' },
        ],
        1: [{ id: 'widget-d2-pet-simulator', kind: 'interactive-widget', placement: 'after-text' }],
      },
      widgetIds: ['lab-workbench', 'pathway-builder'],
    });
  }

  const l5ht = lessonsMap.get('uklad-serotoninergiczny-receptory');
  if (l5ht) {
    experiences[l5ht.id] = buildPsychiatryLessonExperience(l5ht, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-5ht-subtypes-profile', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'diagram-monoamine-synapse', kind: 'diagram', placement: 'after-text' }],
      },
      widgetIds: ['pathway-builder', 'lab-workbench'],
    });
  }

  const lGlu = lessonsMap.get('glutaminian-gaba-neuroplastycznosc');
  if (lGlu) {
    experiences[lGlu.id] = buildPsychiatryLessonExperience(lGlu, {
      inlineEnhancementsBySection: {
        0: [{ id: 'diagram-bdnf-trkb', kind: 'diagram', placement: 'after-text' }],
        1: [{ id: 'panel-nmda-ampa-synaptogenesis', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['pathway-builder', 'timeline'],
    });
  }

  const lClassic = lessonsMap.get('klasyczne-antydepresanty-ssri-snri-tlpd-maoi');
  if (lClassic) {
    experiences[lClassic.id] = buildPsychiatryLessonExperience(lClassic, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-ssri-snri-differential', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'panel-tlpd-toxic-window', kind: 'evidence-panel', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'timeline'],
    });
  }

  const lAtyp = lessonsMap.get('atypowe-antydepresanty-multimodalne');
  if (lAtyp) {
    experiences[lAtyp.id] = buildPsychiatryLessonExperience(lAtyp, {
      inlineEnhancementsBySection: {
        0: [{ id: 'panel-multimodal-receptor-profiles', kind: 'evidence-panel', placement: 'after-text' }],
        1: [{ id: 'microcase-bupropion-mirtazapine-choice', kind: 'micro-case', placement: 'before-checkpoint' }],
      },
      widgetIds: ['lab-workbench', 'pathway-builder'],
    });
  }

  return experiences;
}
