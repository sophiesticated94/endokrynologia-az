/**
 * Edukacyjny model wytycznych grupy roboczej EXTRIP (Extracorporeal Treatment in Poisoning)
 * dla leczenia nerkozastępczego (hemodializy / ECTR) w zatruciu litem.
 * 
 * Źródło: Decker BS et al. CJASN 2015 (PMID: 26139434)
 */

export type ExtripRecommendation = 'RECOMMENDED' | 'SUGGESTED' | 'NOT_INDICATED' | 'insufficient_information';

export interface ExtripEvaluationInput {
  lithiumConcentrationMmolL?: number;
  measuredConcentrationMmolL?: number;
  eGfr?: number;
  hasAkiOrSevereRenalFailure?: boolean;
  decreasedConsciousness?: boolean; // śpiączka, stupor
  seizures?: boolean;
  dangerousDysrhythmias?: boolean;
  significantConfusion?: boolean;
  confusionOrDelirium?: boolean; // alias dla significantConfusion
  projectedHoursToLessThan1MmolL?: number;
}

export interface ExtripCriterionCheck {
  criterion: string;
  met: boolean;
  importance: 'absolute' | 'relative';
  note: string;
}

export interface ExtripEvaluationResult {
  recommendation: ExtripRecommendation;
  recommendationLevel: ExtripRecommendation;
  recommendationLabel: string;
  rationale: string;
  criteriaMet: string[];
  missingCriticalInputs: string[];
  criteriaEvaluated: ExtripCriterionCheck[];
  educationalDisclaimer: string;
  evidenceId: 'extrip-lithium-recommendation';
}

