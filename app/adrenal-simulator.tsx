'use client';
import { useState, useId } from 'react';
import {
  Activity,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  X,
  Info,
  Layers,
  HeartPulse,
  Scan,
  ShieldAlert,
  Flame,
} from 'lucide-react';
import {
  calculateAdrenalState,
  defaultAdrenalState,
  adrenalPresets,
  adrenalSimulatorLegend,
  type AdrenalState,
  type AdrenalSimulationMode,
} from '@/lib/adrenal-simulator';

export function AdrenalSimulator({ compact = false, embedded = false }: { compact?: boolean; embedded?: boolean }) {
  const [state, setState] = useState<AdrenalState>(defaultAdrenalState);
  const [showLegend, setShowLegend] = useState(false);
  const titleId = useId();

  const output = calculateAdrenalState(state);

  const resetToDefault = () => setState(defaultAdrenalState);

  const applyPreset = (presetId: string) => {
    const found = adrenalPresets.find(p => p.id === presetId);
    if (found) {
      setState(found.state);
    }
  };

  return (
    <div
      className={`simulator-card ${compact ? 'compact' : ''}`}
      style={{
        border: '1px solid #c7dcd0',
        borderRadius: '16px',
        padding: compact ? '20px' : '28px',
        background: '#ffffff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        marginTop: '24px',
        marginBottom: '32px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid #e5eee8',
          paddingBottom: '16px',
          marginBottom: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                background: '#e0f2fe',
                color: '#0369a1',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <ShieldAlert size={14} /> KONSOLA NADNERCZOWA
            </span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Wersja 3.0 · Kora, Rdzeń i TK</span>
          </div>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>
            Interaktywny Symulator Kory i Rdzenia Nadnerczy
          </h2>
          <p style={{ margin: '4px 0 0', color: '#475569', fontSize: '13px' }}>
            Modeluj szlaki sterydogenezy (WPN), układ RAA (Conn / AVS), hemodynamikę Pheo oraz washout TK.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            className="secondary"
            onClick={() => setShowLegend(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '13px' }}
          >
            <Info size={15} /> Legenda i zasady
          </button>
          <button
            type="button"
            className="secondary"
            onClick={resetToDefault}
            title="Resetuj do stanu fizjologicznego"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '13px' }}
          >
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '16px',
          borderBottom: '1px solid #f1f5f9',
        }}
      >
        {[
          { id: 'steroidogenesis', label: '1. Oś HPA i Steroidogeneza', icon: Layers },
          { id: 'aldosterone_raa', label: '2. Układ RAA i Zespół Conna', icon: Activity },
          { id: 'pheochromocytoma', label: '3. Pheochromocytoma i Hemodynamika', icon: HeartPulse },
          { id: 'incidentaloma_ct', label: '4. Kalkulator TK Incydentaloma', icon: Scan },
          { id: 'crisis_resuscitation', label: '5. Resuscytacja w Przełomie', icon: Flame },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = state.mode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setState(prev => ({ ...prev, mode: tab.id as AdrenalSimulationMode }))}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                background: isActive ? '#0f766e' : '#f8fafc',
                color: isActive ? '#ffffff' : '#334155',
                border: `1px solid ${isActive ? '#0f766e' : '#e2e8f0'}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Presets Bar */}
      <div style={{ marginBottom: '20px', background: '#f8fafc', padding: '12px 16px', borderRadius: '10px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
          SZYBKIE SCENARIUSZE KLINICZNE:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {adrenalPresets.map(preset => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id)}
              style={{
                fontSize: '12px',
                padding: '5px 11px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#1e293b',
                cursor: 'pointer',
              }}
              title={preset.description}
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Warning Box (np. błąd beta-blokera) */}
      {output.hemodynamicWarning && (
        <div
          style={{
            background: '#fee2e2',
            border: '2px solid #ef4444',
            borderRadius: '10px',
            padding: '14px 18px',
            marginBottom: '20px',
            color: '#991b1b',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <AlertTriangle size={28} style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ fontSize: '14px', display: 'block' }}>OSTRZEŻENIE HEMODYNAMICZNE:</strong>
            <span style={{ fontSize: '13px' }}>{output.hemodynamicWarning}</span>
          </div>
        </div>
      )}

      {/* Main Grid: Controls Left, Live Hormones & Hemodynamics Right */}
      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1.1fr 0.9fr', gap: '24px' }}>
        {/* Controls Column */}
        <div>
          {state.mode === 'steroidogenesis' && (
            <div>
              <h3 style={{ fontSize: '15px', color: '#1e293b', marginBottom: '14px' }}>
                Sterowanie integralnością kory i enzymami
              </h3>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Integralność miąższu kory nadnerczy:</span>
                  <strong>{state.primaryCortexIntegrity}%</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={state.primaryCortexIntegrity}
                  onChange={e => setState({ ...state, primaryCortexIntegrity: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <small style={{ color: '#64748b', fontSize: '11px' }}>
                  &lt;10% = destrukcja kory w chorobie Addisona.
                </small>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Aktywność 21-hydroksylazy (CYP21A2):</span>
                  <strong style={{ color: state.cyp21Activity < 50 ? '#dc2626' : 'inherit' }}>
                    {state.cyp21Activity}%
                  </strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={state.cyp21Activity}
                  onChange={e => setState({ ...state, cyp21Activity: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <small style={{ color: '#64748b', fontSize: '11px' }}>
                  Spadek &lt;20% wywołuje ucieczkę substratów w 17-OHP i androgeny (WPN).
                </small>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Stężenie ACTH w osoczu:</span>
                  <strong>{state.acthLevel} pg/ml</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="500"
                  value={state.acthLevel}
                  onChange={e => setState({ ...state, acthLevel: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <small style={{ color: '#64748b', fontSize: '11px' }}>
                  Norma rano: 10–60 pg/ml. Wysokie w chorobie Addisona (&gt;200) i WPN.
                </small>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Substytucja Hydrokortyzonem:</span>
                  <strong>{state.hydrocortisoneDoseMg} mg / dobę</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={state.hydrocortisoneDoseMg}
                  onChange={e => setState({ ...state, hydrocortisoneDoseMg: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Substytucja Fludrokortyzonem:</span>
                  <strong>{state.fludrocortisoneDoseMg} mg / dobę</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.3"
                  step="0.05"
                  value={state.fludrocortisoneDoseMg}
                  onChange={e => setState({ ...state, fludrocortisoneDoseMg: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          )}

          {state.mode === 'aldosterone_raa' && (
            <div>
              <h3 style={{ fontSize: '15px', color: '#1e293b', marginBottom: '14px' }}>
                Układ RAA, diagnostyka Conna i AVS
              </h3>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Postać kliniczna hiperaldosteronizmu:
                </label>
                <select
                  value={state.aldosteroneAdenomaLateralization}
                  onChange={e =>
                    setState({
                      ...state,
                      aldosteroneAdenomaLateralization: e.target.value as AdrenalState['aldosteroneAdenomaLateralization'],
                    })
                  }
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="none">Brak (Zdrowy układ RAA)</option>
                  <option value="left">Gruczolak lewego nadnercza (APA / Conn jednostronny)</option>
                  <option value="right">Gruczolak prawego nadnercza (APA / Conn jednostronny)</option>
                  <option value="bilateral_hyperplasia">Obustronny przerost kory nadnerczy (BAH)</option>
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Test dożylnego obciążenia 0,9% NaCl:</span>
                  <strong>{state.salineInfusionMl} ml / 4h</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="500"
                  value={state.salineInfusionMl}
                  onChange={e => setState({ ...state, salineInfusionMl: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <small style={{ color: '#64748b', fontSize: '11px' }}>
                  Fizjologicznie 2000 ml soli tłumi aldosteron &lt;5 ng/dl. W PA brak supresji!
                </small>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Terapia Spironolaktonem:</span>
                  <strong>{state.spironolactoneMg} mg / dobę</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="150"
                  step="25"
                  value={state.spironolactoneMg}
                  onChange={e => setState({ ...state, spironolactoneMg: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <small style={{ color: '#64748b', fontSize: '11px' }}>
                  Antagonista receptora MR: odblokowuje reninę, normalizuje potas i ciśnienie w BAH.
                </small>
              </div>
            </div>
          )}

          {state.mode === 'pheochromocytoma' && (
            <div>
              <h3 style={{ fontSize: '15px', color: '#1e293b', marginBottom: '14px' }}>
                Hemodynamika rdzenia i sekwencja blokady
              </h3>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Wyrzut katecholamin przez guz (krotność normy):</span>
                  <strong style={{ color: state.pheoMetanephrinesMultiplier > 2 ? '#dc2626' : 'inherit' }}>
                    {state.pheoMetanephrinesMultiplier}x
                  </strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={state.pheoMetanephrinesMultiplier}
                  onChange={e => setState({ ...state, pheoMetanephrinesMultiplier: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Blokada alfa-adrenergiczna (Doksazosyna):</span>
                  <strong style={{ color: '#059669' }}>{state.alphaBlockerDoxazosinMg} mg</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="16"
                  step="2"
                  value={state.alphaBlockerDoxazosinMg}
                  onChange={e => setState({ ...state, alphaBlockerDoxazosinMg: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <small style={{ color: '#64748b', fontSize: '11px' }}>
                  Musi być wdrożona na 10–14 dni PRZED ewentualnym beta-blokerem!
                </small>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Beta-adrenolityk (Propranolol):</span>
                  <strong style={{ color: state.alphaBlockerDoxazosinMg === 0 && state.betaBlockerPropranololMg > 0 ? '#dc2626' : 'inherit' }}>
                    {state.betaBlockerPropranololMg} mg
                  </strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="10"
                  value={state.betaBlockerPropranololMg}
                  onChange={e => setState({ ...state, betaBlockerPropranololMg: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <small style={{ color: '#64748b', fontSize: '11px' }}>
                  Uwaga: Podanie bez uprzedniej blokady alfa wywoła krytyczny przełom nadciśnieniowy!
                </small>
              </div>
            </div>
          )}

          {state.mode === 'incidentaloma_ct' && (
            <div>
              <h3 style={{ fontSize: '15px', color: '#1e293b', marginBottom: '14px' }}>
                Kalkulator TK Washoutu i kryteria ESE 2023
              </h3>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Średnica zmiany w TK:</span>
                  <strong>{state.tumorDiameterMm} mm</strong>
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={state.tumorDiameterMm}
                  onChange={e => setState({ ...state, tumorDiameterMm: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Faza natywna (N, bez kontrastu):</span>
                  <strong style={{ color: state.ctNativeHu <= 10 ? '#059669' : '#dc2626' }}>
                    {state.ctNativeHu} HU
                  </strong>
                </label>
                <input
                  type="range"
                  min="-10"
                  max="60"
                  value={state.ctNativeHu}
                  onChange={e => setState({ ...state, ctNativeHu: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <small style={{ color: '#64748b', fontSize: '11px' }}>
                  &lt;=10 HU = pewny łagodny gruczolak bogaty w lipidy.
                </small>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Faza wrotna po 60–70 s (E):</span>
                  <strong>{state.ctVenousHu} HU</strong>
                </label>
                <input
                  type="range"
                  min="30"
                  max="160"
                  value={state.ctVenousHu}
                  onChange={e => setState({ ...state, ctVenousHu: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Faza opóźniona po 15 min (D):</span>
                  <strong>{state.ctDelayedHu} HU</strong>
                </label>
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={state.ctDelayedHu}
                  onChange={e => setState({ ...state, ctDelayedHu: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          )}

          {state.mode === 'crisis_resuscitation' && (
            <div>
              <h3 style={{ fontSize: '15px', color: '#1e293b', marginBottom: '14px' }}>
                Protokół ratunkowy ostrego przełomu nadnerczowego
              </h3>

              <div
                style={{
                  background: state.crisisBolusGiven ? '#ecfdf5' : '#fee2e2',
                  border: `1px solid ${state.crisisBolusGiven ? '#10b981' : '#ef4444'}`,
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: state.crisisBolusGiven ? '#065f46' : '#991b1b' }}>
                  KROK 1: BOLUS HYDROKORTYZONU 100 mg i.v. STAT
                </div>
                <button
                  type="button"
                  onClick={() => setState({ ...state, crisisBolusGiven: !state.crisisBolusGiven })}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: state.crisisBolusGiven ? '#059669' : '#dc2626',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {state.crisisBolusGiven ? '✔️ Bolus 100 mg podany' : 'Podaj natychmiast 100 mg i.v.'}
                </button>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span>Resuscytacja płynowa (0,9% NaCl):</span>
                  <strong>{state.salineResuscitationLiters} litry / 24h</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.5"
                  value={state.salineResuscitationLiters}
                  onChange={e => setState({ ...state, salineResuscitationLiters: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
                <small style={{ color: '#64748b', fontSize: '11px' }}>
                  1000 ml soli w 1. godzinie, łącznie 3–4 litry na dobę.
                </small>
              </div>
            </div>
          )}
        </div>

        {/* Results / Live Values Column */}
        <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>PARAMETRY BIOLOGICZNE:</span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '4px',
                background: output.alertType === 'danger' ? '#fee2e2' : output.alertType === 'warning' ? '#fef3c7' : '#dcfce7',
                color: output.alertType === 'danger' ? '#991b1b' : output.alertType === 'warning' ? '#92400e' : '#166534',
              }}
            >
              {output.status}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Kortyzol w surowicy</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: output.cortisol < 3 ? '#dc2626' : '#0f172a' }}>
                {output.cortisol} <small style={{ fontSize: '11px', fontWeight: 400 }}>µg/dl</small>
              </div>
              <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma: 10–20 µg/dl</small>
            </div>

            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Aldosteron / Renina (ARR)</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: output.arr > 30 ? '#dc2626' : '#0f172a' }}>
                {output.arr} <small style={{ fontSize: '11px', fontWeight: 400 }}>({output.aldosterone} ng/dl)</small>
              </div>
              <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma ARR &lt; 20–30</small>
            </div>

            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Sód / Potas (Na+ / K+)</div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: output.serumPotassium > 5.1 ? '#dc2626' : output.serumPotassium < 3.5 ? '#b45309' : '#0f172a' }}>
                {output.serumSodium} / {output.serumPotassium} <small style={{ fontSize: '10px' }}>mmol/l</small>
              </div>
              <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma: 135–145 / 3,5–5,1</small>
            </div>

            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Ciśnienie tętnicze / Tętno</div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: output.systolicBp > 160 ? '#dc2626' : output.systolicBp < 90 ? '#dc2626' : '#0f172a' }}>
                {output.systolicBp}/{output.diastolicBp} <small style={{ fontSize: '11px' }}>({output.heartRate}/min)</small>
              </div>
              <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma: 120/80 mmHg</small>
            </div>

            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>17-OH-Progesteron (17-OHP)</div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: output.ohp17 > 10 ? '#dc2626' : '#0f172a' }}>
                {output.ohp17} <small style={{ fontSize: '11px', fontWeight: 400 }}>ng/ml</small>
              </div>
              <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma: &lt;2 ng/ml (WPN &gt;10)</small>
            </div>

            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Normetanefryna w osoczu</div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: output.normetanephrine > 180 ? '#dc2626' : '#0f172a' }}>
                {output.normetanephrine} <small style={{ fontSize: '11px', fontWeight: 400 }}>pg/ml</small>
              </div>
              <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma: &lt;120 pg/ml</small>
            </div>
          </div>

          {/* Wyniki TK Washout (jeśli tryb incidentaloma) */}
          {state.mode === 'incidentaloma_ct' && (
            <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                WYNIK KALKULATORA WASHOUTU TK:
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span>Bezwzględny washout (APW):</span>
                <strong style={{ color: output.ctApwPercent >= 60 ? '#059669' : '#dc2626' }}>
                  {output.ctApwPercent}% (odcięcie &gt;=60%)
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span>Względny washout (RPW):</span>
                <strong style={{ color: output.ctRpwPercent >= 40 ? '#059669' : '#dc2626' }}>
                  {output.ctRpwPercent}% (odcięcie &gt;=40%)
                </strong>
              </div>
            </div>
          )}

          {/* Wyniki AVS (jeśli tryb Conn) */}
          {state.mode === 'aldosterone_raa' && (
            <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                WYNIK CEWNIKOWANIA ŻYŁ NADNERCZOWYCH (AVS):
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span>Gradient lateralizacji (strona dominująca):</span>
                <strong style={{ color: output.avsDominantGradient > 4 ? '#059669' : '#b45309' }}>
                  {output.avsDominantGradient} : 1 ({output.avsDominantGradient > 4 ? 'Lateralizacja obecna!' : 'Brak lateralizacji'})
                </strong>
              </div>
            </div>
          )}

          {/* Rekomendacje kliniczne */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
              ZALECENIA POSTĘPOWANIA KLINICZNEGO:
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#334155' }}>
              {output.clinicalRecommendations.map((rec, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal z Legendą */}
      {showLegend && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={20} color="#0f766e" />
                <h3 id={titleId} style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>
                  Legenda Konsoli Nadnerczowej i zasady bezpieczeństwa
                </h3>
              </div>
              <button
                type="button"
                className="text-button"
                onClick={() => setShowLegend(false)}
                style={{ padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>
              <h4 style={{ color: '#0f766e', margin: '14px 0 6px' }}>1. Tryby symulatora</h4>
              {adrenalSimulatorLegend.modes.map(mode => (
                <div key={mode.id} style={{ marginBottom: '8px' }}>
                  <strong>{mode.title}:</strong> {mode.description}
                </div>
              ))}

              <h4 style={{ color: '#b91c1c', margin: '18px 0 6px' }}>2. Żelazne reguły bezpieczeństwa w nadnerczach</h4>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                <li style={{ marginBottom: '6px' }}>
                  <strong>FEOPROTEKCJA (ALFA PRZED BETA):</strong> U chorego z guzem chromochłonnym podanie beta-blokera
                  przed pełną blokadą alfa wywołuje nieprzeciwstawiony skurcz naczyń i śmiertelny przełom nadciśnieniowy.
                </li>
                <li style={{ marginBottom: '6px' }}>
                  <strong>ATROFIA DRUGIEGO NADNERCZA:</strong> Wycięcie guza wydzielającego kortyzol (Cushing/MACS) bez
                  osłony hydrokortyzonem wywołuje ostry przełom nadnerczowy z powodu uśpienia drugiego gruczołu.
                </li>
                <li style={{ marginBottom: '6px' }}>
                  <strong>PRZEŁOM NADNERCZOWY STAT:</strong> Wstrząs u chorego z Addisonem wymaga natychmiastowego
                  bolusu 100 mg hydrokortyzonu i.v. i 0,9% NaCl bez czekania na wyniki badań laboratoryjnych!
                </li>
              </ul>
            </div>

            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <button type="button" className="primary" onClick={() => setShowLegend(false)}>
                Rozumiem, zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
