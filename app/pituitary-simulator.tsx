'use client';
import { useState, useMemo, useEffect } from 'react';
import {
  Activity,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  X,
  BookOpen,
  ArrowRight,
  Sliders,
  Eye,
  FlaskConical,
  Layers,
  Info,
} from 'lucide-react';

import {
  type PituitaryState,
  type PituitaryTumorType,
  type PituitaryPreset,
  defaultPituitaryState,
  pituitaryPresets,
  calculatePituitaryState,
  pituitarySimulatorLegend,
} from '../lib/pituitary-simulator.ts';

export function PituitaryLegendModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pituitary-legend-title"
    >
      <div className="hpt-legend-dialog">
        <div className="legend-dialog-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} className="icon-accent" />
            <h2 id="pituitary-legend-title">Konsola Przysadkowa — Przewodnik kliniczny</h2>
          </div>
          <button
            type="button"
            className="text-button legend-close-btn"
            onClick={onClose}
            aria-label="Zamknij okno przewodnika"
          >
            <X size={20} />
          </button>
        </div>

        <div className="legend-dialog-content">
          {pituitarySimulatorLegend.sections.map((section, idx) => (
            <div key={idx} className="legend-group" style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--teal)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={16} /> {section.title}
              </h3>
              <div className="legend-cards-grid">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="legend-card">
                    <strong>{item.term}</strong>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="curriculum-tip" style={{ marginTop: '20px' }}>
            <Info size={18} />
            <p>
              <strong>Złote zasady kliniczne konsoli:</strong>
              <br />1. W panhipopituitaryzmie podaj hydrokortyzon PRZED lewotyroksyną (zapobieganie przełomowi nadnerczowemu).
              <br />2. W SIADH tempo wzrostu natremii NIE może przekraczać 8–10 mmol/l/24h (zapobieganie mielinolizie mostu CPM).
              <br />3. W akromegalii kryterium potwierdzenia to brak supresji GH w teście OGTT 75 g (&lt;1,0 µg/l).
            </p>
          </div>
        </div>

        <div className="legend-dialog-footer">
          <button type="button" className="primary" onClick={onClose}>
            Wróć do konsoli <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function PituitarySimulator({ embedded = false }: { embedded?: boolean }) {
  const [activeMode, setActiveMode] = useState<'axes' | 'dynamic' | 'chiasm'>('axes');
  const [state, setState] = useState<PituitaryState>(defaultPituitaryState);
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const res = useMemo(() => calculatePituitaryState(state), [state]);

  function loadPreset(p: PituitaryPreset) {
    setState({ ...p.state });
  }

  return (
    <div className={`simulator-wrapper ${embedded ? 'embedded' : 'standalone'}`}>
      <div className="simulator-header">
        <div>
          <span className="eyebrow">
            <Activity size={15} /> KLINICZNA KONSOLA PRZYSADKOWO-PODWZGÓRZOWA
          </span>
          <h2>Symulator osi przysadkowych, testów i pola widzenia</h2>
          <p>
            Badaj wydzielanie hormonów (PRL, GH, ACTH, AVP), przeprowadzaj testy dynamiczne (OGTT, test z deksametazonem, test wodny) oraz obserwuj wpływ makrogruczolaka na skrzyżowanie wzrokowe.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="secondary"
            onClick={() => setIsLegendOpen(true)}
            title="Wyjaśnienie parametrów, pojęć i procedur"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <HelpCircle size={15} /> Legenda i zasady
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => setState(defaultPituitaryState)}
            title="Zresetuj konsolę do normy"
          >
            <RefreshCw size={15} /> Reset
          </button>
        </div>
      </div>

      {/* Wybór trybu symulatora (3 tryby) */}
      <div className="legend-tabs" style={{ marginBottom: '18px' }} role="tablist">
        <button
          type="button"
          className={`legend-tab-btn ${activeMode === 'axes' ? 'active' : ''}`}
          onClick={() => setActiveMode('axes')}
        >
          <Activity size={16} /> Tryb 1: Osie i gospodarka wodna
        </button>
        <button
          type="button"
          className={`legend-tab-btn ${activeMode === 'dynamic' ? 'active' : ''}`}
          onClick={() => setActiveMode('dynamic')}
        >
          <FlaskConical size={16} /> Tryb 2: Testy dynamiczne (OGTT, Dex, dDAVP)
        </button>
        <button
          type="button"
          className={`legend-tab-btn ${activeMode === 'chiasm' ? 'active' : ''}`}
          onClick={() => setActiveMode('chiasm')}
        >
          <Eye size={16} /> Tryb 3: Anatomia siodła i pole widzenia
        </button>
      </div>

      {/* Pasek presetów klinicznych */}
      <div className="presets-bar" aria-label="Presety kliniczne przysadki">
        <span className="presets-label">Scenariusze kliniczne:</span>
        <div className="presets-scroll">
          {pituitaryPresets.map(p => (
            <button
              key={p.id}
              type="button"
              className="preset-btn"
              onClick={() => loadPreset(p)}
            >
              <strong>{p.name}</strong>
              <small>{p.tag}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="simulator-grid">
        {/* Kolumna 1: Sterowanie wybranym trybem */}
        <div className="sim-controls-panel">
          {activeMode === 'axes' && (
            <>
              <h3>
                <Sliders size={16} /> Typ guza i parametry wydzielnicze
              </h3>

              <div className="control-group">
                <div className="control-label">
                  <span>Typ patologii przysadkowej</span>
                </div>
                <select
                  value={state.tumorType}
                  onChange={e => setState(s => ({ ...s, tumorType: e.target.value as PituitaryTumorType }))}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cfdccc' }}
                >
                  <option value="none">Brak guza (Prawidłowa przysadka)</option>
                  <option value="prolactinoma">Prolactinoma (guz prolaktynowy)</option>
                  <option value="acromegaly">Somatotropinoma (nadmiar GH / Akromegalia)</option>
                  <option value="cushing">Kortykotropinoma (nadmiar ACTH / Cushing)</option>
                  <option value="nfpa">NFPA (nieczynny gruczolak z efektem masy)</option>
                </select>
              </div>

              <div className="control-group">
                <div className="control-label">
                  <span>Średnica guza (MRI)</span>
                  <strong>{state.tumorSizeMm} mm {state.tumorSizeMm === 0 ? '(brak)' : state.tumorSizeMm < 10 ? '(mikroguzek)' : '(makroguzek)'}</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={state.tumorSizeMm}
                  onChange={e => setState(s => ({ ...s, tumorSizeMm: Number(e.target.value) }))}
                />
              </div>

              <div className="control-divider">Tylny płat i woda</div>

              <div className="control-group">
                <div className="control-label">
                  <span>Niedobór wazopresyny (Moczówka prosta)</span>
                  <strong>{state.avpDeficiencyPct}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={state.avpDeficiencyPct}
                  onChange={e => setState(s => ({ ...s, avpDeficiencyPct: Number(e.target.value), siadhIntensityPct: 0 }))}
                />
                <small>Uszkodzenie jąder podwzgórza lub szypuły (uraz, operacja)</small>
              </div>

              <div className="control-group">
                <div className="control-label">
                  <span>Nieadekwatny nadmiar AVP (Zespół SIADH)</span>
                  <strong>{state.siadhIntensityPct}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={state.siadhIntensityPct}
                  onChange={e => setState(s => ({ ...s, siadhIntensityPct: Number(e.target.value), avpDeficiencyPct: 0 }))}
                />
                <small>Niekontrolowana retencja wolnej wody prowadząca do hiponatremii</small>
              </div>

              <div className="control-group">
                <div className="control-label">
                  <span>Podaż płynów (doustna i dożylna)</span>
                  <strong>{state.waterIntakeL} L / dobę</strong>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.5"
                  value={state.waterIntakeL}
                  onChange={e => setState(s => ({ ...s, waterIntakeL: Number(e.target.value) }))}
                />
              </div>
            </>
          )}

          {activeMode === 'dynamic' && (
            <>
              <h3>
                <FlaskConical size={16} /> Testy czynnościowe i farmakologiczne
              </h3>

              <div className="control-group">
                <div className="control-label">
                  <span>1. Test OGTT (75 g glukozy) — Supresja GH</span>
                  <strong>{state.glucoseLoadG > 0 ? '75 g podane' : 'Na czczo (0 g)'}</strong>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <button
                    type="button"
                    className={`text-button ${state.glucoseLoadG === 0 ? 'primary' : 'secondary'}`}
                    style={{ flex: 1, padding: '8px' }}
                    onClick={() => setState(s => ({ ...s, glucoseLoadG: 0 }))}
                  >
                    Na czczo
                  </button>
                  <button
                    type="button"
                    className={`text-button ${state.glucoseLoadG === 75 ? 'primary' : 'secondary'}`}
                    style={{ flex: 1, padding: '8px' }}
                    onClick={() => setState(s => ({ ...s, glucoseLoadG: 75 }))}
                  >
                    Podaj 75 g glukozy
                  </button>
                </div>
                <small>U zdrowego GH spada &lt;1,0 µg/l; w akromegalii brak spadku.</small>
              </div>

              <div className="control-group">
                <div className="control-label">
                  <span>2. Test nocnego hamowania 1 mg deksametazonu</span>
                  <strong>{state.dexamethasoneMg > 0 ? '1 mg DEX podany' : 'Bez leku'}</strong>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <button
                    type="button"
                    className={`text-button ${state.dexamethasoneMg === 0 ? 'primary' : 'secondary'}`}
                    style={{ flex: 1, padding: '8px' }}
                    onClick={() => setState(s => ({ ...s, dexamethasoneMg: 0 }))}
                  >
                    Kortyzol bazowy
                  </button>
                  <button
                    type="button"
                    className={`text-button ${state.dexamethasoneMg === 1 ? 'primary' : 'secondary'}`}
                    style={{ flex: 1, padding: '8px' }}
                    onClick={() => setState(s => ({ ...s, dexamethasoneMg: 1 }))}
                  >
                    Podaj 1 mg DEX o 23:00
                  </button>
                </div>
                <small>Kortyzol rano &lt;1,8 µg/dl wyklucza chorobę Cushinga.</small>
              </div>

              <div className="control-group">
                <div className="control-label">
                  <span>3. Test z desmopresyną (dDAVP) w moczówce</span>
                  <strong>{state.desmopressinMcg > 0 ? '2 µg dDAVP podane' : 'Faza odwodnienia'}</strong>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <button
                    type="button"
                    className={`text-button ${state.desmopressinMcg === 0 ? 'primary' : 'secondary'}`}
                    style={{ flex: 1, padding: '8px' }}
                    onClick={() => setState(s => ({ ...s, desmopressinMcg: 0 }))}
                  >
                    Faza odwodnienia
                  </button>
                  <button
                    type="button"
                    className={`text-button ${state.desmopressinMcg === 2 ? 'primary' : 'secondary'}`}
                    style={{ flex: 1, padding: '8px' }}
                    onClick={() => setState(s => ({ ...s, desmopressinMcg: 2 }))}
                  >
                    Wstrzyknij dDAVP
                  </button>
                </div>
                <small>W moczówce centralnej osmolalność moczu rośnie &gt;50%.</small>
              </div>

              <div className="control-group">
                <div className="control-label">
                  <span>4. Leczenie agonistą dopaminy (Kabergolina)</span>
                  <strong>{state.cabergolineMg} mg / tydzień</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3.5"
                  step="0.5"
                  value={state.cabergolineMg}
                  onChange={e => setState(s => ({ ...s, cabergolineMg: Number(e.target.value) }))}
                />
                <small>Skutecznie obniża PRL i zmniejsza masę prolactinoma</small>
              </div>
            </>
          )}

          {activeMode === 'chiasm' && (
            <>
              <h3>
                <Eye size={16} /> Ekspansja guza i anatomia siodła
              </h3>

              <div className="control-group">
                <div className="control-label">
                  <span>Ekspansja nadsiodłowa (ku skrzyżowaniu wzrokowemu)</span>
                  <strong>{state.suprasellarMm} mm</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="1"
                  value={state.suprasellarMm}
                  onChange={e => setState(s => ({ ...s, suprasellarMm: Number(e.target.value) }))}
                />
                <small>&gt;10 mm: ucisk skrzyżowania, &gt;18 mm: całkowita hemianopsia dwuskroniowa</small>
              </div>

              <div className="control-group">
                <div className="control-label">
                  <span>Inwazja boczna do zatoki jamistej (Skala Knospa)</span>
                  <strong>Stopień Knosp {state.knospGrade}</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  value={state.knospGrade}
                  onChange={e => setState(s => ({ ...s, knospGrade: Number(e.target.value) }))}
                />
                <small>0 = brak, 1-2 = linia tętnicy szyjnej, 3-4 = ucisk n. III, IV, VI (diplopia, ptoza)</small>
              </div>

              <div className="curriculum-tip" style={{ marginTop: '16px' }}>
                <Eye size={16} />
                <p style={{ margin: 0, fontSize: '13px' }}>
                  <strong>Anatomiczne wyjaśnienie:</strong> Włókna z nosowych części obu siatkówek krzyżują się w chiasmie, a odpowiadają za widzenie w polach skroniowych (bocznych). Stąd ucisk od dołu niszczy widzenie w skroniowych połowach obu oczu!
                </p>
              </div>
            </>
          )}
        </div>

        {/* Kolumna 2: Wyniki dynamiczne, perymetria i diagnoza */}
        <div className="sim-results-panel">
          <h3>Odpowiedź kliniczna w czasie rzeczywistym</h3>

          {/* Karty wyników laboratoryjnych */}
          <div className="hormone-readings">
            <div className={`reading-card ${res.prl > 25 ? 'high' : 'normal'}`}>
              <small>Prolaktyna (PRL)</small>
              <strong>{res.prl} <span className="unit">ng/ml</span></strong>
              <span className="ref-range">Norma: &lt;25 ng/ml</span>
            </div>

            <div className={`reading-card ${res.gh > 1.0 && state.glucoseLoadG >= 75 ? 'high' : 'normal'}`}>
              <small>GH {state.glucoseLoadG >= 75 ? '(w OGTT)' : '(bazowy)'}</small>
              <strong>{res.gh} <span className="unit">µg/l</span></strong>
              <span className="ref-range">Próg supresji: &lt;1,0 µg/l</span>
            </div>

            <div className={`reading-card ${res.cortisol > 1.8 && state.dexamethasoneMg >= 1 ? 'high' : 'normal'}`}>
              <small>Kortyzol {state.dexamethasoneMg >= 1 ? '(po 1 mg DEX)' : '(poranny)'}</small>
              <strong>{res.cortisol} <span className="unit">µg/dl</span></strong>
              <span className="ref-range">Norma DEX: &lt;1,8 µg/dl</span>
            </div>

            <div className={`reading-card ${res.serumSodium < 135 ? 'low' : res.serumSodium > 145 ? 'high' : 'normal'}`}>
              <small>Sód w surowicy (Na+)</small>
              <strong>{res.serumSodium} <span className="unit">mmol/l</span></strong>
              <span className="ref-range">Norma: 135–145 mmol/l</span>
            </div>

            <div className={`reading-card ${res.urineOsmolality < 300 ? 'low' : 'normal'}`}>
              <small>Osmolalność moczu</small>
              <strong>{res.urineOsmolality} <span className="unit">mOsm/kg</span></strong>
              <span className="ref-range">Norma: 500–800 mOsm/kg</span>
            </div>

            <div className={`reading-card ${res.urineVolumeL > 4.0 ? 'high' : 'normal'}`}>
              <small>Dobowa diureza</small>
              <strong>{res.urineVolumeL} <span className="unit">L / 24h</span></strong>
              <span className="ref-range">Norma: 1,5–2,5 L/24h</span>
            </div>
          </div>

          {/* Symulacja pola widzenia (Perymetria obojga oczu) */}
          <div style={{ background: '#f6f9f8', border: '1px solid #dbe6e0', borderRadius: '8px', padding: '16px', margin: '14px 0' }}>
            <h4 style={{ margin: '0 0 10px', fontSize: '13px', color: '#355447', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Eye size={15} /> Perymetria (Badanie pola widzenia)
            </h4>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
              {/* Oko lewe */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#e2ece6',
                  border: '2px solid #5a8771',
                  margin: 'auto',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Ubytek skroniowy oka lewego = lewa połowa */}
                  {res.visualFieldDefect === 'bitemporal_hemianopsia' && (
                    <div style={{ position: 'absolute', inset: '0 50% 0 0', background: '#24322a' }} />
                  )}
                  {res.visualFieldDefect === 'quadrantanopsia' && (
                    <div style={{ position: 'absolute', inset: '0 50% 50% 0', background: '#24322a' }} />
                  )}
                </div>
                <small style={{ display: 'block', marginTop: '4px', fontSize: '11px', color: '#556c60' }}>Oko lewe</small>
              </div>

              {/* Oko prawe */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#e2ece6',
                  border: '2px solid #5a8771',
                  margin: 'auto',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Ubytek skroniowy oka prawego = prawa połowa */}
                  {res.visualFieldDefect === 'bitemporal_hemianopsia' && (
                    <div style={{ position: 'absolute', inset: '0 0 0 50%', background: '#24322a' }} />
                  )}
                  {res.visualFieldDefect === 'quadrantanopsia' && (
                    <div style={{ position: 'absolute', inset: '0 0 50% 50%', background: '#24322a' }} />
                  )}
                </div>
                <small style={{ display: 'block', marginTop: '4px', fontSize: '11px', color: '#556c60' }}>Oko prawe</small>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#446153', margin: '10px 0 0', textAlign: 'center' }}>
              <strong>Obraz:</strong> {res.visualFieldDescription}
            </p>
          </div>

          {/* Objawy ucisku zatoki jamistej */}
          {res.cranialNervesPalsy.length > 0 && (
            <div className="alert" style={{ margin: '10px 0', fontSize: '12px' }}>
              <div>
                <strong>Zajęcie zatoki jamistej (Knosp {state.knospGrade}):</strong>
                <ul style={{ margin: '4px 0 0', paddingLeft: '16px' }}>
                  {res.cranialNervesPalsy.map((cn, i) => (
                    <li key={i}>{cn}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Diagnoza i ostrzeżenie kliniczne */}
          <div className={`sim-diagnosis-box ${res.alertType}`}>
            <div className="diagnosis-head">
              {res.alertType === 'normal' ? (
                <CheckCircle2 size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <h4>{res.status}</h4>
            </div>
            <p className="diagnosis-comment">{res.comment}</p>
          </div>
        </div>
      </div>

      {isLegendOpen && <PituitaryLegendModal onClose={() => setIsLegendOpen(false)} />}
    </div>
  );
}
