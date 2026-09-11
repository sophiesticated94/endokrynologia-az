'use client';
import {
  ThyroidAxisDiagram,
  LabMatrixDiagram,
  ThyroiditisCurveDiagram,
  EuTiradsVisualGuide,
  OrbitopathyEyeDiagram,
  PregnancyThyroidCurve,
  CancerHistologyDiagram,
} from '../medical-diagrams';
import {
  PituitaryAnatomyDiagram,
  ChiasmFieldDiagram,
  OgttGrowthHormoneCurve,
  CushingDiagnosticPathway,
  WaterBalanceMatrix,
  SheehanSyndromeDiagram,
} from '../pituitary-diagrams';
import {
  AdrenalAnatomyVascularDiagram,
  AdrenalSteroidogenesisDiagram,
  AddisonVsSecondaryPigmentationDiagram,
  RaaAxisAndConnPathway,
  PheoAlphaBetaBlockadeDiagram,
  IncidentalomaCtWashoutDiagram,
  AdrenalCrisisEmergencyProtocol,
  AdrenocorticalCarcinomaWeissDiagram,
} from '../adrenal-diagrams';
import {
  CalciumPhosphateAxisDiagram,
  AlbuminCalciumCorrectionDiagram,
  PhptVsFhhAlgorithmDiagram,
  SecondaryTertiaryHptDiagram,
  HypocalcemiaSignsEkgDiagram,
  HypercalcemicCrisisProtocolDiagram,
  HungryBoneSyndromeDiagram,
  OsteoporosisTScoreBmdDiagram,
} from '../parathyroid-diagrams';
import {
  SpinaThyroidCalculator,
  TpoMolecularMechanism,
  PituitaryPulseDynamics,
  EdelmanWaterBalanceCalculator,
} from '../components/math-chem-widgets-1';
import {
  AdrenalEnzymeKinetics,
  SteroidogenesisP450Visualizer,
  CasrSigmoidalCurve,
  BoneMineralizationKinetics,
} from '../components/math-chem-widgets-2';
import {
  T4TwoCompartmentChart,
  DeiodinaseCatalyticCycle,
} from '../components/math-charts-thyroid';
import {
  GoodwinLimitCycleChart,
  GlycoproteinDimerScheme,
} from '../components/math-charts-pituitary';
import {
  MichaelisMentenLineweaverChart,
  ArrHemodynamicsChart,
} from '../components/math-charts-adrenals';
import {
  CasrHillCurveChart,
  BoneKineticsEkgChart,
} from '../components/math-charts-parathyroid';

