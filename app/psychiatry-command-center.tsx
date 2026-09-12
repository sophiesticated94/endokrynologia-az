'use client';
import { useState } from 'react';
import { User, Search, Pill, ShieldAlert, Sparkles } from 'lucide-react';
import type { PatientProfile, ActivePrescription } from '@/lib/psychiatry-engine';
import { PsychiatryTwinView } from './psychiatry-twin-view';
import { PsychiatryDiagnosisView } from './psychiatry-diagnosis-view';
import { PsychiatryPharmacologyView } from './psychiatry-pharmacology-view';
import { PsychiatrySafetyView } from './psychiatry-safety-view';

const defaultPatient: PatientProfile = {
  age: 34,
  sex: 'K',
  symptomDurationWeeks: 6,
  depressedMood: true,
  anhedonia: true,
  lowEnergy: true,
  sleepPattern: 'bezsennosc_pozna',
  appetiteWeight: 'spadek_jadlowstret',
  psychomotor: 'spowolnienie',
  guiltWorthlessness: true,
  concentrationImpacting: true,
  suicidalIdeationLevel: 1,
  elevatedExpansiveMood: false,
  flightOfIdeas: false,
  grandiosityOrPsychosis: false,
  excessiveRiskActivities: false,
  familyHistoryBipolar: false,
  substanceUse: 'brak',
  somaticComorbidities: ['brak'],
  labTsh: 2.1,
  labEgfr: 95,
  labPotassium: 4.2,
  cyp2d6Phenotype: 'NM',
  cyp2c19Phenotype: 'NM',
  adherencePercent: 90,
};

export function PsychiatryCommandCenter() {
  const [activeTab, setActiveTab] = useState<'twin' | 'diagnosis' | 'pharmacology' | 'safety'>('twin');
  const [patient, setPatient] = useState<PatientProfile>(defaultPatient);
  const [timelineWeek, setTimelineWeek] = useState(0);
  const [prescriptions, setPrescriptions] = useState<ActivePrescription[]>([
    { drugId: 'sertraline', doseMg: 50 },
  ]);

  return (
    <div className="psychiatry-command-center" style={{ marginTop: '12px' }}>
      {/* Pasek zakładek Command Center */}
      <div className="filter-bar" style={{ marginBottom: '20px', gap: '8px', flexWrap: 'wrap' }}>
        <button
          className={activeTab === 'twin' ? 'active' : ''}
          onClick={() => setActiveTab('twin')}
        >
          <User size={15} /> 1. Patient Twin &amp; Timeline
        </button>
        <button
          className={activeTab === 'diagnosis' ? 'active' : ''}
          onClick={() => setActiveTab('diagnosis')}
        >
          <Search size={15} /> 2. Diagnostic Detective (ICD-11 / DSM-5)
        </button>
        <button
          className={activeTab === 'pharmacology' ? 'active' : ''}
          onClick={() => setActiveTab('pharmacology')}
        >
          <Pill size={15} /> 3. Receptor Sandbox &amp; PK/PD
        </button>
        <button
          className={activeTab === 'safety' ? 'active' : ''}
          onClick={() => setActiveTab('safety')}
        >
          <ShieldAlert size={15} /> 4. Safety &amp; Emergency (Hunter / NMS / QTc)
        </button>
      </div>

      {/* Aktywny widok */}
      {activeTab === 'twin' && (
        <PsychiatryTwinView
          patient={patient}
          setPatient={setPatient}
          timelineWeek={timelineWeek}
          setTimelineWeek={setTimelineWeek}
        />
      )}

      {activeTab === 'diagnosis' && (
        <PsychiatryDiagnosisView patient={patient} />
      )}

      {activeTab === 'pharmacology' && (
        <PsychiatryPharmacologyView
          patient={patient}
          setPatient={setPatient}
          prescriptions={prescriptions}
          setPrescriptions={setPrescriptions}
        />
      )}

      {activeTab === 'safety' && (
        <PsychiatrySafetyView
          patient={patient}
          prescriptions={prescriptions}
        />
      )}
    </div>
  );
}
