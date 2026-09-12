'use client';
import { User, Clock, AlertTriangle, Activity, HeartPulse } from 'lucide-react';
import type { PatientProfile } from '@/lib/psychiatry-engine';

interface Props {
  patient: PatientProfile;
  setPatient: (updater: (prev: PatientProfile) => PatientProfile) => void;
  timelineWeek: number;
  setTimelineWeek: (w: number) => void;
}

export function PsychiatryTwinView({ patient, setPatient, timelineWeek, setTimelineWeek }: Props) {
  const weeks = [0, 2, 4, 8, 12, 52];

  return (
    <div className="panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <span className="eyebrow">PSYCHIATRIC DIGITAL TWIN</span>
          <h2 style={{ margin: '4px 0 6px 0' }}>Wirtualny Pacjent Psychiatryczny</h2>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            Modeluj profil kliniczny, czynniki biologiczne, styl życia i śledź ewolucję w czasie.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className="badge" style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
            Tydzień: {timelineWeek}
          </span>
        </div>
      </div>

      {/* Oś czasu */}
      <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '10px', marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <Clock size={16} />
          <strong>Oś czasu terapii (Timeline leczenia):</strong>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {weeks.map(w => (
            <button
              key={w}
              className={timelineWeek === w ? 'primary' : 'secondary'}
              style={{ minWidth: '80px', padding: '8px 14px' }}
              onClick={() => setTimelineWeek(w)}
            >
              {w === 0 ? 'Dzień 0 (start)' : `Tydzień ${w}`}
            </button>
          ))}
        </div>
      </div>

      {/* Formularz profilu wirtualnego pacjenta */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
        {/* Kolumna 1: Demografia i czas trwania */}
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 12px 0' }}>
            <User size={16} /> Profil demograficzny i somatyczny
          </h4>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Wiek pacjenta: <strong>{patient.age} lat</strong>
            <input
              type="range"
              min={18}
              max={85}
              value={patient.age}
              onChange={e => setPatient(p => ({ ...p, age: Number(e.target.value) }))}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Czas trwania obecnych objawów: <strong>{patient.symptomDurationWeeks} tyg.</strong>
            <input
              type="range"
              min={1}
              max={52}
              value={patient.symptomDurationWeeks}
              onChange={e => setPatient(p => ({ ...p, symptomDurationWeeks: Number(e.target.value) }))}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            TSH (tarczyca): <strong>{patient.labTsh} mIU/l</strong> (norma 0,4–4,0)
            <input
              type="range"
              min={0.1}
              max={15}
              step={0.1}
              value={patient.labTsh}
              onChange={e => setPatient(p => ({ ...p, labTsh: Number(e.target.value) }))}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            eGFR nerkowy: <strong>{patient.labEgfr} ml/min</strong> (kluczowe dla litu)
            <input
              type="range"
              min={15}
              max={120}
              value={patient.labEgfr}
              onChange={e => setPatient(p => ({ ...p, labEgfr: Number(e.target.value) }))}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </label>
        </div>

        {/* Kolumna 2: Objawy afektywne osiowe */}
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 12px 0' }}>
            <Activity size={16} /> Objawy depresyjne i napęd
          </h4>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={patient.depressedMood}
              onChange={e => setPatient(p => ({ ...p, depressedMood: e.target.checked }))}
            />
            <span>Obniżony nastrój (dysforia, smutek)</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={patient.anhedonia}
              onChange={e => setPatient(p => ({ ...p, anhedonia: e.target.checked }))}
            />
            <span>Anhedonia (brak odczuwania przyjemności)</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={patient.lowEnergy}
              onChange={e => setPatient(p => ({ ...p, lowEnergy: e.target.checked }))}
            />
            <span>Uogólniona utrata energii i męczliwość</span>
          </label>
          <div style={{ marginTop: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem' }}>Wzorzec snu:</label>
            <select
              value={patient.sleepPattern}
              onChange={e => setPatient(p => ({ ...p, sleepPattern: e.target.value as any }))}
              style={{ width: '100%', padding: '6px' }}
            >
              <option value="prawidlowy">Prawidłowy sen</option>
              <option value="bezsennosc_wczesna">Trudności z zasypianiem</option>
              <option value="bezsennosc_pozna">Wczesne poranne budzenie (&gt;2h wcześniej)</option>
              <option value="hipersomnia">Hipersomnia (&gt;10h snu, depresja atypowa)</option>
              <option value="zmniejszona_potrzeba_snu">Zmniejszona potrzeba snu bez zmęczenia (ChAD)</option>
            </select>
          </div>
        </div>

        {/* Kolumna 3: Czerwone flagi ChAD i suicydologia */}
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 12px 0' }}>
            <AlertTriangle size={16} color="var(--warning)" /> Czerwone flagi i bezpieczeństwo
          </h4>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={patient.elevatedExpansiveMood}
              onChange={e => setPatient(p => ({ ...p, elevatedExpansiveMood: e.target.checked }))}
            />
            <span>Ekspansywny / euforyczny nastrój</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={patient.flightOfIdeas}
              onChange={e => setPatient(p => ({ ...p, flightOfIdeas: e.target.checked }))}
            />
            <span>Gonitwa myśli / przyspieszony tok mowy</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={patient.familyHistoryBipolar}
              onChange={e => setPatient(p => ({ ...p, familyHistoryBipolar: e.target.checked }))}
            />
            <span>Wywiad rodzinny ChAD (krewni I stopnia)</span>
          </label>
          <label style={{ display: 'block', marginTop: '10px' }}>
            Skala ryzyka samobójczego C-SSRS: <strong>Poziom {patient.suicidalIdeationLevel}/5</strong>
            <input
              type="range"
              min={0}
              max={5}
              value={patient.suicidalIdeationLevel}
              onChange={e => setPatient(p => ({ ...p, suicidalIdeationLevel: Number(e.target.value) as any }))}
              style={{ width: '100%', marginTop: '4px' }}
            />
            <small style={{ color: 'var(--text-muted)' }}>
              {patient.suicidalIdeationLevel === 0 && '0: Brak myśli o śmierci'}
              {patient.suicidalIdeationLevel === 1 && '1: Pasywne pragnienie śmierci'}
              {patient.suicidalIdeationLevel === 2 && '2: Niespecyficzne myśli'}
              {patient.suicidalIdeationLevel === 3 && '3: Myśli z metodami bez planu'}
              {patient.suicidalIdeationLevel === 4 && '4: Myśli z intencją'}
              {patient.suicidalIdeationLevel === 5 && '5: Myśli ze szczegółowym planem i intencją (PILNE)'}
            </small>
          </label>
        </div>
      </div>
    </div>
  );
}