export function LessonDiagram({ lessonId, sectionIndex }: { lessonId: string; sectionIndex: number }) {
  // Tarczyca
  if (lessonId === 'fizjologia' && sectionIndex === 0) return <ThyroidAxisDiagram />;
  if (lessonId === 'diagnostyka' && sectionIndex === 1) return <LabMatrixDiagram />;
  if (lessonId === 'graves' && sectionIndex === 1) return <OrbitopathyEyeDiagram />;
  if (lessonId === 'zapalenia' && sectionIndex === 0) return <ThyroiditisCurveDiagram />;
  if (lessonId === 'guzki' && sectionIndex === 1) return <EuTiradsVisualGuide />;
  if (lessonId === 'nowotwory' && sectionIndex === 0) return <CancerHistologyDiagram />;
  if (lessonId === 'ciaza' && sectionIndex === 0) return <PregnancyThyroidCurve />;

  // Tarczyca Math & Chem
  if (lessonId === 'tarczyca-matematyka-kinetyka' && sectionIndex === 0) return <T4TwoCompartmentChart />;
  if (lessonId === 'tarczyca-matematyka-sprzezenie' && sectionIndex === 0) return <SpinaThyroidCalculator />;
  if (lessonId === 'tarczyca-chemia-synteza' && sectionIndex === 0) return <TpoMolecularMechanism />;
  if (lessonId === 'tarczyca-chemia-farmakologia' && sectionIndex === 0) return <DeiodinaseCatalyticCycle />;

  // Przysadka
  if (lessonId === 'przysadka-fizjologia' && sectionIndex === 0) return <PituitaryAnatomyDiagram />;
  if (lessonId === 'guzy-nieczynne' && sectionIndex === 0) return <ChiasmFieldDiagram />;
  if (lessonId === 'akromegalia' && sectionIndex === 1) return <OgttGrowthHormoneCurve />;
  if (lessonId === 'cushing-choroba' && sectionIndex === 1) return <CushingDiagnosticPathway />;
  if (lessonId === 'moczowka-prosta' && sectionIndex === 1) return <WaterBalanceMatrix />;
  if (lessonId === 'hipopituitaryzm' && sectionIndex === 0) return <SheehanSyndromeDiagram />;

  // Przysadka Math & Chem
  if (lessonId === 'przysadka-matematyka-pulsacja' && sectionIndex === 0) return <GoodwinLimitCycleChart />;
  if (lessonId === 'przysadka-matematyka-osmolalnosc' && sectionIndex === 0) return <EdelmanWaterBalanceCalculator />;
  if (lessonId === 'przysadka-chemia-struktury' && sectionIndex === 0) return <GlycoproteinDimerScheme />;
  if (lessonId === 'przysadka-chemia-leki' && sectionIndex === 0) return <PituitaryPulseDynamics />;

  // Nadnercza
  if (lessonId === 'nadnercza-anatomia' && sectionIndex === 0) return <AdrenalAnatomyVascularDiagram />;
  if (lessonId === 'nadnercza-anatomia' && sectionIndex === 1) return <AdrenalSteroidogenesisDiagram />;
  if (lessonId === 'addison-choroba' && sectionIndex === 0) return <AddisonVsSecondaryPigmentationDiagram />;
  if (lessonId === 'zespol-conna' && sectionIndex === 1) return <RaaAxisAndConnPathway />;
  if (lessonId === 'pheochromocytoma' && sectionIndex === 1) return <PheoAlphaBetaBlockadeDiagram />;
  if (lessonId === 'incydentaloma-nadnercza' && sectionIndex === 1) return <IncidentalomaCtWashoutDiagram />;
  if (lessonId === 'przelom-nadnerczowy' && sectionIndex === 0) return <AdrenalCrisisEmergencyProtocol />;
  if (lessonId === 'rak-nadnercza' && sectionIndex === 0) return <AdrenocorticalCarcinomaWeissDiagram />;

  // Nadnercza Math & Chem
  if (lessonId === 'nadnercza-matematyka-kinetyka-enzymow' && sectionIndex === 0) return <MichaelisMentenLineweaverChart />;
  if (lessonId === 'nadnercza-matematyka-hemodynamika' && sectionIndex === 0) return <ArrHemodynamicsChart />;
  if (lessonId === 'nadnercza-chemia-steroidogeneza' && sectionIndex === 0) return <SteroidogenesisP450Visualizer />;
  if (lessonId === 'nadnercza-chemia-katecholaminy' && sectionIndex === 0) return <AdrenalEnzymeKinetics />;

  // Przytarczyce
  if (lessonId === 'przytarczyce-fizjologia' && sectionIndex === 0) return <CalciumPhosphateAxisDiagram />;
  if (lessonId === 'przytarczyce-diagnostyka' && sectionIndex === 0) return <AlbuminCalciumCorrectionDiagram />;
  if (lessonId === 'fhh-hiperkalcemia' && sectionIndex === 1) return <PhptVsFhhAlgorithmDiagram />;
  if (lessonId === 'shpt-thpt-pchn' && sectionIndex === 1) return <SecondaryTertiaryHptDiagram />;
  if (lessonId === 'tezyczka-objawy' && sectionIndex === 0) return <HypocalcemiaSignsEkgDiagram />;
  if (lessonId === 'przelom-hiperkalcemiczny' && sectionIndex === 1) return <HypercalcemicCrisisProtocolDiagram />;
  if (lessonId === 'zespol-glodnych-kosci' && sectionIndex === 1) return <HungryBoneSyndromeDiagram />;
  if (lessonId === 'osteoporoza-metabolizm' && sectionIndex === 1) return <OsteoporosisTScoreBmdDiagram />;

  // Przytarczyce Math & Chem
  if (lessonId === 'przytarczyce-matematyka-casr-sigmoida' && sectionIndex === 0) return <CasrHillCurveChart />;
  if (lessonId === 'przytarczyce-matematyka-kinetyka-mineralizacji' && sectionIndex === 0) return <BoneKineticsEkgChart />;
  if (lessonId === 'przytarczyce-chemia-casr-kalcymimetyki' && sectionIndex === 0) return <CasrSigmoidalCurve />;
  if (lessonId === 'przytarczyce-chemia-witd-bisfosfoniany' && sectionIndex === 0) return <BoneMineralizationKinetics />;

  return null;
}
