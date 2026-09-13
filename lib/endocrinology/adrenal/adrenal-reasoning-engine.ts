export type SemanticEvidenceOrigin =
  | 'GUIDELINE_THRESHOLD'
  | 'ASSAY_DEPENDENT'
  | 'MEASURED'
  | 'DERIVED'
  | 'MODELLED'
  | 'EXTRAPOLATED';

export interface SemanticValue<T> {
  value: T;
  origin: SemanticEvidenceOrigin;
  guidelineSource?: string;
  assayContext?: string;
  caveat?: string;
}

export interface AdrenalCortisolEvalInput {
  morningCortisolUgDl: number;
  timeOfSampleHours?: number; // e.g. 8 (8:00 AM)
  cbgAltered?: boolean; // pregnancy, oral estrogens
  recentPituitaryEventWeeks?: number; // secondary AI caveat
  synacthenPeakUgDl?: number;
  assayMethod?: 'immunoassay' | 'lc_ms_ms';
}

export interface AdrenalCortisolEvalOutput {
  status: 'strongly_suggests_ai' | 'indeterminate_requires_acth_stim' | 'ai_unlikely' | 'invalid_sample';
  interpretation: string;
  synacthenResult?: 'pass_adequate_reserve' | 'fail_adrenal_insufficiency' | 'caveat_recent_secondary_ai_possible_false_negative';
  semanticOrigin: SemanticEvidenceOrigin;
  actionRequired: string;
}

export function evaluateCortisolStatus(input: AdrenalCortisolEvalInput): AdrenalCortisolEvalOutput {
  if (input.cbgAltered) {
    return {
      status: 'invalid_sample',
      interpretation: 'Zmieniony poziom CBG (np. doustna estrogenoterapia, ciąża) uniemożliwia wiarygodną interpretację całkowitego kortyzolu.',
      semanticOrigin: 'ASSAY_DEPENDENT',
      actionRequired: 'Oznacz kortyzol wolny w ślinie / moczu lub odstaw estrogeny na 6 tygodni przed badaniem.',
    };
  }

  // Morning cortisol
  const val = input.morningCortisolUgDl;
  const cutoffLow = 3.0; // ug/dl
  const cutoffHighImmunoassay = 18.0;
  const cutoffHighLCMS = 14.0;
  const isLCMS = input.assayMethod === 'lc_ms_ms';
  const cutoffHigh = isLCMS ? cutoffHighLCMS : cutoffHighImmunoassay;

  let synResult: AdrenalCortisolEvalOutput['synacthenResult'] = undefined;
  if (input.synacthenPeakUgDl !== undefined) {
    const synCutoff = isLCMS ? 14.5 : 18.0;
    if (input.recentPituitaryEventWeeks !== undefined && input.recentPituitaryEventWeeks <= 4) {
      synResult = 'caveat_recent_secondary_ai_possible_false_negative';
    } else if (input.synacthenPeakUgDl >= synCutoff) {
      synResult = 'pass_adequate_reserve';
    } else {
      synResult = 'fail_adrenal_insufficiency';
    }
  }

  if (val < cutoffLow) {
    return {
      status: 'strongly_suggests_ai',
      interpretation: `Poranny kortyzol ${val} µg/dl (< 3,0 µg/dl) z wysokim prawdopodobieństwem wskazuje na niedoczynność kory nadnerczy.`,
      synacthenResult: synResult,
      semanticOrigin: 'GUIDELINE_THRESHOLD',
      actionRequired: 'Oznacz ACTH, pilnie wdróż substytucję hydrokortyzonem po zabezpieczeniu badań, edukuj w zakresie przełomu nadnerczowego.',
    };
  }

  if (val >= cutoffHigh) {
    return {
      status: 'ai_unlikely',
      interpretation: `Poranny kortyzol ${val} µg/dl (>= ${cutoffHigh} µg/dl dla ${isLCMS ? 'LC-MS/MS' : 'immunoessayu'}) wyklucza pierwotną niedoczynność kory nadnerczy.`,
      synacthenResult: synResult,
      semanticOrigin: 'GUIDELINE_THRESHOLD',
      actionRequired: 'Brak wskazań do rutynowej stymulacji Synacthenem, chyba że podejrzenie świeżej wtórnej niedoczynności lub atypowego przebiegu.',
    };
  }

  return {
    status: 'indeterminate_requires_acth_stim',
    interpretation: `Poranny kortyzol ${val} µg/dl mieści się w strefie niejednoznacznej (3,0–${cutoffHigh} µg/dl).`,
    synacthenResult: synResult,
    semanticOrigin: 'GUIDELINE_THRESHOLD',
    actionRequired: 'Wykonaj test stymulacji tetrakozaktydem (Synacthen 250 µg). Pamiętaj o jaskrawej ułomności testu we wczesnej (<4 tyg.) wtórnej niedoczynności.',
  };
}

