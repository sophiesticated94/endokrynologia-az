export type PituitaryTumorType = 'none' | 'prolactinoma' | 'acromegaly' | 'cushing' | 'nfpa';

export type PituitaryState = {
  tumorType: PituitaryTumorType;
  tumorSizeMm: number; // 0 - 45 mm
  suprasellarMm: number; // 0 - 25 mm (expansion towards chiasm)
  knospGrade: number; // 0 - 4 (cavernous sinus invasion)
  waterIntakeL: number; // 0.5 - 10 L/day
  avpDeficiencyPct: number; // 0 - 100% (central DI)
  siadhIntensityPct: number; // 0 - 100% (excess AVP)
  cabergolineMg: number; // 0 - 3.5 mg/week
  dexamethasoneMg: number; // 0 or 1 mg (overnight test)
  glucoseLoadG: number; // 0 or 75 g (OGTT test)
  desmopressinMcg: number; // 0 or 2 mcg (dDAVP test)
};

export const defaultPituitaryState: PituitaryState = {
  tumorType: 'none',
  tumorSizeMm: 0,
  suprasellarMm: 0,
  knospGrade: 0,
  waterIntakeL: 2.0,
  avpDeficiencyPct: 0,
  siadhIntensityPct: 0,
  cabergolineMg: 0,
  dexamethasoneMg: 0,
  glucoseLoadG: 0,
  desmopressinMcg: 0,
};

export type PituitaryPreset = {
  id: string;
  name: string;
  tag: string;
  description: string;
  state: PituitaryState;
};

export const pituitaryPresets: PituitaryPreset[] = [
  {
    id: 'healthy',
    name: 'Prawidłowa przysadka',
    tag: 'Fizjologia',
    description: 'Wzorcowy układ dokrewny. Wszystkie osie i gospodarka wodno-elektrolitowa w równowadze.',
    state: { ...defaultPituitaryState },
  },
  {
    id: 'prolactinoma_micro',
    name: 'Mikroprolactinoma (8 mm)',
    tag: 'Hiperprolaktynemia',
    description: 'Mikrogruczolak wydzielający prolaktynę. Brak ucisku chiasmy, spektakularna odpowiedź na kabergolinę.',
    state: {
      ...defaultPituitaryState,
      tumorType: 'prolactinoma',
      tumorSizeMm: 8,
      suprasellarMm: 0,
      knospGrade: 0,
    },
  },
  {
    id: 'acromegaly_active',
    name: 'Akromegalia (makrogruczolak GH)',
    tag: 'Autonomia GH/IGF-1',
    description: 'Guz somatotropowy. Wysoki IGF-1 i brak fizjologicznej supresji GH po obciążeniu glukozą (OGTT).',
    state: {
      ...defaultPituitaryState,
      tumorType: 'acromegaly',
      tumorSizeMm: 18,
      suprasellarMm: 4,
      knospGrade: 1,
    },
  },
  {
    id: 'cushing_disease',
    name: 'Choroba Cushinga (mikroguzek ACTH)',
    tag: 'Hiperkortyzolemia',
    description: 'Gruczolak wydzielający ACTH. Brak supresji kortyzolu po teście z 1 mg deksametazonu.',
    state: {
      ...defaultPituitaryState,
      tumorType: 'cushing',
      tumorSizeMm: 5,
      suprasellarMm: 0,
      knospGrade: 0,
    },
  },
  {
    id: 'nfpa_chiasm',
    name: 'Makrogruczolak nieczynny (NFPA)',
    tag: 'Ciasnota nadsiodłowa',
    description: 'Duży guz (26 mm) uciskający skrzyżowanie wzrokowe (hemianopsia dwuskroniowa) i szypułę (stalk effect).',
    state: {
      ...defaultPituitaryState,
      tumorType: 'nfpa',
      tumorSizeMm: 26,
      suprasellarMm: 16,
      knospGrade: 2,
    },
  },
  {
    id: 'central_di',
    name: 'Moczówka prosta centralna',
    tag: 'Niedobór AVP',
    description: 'Całkowity brak wazopresyny: wielomocz hipoosmotyczny, hipernatremia, szybka korekta po desmopresynie.',
    state: {
      ...defaultPituitaryState,
      waterIntakeL: 8.0,
      avpDeficiencyPct: 90,
      siadhIntensityPct: 0,
    },
  },
  {
    id: 'siadh_euvolemic',
    name: 'Zespół SIADH (hiponatremia)',
    tag: 'Nadmiar AVP',
    description: 'Niesuprymowana wazopresyna: retencja wolnej wody, spadek sodu, nieadekwatnie zagęszczony mocz.',
    state: {
      ...defaultPituitaryState,
      waterIntakeL: 2.5,
      avpDeficiencyPct: 0,
      siadhIntensityPct: 85,
    },
  },
];

