'use client';
import type { Dispatch, SetStateAction } from 'react';
import type { ParathyroidState } from '@/lib/parathyroid-simulator';

export function ParathyroidSimulatorControls({
  state,
  setState,
}: {
  state: ParathyroidState;
  setState: Dispatch<SetStateAction<ParathyroidState>>;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {state.mode === 'axis_homeostasis' && (
        <>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Autonomia gruczolaka przytarczycy</span>
              <strong>{state.parathyroidAdenomaFraction}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={state.parathyroidAdenomaFraction}
              onChange={e => setState(p => ({ ...p, parathyroidAdenomaFraction: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Sprawne przytarczyce (anatomiczne)</span>
              <strong>{state.postopGlandsRemaining} / 4 gruczoły</strong>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={state.postopGlandsRemaining}
              onChange={e => setState(p => ({ ...p, postopGlandsRemaining: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Wydolność nerek (eGFR)</span>
              <strong>{state.egfrMlMin} ml/min</strong>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={state.egfrMlMin}
              onChange={e => setState(p => ({ ...p, egfrMlMin: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Stężenie kalcydiolu 25(OH)D</span>
              <strong>{state.calcidiol25OhD} ng/ml</strong>
            </div>
            <input
              type="range"
              min="5"
              max="80"
              step="5"
              value={state.calcidiol25OhD}
              onChange={e => setState(p => ({ ...p, calcidiol25OhD: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>
        </>
      )}

      {state.mode === 'phpt_fhh_calculator' && (
        <>
          <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '8px', border: '1px solid #bbf7d0', fontSize: '12px', color: '#166534' }}>
            Wprowadź stężenia z surowicy i dobowej zbiórki moczu. Konsola automatycznie obliczy wskaźnik CCCR i wskaże rozpoznanie.
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Wrażliwość receptora CaSR</span>
              <strong>{state.casrSensitivity}% {state.casrSensitivity < 70 ? '(Mutacja FHH)' : ''}</strong>
            </div>
            <input
              type="range"
              min="30"
              max="150"
              step="10"
              value={state.casrSensitivity}
              onChange={e => setState(p => ({ ...p, casrSensitivity: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Wapń w moczu (Ca mocz)</span>
              <strong>{state.urineCalciumMgDl} mg/dl</strong>
            </div>
            <input
              type="range"
              min="2"
              max="45"
              step="1"
              value={state.urineCalciumMgDl}
              onChange={e => setState(p => ({ ...p, urineCalciumMgDl: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Kreatynina w moczu</span>
              <strong>{state.urineCreatinineMgDl} mg/dl</strong>
            </div>
            <input
              type="range"
              min="30"
              max="250"
              step="10"
              value={state.urineCreatinineMgDl}
              onChange={e => setState(p => ({ ...p, urineCreatinineMgDl: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Kreatynina w surowicy</span>
              <strong>{state.serumCreatinineMgDl} mg/dl</strong>
            </div>
            <input
              type="range"
              min="0.6"
              max="3.0"
              step="0.1"
              value={state.serumCreatinineMgDl}
              onChange={e => setState(p => ({ ...p, serumCreatinineMgDl: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>
        </>
      )}

      {state.mode === 'tetany_ekg' && (
        <>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Czynność przytarczyc (gruczoły)</span>
              <strong>{state.postopGlandsRemaining} / 4</strong>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={state.postopGlandsRemaining}
              onChange={e => setState(p => ({ ...p, postopGlandsRemaining: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Stężenie albuminy w surowicy</span>
              <strong>{state.serumAlbuminGDl} g/dl</strong>
            </div>
            <input
              type="range"
              min="1.5"
              max="5.0"
              step="0.1"
              value={state.serumAlbuminGDl}
              onChange={e => setState(p => ({ ...p, serumAlbuminGDl: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>
        </>
      )}

      {state.mode === 'hypercalcemic_crisis' && (
        <>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Wlew dożylny 0,9% NaCl (Rehydratacja)</span>
              <strong>{state.crisisSalineLiters} L / 24h</strong>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="0.5"
              value={state.crisisSalineLiters}
              onChange={e => setState(p => ({ ...p, crisisSalineLiters: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={state.calcitoninGiven}
                onChange={e => setState(p => ({ ...p, calcitoninGiven: e.target.checked }))}
              />
              <span>Kalcytonina s.c. (efekt natychmiastowy w 2–4 h)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={state.zoledronicAcidGiven}
                onChange={e => setState(p => ({ ...p, zoledronicAcidGiven: e.target.checked }))}
              />
              <span>Kwas zoledronowy 4 mg i.v. (efekt po 48 h)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#b91c1c' }}>
              <input
                type="checkbox"
                checked={state.furosemideGivenPrematurely}
                onChange={e => setState(p => ({ ...p, furosemideGivenPrematurely: e.target.checked }))}
              />
              <span>Podaj Furosemid przed pełnym nawodnieniem (Pułapka!)</span>
            </label>
          </div>
        </>
      )}

      {state.mode === 'hungry_bone' && (
        <>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Wyjściowa fosfataza zasadowa (ALP) przed operacją</span>
              <strong>{state.preopAlpLevel} IU/L</strong>
            </div>
            <input
              type="range"
              min="80"
              max="1400"
              step="50"
              value={state.preopAlpLevel}
              onChange={e => setState(p => ({ ...p, preopAlpLevel: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Wlewy 10% glukonianu wapnia (ampułki)</span>
              <strong>{state.postopIvCalciumGluconateAmpoules} amp. / dobę</strong>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={state.postopIvCalciumGluconateAmpoules}
              onChange={e => setState(p => ({ ...p, postopIvCalciumGluconateAmpoules: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Kalcytriol doustny (aktywna witamina D)</span>
              <strong>{state.oralCalcitriolMcg} µg / dobę</strong>
            </div>
            <input
              type="range"
              min="0"
              max="4.0"
              step="0.25"
              value={state.oralCalcitriolMcg}
              onChange={e => setState(p => ({ ...p, oralCalcitriolMcg: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginTop: '8px' }}>
            <input
              type="checkbox"
              checked={state.postopMagnesiumGiven}
              onChange={e => setState(p => ({ ...p, postopMagnesiumGiven: e.target.checked }))}
            />
            <span>Uzupełniono magnez (MgSO4 i.v.)</span>
          </label>
        </>
      )}
    </div>
  );
}