export interface PrimaryAldoEvalInput {
  aldosteroneNgDl: number;
  reninType: 'pra_ng_ml_h' | 'drc_miu_l';
  reninValue: number;
  potassiumMmolL: number;
  medications: Array<'mra' | 'beta_blocker' | 'acei_arb' | 'dihydropyridine_ccb' | 'alpha_blocker'>;
  spontaneousHypokalemia?: boolean;
}

export interface PrimaryAldoEvalOutput {
  arrValue: number;
  arrUnit: string;
  isArrPositive: boolean;
  potassiumValid: boolean;
  medicationInterferences: string[];
  confirmatoryTestIndicated: 'mandatory' | 'not_needed_spontaneous_severe_pa' | 'conditional_on_surgery' | 'invalid_until_prep';
  recommendation: string;
  semanticOrigin: SemanticEvidenceOrigin;
}

export function evaluatePrimaryAldosteronism(input: PrimaryAldoEvalInput): PrimaryAldoEvalOutput {
  const interferences: string[] = [];
  const potassiumValid = input.potassiumMmolL >= 3.8;

  if (!potassiumValid) {
    interferences.push('Hipokaliemia (< 3,8 mmol/l) bezpośrednio hamuje biosyntezę aldosteronu, powodując FAŁSZYWIE UJEMNY ARR. Wyrównaj K+ przed oznaczeniem.');
  }

  if (input.medications.includes('mra')) {
    interferences.push('Antagoniści receptora mineralokortykoidowego (spironolakton, eplerenon) silnie podnoszą reninę (fałszywie ujemny ARR). Odstaw na >= 4-6 tygodni.');
  }
  if (input.medications.includes('beta_blocker')) {
    interferences.push('Beta-adrenolityki hamują wydzielanie reniny z aparatu przykłębuszkowego (fałszywie DODATNI ARR). W razie wątpliwości zamień na alfa-bloker/werapamil.');
  }
  if (input.medications.includes('acei_arb')) {
    interferences.push('Inhibitory ACE i ARB podnoszą reninę (fałszywie ujemny ARR). Jednak dodatni ARR pomimo ACE-I/ARB silnie utwierdza podejrzenie PA.');
  }

  const effectiveRenin = Math.max(input.reninValue, input.reninType === 'pra_ng_ml_h' ? 0.2 : 2.0);
  const arr = Number((input.aldosteroneNgDl / effectiveRenin).toFixed(1));
  const isPra = input.reninType === 'pra_ng_ml_h';
  const arrThreshold = isPra ? 20.0 : 3.0; // 20 (ng/dl)/(ng/ml/h) or ~30-40 depending on unit, for DRC 3.0-3.7 (ng/dl)/(mIU/l)
  const isArrPositive = arr >= arrThreshold && input.aldosteroneNgDl >= 10.0;

  let confStatus: PrimaryAldoEvalOutput['confirmatoryTestIndicated'] = 'conditional_on_surgery';
  let rec = '';

  if (!potassiumValid || input.medications.includes('mra')) {
    confStatus = 'invalid_until_prep';
    rec = 'Wynik ARR nie jest w pełni interpretowalny. Wyrównaj potas i/lub zmodyfikuj leki hipotensyjne na leki o minimalnym wpływie (werapamil SR, doksazosyna).';
  } else if (input.spontaneousHypokalemia && input.aldosteroneNgDl >= 20.0 && isArrPositive) {
    confStatus = 'not_needed_spontaneous_severe_pa';
    rec = 'Wg wytycznych Endocrine Society 2025: U pacjenta ze spontaniczną hipokaliemią, supresją reniny i PAC >= 20 ng/dl testy konfirmacyjne są ZBĘDNE. Rozpoznanie PA jest pewne.';
  } else if (isArrPositive) {
    confStatus = 'mandatory';
    rec = 'Dodatni screening ARR. Jeśli pacjent jest kandydatem i wyraża zgodę na leczenie operacyjne, wykonaj test konfirmacyjny (np. test obciążenia 0.9% NaCl lub kaptoprilem).';
  } else {
    confStatus = 'conditional_on_surgery';
    rec = 'Ujemny wskaźnik ARR. PA mało prawdopodobny w aktualnych warunkach farmakologicznych.';
  }

  return {
    arrValue: arr,
    arrUnit: isPra ? '(ng/dl)/(ng/ml/h)' : '(ng/dl)/(mIU/l)',
    isArrPositive,
    potassiumValid,
    medicationInterferences: interferences,
    confirmatoryTestIndicated: confStatus,
    recommendation: rec,
    semanticOrigin: 'GUIDELINE_THRESHOLD',
  };
}

export interface PheoEvalInput {
  normetanephrineFraction: number; // e.g. 1.0 = upper limit of normal
  metanephrineFraction: number;
  currentMedications: string[];
  plannedSurgeryOrBiopsy?: boolean;
  alphaBlockerInitiated?: boolean;
  betaBlockerInitiated?: boolean;
}

export interface PheoEvalOutput {
  suspicionLevel: 'normal' | 'borderline_possible_false_positive' | 'high_probable_pheo';
  safetyAlerts: string[];
  nextSteps: string[];
  semanticOrigin: SemanticEvidenceOrigin;
}

