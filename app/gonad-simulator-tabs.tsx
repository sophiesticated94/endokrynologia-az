'use client';
import type { Dispatch, SetStateAction } from 'react';
import { Activity, AlertTriangle, ShieldCheck, Zap, HeartPulse, Sparkles, Scale } from 'lucide-react';
import type { GonadSimulatorState, GonadSimulationResult } from '../lib/gonad-simulator';

export function GonadHpgTab({
  state,
  setState,
  results,
}: {
  state: GonadSimulatorState;
  setState: Dispatch<SetStateAction<GonadSimulatorState>>;
  results: GonadSimulationResult;
}) {
  const { vermeulen, lh, fsh, estradiol } = results;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
      {/* Left: Vermeulen Balance & Hormone Distribution */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Scale size={16} color="#0284c7" />
              Dystrybucja frakcji testosteronu (Równanie Vermeulena)
            </span>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Alb: {state.albumin} g/l · SHBG: {state.shbg} nmol/l</span>
          </div>

          {/* Distribution bar */}
          <div style={{ height: '24px', width: '100%', borderRadius: '6px', overflow: 'hidden', display: 'flex', background: '#e2e8f0', marginBottom: '10px' }}>
            <div
              style={{ width: `${Math.max(1.5, vermeulen.freeT_percent)}%`, background: '#3b82f6', color: '#fff', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={`Wolny T: ${vermeulen.freeT_percent}%`}
            >
              {vermeulen.freeT_percent > 3 ? `${vermeulen.freeT_percent}%` : ''}
            </div>
            <div
              style={{ width: `${Math.max(10, vermeulen.bioavailableT_percent - vermeulen.freeT_percent)}%`, background: '#60a5fa', color: '#fff', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={`Związany z albuminą: ${Math.round((vermeulen.bioavailableT_percent - vermeulen.freeT_percent) * 10) / 10}%`}
            >
              Alb
            </div>
            <div
              style={{ width: `${Math.max(20, 100 - vermeulen.bioavailableT_percent)}%`, background: '#94a3b8', color: '#fff', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={`Związany z SHBG: ${Math.round((100 - vermeulen.bioavailableT_percent) * 10) / 10}%`}
            >
              SHBG
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
            <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
              <div style={{ fontSize: '11px', color: '#1e40af', fontWeight: 600 }}>Wolny T (Free T)</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#1d4ed8' }}>{vermeulen.freeT_pmol} <span style={{ fontSize: '11px' }}>pmol/l</span></div>
              <div style={{ fontSize: '11px', color: '#3b82f6' }}>{vermeulen.freeT_ng_dl} ng/dl ({vermeulen.freeT_percent}%)</div>
            </div>
            <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Biodostępny T (Bio-T)</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{vermeulen.bioavailableT_nmol} <span style={{ fontSize: '11px' }}>nmol/l</span></div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>{vermeulen.bioavailableT_percent}% całkowitego</div>
            </div>
            <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Wskaźnik FAI</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{vermeulen.fai}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>(100 × T) / SHBG</div>
            </div>
          </div>
        </div>

        {/* HPG Axis Dynamic Feedback Box */}
        <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={16} color="#16a34a" />
            Stan osi podwzgórze–przysadka–gonady (HPG)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>Lutropina (LH)</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#15803d' }}>{lh} <span style={{ fontSize: '12px' }}>IU/l</span></div>
              <div style={{ fontSize: '11px', color: '#16a34a' }}>Stymulacja kom. Leydiga/theca</div>
            </div>
            <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>Folitropina (FSH)</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#15803d' }}>{fsh} <span style={{ fontSize: '12px' }}>IU/l</span></div>
              <div style={{ fontSize: '11px', color: '#16a34a' }}>Spermatogeneza / pęcherzyki</div>
            </div>
            <div style={{ padding: '12px', background: '#fdf2f8', borderRadius: '8px', border: '1px solid #fbcfe8' }}>
              <div style={{ fontSize: '11px', color: '#9d174d', fontWeight: 600 }}>17-beta-estradiol (E2)</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#be185d' }}>{estradiol} <span style={{ fontSize: '12px' }}>pg/ml</span></div>
              <div style={{ fontSize: '11px', color: '#ec4899' }}>Aromatyzacja: {state.aromataseActivityPercent}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Parameter Sliders */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Parametry wejściowe osi</div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Płeć biologiczna</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setState(s => ({ ...s, sex: 'male' }))}
              style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid', borderColor: state.sex === 'male' ? '#0284c7' : '#cbd5e1', background: state.sex === 'male' ? '#e0f2fe' : '#fff', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}
            >
              Mężczyzna (XY)
            </button>
            <button
              type="button"
              onClick={() => setState(s => ({ ...s, sex: 'female' }))}
              style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid', borderColor: state.sex === 'female' ? '#db2777' : '#cbd5e1', background: state.sex === 'female' ? '#fce7f3' : '#fff', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}
            >
              Kobieta (XX)
            </button>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ fontWeight: 600 }}>Testosteron całkowity:</span>
            <span style={{ fontWeight: 700, color: '#0284c7' }}>{state.totalT} nmol/l</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="45"
            step="0.5"
            value={state.totalT}
            onChange={e => setState(s => ({ ...s, totalT: parseFloat(e.target.value) }))}
            style={{ width: '100%', marginTop: '4px' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ fontWeight: 600 }}>Białko SHBG:</span>
            <span style={{ fontWeight: 700, color: '#0284c7' }}>{state.shbg} nmol/l</span>
          </div>
          <input
            type="range"
            min="8"
            max="120"
            step="1"
            value={state.shbg}
            onChange={e => setState(s => ({ ...s, shbg: parseFloat(e.target.value) }))}
            style={{ width: '100%', marginTop: '4px' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ fontWeight: 600 }}>Interwał pulsów GnRH:</span>
            <span style={{ fontWeight: 700, color: '#0284c7' }}>co {state.gnrhIntervalMinutes} min</span>
          </div>
          <input
            type="range"
            min="40"
            max="180"
            step="5"
            value={state.gnrhIntervalMinutes}
            onChange={e => setState(s => ({ ...s, gnrhIntervalMinutes: parseInt(e.target.value, 10) }))}
            style={{ width: '100%', marginTop: '4px' }}
          />
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Szybkie pulsy (&lt;70m) preferują LH, wolne (&gt;120m) FSH.</div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ fontWeight: 600 }}>Aktywność aromatazy:</span>
            <span style={{ fontWeight: 700, color: '#db2777' }}>{state.aromataseActivityPercent}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="200"
            step="10"
            value={state.aromataseActivityPercent}
            onChange={e => setState(s => ({ ...s, aromataseActivityPercent: parseInt(e.target.value, 10) }))}
            style={{ width: '100%', marginTop: '4px' }}
          />
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Hamowana przez letrozol; nasilona w otyłości.</div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={state.oralEstrogenLoad}
            onChange={e => setState(s => ({ ...s, oralEstrogenLoad: e.target.checked }))}
          />
          <span style={{ fontWeight: 500 }}>Doustne estrogeny (indukcja wątrobowego SHBG +80%)</span>
        </label>
      </div>
    </div>
  );
}

export function GonadTherapyTab({
  state,
  setState,
  results,
}: {
  state: GonadSimulatorState;
  setState: Dispatch<SetStateAction<GonadSimulatorState>>;
  results: GonadSimulationResult;
}) {
  const { hematocritPercent, vteRiskFold, hpgSuppressionPercent, gynecomastiaScore } = results;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
      {/* Left: Gauges & Safety Readouts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HeartPulse size={16} color="#dc2626" />
            Wskaźniki bezpieczeństwa terapii steroidowej i tranzycyjnej
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {/* Hematocrit Gauge */}
            <div style={{ padding: '12px', background: hematocritPercent > 54 ? '#fef2f2' : '#f8fafc', borderRadius: '8px', border: '1px solid', borderColor: hematocritPercent > 54 ? '#fca5a5' : '#e2e8f0' }}>
              <div style={{ fontSize: '11px', color: hematocritPercent > 54 ? '#b91c1c' : '#475569', fontWeight: 600 }}>Hematokryt (Hct)</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: hematocritPercent > 54 ? '#dc2626' : '#0f172a' }}>
                {hematocritPercent}%
              </div>
              <div style={{ fontSize: '10px', color: hematocritPercent > 54 ? '#dc2626' : '#64748b' }}>
                {hematocritPercent > 54 ? 'ALARM: próg flebotomii!' : 'Cel bezpieczny: < 50–52%'}
              </div>
            </div>

            {/* VTE Risk Fold */}
            <div style={{ padding: '12px', background: vteRiskFold > 2.0 ? '#fef2f2' : '#f8fafc', borderRadius: '8px', border: '1px solid', borderColor: vteRiskFold > 2.0 ? '#fca5a5' : '#e2e8f0' }}>
              <div style={{ fontSize: '11px', color: vteRiskFold > 2.0 ? '#b91c1c' : '#475569', fontWeight: 600 }}>Ryzyko zakrzepicy (VTE)</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: vteRiskFold > 2.0 ? '#dc2626' : '#0f172a' }}>
                {vteRiskFold}×
              </div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>wzg. populacji ogólnej</div>
            </div>

            {/* HPG Suppression */}
            <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Supresja osi HPG</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#334155' }}>
                {hpgSuppressionPercent}%
              </div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>
                {hpgSuppressionPercent > 90 ? 'Głęboka supresja (azoospermia)' : 'Częściowe zahamowanie'}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Ryzyko ginekomastii (aromatyzacja):</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: gynecomastiaScore === 'Wysoka' ? '#dc2626' : gynecomastiaScore === 'Umiarkowana' ? '#d97706' : '#16a34a' }}>
              {gynecomastiaScore}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Regimen Selector */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Schemat terapii hormonalnej</div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Tryb leczenia</label>
          <select
            value={state.therapyMode}
            onChange={e => setState(s => ({ ...s, therapyMode: e.target.value as any }))}
            style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
          >
            <option value="trt">Substytucja testosteronem (TRT)</option>
            <option value="aas">Doping steroidowy (AAS - suprafizjologiczny)</option>
            <option value="gaht-fem">Feminizująca GAHT (Kobieta transpłciowa)</option>
            <option value="gaht-masc">Maskulinizująca GAHT (Mężczyzna transpłciowy)</option>
          </select>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ fontWeight: 600 }}>Tygodniowy ekwiwalent dawki:</span>
            <span style={{ fontWeight: 700, color: '#0284c7' }}>{state.weeklyEquivalentDoseMg} mg/tydz.</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={state.weeklyEquivalentDoseMg}
            onChange={e => setState(s => ({ ...s, weeklyEquivalentDoseMg: parseInt(e.target.value, 10) }))}
            style={{ width: '100%', marginTop: '4px' }}
          />
        </div>

        {state.therapyMode === 'gaht-fem' && (
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Antyandrogen blokujący</label>
            <select
              value={state.antiandrogen}
              onChange={e => setState(s => ({ ...s, antiandrogen: e.target.value as any }))}
              style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
            >
              <option value="none">Brak (monoterapia estradiolem)</option>
              <option value="cpa">Octan cyproteronu (CPA 10 mg)</option>
              <option value="spiro">Spironolakton (100–200 mg)</option>
              <option value="gnrh_analog">Depot analog GnRH (złoty standard)</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export function GonadIvfTab({
  state,
  setState,
  results,
}: {
  state: GonadSimulatorState;
  setState: Dispatch<SetStateAction<GonadSimulatorState>>;
  results: GonadSimulationResult;
}) {
  const { ohssGrade, ohssScore, vteRiskFold } = results;

  const getOhssColor = (grade: string) => {
    switch (grade) {
      case 'Krytyczny': return '#dc2626';
      case 'Ciężki': return '#ea580c';
      case 'Umiarkowany': return '#d97706';
      case 'Łagodny': return '#eab308';
      default: return '#16a34a';
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
      {/* Left: OHSS Risk Predictor */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} color={getOhssColor(ohssGrade)} />
            Kalkulator ryzyka zespołu hiperstymulacji jajników (OHSS Predictor)
          </div>

          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Ciężkość OHSS:</span>
              <span style={{ fontSize: '16px', fontWeight: 800, color: getOhssColor(ohssGrade) }}>
                {ohssGrade.toUpperCase()} (Wskaźnik: {ohssScore}/100)
              </span>
            </div>
            <div style={{ width: '100%', height: '12px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: `${ohssScore}%`, height: '100%', background: getOhssColor(ohssGrade), transition: 'width 0.3s ease' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Ryzyko zakrzepicy VTE</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: vteRiskFold > 2 ? '#dc2626' : '#0f172a' }}>{vteRiskFold}×</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>Zależne od hemokoncentracji i VEGF</div>
            </div>
            <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Strategia protekcyjna</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: state.freezeAll ? '#16a34a' : '#dc2626' }}>
                {state.freezeAll ? 'Freeze-all (aktywna)' : 'Świeży transfer (ryzyko!)'}
              </div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>Eliminuje endogenne hCG z trofoblastu</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: IVF Parameters */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Parametry stymulacji jajników</div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ fontWeight: 600 }}>Liczba pęcherzyków antralnych (AFC):</span>
            <span style={{ fontWeight: 700, color: '#0284c7' }}>{state.afc}</span>
          </div>
          <input
            type="range"
            min="4"
            max="45"
            step="1"
            value={state.afc}
            onChange={e => setState(s => ({ ...s, afc: parseInt(e.target.value, 10) }))}
            style={{ width: '100%', marginTop: '4px' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ fontWeight: 600 }}>Rezerwa jajnikowa AMH:</span>
            <span style={{ fontWeight: 700, color: '#0284c7' }}>{state.amh} ng/ml</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="12"
            step="0.2"
            value={state.amh}
            onChange={e => setState(s => ({ ...s, amh: parseFloat(e.target.value) }))}
            style={{ width: '100%', marginTop: '4px' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ fontWeight: 600 }}>Estradiol w dniu triggera:</span>
            <span style={{ fontWeight: 700, color: '#db2777' }}>{state.e2Trigger} pg/ml</span>
          </div>
          <input
            type="range"
            min="500"
            max="7500"
            step="100"
            value={state.e2Trigger}
            onChange={e => setState(s => ({ ...s, e2Trigger: parseInt(e.target.value, 10) }))}
            style={{ width: '100%', marginTop: '4px' }}
          />
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Próg ostrzegawczy ESHRE: &gt; 3000–3500 pg/ml.</div>
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Trigger dojrzewania oocytów</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setState(s => ({ ...s, trigger: 'hcg' }))}
              style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid', borderColor: state.trigger === 'hcg' ? '#dc2626' : '#cbd5e1', background: state.trigger === 'hcg' ? '#fee2e2' : '#fff', fontWeight: 600, fontSize: '11px', cursor: 'pointer' }}
            >
              hCG 10 000 IU
            </button>
            <button
              type="button"
              onClick={() => setState(s => ({ ...s, trigger: 'gnrh_agonist' }))}
              style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid', borderColor: state.trigger === 'gnrh_agonist' ? '#16a34a' : '#cbd5e1', background: state.trigger === 'gnrh_agonist' ? '#dcfce7' : '#fff', fontWeight: 600, fontSize: '11px', cursor: 'pointer' }}
            >
              Agonista GnRH
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={state.freezeAll}
              onChange={e => setState(s => ({ ...s, freezeAll: e.target.checked }))}
            />
            <span style={{ fontWeight: 500 }}>Strategia freeze-all (witryfikacja wszystkich zarodków)</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={state.cabergolineCoTreatment}
              onChange={e => setState(s => ({ ...s, cabergolineCoTreatment: e.target.checked }))}
            />
            <span style={{ fontWeight: 500 }}>Kabergolina 0,5 mg/d (bloker VEGFR-2)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
