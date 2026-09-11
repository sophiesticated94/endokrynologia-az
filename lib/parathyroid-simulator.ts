export type ParathyroidSimulationMode =
  | 'axis_homeostasis'
  | 'phpt_fhh_calculator'
  | 'tetany_ekg'
  | 'hypercalcemic_crisis'
  | 'hungry_bone';

export interface ParathyroidState {
  mode: ParathyroidSimulationMode;

  // 1. Oś i przytarczyce
  parathyroidAdenomaFraction: number; // 0..100% autonomii gruczolaka
  postopGlandsRemaining: number; // 0..4 gruczoły (4 = norma, 0 = całkowita hipoparatyreoza)
  casrSensitivity: number; // 20..180% (100 = norma, 40 = mutacja FHH, 150 = aktywacja)
  calcidiol25OhD: number; // 5..100 ng/ml
  egfrMlMin: number; // 10..120 ml/min/1.73m2
  phosphateIntakeMg: number; // 400..2000 mg/d
  serumAlbuminGDl: number; // 1.5..5.0 g/dl

  // 2. Kalkulator CCCR / Mocz
  urineCalciumMgDl: number; // 2..40 mg/dl
  urineCreatinineMgDl: number; // 20..300 mg/dl
  serumCreatinineMgDl: number; // 0.6..6.0 mg/dl

  // 3. Przełom i resuscytacja
  crisisSalineLiters: number; // 0..6 L / 24h
  zoledronicAcidGiven: boolean;
  calcitoninGiven: boolean;
  furosemideGivenPrematurely: boolean;

  // 4. Zespół głodnych kości
  preopAlpLevel: number; // 60..1500 IU/L
  postopIvCalciumGluconateAmpoules: number; // 0..30 ampułek
  oralCalcitriolMcg: number; // 0..4.0 µg/d
  postopMagnesiumGiven: boolean;
}

export interface CalculatedParathyroidOutput {
  totalCalciumMgDl: number;
  correctedCalciumMgDl: number;
  ionizedCalciumMmol: number;
  serumPhosphateMgDl: number;
  intactPthPgMl: number;
  calcitriolPgMl: number;
  cccrRatio: number;
  qtcIntervalMs: number;
  tetanyRisk: 'none' | 'latent_trousseau' | 'frank_severe' | 'laryngospasm_critical';
  hungryBoneIndex: number;
  alertType: 'normal' | 'warning' | 'danger';
  status: string;
  crisisProtocolMet: boolean;
  furosemideError: boolean;
  clinicalRecommendations: string[];
}

export const defaultParathyroidState: ParathyroidState = {
  mode: 'axis_homeostasis',
  parathyroidAdenomaFraction: 0,
  postopGlandsRemaining: 4,
  casrSensitivity: 100,
  calcidiol25OhD: 35,
  egfrMlMin: 95,
  phosphateIntakeMg: 900,
  serumAlbuminGDl: 4.0,

  urineCalciumMgDl: 15,
  urineCreatinineMgDl: 100,
  serumCreatinineMgDl: 0.9,

  crisisSalineLiters: 0,
  zoledronicAcidGiven: false,
  calcitoninGiven: false,
  furosemideGivenPrematurely: false,

  preopAlpLevel: 85,
  postopIvCalciumGluconateAmpoules: 0,
  oralCalcitriolMcg: 0,
  postopMagnesiumGiven: true,
};

