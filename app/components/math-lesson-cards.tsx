'use client';
import { useState } from 'react';
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  User,
  Stethoscope,
  ArrowRight,
  Lightbulb,
  Code2,
} from 'lucide-react';
import type { MathDerivation, WorkedExample } from '@/lib/course-types';
import { Latex, FormattedMathText } from './latex-renderer';
import { LatexViewerModal } from './latex-viewer-modal';

export function MathDerivationCard({ derivation }: { derivation?: MathDerivation }) {
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeEquation, setActiveEquation] = useState<string>('');
  const [activeTitle, setActiveTitle] = useState<string>('');

  if (!derivation) return null;

  const handleOpenViewer = (eq: string, stepTitle: string) => {
    setActiveEquation(eq);
    setActiveTitle(`${derivation.title} — ${stepTitle}`);
    setModalOpen(true);
  };

  return (
    <>
      <div
        style={{
          margin: '28px 0',
          borderRadius: '12px',
          border: '1px solid #c8d9e6',
          background: '#f4f8fb',
          overflow: 'hidden',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(!open)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 18px',
            background: '#e9f1f7',
            border: 'none',
            borderBottom: open ? '1px solid #d3e2ed' : 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#255b85',
                color: '#fff',
              }}
            >
              <GraduationCap size={18} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: '#255b85',
                  textTransform: 'uppercase',
                }}
              >
                Wyprowadzenie formalne i przekształcenia
              </div>
              <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#132838', fontWeight: 600 }}>
                {derivation.title}
              </h4>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#486581' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                background: '#dbe7f0',
                padding: '3px 8px',
                borderRadius: '6px',
              }}
            >
              {derivation.model}
            </span>
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </button>

        {open && (
          <div style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {derivation.steps.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #d9e6ee',
                    borderRadius: '8px',
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: '#255b85',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: '14px', color: '#102a43' }}>
                      {s.step}
                    </span>
                  </div>

                  {/* Wyrenderowana typografia KaTeX wzoru */}
                  <div
                    style={{
                      background: '#f8fafc',
                      borderRadius: '8px',
                      margin: '8px 0',
                      border: '1px solid #e2e8f0',
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    <div style={{ width: '100%', overflowX: 'auto', textAlign: 'center', padding: '4px 0' }}>
                      <Latex math={s.equation} displayMode />
                    </div>

                    <div style={{ alignSelf: 'flex-end', marginTop: '4px' }}>
                      <button
                        type="button"
                        onClick={() => handleOpenViewer(s.equation, s.step)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#0369a1',
                          background: '#e0f2fe',
                          border: '1px solid #bae6fd',
                          borderRadius: '5px',
                          padding: '3px 9px',
                          cursor: 'pointer',
                        }}
                        title="Otwórz wzór w pełnej przeglądarce LaTeX ze skalowaniem i edycją"
                      >
                        <Code2 size={13} />
                        Powiększ / Zbadaj w LaTeX
                      </button>
                    </div>
                  </div>

                  <div style={{ margin: '6px 0 0', fontSize: '13px', color: '#486581', lineHeight: '1.5' }}>
                    <FormattedMathText text={s.explanation} />
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                background: '#e6f4ea',
                border: '1px solid #b7dfc4',
                borderRadius: '8px',
                padding: '12px 14px',
                fontSize: '13px',
                color: '#135429',
                lineHeight: '1.45',
              }}
            >
              <Lightbulb size={18} style={{ flexShrink: 0, marginTop: '2px', color: '#137333' }} />
              <div>
                <strong>Znaczenie dla modelu: </strong>
                <FormattedMathText text={derivation.clinicalTakeaway} />
              </div>
            </div>
          </div>
        )}
      </div>

      {modalOpen && (
        <LatexViewerModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialEquation={activeEquation}
          initialTitle={activeTitle}
        />
      )}
    </>
  );
}

export function WorkedExampleCard({ example }: { example?: WorkedExample }) {
  if (!example) return null;

  return (
    <div
      style={{
        margin: '28px 0',
        borderRadius: '12px',
        border: '1px solid #fed7aa',
        background: '#fffbf5',
        overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px',
          background: '#ffedd5',
          borderBottom: '1px solid #fed7aa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#c2410c',
              color: '#fff',
            }}
          >
            <Calculator size={18} />
          </div>
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: '#c2410c',
                textTransform: 'uppercase',
              }}
            >
              Kliniczny przykład obliczeniowy z pacjentem
            </div>
            <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#431407', fontWeight: 600 }}>
              {example.title}
            </h4>
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 20px' }}>
        {/* Karta pacjenta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            background: '#ffffff',
            border: '1px solid #fed7aa',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px',
          }}
        >
          <User size={18} style={{ color: '#c2410c', marginTop: '2px', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#9a3412', textTransform: 'uppercase' }}>
              Dane kliniczne pacjenta
            </div>
            <p style={{ margin: '4px 0 8px', fontSize: '14px', color: '#431407', fontWeight: 500 }}>
              {example.patient}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {example.inputs.map((inp, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '12px',
                    background: '#fef3c7',
                    border: '1px solid #fde68a',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    color: '#78350f',
                    fontWeight: 600,
                  }}
                >
                  {inp.label}: <strong>{inp.value} {inp.unit}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Obliczenia krok po kroku */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#7c2d12', marginBottom: '8px' }}>
            OBLICZENIA NUMERYCZNE KROK PO KROKU:
          </div>
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {example.calculationSteps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#1f2937' }}>
                <ArrowRight size={15} style={{ color: '#ea580c', flexShrink: 0, marginTop: '3px' }} />
                <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
                  <FormattedMathText text={step} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wynik i decyzja kliniczna */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px',
          }}
        >
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              padding: '12px 14px',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase' }}>
              Wynik obliczeń
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#166534', marginTop: '4px', lineHeight: '1.4' }}>
              <FormattedMathText text={example.result} />
            </div>
          </div>

          <div
            style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
              padding: '12px 14px',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Stethoscope size={13} />
              Wniosek i decyzja lekarza
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e40af', marginTop: '4px', lineHeight: '1.4' }}>
              <FormattedMathText text={example.clinicalAction} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