export type VisualDefectType = 'none' | 'quadrantanopsia' | 'bitemporal_hemianopsia' | 'severe_amaurosis';

export type PituitarySimulationResult = {
  // Hormony
  prl: number; // ng/ml
  gh: number; // µg/l
  igf1: number; // ng/ml
  acth: number; // pg/ml
  cortisol: number; // µg/dl
  avp: number; // pg/ml

  // Elektrolity i płyny
  serumSodium: number; // mmol/l
  serumOsmolality: number; // mOsm/kg
  urineOsmolality: number; // mOsm/kg
  urineVolumeL: number; // l/24h

  // Neurologia i chiasma
  chiasmCompressed: boolean;
  visualFieldDefect: VisualDefectType;
  visualFieldDescription: string;
  cranialNervesPalsy: string[];

  // Diagnoza i ostrzeżenia
  status: string;
  alertType: 'normal' | 'warning' | 'danger';
  comment: string;
};

export function calculatePituitaryState(s: PituitaryState): PituitarySimulationResult {
  // 1. Prolaktyna (PRL)
  let prl = 12.0;
  if (s.tumorType === 'prolactinoma') {
    // Prolactinoma: PRL proporcjonalna do wielkości guza
    const basePrl = 25 + Math.pow(s.tumorSizeMm, 1.8) * 4.5;
    const drugEffect = 1 / (1 + s.cabergolineMg * 2.8);
    prl = Math.round(basePrl * drugEffect * 10) / 10;
  } else if (s.tumorSizeMm >= 10) {
    // Efekt odszypułowania (stalk effect) w dużych guzach nie-PRL
    prl = Math.round((12.0 + Math.min(65, s.tumorSizeMm * 1.8)) * 10) / 10;
  }

  // 2. Oś somatotropowa (GH / IGF-1)
  let gh = 0.8;
  let igf1 = 175;
  if (s.tumorType === 'acromegaly') {
    const rawGh = 3.5 + s.tumorSizeMm * 0.95;
    if (s.glucoseLoadG >= 75) {
      // W akromegalii brak prawidłowej supresji poniżej 1.0 (zwykle spadek tylko minimalny)
      gh = Math.max(1.4, rawGh * 0.75);
    } else {
      gh = rawGh;
    }
    igf1 = Math.min(1350, Math.round(250 + gh * 48));
  } else {
    // Zdrowa oś somatotropowa
    if (s.glucoseLoadG >= 75) {
      gh = 0.08; // Prawidłowa supresja <0.4 ug/l w czułych testach
    }
    igf1 = 175;
  }
  gh = Math.round(gh * 100) / 100;

  // 3. Oś kortykotropowa (ACTH / Kortyzol)
  let acth = 24.0;
  let cortisol = 13.5;
  if (s.tumorType === 'cushing') {
    acth = 55 + s.tumorSizeMm * 4.5;
    const rawCortisol = 24.0 + s.tumorSizeMm * 1.2;
    if (s.dexamethasoneMg >= 1) {
      // W chorobie Cushinga brak supresji <1.8 µg/dl
      cortisol = Math.max(5.8, rawCortisol * 0.65);
    } else {
      cortisol = rawCortisol;
    }
  } else {
    if (s.dexamethasoneMg >= 1) {
      // Prawidłowa supresja po 1 mg deksametazonu <1.8 ug/dl
      cortisol = 0.9;
      acth = 4.2;
    } else if (s.tumorType === 'nfpa' && s.tumorSizeMm >= 22) {
      // Ucisk zdrowego miąższu przysadki (panhipopituitaryzm)
      acth = 7.5;
      cortisol = 3.2;
    }
  }
  acth = Math.round(acth * 10) / 10;
  cortisol = Math.round(cortisol * 10) / 10;

  // 4. Oś neurohipofizarna i gospodarka wodno-elektrolitowa (AVP, Sód, Osmolalność)
  let avp = 2.4; // pg/ml norma
  let effectiveAvp = 1.0; // wskaźnik aktywności

  if (s.avpDeficiencyPct > 0) {
    const remainingAvp = Math.max(0.05, 1 - s.avpDeficiencyPct / 100);
    effectiveAvp = remainingAvp;
    avp = Math.round(2.4 * remainingAvp * 10) / 10;
    // Podanie desmopresyny (dDAVP) substytuuje receptor V2
    if (s.desmopressinMcg > 0) {
      effectiveAvp += s.desmopressinMcg * 0.75;
    }
  } else if (s.siadhIntensityPct > 0) {
    const extraAvp = (s.siadhIntensityPct / 100) * 4.0;
    effectiveAvp = 1.0 + extraAvp;
    avp = Math.round((2.4 + extraAvp) * 10) / 10;
  }

  // Obliczenie objętości moczu i osmolalności
  let urineOsmolality = 600;
  let urineVolumeL = 1.8;
  let serumSodium = 140;

  if (effectiveAvp < 0.35) {
    // Moczówka prosta centralna (niedobór AVP)
    urineOsmolality = Math.round(75 + effectiveAvp * 250);
    urineVolumeL = Math.round((8.5 - effectiveAvp * 12) * 10) / 10;
    // Bilans wodny: jeśli spożycie płynów nie pokrywa strat, sód gwałtownie rośnie
    const deficit = urineVolumeL - s.waterIntakeL;
    serumSodium = Math.min(165, Math.round(140 + deficit * 2.2));
  } else if (effectiveAvp > 2.0) {
    // SIADH (nadmiar AVP)
    urineOsmolality = Math.min(850, Math.round(450 + (effectiveAvp - 2.0) * 120));
    urineVolumeL = Math.max(0.6, Math.round((1.2 - (effectiveAvp - 2.0) * 0.18) * 10) / 10);
    // Retencja wolnej wody oraz wtórna natriureza (ANP) obniżają sód w osoczu
    const excessWater = Math.max(0, s.waterIntakeL - urineVolumeL);
    serumSodium = Math.max(112, Math.round(140 - (effectiveAvp - 1.0) * 4.0 - excessWater * 5.0));
  } else {
    // Stan fizjologiczny / skompensowany
    urineOsmolality = 580;
    urineVolumeL = Math.max(1.0, Math.min(3.5, s.waterIntakeL * 0.8));
    serumSodium = 140;
  }

  const serumOsmolality = Math.round(2 * serumSodium + 5.5 + 4.5); // orientacyjna osmolalność

  // 5. Ucisk skrzyżowania wzrokowego i zatoki jamistej
  const chiasmCompressed = s.suprasellarMm >= 10;
  let visualFieldDefect: VisualDefectType = 'none';
  let visualFieldDescription = 'Pole widzenia obojga oczu prawidłowe. Brak ucisku na chiasmę.';

  if (s.suprasellarMm >= 15) {
    visualFieldDefect = 'bitemporal_hemianopsia';
    visualFieldDescription =
      'Całkowite niedowidzenie połowicze dwuskroniowe (hemianopsia bitemporalis). Znaczny ucisk nadsiodłowy na skrzyżowanie wzrokowe.';
  } else if (s.suprasellarMm >= 8) {
    visualFieldDefect = 'quadrantanopsia';
    visualFieldDescription =
      'Ubytek w górnych ćwiartkach skroniowych pól widzenia (niedowidzenie kwadrantowe). Wczesny ucisk od dołu na skrzyżowanie.';
  }

  const cranialNervesPalsy: string[] = [];
  if (s.knospGrade >= 3) {
    cranialNervesPalsy.push('N. III (okoruchowy): opadnięcie powieki (ptoza), zaburzenia przywodzenia i unoszenia');
    cranialNervesPalsy.push('N. VI (odwodzący): dwojenie widzenia przy patrzeniu w bok');
  }
  if (s.knospGrade === 4) {
    cranialNervesPalsy.push('N. IV (bloczkowy) oraz gałęzie V1/V2 n. trójdzielnego (ból i niedoczulica czołowo-szczękowa)');
  }

  // 6. Ocena kliniczna i komentarz
  let status = 'Fizjologiczna czynność przysadki i podwzgórza';
  let alertType: 'normal' | 'warning' | 'danger' = 'normal';
  let comment =
    'Prawidłowa równowaga osi przedniego i tylnego płata przysadki. Prawidłowa anatomia okolicy siodła tureckiego.';

  if (visualFieldDefect === 'bitemporal_hemianopsia') {
    status = 'Makrogruczolak z uciskiem skrzyżowania wzrokowego';
    alertType = 'danger';
    comment =
      'Pilne wskazanie do dekompresji neurochirurgicznej (przezklinowej TSS)! Zagrożenie trwałym zanikiem nerwów wzrokowych.';
  } else if (s.tumorType === 'prolactinoma' && prl > 50) {
    status = 'Gruczolak prolaktynowy (Prolactinoma)';
    alertType = 'danger';
    comment =
      'Hiperprolaktynemia. Leczeniem pierwszego rzutu jest agonista dopaminy (kabergolina), który normalizuje PRL i redukuje masę guza.';
  } else if (s.tumorType === 'acromegaly' && gh > 1.0 && s.glucoseLoadG >= 75) {
    status = 'Akromegalia — brak supresji GH w teście OGTT';
    alertType = 'danger';
    comment =
      'Złoty standard potwierdzenia akromegalii: stężenie GH nie ulega zahamowaniu <1,0 µg/l po obciążeniu glukozą. Metodą z wyboru jest operacja TSS.';
  } else if (s.tumorType === 'cushing' && cortisol > 1.8 && s.dexamethasoneMg >= 1) {
    status = 'Choroba Cushinga — brak hamowania w teście z deksametazonem';
    alertType = 'danger';
    comment =
      'Potwierdzenie autonomicznej hiperkortyzolemii: kortyzol >1,8 µg/dl po 1 mg deksametazonu. Podwyższone ACTH wskazuje na przysadkę.';
  } else if (effectiveAvp < 0.35) {
    status = 'Moczówka prosta centralna (niedobór AVP)';
    alertType = 'danger';
    comment =
      'Hipostenuria, poliuria i ryzyko hipernatremii. Wzrost osmolalności moczu po desmopresynie (dDAVP) potwierdza postać centralną.';
  } else if (serumSodium < 130) {
    status = 'Zespół SIADH — hipoosmotyczna hiponatremia';
    alertType = 'danger';
    comment =
      'Nieadekwatne wydzielanie wazopresyny prowadzi do retencji wody. Kluczowa ostrożność: tempo korekty sodu NIE może przekroczyć 8–10 mmol/l/24h (ryzyko CPM)!';
  } else if (s.tumorType === 'nfpa' && cortisol < 5.0) {
    status = 'NFPA z wtórną niedoczynnością kory nadnerczy';
    alertType = 'danger';
    comment =
      'Ważna zasada bezpieczeństwa: ZAWSZE wdróż hydrokortyzon PRZED podaniem hormonów tarczycy, aby uniknąć ostrego przełomu nadnerczowego!';
  }

  return {
    prl,
    gh,
    igf1,
    acth,
    cortisol,
    avp,
    serumSodium,
    serumOsmolality,
    urineOsmolality,
    urineVolumeL,
    chiasmCompressed,
    visualFieldDefect,
    visualFieldDescription,
    cranialNervesPalsy,
    status,
    alertType,
    comment,
  };
}