export function evaluatePheoSafety(input: PheoEvalInput): PheoEvalOutput {
  const alerts: string[] = [];
  const nextSteps: string[] = [];

  if (input.betaBlockerInitiated && !input.alphaBlockerInitiated) {
    alerts.push('KRYTYCZNY BŁĄD BEZPIECZEŃSTWA: Podanie beta-adrenolityku bez wcześniejszej skutecznej alfa-blokady grozi śmiertelnym przełomem nadciśnieniowym z powodu nieantagonizowanego pobudzenia receptorów alfa-1!');
  }

  if (input.plannedSurgeryOrBiopsy && !input.alphaBlockerInitiated) {
    alerts.push('ABSOLUTNY ZAKAZ BIOPSJI I ZABIEGU: Biopsja lub operacja guza bez blokady alfa może wywołać masywny wyrzut katecholamin i zgon na stole operacyjnym.');
  }

  const maxFrac = Math.max(input.normetanephrineFraction, input.metanephrineFraction);
  let suspicion: PheoEvalOutput['suspicionLevel'] = 'normal';

  if (maxFrac >= 3.0) {
    suspicion = 'high_probable_pheo';
    nextSteps.push('Wysokie stężenie wolnych metanefryn (> 3x GGN) ma >99% swoistość dla PPGL. Wykonaj lokalizacyjne badanie obrazowe (MRI/CT jamy brzusznej i miednicy).');
    nextSteps.push('Wdróż alfa-blokadę (doksazosyna lub fenoksybenzamina) na co najmniej 10-14 dni przed planowanym zabiegiem.');
  } else if (maxFrac > 1.0) {
    suspicion = 'borderline_possible_false_positive';
    nextSteps.push('Graniczne podwyższenie (< 3x GGN). Sprawdź leki interferujące (TLPD, SNRI, labetalol, sympatykomimetyki) oraz stres, pozycję leżącą przy pobraniu.');
    nextSteps.push('Rozważ powtórzenie w warunkach ścisłego spoczynku (kaniula, 30 min leżenia) lub test hamowania klonidyną.');
  } else {
    nextSteps.push('Metanefryny w normie. Guz chromochłonny biologicznie skrajnie mało prawdopodobny.');
  }

  return {
    suspicionLevel: suspicion,
    safetyAlerts: alerts,
    nextSteps,
    semanticOrigin: 'GUIDELINE_THRESHOLD',
  };
}

export interface AdrenalIncidentalomaInput {
  sizeMm: number;
  unenhancedHu: number;
  postDstCortisolUgDl: number;
  arrPositive?: boolean;
  metanephrinesPositive?: boolean;
}

export interface AdrenalIncidentalomaOutput {
  imagingCategory: 'benign_lipid_rich' | 'indeterminate_lipid_poor' | 'suspicious_malignant';
  endocrineActivity: 'non_functioning' | 'macs_possible' | 'macs_confirmed' | 'pha' | 'pheo';
  surgicalCandidate: boolean;
  recommendation: string;
}

export function evaluateIncidentaloma(input: AdrenalIncidentalomaInput): AdrenalIncidentalomaOutput {
  let imgCat: AdrenalIncidentalomaOutput['imagingCategory'] = 'benign_lipid_rich';
  if (input.unenhancedHu <= 10) {
    imgCat = 'benign_lipid_rich';
  } else if (input.sizeMm >= 40) {
    imgCat = 'suspicious_malignant';
  } else {
    imgCat = 'indeterminate_lipid_poor';
  }

  let endoAct: AdrenalIncidentalomaOutput['endocrineActivity'] = 'non_functioning';
  if (input.metanephrinesPositive) {
    endoAct = 'pheo';
  } else if (input.arrPositive) {
    endoAct = 'pha';
  } else if (input.postDstCortisolUgDl > 5.0) {
    endoAct = 'macs_confirmed';
  } else if (input.postDstCortisolUgDl > 1.8) {
    endoAct = 'macs_possible';
  }

  const surgery = input.sizeMm >= 40 || endoAct === 'pheo' || endoAct === 'pha' || (endoAct === 'macs_confirmed' && input.sizeMm >= 30);
  let rec = '';
  if (surgery) {
    rec = 'Wskazana kwalifikacja do adrenalektomii (rozmiar >= 4 cm, guz chromochłonny, PA lub klinicznie istotny MACS).';
  } else if (imgCat === 'indeterminate_lipid_poor') {
    rec = 'Guz ubogolipidowy (>10 HU). Wykonaj badanie CT z oceną wymywania (washout) lub kontrolne obrazowanie za 6–12 miesięcy.';
  } else {
    rec = 'Łagodny gruczolak bogatolipoidowy (<=10 HU), nieczynny hormonalnie. Nie wymaga rutynowej powtórnej diagnostyki obrazowej ani hormonalnej.';
  }

  return {
    imagingCategory: imgCat,
    endocrineActivity: endoAct,
    surgicalCandidate: surgery,
    recommendation: rec,
  };
}
