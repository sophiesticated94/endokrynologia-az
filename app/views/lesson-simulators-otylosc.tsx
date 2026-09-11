'use client';
import { Activity, ArrowRight } from 'lucide-react';
import type { Navigation } from './types.ts';
import { ObesitySimulator } from '../obesity-simulator.tsx';
import {
  HallEnergyBalanceAndBariatricPredictor,
  LipidRiskFriedewaldSampsonOptimizer,
  IncretinCascadeAndMasldFibrosisViewer,
} from '../components/math-chem-widgets-6.tsx';

export function LessonSimulatorsOtylosc({ lessonId, go }: { lessonId: string; go: Navigation }) {
  // Teaser in lesson 1
  if (lessonId === 'otylosc-definicja-patofizjologia') {
    return (
      <div className="simulator-teaser-card">
        <div className="teaser-content">
          <div className="teaser-icon">
            <Activity size={26} />
          </div>
          <div>
            <span className="eyebrow">KONSOLA METABOLICZNA MODUŁU 08</span>
            <h3>Chcesz sprawdzić model bilansu Halla i kwalifikację bariatryczną w akcji?</h3>
            <p>
              W <strong>Lekcji 2 („Rozpoznanie i fenotypowanie”)</strong> oraz kolejnych lekcjach
              farmakoterapii i chirurgii czeka pełna interaktywna <strong>Konsola Otyłości i Zaburzeń Lipidowych</strong>:
              nieliniowy model Halla, kalkulator Friedewald vs Sampson, algorytm IFSO 2023 i cele ESC/EAS.
            </p>
            <div className="teaser-actions">
              <button
                type="button"
                className="primary"
                onClick={() => go('lesson/otylosc-rozpoznanie-fenotypowanie')}
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

  // Embedded ObesitySimulator for core clinical and surgical lessons
  if (
    lessonId === 'otylosc-rozpoznanie-fenotypowanie' ||
    lessonId === 'otylosc-farmakoterapia-glp1-dual' ||
    lessonId === 'otylosc-kwalifikacja-bariatryczna' ||
    lessonId === 'otylosc-procedury-bariatryczne' ||
    lessonId === 'otylosc-dyslipidemia-aterogenna-statyny'
  ) {
    return (
      <div style={{ margin: '36px 0' }}>
        <ObesitySimulator embedded />
      </div>
    );
  }

  // Math & dynamic model lesson
  if (lessonId === 'otylosc-matematyka-modele') {
    return (
      <div style={{ margin: '36px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <HallEnergyBalanceAndBariatricPredictor />
        <LipidRiskFriedewaldSampsonOptimizer />
      </div>
    );
  }

  // Biochemistry and receptor cascades lesson
  if (lessonId === 'otylosc-chemia-biochemia') {
    return (
      <div style={{ margin: '36px 0' }}>
        <IncretinCascadeAndMasldFibrosisViewer />
      </div>
    );
  }

  return null;
}
