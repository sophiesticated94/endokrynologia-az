'use client';
import { Activity, ArrowRight, Pill, ShieldAlert, UserCheck } from 'lucide-react';
import type { Navigation } from './types';
import {
  PsychiatryReceptorLab,
  PsychiatryLithiumTdmLab,
  PsychiatryQtcLab,
} from '../components/psychiatry-receptor-lab';

export function LessonSimulatorsPsychiatry({ lessonId, go }: { lessonId: string; go: Navigation }) {
  // Leki przeciwpsychotyczne, atypowe, SSRI i mechanizmy receptorowe D2/SERT
  if (
    lessonId === 'neuroleptyki-generacje-profil' ||
    lessonId === 'psychoza-i-szlaki-dopaminy' ||
    lessonId === 'uklad-dopaminergiczny-d2-d3' ||
    lessonId === 'lekoopornosc-depresji-i-schizofrenii' ||
    lessonId === 'leki-przeciwpsychotyczne-receptory'
  ) {
    return (
      <div style={{ margin: '32px 0' }}>
        <PsychiatryReceptorLab />
      </div>
    );
  }

  // Lit, stabilizatory nastroju i TDM
  if (
    lessonId === 'stabilizatory-lit' ||
    lessonId === 'stabilizatory-nastroju-normotymiki' ||
    lessonId === 'tdm-monitorowanie-agnp' ||
    lessonId === 'tdm-zasady-agnp'
  ) {
    return (
      <div style={{ margin: '32px 0' }}>
        <PsychiatryLithiumTdmLab />
      </div>
    );
  }

  // QTc, CredibleMeds i bezpieczeństwo kardiologiczne
  if (
    lessonId === 'wydluzenie-qtc-torsade' ||
    lessonId === 'bezpieczenstwo-qtc-eps-prolaktyna' ||
    lessonId === 'dzialania-niepozadane-profilaktyka'
  ) {
    return (
      <div style={{ margin: '32px 0' }}>
        <PsychiatryQtcLab />
      </div>
    );
  }

  // Zwiastun Diagnostic Detective dla lekcji diagnostycznych Modułu 01
  if (
    lessonId === 'wywiad-psychiatryczny-mse' ||
    lessonId === 'klasyfikacje-dsm5-icd11' ||
    lessonId === 'depresja-fenotypy-i-kryteria' ||
    lessonId === 'mania-hipomania-spektrum' ||
    lessonId === 'mdd-kryteria-rozpoznanie' ||
    lessonId === 'chad-spektrum-i-ii'
  ) {
    return (
      <div className="simulator-teaser-card" style={{
        background: 'linear-gradient(135deg, #f0f7f3 0%, #e8f3ec 100%)',
        border: '1px solid #cce4d6',
        borderRadius: '10px',
        padding: '22px',
        margin: '28px 0',
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ background: '#187765', color: '#fff', padding: '10px', borderRadius: '8px' }}>
            <UserCheck size={24} />
          </div>
          <div>
            <span className="eyebrow" style={{ color: '#187765', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>
              DIAGNOSTIC DETECTIVE &amp; PATIENT TWIN
            </span>
            <h3 style={{ margin: '6px 0 8px', fontSize: '1.15rem', color: '#1c3540' }}>
              Sprawdź kryteria osiowe ICD-11 CDDR i DSM-5-TR na żywym profilu pacjenta
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#4a6256', lineHeight: 1.6, margin: '0 0 14px' }}>
              W pracowni diagnostycznej możesz testować czas trwania objawów, wykluczać maski somatyczne (TSH, elektrolity, neuroobrazowanie) oraz badać pułapki różnicowania ChAD z Borderline.
            </p>
            <button
              type="button"
              className="primary"
              onClick={() => go('simulator')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}
            >
              Uruchom pracownię diagnostyczną <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Zwiastun Safety & Emergency Workbench dla stanów nagłych
  if (
    lessonId === 'zespol-serotoninowy-hunter' ||
    lessonId === 'zlosliwy-zespol-neuroleptyczny' ||
    lessonId === 'zlosliwy-zespol-neuroleptyczny-nms' ||
    lessonId === 'antydepresanty-ssri-snri-tca-maoi'
  ) {
    return (
      <div className="simulator-teaser-card" style={{
        background: 'linear-gradient(135deg, #fcf4f2 0%, #faece8 100%)',
        border: '1px solid #f2cfc7',
        borderRadius: '10px',
        padding: '22px',
        margin: '28px 0',
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ background: '#c0392b', color: '#fff', padding: '10px', borderRadius: '8px' }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <span className="eyebrow" style={{ color: '#c0392b', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>
              SAFETY &amp; EMERGENCY WORKBENCH
            </span>
            <h3 style={{ margin: '6px 0 8px', fontSize: '1.15rem', color: '#1c3540' }}>
              Algorytm Huntera i detekcja przełomu toksyczności
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#5c4542', lineHeight: 1.6, margin: '0 0 14px' }}>
              W pracowni bezpieczeństwa możesz przetestować drzewo decyzyjne Huntera, zbadać klonus oczny i samoistny, a także różnicować zespół serotoninowy z NMS i złośliwą katatonią.
            </p>
            <button
              type="button"
              className="primary"
              onClick={() => go('simulator')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', background: '#c0392b', borderColor: '#c0392b' }}
            >
              Otwórz symulator stanów nagłych <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
