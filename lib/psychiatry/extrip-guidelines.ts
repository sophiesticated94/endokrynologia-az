/**
 * Edukacyjny model wytycznych grupy roboczej EXTRIP (Extracorporeal Treatment in Poisoning)
 * dla leczenia nerkozastępczego (hemodializy) w zatruciu litem.
 * 
 * Źródło: Decker BS et al. CJASN 2015 (PMID: 26139434)
 */

export type ExtripRecommendation = 'RECOMMENDED' | 'SUGGESTED' | 'insufficient_information';

export interface ExtripEvaluationInput {
  lithiumConcentrationMmolL: number;
  eGfr?: number;
  decreasedConsciousness?: boolean; // śpiączka, stupor, głęboka senność
  seizures?: boolean;
  dangerousDysrhythmias?: boolean;
  confusionOrDelirium?: boolean;
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
  recommendationLabel: string;
  rationale: string;
  criteriaEvaluated: ExtripCriterionCheck[];
  educationalDisclaimer: string;
  evidenceId: 'extrip-lithium-recommendation';
}

export function evaluateExtripLithiumGuidance(input: ExtripEvaluationInput): ExtripEvaluationResult {
  const {
    lithiumConcentrationMmolL,
    eGfr,
    decreasedConsciousness = false,
    seizures = false,
    dangerousDysrhythmias = false,
    confusionOrDelirium = false,
    projectedHoursToLessThan1MmolL,
  } = input;

  const checks: ExtripCriterionCheck[] = [];

  const hasImpairedRenal = eGfr !== undefined && eGfr < 30;
  const hasSevereNeurocardiac = decreasedConsciousness || seizures || dangerousDysrhythmias;
  const prolongedElimination = projectedHoursToLessThan1MmolL !== undefined && projectedHoursToLessThan1MmolL > 36;

  checks.push({
    criterion: 'Ciężka neurotoksyczność lub groźne dysrytmie',
    met: hasSevereNeurocardiac,
    importance: 'absolute',
    note: decreasedConsciousness
      ? 'Stwierdzono zaburzenia przytomności (śpiączka / stupor)'
      : seizures
      ? 'Wystąpiły drgawki'
      : dangerousDysrhythmias
      ? 'Stwierdzono groźne dysrytmie komorowe'
      : 'Brak śpiączki, drgawek i groźnych dysrytmii komorowych',
  });

  checks.push({
    criterion: 'Stężenie litu i funkcja nerek',
    met: lithiumConcentrationMmolL > 4.0 && hasImpairedRenal,
    importance: 'absolute',
    note: `Stężenie: ${lithiumConcentrationMmolL} mmol/l, eGFR: ${eGfr ?? 'nieoznaczony'}`,
  });

  checks.push({
    criterion: 'Przewidywany czas eliminacji do stężenia <1,0 mmol/l >36h',
    met: Boolean(prolongedElimination),
    importance: 'absolute',
    note: projectedHoursToLessThan1MmolL !== undefined
      ? `Szacowany czas: ${projectedHoursToLessThan1MmolL} h`
      : 'Czas eliminacji nieoszacowany (wymaga powtarzanych pomiarów)',
  });

  checks.push({
    criterion: 'Splątanie / majaczenie przy stężeniu 2,5–4,0 mmol/l',
    met: confusionOrDelirium && lithiumConcentrationMmolL >= 2.5,
    importance: 'relative',
    note: confusionOrDelirium
      ? 'Obecne splątanie lub zaburzenia funkcji poznawczych'
      : 'Brak ostrego zespołu majaczeniowego',
  });

  let recommendation: ExtripRecommendation = 'insufficient_information';
  let recommendationLabel = 'Brak bezwzględnych wskazań do ECTR / intensywna terapia zachowawcza';
  let rationale = '';

  if (hasSevereNeurocardiac || (lithiumConcentrationMmolL > 4.0 && hasImpairedRenal) || prolongedElimination) {
    recommendation = 'RECOMMENDED';
    recommendationLabel = 'RECOMMENDED: Wskazanie do pilnego leczenia pozaustrojowego (ECTR / hemodializa)';
    rationale =
      'Spełnione kryteria zalecenia bezwzględnego wg konsensusu EXTRIP: obecność ciężkiej neurotoksyczności (śpiączka/drgawki), groźnych dysrytmii lub stężenia >4,0 mmol/l z niewydolnością nerek.';
  } else if (
    lithiumConcentrationMmolL > 5.0 ||
    lithiumConcentrationMmolL > 4.0 ||
    (lithiumConcentrationMmolL >= 2.5 && (confusionOrDelirium || (eGfr !== undefined && eGfr < 45)))
  ) {
    recommendation = 'SUGGESTED';
    recommendationLabel = 'SUGGESTED: Rozważ kwalifikację do leczenia pozaustrojowego';
    rationale =
      'Spełnione kryteria sugerowane wg EXTRIP: stężenie >4,0–5,0 mmol/l lub 2,5–4,0 mmol/l ze splątaniem bądź umiarkowanym uszkodzeniem nerek. Wymagana ścisła obserwacja i konsultacja nefrologiczna.';
  } else {
    recommendation = 'insufficient_information';
    recommendationLabel = 'Leczenie zachowawcze / brak spełnionych kryteriów EXTRIP do hemodializy';
    rationale =
      'Stężenie <2,5 mmol/l bez cech ciężkiej neurotoksyczności i bez groźnych dysrytmii. Wskazane nawadnianie 0,9% NaCl, monitorowanie diurezy i seryjne oznaczenia TDM.';
  }

  return {
    recommendation,
    recommendationLabel,
    rationale,
    criteriaEvaluated: checks,
    educationalDisclaimer:
      'EDUKACYJNY KONTEKST EXTRIP — decyzja o kwalifikacji do hemodializy nie może być zautomatyzowana i wymaga pilnej oceny nefrologa oraz toksykologa w warunkach OIT.',
    evidenceId: 'extrip-lithium-recommendation',
  };
}
