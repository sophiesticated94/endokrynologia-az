'use client';
import { useState, useEffect } from 'react';
import { User, Search, Pill, ShieldAlert, Sparkles, Sliders } from 'lucide-react';
import type { PatientProfile, ActivePrescription } from '@/lib/psychiatry-engine';
import { getPsychiatryPreset } from '@/lib/psychiatry/presets';
import {
  hydratePsychiatryPatient,
  hydratePsychiatryPrescriptions,
} from '@/lib/psychiatry/presets/hydration';
import { EvidenceInspectorProvider } from './components/evidence-inspector-context';
import { PsychiatryTwinView } from './psychiatry-twin-view';
import { PsychiatryDiagnosisView } from './psychiatry-diagnosis-view';
import { PsychiatryPharmacologyView } from './psychiatry-pharmacology-view';
import { PsychiatrySafetyView } from './psychiatry-safety-view';

export { hydratePsychiatryPatient, hydratePsychiatryPrescriptions };

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

export function PsychiatryCommandCenter({ initialPresetId }: { initialPresetId?: string } = {}) {
  const activePreset = initialPresetId ? getPsychiatryPreset(initialPresetId) : undefined;

  const getTargetTab = (tabName?: string): 'twin' | 'diagnosis' | 'pharmacology' | 'safety' => {
    if (tabName === 'diagnostic') return 'diagnosis';
    if (tabName === 'pharmacology') return 'pharmacology';
    if (tabName === 'safety') return 'safety';
    return 'twin';
  };

  const [activeTab, setActiveTab] = useState<'twin' | 'diagnosis' | 'pharmacology' | 'safety'>(() =>
    getTargetTab(activePreset?.tab),
  );
  const [patient, setPatient] = useState<PatientProfile>(() =>
    hydratePsychiatryPatient(defaultPatient, activePreset?.data)
  );
  const [timelineWeek, setTimelineWeek] = useState(0);
  const [prescriptions, setPrescriptions] = useState<ActivePrescription[]>(() =>
    hydratePsychiatryPrescriptions(activePreset?.data, activePreset?.id)
  );

  useEffect(() => {
    if (!initialPresetId) return;
    const p = getPsychiatryPreset(initialPresetId);
    if (!p) return;
    setActiveTab(getTargetTab(p.tab));
    setPatient(prev => hydratePsychiatryPatient(prev, p.data));
    setPrescriptions(hydratePsychiatryPrescriptions(p.data, p.id));
  }, [initialPresetId]);

  return (
    <EvidenceInspectorProvider>
      <div className="psychiatry-command-center" style={{ marginTop: '12px' }}>
      {activePreset && (
        <div className="preset-loaded-banner mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Sliders size={16} className="text-indigo-600" />
            <div>
              <span className="font-bold text-indigo-950">Załadowany profil kliniczny: {activePreset.title}</span>
              <p className="text-slate-600 text-[11px] line-clamp-1">{activePreset.patientSummary}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 font-semibold rounded-full text-[10px] uppercase">
            Preset: {activePreset.tab}
          </span>
        </div>
      )}
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
          presetData={activePreset?.data}
        />
      )}

      {activeTab === 'safety' && (
        <PsychiatrySafetyView
          patient={patient}
          prescriptions={prescriptions}
          presetData={activePreset?.data}
        />
      )}
      </div>
    </EvidenceInspectorProvider>
  );
}
