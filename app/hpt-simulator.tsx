'use client';
import { useState, useMemo, useEffect } from 'react';
import {
  Activity,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  X,
  BookOpen,
  GraduationCap,
  Layers,
  ArrowRight,
  Sliders,
  Info,
} from 'lucide-react';

import {
  type SimulatorState,
  defaultState,
  type Preset,
  presets,
  calculateHormones,
  simulatorLegend,
} from '../lib/simulator';

export {
  type SimulatorState,
  defaultState,
  type Preset,
  presets,
  calculateHormones,
  simulatorLegend,
};


export function HptLegendModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'parameters' | 'hormones' | 'curriculum'>('parameters');

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
      aria-labelledby="legend-modal-title"
    >
      <div className="hpt-legend-dialog">
        <div className="legend-dialog-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} className="icon-accent" />
            <h2 id="legend-modal-title">Przewodnik i legenda symulatora osi HPT</h2>
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

        {/* Zakładki */}
        <div className="legend-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'parameters'}
            className={`legend-tab-btn ${activeTab === 'parameters' ? 'active' : ''}`}
            onClick={() => setActiveTab('parameters')}
          >
            <Sliders size={15} /> Suwaki i parametry ({simulatorLegend.parameters.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'hormones'}
            className={`legend-tab-btn ${activeTab === 'hormones' ? 'active' : ''}`}
            onClick={() => setActiveTab('hormones')}
          >
            <Activity size={15} /> Hormony i normy ({simulatorLegend.hormones.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'curriculum'}
            className={`legend-tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
            onClick={() => setActiveTab('curriculum')}
          >
            <GraduationCap size={15} /> Ścieżka poznawcza w kursie
          </button>
        </div>

        <div className="legend-content-body">
          {activeTab === 'parameters' && (
            <div className="legend-cards-list">
              {simulatorLegend.parameters.map(param => (
                <div key={param.id} className="legend-item-card">
                  <div className={`legend-badge ${param.badgeType || 'default'}`}>{param.badge}</div>
                  <h3>{param.title}</h3>
                  <p>{param.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'hormones' && (
            <div className="legend-cards-list">
              {simulatorLegend.hormones.map(hormone => (
                <div key={hormone.id} className="legend-item-card">
                  <div className="legend-badge">{hormone.badge}</div>
                  <h3>{hormone.name} — Norma: {hormone.normalRange}</h3>
                  <p>{hormone.description}</p>
                  {hormone.bullets && hormone.bullets.length > 0 && (
                    <ul className="legend-bullets">
                      {hormone.bullets.map((b, idx) => (
                        <li key={idx}>
                          <span dangerouslySetInnerHTML={{ __html: b.replace(/<strong>/g, '<strong>').replace(/<\/strong>/g, '</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div className="legend-item-card info-box">
                <h4>Matematyczna natura ujemnego sprzężenia zwrotnego</h4>
                <p>
                  Zależność między FT4 a TSH jest <strong>log-liniowa</strong>: nawet niewielki spadek FT4
                  w granicach normy może wywołać kilkukrotny wzrost TSH. Dlatego badanie TSH pozwala wykryć
                  subkliniczną niedoczynność lub nadczynność zanim stężenie wolnych hormonów przekroczy granice referencyjne.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="curriculum-guide">
              <div className="curriculum-intro-card">
                <Sparkles size={20} className="icon-accent" />
                <div>
                  <strong>Dlaczego w symulatorze widzisz TRAb, tiamazol i LT4, skoro to początek kursu?</strong>
                  <p>
                    Symulator osi HPT to narzędzie przekrojowe — łączy fizjologię zdrowego organizmu z patologią
                    i farmakoterapią. Nie musisz znać wszystkich pojęć od razu! W kursie poznajesz je krok po kroku:
                  </p>
                </div>
              </div>

              <div className="curriculum-timeline">
                {simulatorLegend.curriculum.map(step => (
                  <div key={step.lessonId} className={`timeline-item ${step.isCurrent ? 'active-focus' : ''}`}>
                    <div className="timeline-marker">{step.lessonNumber}</div>
                    <div className="timeline-content">
                      <h4>{step.title}</h4>
                      <p>{step.focus}</p>
                      <span className={`timeline-tag ${step.isCurrent ? 'current' : ''}`}>{step.tag}</span>
                    </div>
                  </div>
                ))}
              </div>


              <div className="curriculum-tip">
                <Info size={18} />
                <p>
                  <strong>Wskazówka:</strong> Możesz traktować symulator jako interaktywną piaskownicę. Wracaj do niego
                  po ukończeniu każdej kolejnej lekcji i sprawdzaj, jak nowo zdobyta wiedza przekłada się na zachowanie
                  całego układu hormonalnego!
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="legend-dialog-footer">
          <button type="button" className="primary" onClick={onClose}>
            Wróć do symulatora <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function HptSimulator({ embedded = false }: { embedded?: boolean }) {
  const [state, setState] = useState<SimulatorState>(defaultState);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const calculated = useMemo(() => calculateHormones(state), [state]);

  function loadPreset(p: Preset) {
    setState({ ...p.state });
  }

  return (
    <div className={`simulator-wrapper ${embedded ? 'embedded' : 'standalone'}`}>
      <div className="simulator-header">
        <div>
          <span className="eyebrow">
            <Activity size={15} /> SYMULATOR FIZJOLOGICZNY OSI HPT
          </span>
          <h2>Jak hormony wpływają na siebie?</h2>
          <p>
            Eksperymentuj ze sprawnością tarczycy, przysadki oraz dawkami leków, aby obserwować
            ujemne sprzężenie zwrotne na żywo.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="secondary"
            onClick={() => setIsLegendOpen(true)}
            title="Wyjaśnienie parametrów, pojęć medycznych i ścieżki dydaktycznej"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <HelpCircle size={15} /> Legenda i pojęcia
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => setState(defaultState)}
            title="Zresetuj parametry do normy"
          >
            <RefreshCw size={15} /> Reset
          </button>
        </div>
      </div>


      {/* Szybkie presety kliniczne */}
      <div className="presets-bar" aria-label="Presety kliniczne">
        <span className="presets-label">Scenariusze kliniczne:</span>
        <div className="presets-scroll">
          {presets.map(p => (
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
        {/* Kolumna 1: Suwaki i sterowanie parametrami */}
        <div className="sim-controls-panel">
          <h3>
            <Sparkles size={16} /> Parametry narządowe i leki
          </h3>

          <div className="control-group">
            <div className="control-label">
              <span>Wydolność tarczycy (komórki pęcherzykowe)</span>
              <strong>{state.thyroidCapacity}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={state.thyroidCapacity}
              onChange={e => setState(v => ({ ...v, thyroidCapacity: Number(e.target.value) }))}
            />
            <small>0% = atrofia/tyreoidektomia, 100% = norma, 200% = wole hiperfunkcyjne</small>
          </div>

          <div className="control-group">
            <div className="control-label">
              <span>Stymulacja przeciwciałami TRAb</span>
              <strong>{state.trabStimulation} / 10</strong>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={state.trabStimulation}
              onChange={e => setState(v => ({ ...v, trabStimulation: Number(e.target.value) }))}
            />
            <small>Autonomiczne pobudzanie receptora TSH (Choroba Gravesa-Basedowa)</small>
          </div>

          <div className="control-group">
            <div className="control-label">
              <span>Czynność wydzielnicza przysadki mózgowej</span>
              <strong>{state.pituitaryFunction}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={state.pituitaryFunction}
              onChange={e => setState(v => ({ ...v, pituitaryFunction: Number(e.target.value) }))}
            />
            <small>Niski poziom symuluje uszkodzenie przedniego płata (makrogruczolak, operacja)</small>
          </div>

          <div className="control-divider">Farmakoterapia</div>

          <div className="control-group">
            <div className="control-label">
              <span>Doustna lewotyroksyna (LT4)</span>
              <strong>{state.exogenousLT4} µg/dobę</strong>
            </div>
            <input
              type="range"
              min="0"
              max="250"
              step="25"
              value={state.exogenousLT4}
              onChange={e => setState(v => ({ ...v, exogenousLT4: Number(e.target.value) }))}
            />
            <small>Egzogenna tyroksyna bezpośrednio zasilająca pulę obwodową</small>
          </div>

          <div className="control-group">
            <div className="control-label">
              <span>Tyreostatyk (Tiamazol — blok TPO)</span>
              <strong>{state.thiamazoleDose} mg/dobę</strong>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={state.thiamazoleDose}
              onChange={e => setState(v => ({ ...v, thiamazoleDose: Number(e.target.value) }))}
            />
            <small>Hamuje organifikację jodu i syntezę hormonów w tarczycy</small>
          </div>
        </div>

        {/* Kolumna 2: Wyniki laboratoryjne i dynamiczny stan */}
        <div className="sim-results-panel">
          <h3>Odpowiedź osi w czasie rzeczywistym</h3>

          {/* Karty wyników hormonów */}
          <div className="hormone-readings">
            <div className={`reading-card ${calculated.tsh < 0.4 ? 'low' : calculated.tsh > 4.0 ? 'high' : 'normal'}`}>
              <small>TSH (tyreotropina)</small>
              <strong>{calculated.tsh} <span className="unit">mIU/l</span></strong>
              <span className="ref-range">Norma: 0,4–4,0 mIU/l</span>
            </div>

            <div className={`reading-card ${calculated.ft4 < 12 ? 'low' : calculated.ft4 > 22 ? 'high' : 'normal'}`}>
              <small>FT4 (wolna T4)</small>
              <strong>{calculated.ft4} <span className="unit">pmol/l</span></strong>
              <span className="ref-range">Norma: 12,0–22,0 pmol/l</span>
            </div>

            <div className={`reading-card ${calculated.ft3 < 3.1 ? 'low' : calculated.ft3 > 6.8 ? 'high' : 'normal'}`}>
              <small>FT3 (wolna T3)</small>
              <strong>{calculated.ft3} <span className="unit">pmol/l</span></strong>
              <span className="ref-range">Norma: 3,1–6,8 pmol/l</span>
            </div>
          </div>

          {/* Diagnoza i komentarz patofizjologiczny */}
          <div className={`sim-diagnosis-box ${calculated.alertType}`}>
            <div className="diagnosis-head">
              {calculated.alertType === 'normal' ? (
                <CheckCircle2 size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <strong>{calculated.status}</strong>
            </div>
            <p>{calculated.comment}</p>
          </div>

          {/* Miniaturowy schemat przepływu sygnału */}
          <div className="flow-visualizer">
            <div className="flow-organ">
              <span>Podwzgórze</span>
              <small>TRH</small>
            </div>
            <span className="flow-arrow">↓</span>
            <div className={`flow-organ ${state.pituitaryFunction < 50 ? 'impaired' : ''}`}>
              <span>Przysadka</span>
              <strong>TSH: {calculated.tsh} mIU/l</strong>
            </div>
            <span className="flow-arrow">
              {calculated.ft4 > 22 ? '⟵ SILNA SUPRESJA (−) ⟵' : '↓'}
            </span>
            <div className={`flow-organ ${state.thyroidCapacity < 40 ? 'impaired' : state.trabStimulation > 3 ? 'overactive' : ''}`}>
              <span>Tarczyca</span>
              <strong>FT4: {calculated.ft4} pmol/l</strong>
            </div>
          </div>
        </div>
      </div>

      {isLegendOpen && <HptLegendModal onClose={() => setIsLegendOpen(false)} />}
    </div>
  );
}
