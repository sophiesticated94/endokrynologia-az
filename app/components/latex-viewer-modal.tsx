'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  X,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  Code2,
} from 'lucide-react';
import { Latex } from './latex-renderer';
import { ENDO_FORMULA_PRESETS, QUICK_SYMBOLS } from './latex-presets';

export function LatexViewerModal({
  isOpen,
  onClose,
  initialEquation,
  initialTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialEquation?: string;
  initialTitle?: string;
}) {
  const [equation, setEquation] = useState<string>(
    initialEquation || 'PTH([Ca^{2+}]) = PTH_{min} + \\frac{PTH_{max} - PTH_{min}}{1 + \\left(\\frac{[Ca^{2+}]}{EC_{50}}\\right)^{n_H}}'
  );
  const [zoom, setZoom] = useState<number>(120);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<'all' | 'tarczyca' | 'przysadka' | 'nadnercza' | 'przytarczyce'>('all');

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredPresets = useMemo(() => {
    if (selectedModule === 'all') return ENDO_FORMULA_PRESETS;
    return ENDO_FORMULA_PRESETS.filter(p => p.module === selectedModule);
  }, [selectedModule]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(equation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const insertSymbol = (tex: string) => {
    setEquation(prev => `${prev} ${tex}`.trim());
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1050px',
          maxHeight: '92vh',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Pasek nagłówka */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#0284c7',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Code2 size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '17px', color: '#0f172a', fontWeight: 700 }}>
                Przeglądarka i Edytor Wzorów LaTeX (KaTeX)
              </h3>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {initialTitle ? `Wybrany wzór: ${initialTitle}` : 'Podgląd w czasie rzeczywistym z typografią publikacyjną'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Przyciski Zoom */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '2px' }}>
              <button
                type="button"
                onClick={() => setZoom(z => Math.max(80, z - 15))}
                style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', background: 'none', cursor: 'pointer', color: '#475569' }}
                title="Pomniejsz"
              >
                <ZoomOut size={16} />
              </button>
              <span style={{ fontSize: '11px', fontWeight: 600, padding: '0 6px', color: '#334155' }}>
                {zoom}%
              </span>
              <button
                type="button"
                onClick={() => setZoom(z => Math.min(180, z + 15))}
                style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', background: 'none', cursor: 'pointer', color: '#475569' }}
                title="Powiększ"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                color: '#64748b',
              }}
              title="Zamknij (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Treść modalu */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(320px, 0.9fr)', flex: 1, overflow: 'hidden' }}>
          {/* Lewa kolumna: Główny podgląd i edytor */}
          <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px', borderRight: '1px solid #e2e8f0' }}>
            {/* Wyrenderowany wzór KaTeX */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Wyrenderowana typografia (KaTeX):
                </span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  Skala: {zoom}%
                </span>
              </div>
              <div
                style={{
                  minHeight: '140px',
                  background: '#f8fafc',
                  border: '2px solid #bae6fd',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflowX: 'auto',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{ fontSize: `${zoom}%`, transition: 'font-size 0.15s ease' }}>
                  <Latex math={equation} displayMode />
                </div>
              </div>
            </div>

            {/* Pasek szybkich symboli */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Szybkie wstawianie symboli i operatorów:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {QUICK_SYMBOLS.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertSymbol(s.tex)}
                    style={{
                      padding: '3px 8px',
                      fontSize: '11px',
                      borderRadius: '5px',
                      background: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}
                    title={s.tex}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pole edycji kodu źródłowego TeX */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#334155', textTransform: 'uppercase' }}>
                  Kod źródłowy LaTeX (możesz edytować):
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 9px',
                    borderRadius: '5px',
                    background: copied ? '#dcfce7' : '#f1f5f9',
                    color: copied ? '#15803d' : '#334155',
                    border: '1px solid #cbd5e1',
                    cursor: 'pointer',
                  }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? 'Skopiowano!' : 'Kopiuj kod TeX'}
                </button>
              </div>
              <textarea
                value={equation}
                onChange={e => setEquation(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  fontSize: '13px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#0f172a',
                  lineHeight: '1.5',
                  resize: 'vertical',
                }}
                placeholder="Wpisz wzór w notacji LaTeX, np. \frac{a}{b}..."
              />
            </div>
          </div>

          {/* Prawa kolumna: Biblioteka gotowych wzorów kursu */}
          <div style={{ background: '#f8fafc', padding: '18px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase' }}>
                Baza wzorów endokrynologicznych
              </span>
              <span style={{ fontSize: '11px', background: '#e2e8f0', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                {filteredPresets.length} wzorów
              </span>
            </div>

            {/* Filtr modułu */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {(['all', 'tarczyca', 'przysadka', 'nadnercza', 'przytarczyce'] as const).map(mod => (
                <button
                  key={mod}
                  type="button"
                  onClick={() => setSelectedModule(mod)}
                  style={{
                    padding: '3px 8px',
                    fontSize: '11px',
                    borderRadius: '5px',
                    border: '1px solid',
                    borderColor: selectedModule === mod ? '#0284c7' : '#cbd5e1',
                    background: selectedModule === mod ? '#e0f2fe' : '#ffffff',
                    color: selectedModule === mod ? '#0369a1' : '#64748b',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {mod === 'all' ? 'Wszystkie' : mod.charAt(0).toUpperCase() + mod.slice(1)}
                </button>
              ))}
            </div>

            {/* Lista kart wzorów */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
              {filteredPresets.map(preset => (
                <div
                  key={preset.id}
                  style={{
                    background: '#ffffff',
                    border: equation === preset.tex ? '2px solid #0284c7' : '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onClick={() => setEquation(preset.tex)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '12px', color: '#0f172a' }}>{preset.title}</strong>
                    <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'capitalize' }}>
                      {preset.module}
                    </span>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '6px 8px', borderRadius: '6px', margin: '4px 0', overflowX: 'hidden' }}>
                    <Latex math={preset.tex} displayMode={false} />
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.35' }}>
                    {preset.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