export function calculateParathyroidState(state: ParathyroidState): CalculatedParathyroidOutput {
  const recommendations: string[] = [];
  let alertType: 'normal' | 'warning' | 'danger' = 'normal';
  let status = 'Prawidłowa homeostaza wapniowo-fosforanowa (Eukalcemia)';
  let furosemideError = false;
  let crisisProtocolMet = false;

  // 1. Oś Parathormon (PTH)
  const glandIntegrity = state.postopGlandsRemaining / 4;
  let basePth = 38 * glandIntegrity;

  // Autonomia gruczolaka
  if (state.parathyroidAdenomaFraction > 0) {
    basePth += state.parathyroidAdenomaFraction * 1.8;
  }

  // Wpływ niewydolności nerek na PTH (kompensacyjny wzrost w CKD)
  if (state.egfrMlMin < 60) {
    const renalDeficit = (60 - state.egfrMlMin) / 50;
    basePth += renalDeficit * 350;
  }

  // Wpływ wrażliwości CaSR (np. FHH - obniżona czułość termostatu)
  if (state.casrSensitivity < 70) {
    // receptor słabiej hamuje -> więcej PTH
    basePth *= 1.4;
  } else if (state.casrSensitivity > 130) {
    basePth *= 0.6;
  }

  // 2. Kalcytriol (zależny od nerek i PTH)
  let calcitriol = 42;
  if (state.egfrMlMin < 60) {
    calcitriol = Math.max(8, calcitriol * (state.egfrMlMin / 60));
  } else if (basePth > 65) {
    calcitriol = Math.min(85, calcitriol + (basePth - 65) * 0.25);
  }
  if (state.calcidiol25OhD < 20) {
    calcitriol *= 0.65;
  }

  // 3. Stężenie wapnia całkowitego i zjonizowanego
  let totalCalcium = 9.4;

  // Wpływ PTH na wapń
  if (basePth > 65) {
    totalCalcium += (basePth - 65) * 0.024;
  } else if (basePth < 15) {
    totalCalcium -= (15 - basePth) * 0.18;
  }

  // Wpływ mutacji/wrażliwości CaSR na nerkowy i przytarczycowy set-point (np. FHH)
  if (state.casrSensitivity < 70) {
    totalCalcium += (70 - state.casrSensitivity) * 0.045;
  }

  // Wpływ usunięcia gruczolaka i zespołu głodnych kości
  let hungryBoneIndex = 0;
  if (state.mode === 'hungry_bone') {
    hungryBoneIndex = Math.round((state.preopAlpLevel / 120) * 2.5);
    if (state.preopAlpLevel > 250) {
      totalCalcium -= Math.min(4.5, (state.preopAlpLevel - 150) * 0.005);
    }
    // Wpływ leczenia glukonianem i kalcytriolem
    totalCalcium += state.postopIvCalciumGluconateAmpoules * 0.22;
    totalCalcium += state.oralCalcitriolMcg * 0.75;
    if (!state.postopMagnesiumGiven) {
      totalCalcium -= 0.8; // oporność na Ca przy braku Mg!
    }
  }

  // Wpływ resuscytacji w przełomie hiperkalcemicznym
  if (state.mode === 'hypercalcemic_crisis') {
    totalCalcium = Math.max(14.5, totalCalcium + 4.5);
    if (state.furosemideGivenPrematurely && state.crisisSalineLiters < 2) {
      furosemideError = true;
      alertType = 'danger';
      totalCalcium += 0.8; // pogłębienie hipowolemii zagęszcza krew!
    }
    if (state.crisisSalineLiters > 0) {
      totalCalcium -= Math.min(3.0, state.crisisSalineLiters * 0.65);
    }
    if (state.calcitoninGiven) {
      totalCalcium -= 0.9;
    }
    if (state.zoledronicAcidGiven) {
      totalCalcium -= 2.2;
    }
    if (totalCalcium <= 11.2 && state.crisisSalineLiters >= 3) {
      crisisProtocolMet = true;
    }
  }

  // Korekta o albuminę (wzór Payne'a)
  const albuminDeficit = 4.0 - state.serumAlbuminGDl;
  const correctedCalcium = totalCalcium + 0.8 * albuminDeficit;
  const ionizedCalcium = Math.round((correctedCalcium * 0.125 + (7.4 - 7.4) * 0.05) * 100) / 100;

  // 4. Stężenie fosforanów
  let phosphate = 3.4;
  if (state.egfrMlMin >= 45) {
    if (basePth > 65) {
      // fosfaturia obniża fosforany w sprawnej nerce
      phosphate = Math.max(1.5, phosphate - (basePth - 65) * 0.012);
    } else if (basePth < 15) {
      // brak PTH zatrzymuje fosforany
      phosphate += (15 - basePth) * 0.14;
    }
  } else {
    // W niewydolności nerek utrata nefronów uniemożliwia fosfaturię -> retencja fosforanów
    const ckdDeficit = 45 - state.egfrMlMin;
    phosphate += ckdDeficit * 0.08;
    if (state.phosphateIntakeMg > 1000) {
      phosphate += ((state.phosphateIntakeMg - 1000) / 500) * 0.7;
    }
  }
  if (state.mode === 'hungry_bone') {
    phosphate = Math.max(1.0, phosphate - (state.preopAlpLevel / 200) * 0.5);
  }

  // 5. Wskaźnik CCCR (FeCa)
  let cccr = 0.015;
  if (state.urineCreatinineMgDl > 0 && totalCalcium > 0) {
    cccr =
      (state.urineCalciumMgDl * state.serumCreatinineMgDl) /
      (Math.max(1.0, totalCalcium) * state.urineCreatinineMgDl);
  }
  // Modyfikacja w FHH
  if (state.casrSensitivity < 70) {
    cccr = Math.min(0.007, cccr * 0.35);
  } else if (state.parathyroidAdenomaFraction > 30) {
    cccr = Math.max(0.024, cccr * 1.8);
  }

  // 6. Odstęp QTc i ryzyko tężyczki
  let qtc = 410;
  let tetanyRisk: 'none' | 'latent_trousseau' | 'frank_severe' | 'laryngospasm_critical' = 'none';

  if (correctedCalcium < 8.5) {
    const deficit = 8.5 - correctedCalcium;
    qtc += deficit * 42; // wydłużenie QTc
    if (correctedCalcium >= 7.8) {
      tetanyRisk = 'latent_trousseau';
    } else if (correctedCalcium >= 6.8) {
      tetanyRisk = 'frank_severe';
    } else {
      tetanyRisk = 'laryngospasm_critical';
    }
  } else if (correctedCalcium > 10.5) {
    const excess = correctedCalcium - 10.5;
    qtc -= excess * 18; // skrócenie QTc
  }

  // 7. Status i rekomendacje
  if (furosemideError) {
    status = 'KARDYNALNY BŁĄD: Podano furosemid u odwodnionego chorego przed rehydratacją!';
    alertType = 'danger';
    recommendations.push('Furosemid bez nawodnienia pogłębia wstrząs hipowolemiczny i nasila hiperkalcemię.');
    recommendations.push('NATYCHMIAST wstrzymaj diuretyk i rozpocznij intensywny wlew 0,9% NaCl (3–4 l/24h).');
  } else if (state.mode === 'hypercalcemic_crisis') {
    if (correctedCalcium > 14.0) {
      status = 'OSTRY PRZEŁOM HIPERKALCEMICZNY (>14 mg/dl) — ZAGROŻENIE ŻYCIA!';
      alertType = 'danger';
      recommendations.push('Wdróż intensywny wlew 0,9% NaCl (2000–4000 ml w pierwszej dobie).');
      recommendations.push('Podaj kalcytoninę s.c. (efekt po 2 h) oraz kwas zoledronowy 4 mg i.v. (efekt po 48 h).');
    } else {
      status = 'Wyrównywanie przełomu: spadek stężenia wapnia pod wpływem nawodnienia i antyresorpcji';
      alertType = 'warning';
      recommendations.push('Kontynuuj nawadnianie; monitoruj diurezę, potas i magnez.');
    }
  } else if (state.mode === 'hungry_bone') {
    if (correctedCalcium < 7.5 || phosphate < 2.0) {
      status = 'Ostry zespół głodnych kości (HBS) — gwałtowna remineralizacja szkieletu!';
      alertType = 'danger';
      recommendations.push('Wymaga ciągłego wlewu 10% glukonianu wapnia pod kontrolą EKG.');
      recommendations.push('Wdróż wysokie dawki kalcytriolu (1–4 µg/d) i uzupełnij magnez (MgSO4 i.v.).');
    } else {
      status = 'Stan po paratyreoidktomii z kontrolowaną remineralizacją kośćca';
      alertType = 'normal';
    }
  } else if (correctedCalcium > 10.5) {
    if (cccr < 0.01) {
      status = 'Łagodna rodzinna hiperkalcemia hipokalciuryczna (FHH — mutacja CaSR)';
      alertType = 'warning';
      recommendations.push('Wskaźnik CCCR <0,01 wyklucza wskazania do paratyreoidktomii.');
      recommendations.push('Choroba ma przebieg łagodny; chory nie wymaga leczenia operacyjnego.');
    } else {
      status = 'Pierwotna nadczynność przytarczyc (PHPT z hiperkalcemią)';
      alertType = 'danger';
      recommendations.push('Oceń kryteria kwalifikacji do operacji wg ESE/ASBMR (T-score, eGFR, wiek, kalciuria).');
      recommendations.push('Zleć USG szyi i scyntygrafię MIBI SPECT/CT celem kwalifikacji do zabiegu MIP.');
    }
  } else if (correctedCalcium < 8.5) {
    status = 'Hipokalcemia / Niedoczynność przytarczyc z ryzykiem tężyczki';
    alertType = 'danger';
    recommendations.push('Wdróż aktywną witaminę D (alfakalcydol/kalcytriol) z węglanem wapnia.');
    recommendations.push('Utrzymuj wapń w dolnej granicy normy (8,0–8,5 mg/dl), by chronić nerki przed nefrokalcynozą.');
  }

  return {
    totalCalciumMgDl: Math.round(totalCalcium * 10) / 10,
    correctedCalciumMgDl: Math.round(correctedCalcium * 10) / 10,
    ionizedCalciumMmol: Math.round(ionizedCalcium * 100) / 100,
    serumPhosphateMgDl: Math.round(phosphate * 10) / 10,
    intactPthPgMl: Math.round(basePth),
    calcitriolPgMl: Math.round(calcitriol),
    cccrRatio: Math.round(cccr * 1000) / 1000,
    qtcIntervalMs: Math.round(qtc),
    tetanyRisk,
    hungryBoneIndex,
    alertType,
    status,
    crisisProtocolMet,
    furosemideError,
    clinicalRecommendations: recommendations,
  };
}

