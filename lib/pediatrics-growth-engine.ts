export type Sex = 'M' | 'K';

export interface AuxologyInput {
  ageYears: number; // np. 7.5
  sex: Sex;
  heightCm: number;
  weightKg: number;
  fatherHeightCm: number;
  motherHeightCm: number;
  previousHeightCm?: number;
  previousIntervalMonths?: number;
  boneAgeYears?: number;
  tannerStage: 1 | 2 | 3 | 4 | 5;
  testicularVolumeMl?: number; // dla chłopców
  basalLh?: number;
  peakLhGnRh?: number;
  igf1NgMl?: number;
}

export interface TargetHeightResult {
  targetHeightCm: number;
  targetSds: number;
  lowerLimitCm: number;
  upperLimitCm: number;
  formulaDescription: string;
  evidenceTier: 'EBM-norm' | 'Mechanistic' | 'Simulation-Scenario';
}

export interface GrowthVelocityResult {
  velocityCmPerYear: number | null;
  evaluation: 'zwolnione' | 'prawidlowe' | 'skok_pokwitaniowy' | 'nadmierne' | 'brak_danych';
  interpretation: string;
  evidenceTier: 'EBM-norm' | 'Mechanistic' | 'Simulation-Scenario';
}

export interface PredictedAdultHeight {
  predictedHeightCmRange: [number, number];
  method: string;
  boneAgeStatus: 'zgodny' | 'opóźniony' | 'przyspieszony' | 'brak_rtg';
  differenceYears: number | null;
  clinicalNote: string;
  evidenceTier: 'EBM-norm' | 'Mechanistic' | 'Simulation-Scenario';
}

export interface GnRhAxisEvaluation {
  status: 'prepubertalna' | 'aktywacja_centralna' | 'tlumienie_obwodowe' | 'niejednoznaczna';
  interpretation: string;
  recommendation: string;
  evidenceTier: 'EBM-norm' | 'Mechanistic' | 'Simulation-Scenario';
}

export interface TrajectoryPoint {
  age: number;
  medianHeightCm: number;
  lowerRangeCm: number; // 3. centyl / -2 SDS
  upperRangeCm: number; // 97. centyl / +2 SDS
  patientUntreatedCm: number;
  patientTreatedCm: number;
}

// Średnie populacyjne normy OLAF / WHO dla wieku 2 - 18 lat
const REFERENCE_GROWTH: Record<Sex, { age: number; meanH: number; sdH: number }[]> = {
  M: [
    { age: 2, meanH: 87.8, sdH: 3.3 },
    { age: 4, meanH: 103.0, sdH: 4.1 },
    { age: 6, meanH: 116.5, sdH: 4.8 },
    { age: 8, meanH: 128.0, sdH: 5.4 },
    { age: 10, meanH: 138.5, sdH: 6.0 },
    { age: 12, meanH: 149.5, sdH: 7.2 },
    { age: 14, meanH: 164.0, sdH: 8.0 },
    { age: 16, meanH: 174.0, sdH: 6.8 },
    { age: 18, meanH: 178.5, sdH: 6.5 },
  ],
  K: [
    { age: 2, meanH: 86.5, sdH: 3.2 },
    { age: 4, meanH: 102.0, sdH: 4.0 },
    { age: 6, meanH: 115.5, sdH: 4.7 },
    { age: 8, meanH: 127.0, sdH: 5.5 },
    { age: 10, meanH: 138.5, sdH: 6.5 },
    { age: 12, meanH: 151.0, sdH: 6.8 },
    { age: 14, meanH: 160.5, sdH: 6.0 },
    { age: 16, meanH: 164.5, sdH: 5.8 },
    { age: 18, meanH: 165.5, sdH: 5.7 },
  ],
};

