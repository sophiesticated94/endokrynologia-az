'use client';
import { Pill, Activity, Zap, ShieldCheck, Plus, Trash2 } from 'lucide-react';
import type { PatientProfile, ActivePrescription } from '@/lib/psychiatry-engine';
import { calculateDrugState } from '@/lib/psychiatry-engine';
import { PSYCHIATRY_DRUGS } from '@/lib/psychiatry-simulator-data';
import { PsychiatryReceptorLab } from './components/psychiatry-receptor-lab';
import { EvidenceBadge } from './components/psychiatry-lesson-enhancements';

interface Props {
  patient: PatientProfile;
  setPatient: (updater: (prev: PatientProfile) => PatientProfile) => void;
  prescriptions: ActivePrescription[];
  setPrescriptions: (updater: (prev: ActivePrescription[]) => ActivePrescription[]) => void;
  presetData?: Record<string, any>;
}

export function PsychiatryPharmacologyView({ patient, setPatient, prescriptions, setPrescriptions, presetData }: Props) {
  const availableDrugs = Object.values(PSYCHIATRY_DRUGS);

  function addDrug(drugId: string) {
    if (prescriptions.some(p => p.drugId === drugId)) return;
    const drug = PSYCHIATRY_DRUGS[drugId];
    if (!drug) return;
    setPrescriptions(prev => [...prev, { drugId, doseMg: drug.defaultDose }]);
  }

  function removeDrug(drugId: string) {
    setPrescriptions(prev => prev.filter(p => p.drugId !== drugId));
  }

  function updateDose(drugId: string, dose: number) {
    setPrescriptions(prev => prev.map(p => (p.drugId === drugId ? { ...p, doseMg: dose } : p)));
  }

  return (
    <div className="panel" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <span className="eyebrow">RECEPTOR SANDBOX &amp; PK/PD</span>
        <h2 style={{ margin: '4px 0 6px 0' }}>Symulator Farmakokinetyki i Wysycenia Receptorów</h2>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          Analizuj kierunek ekspozycji, wpływ CYP, wyniki TDM oraz populacyjne modele receptorowe z jawnym poziomem dowodów.
        </p>
      </div>

      {presetData?.antagonistDrug && (
        <div style={{ marginBottom: '20px' }}>
          <PsychiatryReceptorLab
            initialDrug={presetData.antagonistDrug as any}
            initialDose={presetData.antagonistDoseMg}
          />
        </div>
      )}

      {presetData?.inhibitor && (
        <div style={{ padding: '12px 16px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
          <strong style={{ color: '#1e40af', display: 'block', marginBottom: '4px' }}>
            Interakcja CYP: {presetData.inhibitor} (inhibitor {presetData.targetEnzyme}) + {presetData.substrate}
          </strong>
          <span style={{ color: '#1e3a8a' }}>{presetData.expectedEffect}</span>
        </div>
      )}

      {/* Profil enzymatyczny pacjenta */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', background: 'var(--bg-subtle)', padding: '14px', borderRadius: '8px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Status CYP2D6 (CPIC):</label>
          <select
            value={patient.cyp2d6Phenotype}
            onChange={e => setPatient(p => ({ ...p, cyp2d6Phenotype: e.target.value as any }))}
            style={{ width: '100%', padding: '6px' }}
          >
            <option value="NM">Normal Metabolizer (NM) — norma</option>
            <option value="IM">Intermediate (IM) — wolniejszy metabolizm</option>
            <option value="PM">Poor Metabolizer (PM) — brak enzymu (kumulacja)</option>
            <option value="UM">Ultrarapid (UM) — szybki rozpad leku</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Palenie tytoniu (CYP1A2):</label>
          <select
            value={patient.substanceUse}
            onChange={e => setPatient(p => ({ ...p, substanceUse: e.target.value as any }))}
            style={{ width: '100%', padding: '6px' }}
          >
            <option value="brak">Nie pali (CYP1A2 wyjściowy)</option>
            <option value="tyton">Pali tytoń (indukcja CYP1A2, klirens szybszy o ~50%)</option>
            <option value="zaprzestanie_palenia">Zaprzestanie palenia (deindukcja CYP1A2, skok klozapiny o 50–100%)</option>
          </select>
          {patient.substanceUse === 'zaprzestanie_palenia' && (
            <div style={{ marginTop: '6px', fontSize: '0.75rem' }}>
              <EvidenceBadge claimKey="clozapine-smoking-cyp1a2" label="EBM: Deindukcja CYP1A2" />
            </div>
          )}
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Adherencja pacjenta (%): <strong>{patient.adherencePercent}%</strong></label>
          <input
            type="range"
            min={10}
            max={100}
            step={10}
            value={patient.adherencePercent}
            onChange={e => setPatient(p => ({ ...p, adherencePercent: Number(e.target.value) }))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Dodawanie leku */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Dodaj lek do schematu:</span>
        {availableDrugs.map(d => {
          const isAdded = prescriptions.some(p => p.drugId === d.id);
          return (
            <button
              key={d.id}
              className={isAdded ? 'primary' : 'secondary'}
              disabled={isAdded}
              onClick={() => addDrug(d.id)}
              style={{ fontSize: '0.85rem', padding: '6px 12px' }}
            >
              <Plus size={14} /> {d.name} ({d.class})
            </button>
          );
        })}
      </div>

      {/* Karty aktywnych leków */}
      {prescriptions.length === 0 ? (
        <div style={{ padding: '30px', textAlign: 'center', background: 'var(--surface)', borderRadius: '8px', border: '1px dashed var(--border)' }}>
          <Pill size={32} color="var(--text-muted)" style={{ marginBottom: '8px' }} />
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Brak włączonych leków. Kliknij powyższe przyciski, aby włączyć leczenie farmakologiczne.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {prescriptions.map(rx => {
            const calc = calculateDrugState(rx, patient);
            const { drug } = calc;

            return (
              <div
                key={rx.drugId}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '18px',
                  background: 'var(--surface)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Pill size={18} color="var(--accent)" /> {drug.name}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Klasa: {drug.class} · {drug.warningNotes}</span>
                  </div>
                  <button
                    className="icon-button"
                    onClick={() => removeDrug(rx.drugId)}
                    title="Usuń lek"
                    style={{ color: 'var(--danger)' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Suwak dawki */}
                <div style={{ marginBottom: '14px', background: 'var(--bg-subtle)', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.85rem' }}>Dawka dobowa:</span>
                    <strong>{rx.doseMg} {drug.doseUnit}</strong>
                  </div>
                  <input
                    type="range"
                    min={drug.minDose}
                    max={drug.maxDose}
                    step={drug.stepDose}
                    value={rx.doseMg}
                    onChange={e => updateDose(rx.drugId, Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>Min: {drug.minDose}</span>
                    <span>Standard: {drug.defaultDose}</span>
                    <span>Max: {drug.maxDose}</span>
                  </div>
                </div>

                {/* Parametry obliczeniowe */}
                <div style={{ fontSize: '0.85rem', marginBottom: '12px', background: 'var(--bg-subtle)', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ marginBottom: '4px' }}>
                    Status ekspozycji: <strong>{calc.estimatedCss}</strong>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    {calc.exposureExplanation}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span>Przedział referencyjny TDM (AGNP 2026): <strong>{drug.agnpReferenceRange}</strong></span>
                    <span className="badge" style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>{calc.evidenceCategory}</span>
                  </div>
                </div>

                {/* Wykres wysycenia SERT / D2 */}
                {calc.sertOccupancyPercent > 0 && (
                  <div style={{ marginBottom: '12px', padding: '10px', background: 'var(--bg-subtle)', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600 }}>Wysycenie SERT (transporter 5-HT):</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <EvidenceBadge claimKey="meyer-sert-occupancy" label="MODELLED · Meyer PET fit" />
                        <strong>~{calc.sertOccupancyPercent}%</strong>
                      </div>
                    </div>
                    <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${calc.sertOccupancyPercent}%`,
                          background: 'var(--accent)',
                        }}
                      />
                    </div>
                    <small style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                      W klasycznych badaniach PET minimalne dawki terapeutyczne badanych SSRI wiązały się ze statystycznym plateau wysycenia (~80%). Nie stanowi to uniwersalnego progu skuteczności klinicznej.
                    </small>
                  </div>
                )}

                {calc.d2OccupancyPercent > 0 && (
                  <div style={{ marginBottom: '12px', padding: '10px', background: 'var(--bg-subtle)', borderRadius: '6px' }}>
                    {calc.d2Model?.pharmacologicClass === 'partial_agonist' ? (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600 }}>Wiązanie D2 (częściowy agonista):</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <EvidenceBadge claimKey="kapur-d2-threshold" label="Heurystyka Kapura: Nie dotyczy" />
                            <strong>~{calc.d2OccupancyPercent}%</strong>
                          </div>
                        </div>
                        <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '6px' }}>
                          <div style={{ height: '100%', width: `${calc.d2OccupancyPercent}%`, background: 'var(--accent)' }} />
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                          <strong>Kapur antagonist heuristic: not applicable.</strong> Aktywność wewnętrzna wynosi ~{calc.d2Model?.intrinsicActivityPercent}%. Wysokie wiązanie receptorowe nie generuje typowej blokady dopaminergicznej, jednak akatyzja pozostaje istotnym powikłaniem.
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600 }}>Wysycenie D2 (antagonista D2):</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <EvidenceBadge claimKey="kapur-d2-threshold" label="PET Kapur 2000" />
                            <strong>~{calc.d2OccupancyPercent}%</strong>
                          </div>
                        </div>
                        <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '6px' }}>
                          <div
                            style={{
                              height: '100%',
                              width: `${calc.d2OccupancyPercent}%`,
                              background:
                                calc.d2OccupancyPercent > 80
                                  ? 'var(--danger)'
                                  : calc.d2OccupancyPercent >= 65
                                  ? 'var(--accent)'
                                  : 'var(--warning)',
                            }}
                          />
                        </div>
                        <small style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>
                          Historyczna heurystyka PET Kapura: 65–80% dla czystych antagonistów. Powyżej 80% obserwuje się statystyczny skok ryzyka EPS.
                        </small>
                      </div>
                    )}
                  </div>
                )}

                {/* Ostrzeżenia */}
                {calc.safetyAlerts.map((alert, i) => (
                  <div key={i} style={{ fontSize: '0.8rem', padding: '6px 10px', background: 'var(--warning-subtle)', color: 'var(--warning-text)', borderRadius: '4px', marginTop: '6px' }}>
                    {alert}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
