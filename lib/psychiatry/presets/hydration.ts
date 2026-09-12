import type { PatientProfile, ActivePrescription } from '@/lib/psychiatry-engine';

export function hydratePsychiatryPatient(
  base: PatientProfile,
  d?: Record<string, any>
): PatientProfile {
  if (!d) return base;
  const next = { ...base };
  if (typeof d.labTsh === 'number') next.labTsh = d.labTsh;
  if (typeof d.eGfr === 'number') next.labEgfr = d.eGfr;
  if (typeof d.potassium === 'number') next.labPotassium = d.potassium;
  if (d.smokingStatus === 'zaprzestanie_palenia') {
    next.substanceUse = 'zaprzestanie_palenia';
  } else if (d.smokingStatus === 'current_smoker' || d.smokingStatus === 'tyton') {
    next.substanceUse = 'tyton';
  } else if (typeof d.smokingStatus === 'string') {
    next.substanceUse = d.smokingStatus === 'never_smoker' || d.smokingStatus === 'brak' ? 'brak' : 'tyton';
  }
  return next;
}

export function hydratePsychiatryPrescriptions(
  presetData?: Record<string, any>,
  presetId?: string
): ActivePrescription[] {
  if (!presetData) return [{ drugId: 'sertraline', doseMg: 50 }];
  const d = presetData;
  const rxList: ActivePrescription[] = [];
  if (d.antagonistDrug && typeof d.antagonistDoseMg === 'number') {
    rxList.push({ drugId: d.antagonistDrug, doseMg: d.antagonistDoseMg });
  }
  if (d.partialAgonistDrug && typeof d.partialAgonistDoseMg === 'number') {
    rxList.push({ drugId: d.partialAgonistDrug, doseMg: d.partialAgonistDoseMg });
  }
  if (d.inhibitor) {
    rxList.push({ drugId: d.inhibitor, doseMg: 20 });
  }
  if (d.substrate) {
    rxList.push({ drugId: d.substrate, doseMg: 75 });
  }
  if (d.drug && typeof d.baselineDoseMg === 'number') {
    rxList.push({ drugId: d.drug, doseMg: d.baselineDoseMg });
  } else if (d.drug && Array.isArray(d.dosesTested)) {
    rxList.push({ drugId: d.drug, doseMg: d.dosesTested[1] || 50 });
  }
  if (presetId === 'serotonin-hunter-001') {
    rxList.push({ drugId: 'sertraline', doseMg: 100 });
  }
  if (presetId === 'lithium-tdm-measured-001') {
    rxList.push({ drugId: 'lithium', doseMg: 750 });
  }
  if (presetId === 'qtc-crediblemeds-001') {
    rxList.push({ drugId: 'escitalopram', doseMg: 20 });
  }
  if (presetId === 'nms-differential-001') {
    rxList.push({ drugId: 'haloperidol', doseMg: 10 });
  }
  return rxList.length > 0 ? rxList : [{ drugId: 'sertraline', doseMg: 50 }];
}

export interface HydratedSafetySigns {
  spontaneousClonus: boolean;
  inducibleClonus: boolean;
  ocularClonus: boolean;
  agitation: boolean;
  diaphoresis: boolean;
  tremor: boolean;
  hyperreflexia: boolean;
  hypertonia: boolean;
  hyperthermiaOver38: boolean;
}

export function hydrateSafetySignsFromPreset(presetData?: Record<string, any>): HydratedSafetySigns {
  return {
    spontaneousClonus: Boolean(presetData?.spontaneousClonus),
    inducibleClonus: Boolean(presetData?.inducibleClonus),
    ocularClonus: Boolean(presetData?.ocularClonus),
    agitation: Boolean(presetData?.agitation),
    diaphoresis: Boolean(presetData?.diaphoresis),
    tremor: Boolean(presetData?.tremor),
    hyperreflexia: Boolean(presetData?.hyperreflexia),
    hypertonia: Boolean(presetData?.hypertonia),
    hyperthermiaOver38:
      (typeof presetData?.hyperthermia === 'number' && presetData.hyperthermia > 38) ||
      Boolean(presetData?.hyperthermiaOver38),
  };
}
