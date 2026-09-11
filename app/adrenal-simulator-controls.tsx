'use client';
import type { Dispatch, SetStateAction } from 'react';
import type { AdrenalState } from '@/lib/adrenal-simulator';

export function AdrenalSimulatorControls({
  state,
  setState,
}: {
  state: AdrenalState;
  setState: Dispatch<SetStateAction<AdrenalState>>;
}) {
  return (
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
  );
}