export function calculateHeightSds(ageYears: number, sex: Sex, heightCm: number): { sds: number; centile: string } {
  const table = REFERENCE_GROWTH[sex];
  let ref = table[0];
  for (let i = 0; i < table.length - 1; i++) {
    if (ageYears >= table[i].age && ageYears <= table[i + 1].age) {
      const frac = (ageYears - table[i].age) / (table[i + 1].age - table[i].age);
      ref = {
        age: ageYears,
        meanH: table[i].meanH + frac * (table[i + 1].meanH - table[i].meanH),
        sdH: table[i].sdH + frac * (table[i + 1].sdH - table[i].sdH),
      };
      break;
    }
  }
  if (ageYears > 18) ref = table[table.length - 1];

  const sds = Number(((heightCm - ref.meanH) / ref.sdH).toFixed(2));
  let centile = '50. centyl';
  if (sds < -2.0) centile = '< 3. centyla (niskorosłość)';
  else if (sds < -1.0) centile = '10.–15. centyl';
  else if (sds > 2.0) centile = '> 97. centyla (wysoki wzrost)';
  else if (sds > 1.0) centile = '85.–90. centyl';

  return { sds, centile };
}

export function calculateTargetHeight(fatherH: number, motherH: number, sex: Sex): TargetHeightResult {
  const target = sex === 'M' ? (fatherH + motherH + 13) / 2 : (fatherH + motherH - 13) / 2;
  const adultMean = sex === 'M' ? 178.5 : 165.5;
  const adultSd = sex === 'M' ? 6.5 : 5.7;
  const sds = Number(((target - adultMean) / adultSd).toFixed(2));

  return {
    targetHeightCm: Math.round(target * 10) / 10,
    targetSds: sds,
    lowerLimitCm: Math.round((target - 8.5) * 10) / 10,
    upperLimitCm: Math.round((target + 8.5) * 10) / 10,
    formulaDescription:
      sex === 'M'
        ? 'Wzór Hermana/Tannera dla chłopców: [wzrost ojca + (wzrost matki + 13)] / 2 ± 8,5 cm (pasmo 95% ufności)'
        : 'Wzór Hermana/Tannera dla dziewcząt: [(wzrost ojca - 13) + wzrost matki] / 2 ± 8,5 cm (pasmo 95% ufności)',
    evidenceTier: 'EBM-norm',
  };
}

export function evaluateGrowthVelocity(
  currentH: number,
  prevH?: number,
  intervalMonths?: number,
  age?: number
): GrowthVelocityResult {
  if (!prevH || !intervalMonths || intervalMonths < 3) {
    return {
      velocityCmPerYear: null,
      evaluation: 'brak_danych',
      interpretation: 'Do wiarygodnej oceny tempa wzrastania wymagane są minimum dwa pomiary w odstępie co najmniej 3–6 miesięcy.',
      evidenceTier: 'EBM-norm',
    };
  }

  const velocity = Number(((currentH - prevH) / (intervalMonths / 12)).toFixed(1));
  let evaluation: GrowthVelocityResult['evaluation'] = 'prawidlowe';
  let interpretation = '';

  if (velocity < 4.0) {
    evaluation = 'zwolnione';
    interpretation = `Tempo wzrastania ${velocity} cm/rok jest patologicznie zwolnione (<25. centyla). Wskazuje na deficyt hormonalny (GHD, hipotyreoza) lub chorobę układową (celiakia, nerki).`;
  } else if (velocity >= 4.0 && velocity <= 7.5) {
    evaluation = 'prawidlowe';
    interpretation = `Tempo wzrastania ${velocity} cm/rok mieści się w fizjologicznym zakresie dla okresu prepubertalnego (25.–75. centyl).`;
  } else if (velocity > 7.5 && velocity <= 12.0) {
    evaluation = 'skok_pokwitaniowy';
    interpretation = `Tempo wzrastania ${velocity} cm/rok odpowiada szczytowi pokwitaniowemu (Peak Height Velocity) lub wczesnemu przyspieszeniu dojrzewania.`;
  } else {
    evaluation = 'nadmierne';
    interpretation = `Tempo wzrastania ${velocity} cm/rok jest patologicznie przyspieszone (np. przedwczesne pokwitanie, gigantyzm przysadkowy, nadmiar steroidów płciowych).`;
  }

  return {
    velocityCmPerYear: velocity,
    evaluation,
    interpretation,
    evidenceTier: 'EBM-norm',
  };
}

