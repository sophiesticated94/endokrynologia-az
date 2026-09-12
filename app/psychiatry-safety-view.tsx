'use client';
import { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Flame, HeartPulse, Activity } from 'lucide-react';
import type { PatientProfile, ActivePrescription } from '@/lib/psychiatry-engine';
import { evaluateHunterCriteria } from '@/lib/psychiatry-engine';
import { PSYCHIATRY_DRUGS } from '@/lib/psychiatry-simulator-data';
import { PsychiatryLithiumTdmLab, PsychiatryQtcLab } from './components/psychiatry-receptor-lab';
import { EvidenceBadge } from './components/psychiatry-lesson-enhancements';
import { hydrateSafetySignsFromPreset } from '@/lib/psychiatry/presets/hydration';

interface Props {
  patient: PatientProfile;
  prescriptions: ActivePrescription[];
  presetData?: Record<string, any>;
  setPatient?: React.Dispatch<React.SetStateAction<PatientProfile>>;
}

export function PsychiatrySafetyView({ patient, prescriptions, presetData, setPatient }: Props) {
  const [clonusState, setClonusState] = useState(() => hydrateSafetySignsFromPreset(presetData));

  const hunter = evaluateHunterCriteria(prescriptions, clonusState);

  // Model NMS
  const hasD2Blocker = prescriptions.some(p => {
    const d = PSYCHIATRY_DRUGS[p.drugId];
    return d && d.d2AntagonistWeight >= 4;
  });

  return (
    <div className="panel" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <span className="eyebrow">SAFETY &amp; EMERGENCY MONITOR</span>
        <h2 style={{ margin: '4px 0 6px 0' }}>Stany Nagłe i Bezpieczeństwo Farmakoterapii</h2>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          Kalkulator kryteriów decyzyjnych Huntera dla zespołu serotoninowego, model NMS, monitor stężeń TDM AGNP 2026 oraz ryzyko QTc.
        </p>
      </div>

      {/* Preset Labs */}
      {presetData?.measuredLevel !== undefined && (
        <div style={{ marginBottom: '20px' }}>
          <PsychiatryLithiumTdmLab
            initialConcentration={presetData.measuredLevel}
            initialHoursPostDose={presetData.hoursSinceDose || 12}
            initialEgfr={presetData.eGfr || patient.labEgfr || 62}
            initialHasNsaid={Array.isArray(presetData.interactingDrugs) && presetData.interactingDrugs.includes('nsaid')}
          />
        </div>
      )}

      {presetData?.rawQt !== undefined && (
        <div style={{ marginBottom: '20px' }}>
          <PsychiatryQtcLab
            initialRawQt={presetData.rawQt}
            initialHr={presetData.hr || 60}
            initialPotassium={patient.labPotassium}
            initialIsFemale={patient.sex === 'K'}
          />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Moduł 1: Kryteria Huntera */}
        <div style={{ border: `1px solid ${hunter.meetsCriteria ? 'var(--danger)' : 'var(--border)'}`, borderRadius: '10px', padding: '18px', background: hunter.meetsCriteria ? 'var(--danger-subtle)' : 'var(--surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flame size={18} color={hunter.meetsCriteria ? 'var(--danger)' : 'var(--accent)'} /> Zespół serotoninowy (Kryteria Huntera)
            </h3>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <EvidenceBadge claimKey="hunter-validation" label="EBM: Hunter 2003" />
              <span className="badge" style={{ background: hunter.meetsCriteria ? 'var(--danger)' : 'var(--accent-subtle)', color: hunter.meetsCriteria ? '#fff' : 'var(--accent)' }}>
                {hunter.meetsCriteria ? 'ZESPÓŁ ROZPOZNANY' : 'BRAK KRYTERIÓW'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Zaznacz objawy stwierdzone u pacjenta przyjmującego leki proserotoninergiczne:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.85rem', marginBottom: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input type="checkbox" checked={clonusState.spontaneousClonus} onChange={e => setClonusState(s => ({ ...s, spontaneousClonus: e.target.checked }))} />
              <span>Spontaniczny klonus</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input type="checkbox" checked={clonusState.inducibleClonus} onChange={e => setClonusState(s => ({ ...s, inducibleClonus: e.target.checked }))} />
              <span>Indukowany klonus</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input type="checkbox" checked={clonusState.ocularClonus} onChange={e => setClonusState(s => ({ ...s, ocularClonus: e.target.checked }))} />
              <span>Klonus oczny</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input type="checkbox" checked={clonusState.hyperreflexia} onChange={e => setClonusState(s => ({ ...s, hyperreflexia: e.target.checked }))} />
              <span>Hiperrefleksja (odruchy)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input type="checkbox" checked={clonusState.tremor} onChange={e => setClonusState(s => ({ ...s, tremor: e.target.checked }))} />
              <span>Drżenie mięśniowe</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input type="checkbox" checked={clonusState.diaphoresis} onChange={e => setClonusState(s => ({ ...s, diaphoresis: e.target.checked }))} />
              <span>Obfite zlewne poty</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input type="checkbox" checked={clonusState.agitation} onChange={e => setClonusState(s => ({ ...s, agitation: e.target.checked }))} />
              <span>Pobudzenie / agitacja</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input type="checkbox" checked={clonusState.hypertonia} onChange={e => setClonusState(s => ({ ...s, hypertonia: e.target.checked }))} />
              <span>Wzmożone napięcie (hipertonia)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', gridColumn: 'span 2' }}>
              <input type="checkbox" checked={clonusState.hyperthermiaOver38} onChange={e => setClonusState(s => ({ ...s, hyperthermiaOver38: e.target.checked }))} />
              <span style={{ color: 'var(--danger)', fontWeight: 600 }}>Gorączka &gt; 38°C</span>
            </label>
          </div>

          <div style={{ padding: '10px', background: 'var(--bg-subtle)', borderRadius: '6px', fontSize: '0.85rem' }}>
            <div><strong>Wynik algorytmu:</strong> {hunter.rationale}</div>
            {hunter.missingInformation && hunter.missingInformation.length > 0 && (
              <div style={{ marginTop: '4px', color: 'var(--warning-text)', fontSize: '0.78rem' }}>
                Luki w wywiadzie: {hunter.missingInformation.join('; ')}
              </div>
            )}
            {hunter.meetsCriteria && (
              <div style={{ marginTop: '8px', color: 'var(--danger-text)', fontWeight: 600 }}>
                Postępowanie: 1. Natychmiast odstaw leki 5-HT, 2. Benzodiazepiny i.v. (diazepam w celu opanowania pobudzenia i mioklonii), 3. Chłodzenie fizykalne i nawadnianie, 4. Cyproheptadyna p.o. (rozważ w umiarkowanych i ciężkich przypadkach; paracetamol jest nieskuteczny w hipertermii mięśniopochodnej).
              </div>
            )}
          </div>
        </div>

        {/* Moduł 2: NMS vs Ostra dystonia */}
        <div style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '18px', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={18} color="var(--warning)" /> Złośliwy Zespół Neuroleptyczny (NMS)
            </h3>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <EvidenceBadge claimKey="strawn-nms-pathophysiology" label="EBM: NMS Strawn 2007" />
              <span className="badge" style={{ background: hasD2Blocker ? 'var(--warning-subtle)' : 'var(--bg-subtle)', color: hasD2Blocker ? 'var(--warning)' : 'var(--text-muted)' }}>
                {hasD2Blocker ? 'BLOKADA D2 AKTYWNA' : 'BRAK BLOKADY D2'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Cechy osiowe: sztywność mięśni typu &quot;rury ołowianej&quot;, hipertermia, wzrost kinazy kreatynowej (CK &gt; 1000 IU/l), tachykardia, mutyzm.
          </p>

          <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '6px', fontSize: '0.85rem' }}>
            <strong>Różnicowanie NMS vs Zespół serotoninowy:</strong>
            <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
              <li><strong>NMS:</strong> Sztywność ołowianej rury, hiporefleksja, porażenie perystaltyki jelit, wysokie CK.</li>
              <li><strong>Serotoninowy:</strong> Klonus (spontaniczny/oczny), hiperrefleksja, biegunka, mydriasis.</li>
            </ul>
            <div style={{ marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.4 }}>
              <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>Postępowanie w NMS (brak uniwersalnego antidotum o statusie RCT):</strong>
              1. Natychmiastowe odstawienie neuroleptyku. 2. Intensywne leczenie wspomagające (chłodzenie, płynoterapia, monitorowanie OIT). 3. Farmakoterapia celowana: dantrolen i.v., bromokryptyna lub amantadyna mogą być rozważane zależnie od ciężkości i protokołu ośrodka (evidence oparty na seriach przypadków).
            </div>
          </div>
        </div>

        {/* Moduł 3: Bezpieczeństwo kardiologiczne QTc (CredibleMeds) */}
        <div style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '18px', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HeartPulse size={18} color="var(--accent)" /> Monitor Kardiologiczny: QTc &amp; TdP
            </h3>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <EvidenceBadge claimKey="crediblemeds-qtc" label="EBM: CredibleMeds" />
              <span className="badge" style={{ background: patient.labPotassium < 3.5 ? 'var(--danger)' : 'var(--accent-subtle)', color: patient.labPotassium < 3.5 ? '#fff' : 'var(--accent)' }}>
                K+: {patient.labPotassium} mmol/l
              </span>
            </div>
          </div>

          <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem' }}>
            Poziom potasu w surowicy: <strong>{patient.labPotassium} mmol/l</strong> (norma 3,5–5,0)
            <input
              type="range"
              min={2.5}
              max={5.5}
              step={0.1}
              value={patient.labPotassium}
              aria-label="Poziom potasu w surowicy"
              onChange={e => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && setPatient) {
                  setPatient(p => ({ ...p, labPotassium: val }));
                }
              }}
              style={{ width: '100%', marginTop: '4px' }}
            />
            {patient.labPotassium < 3.5 && (
              <small style={{ color: 'var(--danger)', display: 'block', fontWeight: 600, marginTop: '4px' }}>
                Hipokaliemia! Istotny modyfikowalny czynnik ryzyka TdP — wymaga pilnej suplementacji potasu i ponownej oceny ryzyka przed podaniem lub eskalacją leków wydłużających QT.
              </small>
            )}
          </label>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            Krytyczny próg: QTc &gt; 500 ms (lub przyrost &gt; 60 ms). Kalkulator Tisdale&apos;a uwzględnia: płeć żeńską, wiek &gt;= 68 lat, hipokaliemię i liczbę leków wydłużających QT.
          </p>
        </div>
      </div>
    </div>
  );
}