export const pituitarySimulatorLegend = {
  modes: [
    { id: 'axes', name: 'Osie hormonalne i płyny', icon: 'Activity' },
    { id: 'dynamic', name: 'Testy czynnościowe (OGTT / Dex / dDAVP)', icon: 'FlaskConical' },
    { id: 'chiasm', name: 'Siodło, chiasma i pole widzenia', icon: 'Eye' },
  ],
  sections: [
    {
      title: 'Hormony przedniego płata',
      items: [
        { term: 'PRL (Prolaktyna)', desc: 'Norma <25 ng/ml. Podlega tonicznemu hamowaniu przez dopaminę. W prolactinoma rośnie do kilkuset/tysięcy ng/ml.' },
        { term: 'GH i IGF-1', desc: 'GH wydzielany pulsacyjnie. IGF-1 jest stabilnym markerem. W teście OGTT 75g u zdrowych GH spada <1.0 µg/l (lub <0.4 µg/l).' },
        { term: 'ACTH i Kortyzol', desc: 'Rytm dobowy (szczyt o 8:00 rano). W teście przesiewowym z 1 mg deksametazonu kortyzol powinien spaść <1.8 µg/dl.' },
      ],
    },
    {
      title: 'Tylny płat i gospodarka wodno-elektrolitowa',
      items: [
        { term: 'AVP (Wazopresyna / ADH)', desc: 'Reguluje resorpcję wody w nerkach. Niedobór wywołuje moczówkę prostą, nadmiar prowadzi do zespołu SIADH.' },
        { term: 'Sód w surowicy (Na+)', desc: 'Norma 135–145 mmol/l. W SIADH spada <130 mmol/l. Zbyt szybka korekta (>8–10 mmol/l/24h) grozi mielinolizą pnia mózgu (CPM).' },
        { term: 'Desmopresyna (dDAVP)', desc: 'Analog AVP bez komponentu naczynioskurczowego. Leczy moczówkę prostą centralną.' },
      ],
    },
    {
      title: 'Anatomia siodła i chiasma wzrokowa',
      items: [
        { term: 'Skrzyżowanie wzrokowe (chiasma opticum)', desc: 'Przebiega tuż nad siodłem tureckim. Wzrost guza nadsiodłowo (>10 mm) uciska włókna nosowe siatkówek, dając niedowidzenie połowicze dwuskroniowe.' },
        { term: 'Zatoka jamista i skala Knospa', desc: 'Boczny rozrost guza (Knosp 3–4) uciska nerwy czaszkowe III, IV, VI oraz V1/V2, wywołując ptozę i diplopię.' },
      ],
    },
  ],
};
