'use client';
import { FlaskConical, BrainCircuit, ArrowRight, CheckCircle, Sparkles, BookOpen, Activity } from 'lucide-react';
import type { CourseId } from '@/lib/course-types';
import type { Route } from './types';
import { COURSES } from '@/lib/courses-registry';

interface Props {
  activeCourse: CourseId;
  onSelectCourse: (id: CourseId) => void;
  go: (route: Route) => void;
}

export function CatalogView({ activeCourse, onSelectCourse, go }: Props) {
  const endo = COURSES.endocrinology;
  const psych = COURSES.psychiatry;

  function choose(id: CourseId) {
    onSelectCourse(id);
    go('home');
  }

  return (
    <div className="panel" style={{ padding: '28px' }}>
      <div style={{ maxWidth: '840px', marginBottom: '28px' }}>
        <span className="eyebrow">PORTAL DZIEDZIN MEDYCZNYCH</span>
        <h1 style={{ margin: '6px 0 10px 0', fontSize: '1.8rem' }}>Katalog Kursów Medycznych A–Z</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.5 }}>
          Ucz się medycyny w oparciu o fizjologię, matematyczne modele sprzężeń zwrotnych, międzynarodowe wytyczne EBM oraz interaktywne symulatory kliniczne.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Karta Endokrynologii */}
        <div
          style={{
            border: `2px solid ${activeCourse === 'endocrinology' ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: '14px',
            padding: '24px',
            background: 'var(--surface)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: activeCourse === 'endocrinology' ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'var(--accent-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                }}
              >
                <FlaskConical size={24} />
              </div>
              <span className="badge" style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                {endo.badge}
              </span>
            </div>

            <h2 style={{ margin: '0 0 8px 0', fontSize: '1.3rem' }}>{endo.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '16px' }}>
              {endo.description}
            </p>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px', marginBottom: '16px', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={15} /> 8 Modułów i Symulatory Narządowe:
              </div>
              <div style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Tarczyca (HPT) · Przysadka · Nadnercza (WPN/Cushing) · Przytarczyce (CaSR) · Cukrzyca i pompy CGM · Gonady &amp; GAHT · NEN / MEN · Otyłość i lipidy
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
              <strong>Standardy referencyjne:</strong> {endo.standardsBadge}
            </div>
          </div>

          <button
            className={activeCourse === 'endocrinology' ? 'primary' : 'secondary'}
            onClick={() => choose('endocrinology')}
            style={{ width: '100%', padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
          >
            <span>{activeCourse === 'endocrinology' ? 'Kontynuuj naukę (aktywny)' : 'Wybierz ten kurs'}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Karta Psychiatrii */}
        <div
          style={{
            border: `2px solid ${activeCourse === 'psychiatry' ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: '14px',
            padding: '24px',
            background: 'var(--surface)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: activeCourse === 'psychiatry' ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'var(--accent-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                }}
              >
                <BrainCircuit size={24} />
              </div>
              <span className="badge" style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                {psych.badge}
              </span>
            </div>

            <h2 style={{ margin: '0 0 8px 0', fontSize: '1.3rem' }}>{psych.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '16px' }}>
              {psych.description}
            </p>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px', marginBottom: '16px', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={15} /> Moduły Pilotażowe &amp; Command Center:
              </div>
              <div style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                1. Zaburzenia afektywne i neurobiologia nastroju (MDD, ChAD, BDNF, HPA, modele)<br />
                2. Psychofarmakologia kliniczna i receptorologia (SSRI, LPP, lit, TDM, Hunter, NMS)<br />
                Pracownia: <strong>Psychiatric Digital Twin</strong> (Wirtualny pacjent, PET sandbox, QTc)
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
              <strong>Standardy referencyjne:</strong> {psych.standardsBadge}
            </div>
          </div>

          <button
            className={activeCourse === 'psychiatry' ? 'primary' : 'secondary'}
            onClick={() => choose('psychiatry')}
            style={{ width: '100%', padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
          >
            <span>{activeCourse === 'psychiatry' ? 'Kontynuuj naukę (aktywny)' : 'Wybierz ten kurs'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Planowane dziedziny */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={16} /> Planowane kolejne dziedziny w akademii medycznej
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span className="badge" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
            Kardiologia i hemodynamika (w opracowaniu)
          </span>
          <span className="badge" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
            Neurologia kliniczna i neurofizjologia (w opracowaniu)
          </span>
          <span className="badge" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
            Nefrologia i równowaga kwasowo-zasadowa (w opracowaniu)
          </span>
        </div>
      </div>
    </div>
  );
}