export function evaluatePredictedAdultHeight(
  currentH: number,
  ageYears: number,
  boneAgeYears: number | undefined,
  targetH: number,
  sex: Sex
): PredictedAdultHeight {
  if (boneAgeYears === undefined) {
    // Przybliżenie metodą Khamisa-Roche'a bez RTG (szacunek populacyjny)
    const ratio = sex === 'M' ? (0.45 + ageYears * 0.03) : (0.48 + ageYears * 0.032);
    const est = currentH / Math.min(0.98, ratio);
    return {
      predictedHeightCmRange: [Math.round(est - 4.5), Math.round(est + 4.5)],
      method: 'Estymacja populacyjna Khamisa-Roche (bez RTG kośćca)',
      boneAgeStatus: 'brak_rtg',
      differenceYears: null,
      clinicalNote: 'Brak rentgenogramu dłoni. Szacunek obarczony jest wyższym błędem; wymaga potwierdzenia wiekiem kostnym.',
      evidenceTier: 'Simulation-Scenario',
    };
  }

  const diff = Number((boneAgeYears - ageYears).toFixed(1));
  let status: PredictedAdultHeight['boneAgeStatus'] = 'zgodny';
  if (diff <= -1.5) status = 'opóźniony';
  else if (diff >= 1.5) status = 'przyspieszony';

  // Wskaźnik Bayleya-Pinneau (uproszczony model interpolacji odsetka wzrostu ostatecznego)
  // Im młodszy wiek kostny, tym mniejszy ułamek wzrostu dorosłego osiągnięto (większy potencjał catch-up)
  const baseFraction = sex === 'M'
    ? Math.min(0.99, 0.40 + boneAgeYears * 0.036)
    : Math.min(0.99, 0.44 + boneAgeYears * 0.038);

  const rawPred = currentH / baseFraction;
  const lower = Math.round(rawPred - 2.5);
  const upper = Math.round(rawPred + 2.5);

  let note = '';
  if (status === 'opóźniony') {
    note = `Wiek kostny jest opóźniony o ${Math.abs(diff)} roku. Dziecko zachowuje dłuższy czas do zarośnięcia nasad kości (korzystne rokowanie wzrostowe w CDGP lub po leczeniu rhGH).`;
  } else if (status === 'przyspieszony') {
    note = `Wiek kostny jest przyspieszony o ${diff} roku. Chrząstki nasadowe zrastają się przedwcześnie pod wpływem steroidów, co drastycznie obniża wzrost dorosły!`;
  } else {
    note = 'Dojrzałość szkieletowa jest w pełni zgodna z wiekiem metrykalnym (różnica <1,5 roku).';
  }

  return {
    predictedHeightCmRange: [lower, upper],
    method: 'Algorytm dojrzałości szkieletowej Bayleya-Pinneau (z wiekiem kostnym Greulicha-Pyle’a)',
    boneAgeStatus: status,
    differenceYears: diff,
    clinicalNote: note,
    evidenceTier: 'Mechanistic',
  };
}

export function evaluateGnRhAxis(basalLh?: number, peakLhGnRh?: number): GnRhAxisEvaluation {
  if (basalLh === undefined && peakLhGnRh === undefined) {
    return {
      status: 'niejednoznaczna',
      interpretation: 'Brak oznaczeń gonadotropin osiowych.',
      recommendation: 'Przy wątpliwościach co do tempa dojrzewania oznacz podstawowe stężenie LH czułą metodą ultrasensytywną.',
      evidenceTier: 'EBM-norm',
    };
  }

  if (peakLhGnRh !== undefined && peakLhGnRh > 5.0) {
    return {
      status: 'aktywacja_centralna',
      interpretation: `Szczyt LH w teście stymulacji z analogiem GnRH wynosi ${peakLhGnRh} IU/l (>5,0 IU/l). Świadczy o dojrzałej centralnej aktywacji osi podwzgórze-przysadka (CPP).`,
      recommendation: 'Wskazane pilne badanie MRI mózgowia (wykluczenie hamartoma/guzów) i rozważenie leczenia analogiem GnRH depot.',
      evidenceTier: 'EBM-norm',
    };
  }

  if (basalLh !== undefined && basalLh > 0.3) {
    return {
      status: 'aktywacja_centralna',
      interpretation: `Podstawowe stężenie LH wynosi ${basalLh} IU/l (>0,3 IU/l), co z wysokim prawdopodobieństwem wskazuje na obudzenie pulsatora GnRH.`,
      recommendation: 'Wskazane potwierdzenie testem z analogiem GnRH oraz ocena wieku kostnego i USG miednicy / jąder.',
      evidenceTier: 'EBM-norm',
    };
  }

  return {
    status: 'prepubertalna',
    interpretation: 'Podstawowe LH i/lub szczyt w teście GnRH pozostają w przedziale prepubertalnym (brak centralnej aktywacji gonadotropowej).',
    recommendation: 'Jeśli obecne są cechy wirylizacji lub feminizacji, należy pilnie szukać źródła obwodowego (PPP: nadnercza, gonady).',
    evidenceTier: 'EBM-norm',
  };
}