export const parathyroidPresets = [
  {
    id: 'healthy',
    title: 'Prawidłowa homeostaza (Eukalcemia)',
    description: 'Sprawne 4 przytarczyce, prawidłowy receptor CaSR i stężenia wapnia w normie.',
    state: defaultParathyroidState,
  },
  {
    id: 'phpt_adenoma',
    title: 'Pierwotna nadczynność (Gruczolak przytarczycy)',
    description: 'Autonomiczny wyrzut PTH (125 pg/ml), hiperkalcemia (11,4 mg/dl) i wysoki wskaźnik CCCR (0,028).',
    state: {
      ...defaultParathyroidState,
      mode: 'axis_homeostasis' as ParathyroidSimulationMode,
      parathyroidAdenomaFraction: 50,
      urineCalciumMgDl: 28,
      urineCreatinineMgDl: 90,
      serumCreatinineMgDl: 0.9,
    },
  },
  {
    id: 'fhh_mutation',
    title: 'Łagodna rodzinna hiperkalcemia (FHH)',
    description: 'Inaktywacja CaSR: hiperkalcemia z hipokalciurią (CCCR 0,005). Bezwzględny zakaz operacji!',
    state: {
      ...defaultParathyroidState,
      mode: 'phpt_fhh_calculator' as ParathyroidSimulationMode,
      casrSensitivity: 40,
      urineCalciumMgDl: 4,
      urineCreatinineMgDl: 120,
      serumCreatinineMgDl: 0.9,
    },
  },
  {
    id: 'shpt_ckd',
    title: 'Wtórna nadczynność w PChN (CKD-MBD)',
    description: 'Niewydolność nerek (GFR 15): hipokalcemia, hiperfosfatemia i kompensacyjny wyrzut PTH (780 pg/ml).',
    state: {
      ...defaultParathyroidState,
      mode: 'axis_homeostasis' as ParathyroidSimulationMode,
      egfrMlMin: 15,
      calcidiol25OhD: 18,
      phosphateIntakeMg: 1500,
    },
  },
  {
    id: 'hypopara_postop',
    title: 'Pooperacyjna niedoczynność przytarczyc',
    description: 'Stan po tyreoidektomii (0 sprawnych przytarczyc): Ca 6,9 mg/dl, PTH 4 pg/ml, tężyczka i QTc 520 ms.',
    state: {
      ...defaultParathyroidState,
      mode: 'tetany_ekg' as ParathyroidSimulationMode,
      postopGlandsRemaining: 0,
      serumAlbuminGDl: 4.0,
    },
  },
  {
    id: 'hypercalcemic_crisis_unmanaged',
    title: 'Przełom hiperkalcemiczny (>15 mg/dl)',
    description: 'Odwodnienie, śpiączka, skrócony QTc (335 ms) i ostre uszkodzenie nerek wymagające soli i bisfosfonianu.',
    state: {
      ...defaultParathyroidState,
      mode: 'hypercalcemic_crisis' as ParathyroidSimulationMode,
      crisisSalineLiters: 0,
      zoledronicAcidGiven: false,
      calcitoninGiven: false,
      furosemideGivenPrematurely: false,
    },
  },
  {
    id: 'furosemide_crisis_trap',
    title: 'Błąd w sztuce: Furosemid bez nawodnienia!',
    description: 'Podanie furosemidu u odwodnionego chorego pogłębia hipowolemię i wywołuje wstrząs.',
    state: {
      ...defaultParathyroidState,
      mode: 'hypercalcemic_crisis' as ParathyroidSimulationMode,
      crisisSalineLiters: 0,
      furosemideGivenPrematurely: true,
    },
  },
  {
    id: 'hungry_bone_postop',
    title: 'Zespół głodnych kości (HBS po operacji)',
    description: 'Przedoperacyjna ALP 850 IU/l: masywny wychwyt Ca i P przez kościec, hipokalcemia 6,4 mg/dl.',
    state: {
      ...defaultParathyroidState,
      mode: 'hungry_bone' as ParathyroidSimulationMode,
      preopAlpLevel: 850,
      postopIvCalciumGluconateAmpoules: 2,
      oralCalcitriolMcg: 0.5,
      postopMagnesiumGiven: false,
    },
  },
];

