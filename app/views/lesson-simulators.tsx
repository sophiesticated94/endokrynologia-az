'use client';
import { Activity, ArrowRight } from 'lucide-react';
import type { Navigation } from './types';
import { HptSimulator } from '../hpt-simulator';
import { PituitarySimulator } from '../pituitary-simulator';
import { AdrenalSimulator } from '../adrenal-simulator';
import { ParathyroidSimulator } from '../parathyroid-simulator';
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
import { DiabetesSimulator } from '../diabetes-simulator';
import {
  BergmanMinimalModelCalculator,
  InsulinReceptorAndKetogenesisVisualizer,
} from '../components/math-chem-widgets-3';
import { GonadSimulator } from '../gonad-simulator';
import { GonadPharmacodynamicsLab } from '../components/gonad-pharmacodynamics-lab';
import { gahtLessonIds } from '../../lib/course-gaht';
import {
  VermeulenFreeTestosteroneCalculator,
  GnrhPulseAndHpgOscillator,
  AromataseAndSermMolecularVisualizer,
} from '../components/math-chem-widgets-4';
import { NenSimulator } from '../nen-simulator';
import {
  PrrtDosimetryCalculator,
  Ki67TumorKineticsModel,
  SerotoninShuntAndSstrVisualizer,
} from '../components/math-chem-widgets-5';
import { LessonSimulatorsOtylosc } from './lesson-simulators-otylosc.tsx';