export function generateScenarioTrajectory(
  scenario: 'GHD' | 'CPP' | 'CDGP' | 'Turner' | 'CAH',
  currentAge: number,
  currentH: number,
  sex: Sex
): TrajectoryPoint[] {
  const points: TrajectoryPoint[] = [];
  const startAge = Math.floor(currentAge);

  for (let age = startAge; age <= 18; age += 1) {
    const sdsObj = calculateHeightSds(age, sex, currentH);
    const refTable = REFERENCE_GROWTH[sex];
    const ref = refTable.find(r => r.age === age) || refTable[refTable.length - 1];

    let untreatedH = currentH;
    let treatedH = currentH;
    const yearsDelta = age - currentAge;

    if (scenario === 'GHD') {
      // Bez leczenia rośnie wolno (3 cm/rok); z rhGH rośnie catch-up (8 cm -> 6 cm/rok)
      untreatedH = Math.round(currentH + yearsDelta * 3.2);
      treatedH = Math.round(currentH + Math.min(yearsDelta * 6.5, yearsDelta * 5.0 + 6.0));
    } else if (scenario === 'CPP') {
      // Bez leczenia szybko rośnie i wcześnie zamyka nasady w wieku 11-12 lat (~145 cm dorosły)
      if (age <= 11) untreatedH = Math.round(currentH + yearsDelta * 8.0);
      else untreatedH = Math.round(currentH + (11 - currentAge) * 8.0 + 3.0);
      // Z GnRHa wzrost normalizuje się i zyskuje ~10 cm
      treatedH = Math.round(currentH + yearsDelta * 5.2);
    } else if (scenario === 'CDGP') {
      // Późny skok wzrostowy w wieku 15-17 lat; ostatecznie dogania target height
      if (age < 14) untreatedH = Math.round(currentH + yearsDelta * 4.2);
      else untreatedH = Math.round(currentH + 4 * 4.2 + (age - 14) * 8.0);
      treatedH = untreatedH; // w CDGP ostateczny wzrost jest wariantem normy
    } else if (scenario === 'Turner') {
      // Bez rhGH wzrost dorosły ~142 cm; z rhGH przyrost o 6-8 cm
      untreatedH = Math.round(currentH + yearsDelta * 3.5);
      treatedH = Math.round(currentH + yearsDelta * 5.0);
    } else if (scenario === 'CAH') {
      // Nadmiar androgenów początkowo przyspiesza wzrost, ale zamyka nasady w wieku 10-12 lat
      if (age <= 11) untreatedH = Math.round(currentH + yearsDelta * 7.5);
      else untreatedH = Math.round(currentH + (11 - currentAge) * 7.5 + 2.0);
      treatedH = Math.round(currentH + yearsDelta * 5.4);
    }

    points.push({
      age,
      medianHeightCm: ref.meanH,
      lowerRangeCm: Math.round(ref.meanH - 2 * ref.sdH),
      upperRangeCm: Math.round(ref.meanH + 2 * ref.sdH),
      patientUntreatedCm: Math.min(195, Math.max(90, untreatedH)),
      patientTreatedCm: Math.min(195, Math.max(90, treatedH)),
    });
  }

  return points;
}