export function evaluateExtripLithiumGuidance(input: ExtripEvaluationInput): ExtripEvaluationResult {
  const lithiumConcentrationMmolL = input.lithiumConcentrationMmolL ?? input.measuredConcentrationMmolL ?? 0;
  const {
    eGfr,
    hasAkiOrSevereRenalFailure,
    decreasedConsciousness,
    seizures,
    dangerousDysrhythmias,
    significantConfusion,
    confusionOrDelirium,
    projectedHoursToLessThan1MmolL,
  } = input;

  const conf = significantConfusion !== undefined ? significantConfusion : confusionOrDelirium;
  const missingCriticalInputs: string[] = [];

  if (decreasedConsciousness === undefined) missingCriticalInputs.push('Poziom przytomności (śpiączka / stupor)');
  if (seizures === undefined) missingCriticalInputs.push('Występowanie drgawek');
  if (dangerousDysrhythmias === undefined) missingCriticalInputs.push('Zagrażające życiu dysrytmie komorowe');
  if (eGfr === undefined && !hasAkiOrSevereRenalFailure) missingCriticalInputs.push('Wydolność nerek (eGFR / AKI)');
  if (conf === undefined) missingCriticalInputs.push('Stan świadomości (znaczne splątanie)');

  const hasImpairedRenal = (eGfr !== undefined && eGfr < 45) || Boolean(hasAkiOrSevereRenalFailure);

  // 1. Kryteria RECOMMENDED wg EXTRIP 2015
  const recommendedCriteriaMet: string[] = [];
  if (hasImpairedRenal && lithiumConcentrationMmolL > 4.0) {
    recommendedCriteriaMet.push('Stężenie litu >4,0 mmol/l przy upośledzonej funkcji nerek (eGFR <45 ml/min lub AKI)');
  }
  if (decreasedConsciousness === true) {
    recommendedCriteriaMet.push('Zaburzenia przytomności (śpiączka / stupor)');
  }
  if (seizures === true) {
    recommendedCriteriaMet.push('Wystąpienie drgawek');
  }
  if (dangerousDysrhythmias === true) {
    recommendedCriteriaMet.push('Zagrażające życiu dysrytmie komorowe');
  }

  // 2. Kryteria SUGGESTED wg EXTRIP 2015
  const suggestedCriteriaMet: string[] = [];
  if (lithiumConcentrationMmolL > 5.0) {
    suggestedCriteriaMet.push('Stężenie litu >5,0 mmol/l');
  }
  if (conf === true) {
    suggestedCriteriaMet.push('Znaczne splątanie / majaczenie');
  }
  if (projectedHoursToLessThan1MmolL !== undefined && projectedHoursToLessThan1MmolL > 36) {
    suggestedCriteriaMet.push('Przewidywany czas eliminacji do stężenia <1,0 mmol/l przekracza 36 godzin');
  }

  const criteriaMet = [...recommendedCriteriaMet, ...suggestedCriteriaMet];

  const checks: ExtripCriterionCheck[] = [
    {
      criterion: 'Ciężka neurotoksyczność lub groźne dysrytmie (RECOMMENDED)',
      met: Boolean(decreasedConsciousness || seizures || dangerousDysrhythmias),
      importance: 'absolute',
      note: decreasedConsciousness
        ? 'Stwierdzono zaburzenia przytomności (śpiączka / stupor)'
        : seizures
        ? 'Wystąpiły drgawki'
        : dangerousDysrhythmias
        ? 'Stwierdzono groźne dysrytmie komorowe'
        : decreasedConsciousness === false && seizures === false && dangerousDysrhythmias === false
        ? 'Brak śpiączki, drgawek i groźnych dysrytmii komorowych'
        : 'Nieznane / brak oceny neurologicznej i kardiologicznej',
    },
    {
      criterion: 'Stężenie litu >4,0 mmol/l i dysfunkcja nerek (RECOMMENDED)',
      met: lithiumConcentrationMmolL > 4.0 && hasImpairedRenal,
      importance: 'absolute',
      note: `Stężenie: ${lithiumConcentrationMmolL} mmol/l, filtracja nerkowa: ${eGfr !== undefined ? `${eGfr} ml/min` : hasAkiOrSevereRenalFailure ? 'AKI' : 'nieznana'}`,
    },
    {
      criterion: 'Stężenie litu >5,0 mmol/l (SUGGESTED)',
      met: lithiumConcentrationMmolL > 5.0,
      importance: 'relative',
      note: `Stężenie: ${lithiumConcentrationMmolL} mmol/l ${lithiumConcentrationMmolL > 5.0 ? '(>5,0 mmol/l)' : '(≤5,0 mmol/l)'}`,
    },
    {
      criterion: 'Znaczne splątanie (SUGGESTED)',
      met: Boolean(conf),
      importance: 'relative',
      note: conf === true ? 'Obecne znaczne splątanie' : conf === false ? 'Brak znacznego splątania' : 'Brak danych o splątaniu',
    },
    {
      criterion: 'Czas eliminacji do stężenia <1,0 mmol/l >36h (SUGGESTED)',
      met: Boolean(projectedHoursToLessThan1MmolL !== undefined && projectedHoursToLessThan1MmolL > 36),
      importance: 'relative',
      note: projectedHoursToLessThan1MmolL !== undefined
        ? `Szacowany czas: ${projectedHoursToLessThan1MmolL} h`
        : 'Czas eliminacji nieoszacowany',
    },
  ];

  let recommendation: ExtripRecommendation = 'NOT_INDICATED';
  let recommendationLabel = 'Brak wskazań do ECTR wg kryteriów EXTRIP / intensywna terapia zachowawcza';
  let rationale = '';

  if (recommendedCriteriaMet.length > 0) {
    recommendation = 'RECOMMENDED';
    recommendationLabel = 'RECOMMENDED: Wskazanie do pilnego leczenia pozaustrojowego (ECTR / hemodializa)';
    rationale = `Spełnione kryteria zalecenia bezwzględnego wg EXTRIP 2015: ${recommendedCriteriaMet.join('; ')}.`;
  } else if (suggestedCriteriaMet.length > 0) {
    recommendation = 'SUGGESTED';
    recommendationLabel = 'SUGGESTED: Rozważ kwalifikację do leczenia pozaustrojowego (ECTR)';
    rationale = `Spełnione kryteria sugerowane wg EXTRIP 2015: ${suggestedCriteriaMet.join('; ')}. Wskazana pilna konsultacja nefrologiczna i toksykologiczna.`;
  } else if (missingCriticalInputs.length > 0) {
    recommendation = 'insufficient_information';
    recommendationLabel = 'Niekompletne dane kliniczne — brak możliwości pełnej oceny wg kryteriów EXTRIP';
    rationale = `Brak krytycznych danych klinicznych: ${missingCriticalInputs.join(', ')}. Ocena EXTRIP nie może wykluczyć wskazań do ECTR bez tych informacji.`;
  } else {
    recommendation = 'NOT_INDICATED';
    recommendationLabel = 'Leczenie zachowawcze / brak spełnionych kryteriów EXTRIP do hemodializy';
    rationale = 'Brak spełnienia kryteriów bezwzględnych i sugerowanych EXTRIP. Wskazane nawadnianie 0,9% NaCl, monitorowanie diurezy i seryjne oznaczenia TDM.';
  }

  return {
    recommendation,
    recommendationLevel: recommendation,
    recommendationLabel,
    rationale,
    criteriaMet,
    missingCriticalInputs,
    criteriaEvaluated: checks,
    educationalDisclaimer:
      'EDUKACYJNY KONTEKST EXTRIP — decyzja o kwalifikacji do hemodializy nie może być zautomatyzowana i wymaga pilnej oceny nefrologa oraz toksykologa w warunkach OIT.',
    evidenceId: 'extrip-lithium-recommendation',
  };
}