export const parathyroidSimulatorLegend = {
  modes: [
    {
      id: 'axis_homeostasis',
      title: 'Oś Ca–P–PTH–CaSR–Kalcytriol',
      description: 'Zintegrowany model sprzężenia zwrotnego między przytarczycami, nerkami, kośćmi a stężeniem elektrolitów.',
    },
    {
      id: 'phpt_fhh_calculator',
      title: 'Kalkulator CCCR / Różnicowanie PHPT vs FHH',
      description: 'Precyzyjne wyliczanie wskaźnika frakcjonowanego wydalania wapnia (FeCa) chroniące przed niepotrzebną operacją w FHH.',
    },
    {
      id: 'tetany_ekg',
      title: 'Tężyczka, objawy Chvostka/Trousseau i EKG',
      description: 'Symulacja pobudliwości nerwowo-mięśniowej i wydłużenia odstępu QTc w zależności od wapnia zjonizowanego.',
    },
    {
      id: 'hypercalcemic_crisis',
      title: 'Resuscytacja w Przełomie Hiperkalcemicznym',
      description: 'Kolejność interwencji ratunkowych: nawodnienie 0,9% NaCl, bisfosfoniany i.v., kalcytonina oraz pułapka furosemidu.',
    },
    {
      id: 'hungry_bone',
      title: 'Zespół Głodnych Kości (HBS)',
      description: 'Modelowanie zapotrzebowania szkieletu na wapń, fosfor i magnez po wycięciu dużego gruczolaka przytarczycy.',
    },
  ],
};