export function LessonSimulators({ lessonId, go }: { lessonId: string; go: Navigation }) {
  if (gahtLessonIds.includes(lessonId)) return <GonadPharmacodynamicsLab key={lessonId} compact initialGoal={lessonId==='gonady-trans-maskulinizujaca'||lessonId==='gaht-plodnosc'?'masc':'fem'}/>;
  // Zwiastun symulatora w Lekcji 1 Tarczycy
  if (lessonId === 'fizjologia') {
    return (
      <div className="simulator-teaser-card">
        <div className="teaser-content">
          <div className="teaser-icon">
            <Activity size={26} />
          </div>
          <div>
            <span className="eyebrow">INTERAKTYWNY MODEL FIZJOLOGICZNY</span>
            <h3>Chcesz sprawdzić ujemne sprzężenie zwrotne w akcji?</h3>
            <p>
              W <strong>Lekcji 2 („Czytaj wyniki ze zrozumieniem”)</strong> czeka na Ciebie
              interaktywny <strong>Symulator Osi HPT</strong>. Nauczysz się tam łączyć stężenia TSH i FT4
              w pary diagnostyczne, a także testować wpływ leków i przeciwciał TRAb.
            </p>
            <div className="teaser-actions">
              <button
                type="button"
                className="primary"
                onClick={() => go('lesson/diagnostyka')}
              >
                Przejdź do Lekcji 2 z symulatorem <ArrowRight size={15} />
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => go('simulator')}
              >
                Otwórz pracownie
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pełny Symulator osi HPT osadzony bezpośrednio w Lekcji 2 (Diagnostyka laboratoryjna)
  if (lessonId === 'diagnostyka') {
    return (
      <div style={{ margin: '36px 0' }}>
        <HptSimulator embedded />
      </div>
    );
  }

  // Zwiastun konsoli przysadkowej w Lekcji 1 Przysadki
  if (lessonId === 'przysadka-fizjologia') {
    return (
      <div className="simulator-teaser-card" style={{ background: '#edf4f8', borderColor: '#c7dce9' }}>
        <div className="teaser-content">
          <div className="teaser-icon" style={{ background: '#dceaf3', color: '#255b85' }}>
            <Activity size={26} />
          </div>
          <div>
            <span className="eyebrow" style={{ color: '#255b85' }}>INTERAKTYWNA KONSOLA KLINICZNA</span>
            <h3>Połącz osie przysadki z interpretacją wyników</h3>
            <p>
              W <strong>Lekcji 2 („Rozszyfruj przysadkę”)</strong> czeka na Ciebie
              <strong>Pracownia Przysadkowo-Podwzgórzowa</strong>. Możesz w niej
              prześledzić osie PRL, GH, ACTH i obliczyć klirens wolnej wody.
            </p>
            <div className="teaser-actions">
              <button
                type="button"
                className="primary"
                onClick={() => go('lesson/przysadka-diagnostyka')}
              >
                Przejdź do Lekcji 2 z konsolą <ArrowRight size={15} />
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => go('simulator')}
              >
                Otwórz symulatory
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pełna Konsola Przysadkowa w Lekcji 2 Przysadki
  if (lessonId === 'przysadka-diagnostyka') {
    return (
      <div style={{ margin: '36px 0' }}>
        <PituitarySimulator embedded />
      </div>
    );
  }

  // Zwiastun konsoli nadnerczowej w Lekcji 1 Nadnerczy
  if (lessonId === 'nadnercza-anatomia') {
    return (
      <div className="simulator-teaser-card" style={{ background: '#fdf7f0', borderColor: '#e8d5bf' }}>
        <div className="teaser-content">
          <div className="teaser-icon" style={{ background: '#faebd7', color: '#b2651f' }}>
            <Activity size={26} />
          </div>
          <div>
            <span className="eyebrow" style={{ color: '#b2651f' }}>INTERAKTYWNA KONSOLA KLINICZNA</span>
            <h3>Chcesz przetestować steroidogenezę, blokadę alfa i kryteria TK?</h3>
            <p>
              W <strong>Lekcji 2 („Wycisz, pobudź, oznacz”)</strong> czeka na Ciebie
              <strong>Pracownia Nadnerczowa</strong>. Możesz w niej
              prześledzić osie HPA i RAA, obliczyć washout TK oraz poznać ograniczenia interpretacji.
            </p>
            <div className="teaser-actions">
              <button
                type="button"
                className="primary"
                onClick={() => go('lesson/nadnercza-diagnostyka')}
              >
                Przejdź do Lekcji 2 z konsolą <ArrowRight size={15} />
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => go('simulator')}
              >
                Otwórz symulatory
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pełna Konsola Nadnerczowa w Lekcji 2 Nadnerczy
  if (lessonId === 'nadnercza-diagnostyka') {
    return (
      <div style={{ margin: '36px 0' }}>
        <AdrenalSimulator embedded />
      </div>
    );
  }

  // Zwiastun konsoli przytarczycowej w Lekcji 1 Przytarczyc
  if (lessonId === 'przytarczyce-fizjologia') {
    return (
      <div className="simulator-teaser-card" style={{ background: '#f6f3fb', borderColor: '#dfd7f2' }}>
        <div className="teaser-content">
          <div className="teaser-icon" style={{ background: '#ede6fa', color: '#6d4ba4' }}>
            <Activity size={26} />
          </div>
          <div>
            <span className="eyebrow" style={{ color: '#6d4ba4' }}>INTERAKTYWNA KONSOLA KLINICZNA</span>
            <h3>Chcesz przetestować oś Ca–P–PTH, kalkulator CCCR, tężyczkę i HBS?</h3>
            <p>
              W <strong>Lekcji 2 („Wapń, fosfor, PTH i pułapki”)</strong> czeka na Ciebie
              <strong>Pracownia Przytarczycowa</strong>. Możesz w niej
              badać sprzężenie Ca–PTH–CaSR, różnicować PHPT vs FHH za pomocą wskaźnika CCCR,
              omówić pomiar wapnia i mechanizm zespołu głodnych kości.
            </p>
            <div className="teaser-actions">
              <button
                type="button"
                className="primary"
                onClick={() => go('lesson/przytarczyce-diagnostyka')}
              >
                Przejdź do Lekcji 2 z konsolą <ArrowRight size={15} />
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => go('simulator')}
              >
                Otwórz symulatory
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pełna Konsola Przytarczycowa w Lekcji 2 Przytarczyc
  if (lessonId === 'przytarczyce-diagnostyka') {
    return (
      <div style={{ margin: '36px 0' }}>
        <ParathyroidSimulator embedded />
      </div>
    );
  }

  // Zwiastun konsoli diabetologicznej w Lekcji 1 Cukrzycy
  if (lessonId === 'cukrzyca-fizjologia') {
    return (
      <div className="simulator-teaser-card" style={{ background: '#eef8f5', borderColor: '#c2e7db' }}>
        <div className="teaser-content">
          <div className="teaser-icon" style={{ background: '#dcf3eb', color: '#0d7a57' }}>
            <Activity size={26} />
          </div>
          <div>
            <span className="eyebrow" style={{ color: '#0d7a57' }}>INTERAKTYWNA KONSOLA KLINICZNA</span>
            <h3>Sprawdź warunki obliczania HOMA oraz kryteria DKA/HHS</h3>
            <p>
              W <strong>Lekcji 2 („Rozpoznaj i sklasyfikuj”)</strong>, <strong>Lekcji 8 (DKA)</strong> oraz{' '}
              <strong>Lekcji 13 (Nowoczesne technologie)</strong> czeka na Ciebie
              <strong>Pracownia Diabetologiczna</strong> z HOMA, ograniczeniami CGM i ćwiczeniem na pomiarach w DKA/HHS.
            </p>
            <div className="teaser-actions">
              <button
                type="button"
                className="primary"
                onClick={() => go('lesson/cukrzyca-diagnostyka')}
              >
                Przejdź do Lekcji 2 z konsolą <ArrowRight size={15} />
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => go('simulator')}
              >
                Otwórz symulatory
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pełna Konsola Diabetologiczna osadzona w kluczowych lekcjach cukrzycy
  if (lessonId === 'cukrzyca-diagnostyka' || lessonId === 'cukrzyca-dka' || lessonId === 'cukrzyca-technologie-cgm') {
    return (
      <div style={{ margin: '36px 0' }}>
        <DiabetesSimulator embedded />
      </div>
    );
  }

  // Interaktywne widgety matematyczne i chemiczne
  if (lessonId === 'tarczyca-matematyka-sprzezenie') {
    return (
      <div style={{ margin: '36px 0' }}>
        <SpinaThyroidCalculator />
      </div>
    );
  }

  if (lessonId === 'tarczyca-chemia-synteza') {
    return (
      <div style={{ margin: '36px 0' }}>
        <TpoMolecularMechanism />
      </div>
    );
  }

  if (lessonId === 'przysadka-matematyka-pulsacja') {
    return (
      <div style={{ margin: '36px 0' }}>
        <PituitaryPulseDynamics />
      </div>
    );
  }

  if (lessonId === 'przysadka-matematyka-osmolalnosc') {
    return (
      <div style={{ margin: '36px 0' }}>
        <EdelmanWaterBalanceCalculator />
      </div>
    );
  }

  if (lessonId === 'nadnercza-matematyka-kinetyka-enzymow') {
    return (
      <div style={{ margin: '36px 0' }}>
        <AdrenalEnzymeKinetics />
      </div>
    );
  }

  if (lessonId === 'nadnercza-chemia-steroidogeneza') {
    return (
      <div style={{ margin: '36px 0' }}>
        <SteroidogenesisP450Visualizer />
      </div>
    );
  }

  if (lessonId === 'przytarczyce-matematyka-casr-sigmoida') {
    return (
      <div style={{ margin: '36px 0' }}>
        <CasrSigmoidalCurve />
      </div>
    );
  }

  if (lessonId === 'przytarczyce-matematyka-kinetyka-mineralizacji') {
    return (
      <div style={{ margin: '36px 0' }}>
        <BoneMineralizationKinetics />
      </div>
    );
  }

  if (lessonId === 'cukrzyca-matematyka-modele') {
    return (
      <div style={{ margin: '36px 0' }}>
        <BergmanMinimalModelCalculator />
      </div>
    );
  }

  if (lessonId === 'cukrzyca-chemia-biochemia') {
    return (
      <div style={{ margin: '36px 0' }}>
        <InsulinReceptorAndKetogenesisVisualizer />
      </div>
    );
  }

  // Moduł 06: Gonady i medycyna rozrodu
  if (lessonId === 'gonady-fizjologia-hpg') {
    return (
      <div className="simulator-teaser-card">
        <div className="teaser-content">
          <div className="teaser-icon">
            <Activity size={26} />
          </div>
          <div>
            <span className="eyebrow">INTERAKTYWNA KONSOLA KLINICZNA</span>
            <h3>Chcesz sprawdzić sprzężenia osi HPG i równanie Vermeulena?</h3>
            <p>
              W <strong>Lekcji 2 („Diagnostyka laboratoryjna i frakcje testosteronu”)</strong> oraz w zakładce symulatorów czeka pełna
              <strong> Konsola Kliniczna Gonad</strong>. Pozwala badać wiązanie hormonów, porównać GAHT z gonadami i bez nich oraz odróżnić ryzyko OHSS od jego ciężkości.
            </p>
            <div className="teaser-actions">
              <button
                type="button"
                className="primary"
                onClick={() => go('lesson/gonady-diagnostyka-laboratoryjna')}
              >
                Przejdź do Lekcji 2 z konsolą <ArrowRight size={15} />
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => go('simulator')}
              >
                Otwórz pełną konsolę
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (
    lessonId === 'gonady-diagnostyka-laboratoryjna' ||
    lessonId === 'gonady-hipogonadyzm-meski' ||
    lessonId === 'gonady-terapia-testosteronem' ||
    lessonId === 'gonady-ivf-art' ||
    lessonId === 'gonady-trans-feminizujaca'
  ) {
    return (
      <div style={{ margin: '36px 0' }}>
        <GonadSimulator embedded />
      </div>
    );
  }

  if (lessonId === 'gonady-matematyka-modele') {
    return (
      <div style={{ margin: '36px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <VermeulenFreeTestosteroneCalculator />
        <GnrhPulseAndHpgOscillator />
      </div>
    );
  }

  if (lessonId === 'nen-biologia-markery') {
    return (
      <div className="simulator-teaser-card">
        <div className="teaser-content">
          <div className="teaser-icon"><Activity size={26} /></div>
          <div>
            <span className="eyebrow">KONSOLA ONKOLOGICZNA NEN & MEN</span>
            <h3>Chcesz sprawdzić staging WHO i dozymetrię PRRT w akcji?</h3>
            <p>
              W <strong>Lekcji 2 („Obrazowanie receptorowe”)</strong> czeka interaktywna
              <strong> Konsola Nowotworów Neuroendokrynnych</strong>: grading WHO 2022/2024, skala Krenninga,
              drzewo decyzyjne RET i dozymetria nerkowa PRRT.
            </p>
            <div className="teaser-actions">
              <button type="button" className="primary" onClick={() => go('lesson/nen-obrazowanie-sstr')}>
                Przejdź do Lekcji 2 z konsolą <ArrowRight size={15} />
              </button>
              <button type="button" className="secondary" onClick={() => go('simulator')}>
                Otwórz pełną konsolę
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (
    lessonId === 'nen-obrazowanie-sstr' ||
    lessonId === 'nen-klasyfikacja-who' ||
    lessonId === 'nen-zespol-men2' ||
    lessonId === 'nen-prrt-celowane-captem'
  ) {
    return (
      <div style={{ margin: '36px 0' }}>
        <NenSimulator embedded />
      </div>
    );
  }

  if (lessonId === 'nen-matematyka-modele') {
    return (
      <div style={{ margin: '36px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <PrrtDosimetryCalculator />
        <Ki67TumorKineticsModel />
      </div>
    );
  }

  if (lessonId === 'nen-chemia-biochemia') {
    return (
      <div style={{ margin: '36px 0' }}>
        <SerotoninShuntAndSstrVisualizer />
      </div>
    );
  }

  const otyloscSim = LessonSimulatorsOtylosc({ lessonId, go });
  if (otyloscSim) return otyloscSim;

  return null;
}
