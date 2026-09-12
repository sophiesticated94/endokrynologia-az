'use client';
import { useState, useMemo } from 'react';
import {
  type Sex,
  calculateHeightSds,
  calculateTargetHeight,
  evaluateGrowthVelocity,
  evaluatePredictedAdultHeight,
  evaluateGnRhAxis,
  generateScenarioTrajectory,
} from '../lib/pediatrics-growth-engine.ts';

export function PediatricsGrowthTwinView() {
  const [sex, setSex] = useState<Sex>('M');
  const [ageYears, setAgeYears] = useState<number>(8.0);
  const [heightCm, setHeightCm] = useState<number>(118.0);
  const [weightKg, setWeightKg] = useState<number>(22.0);
  const [fatherH, setFatherH] = useState<number>(178.0);
  const [motherH, setMotherH] = useState<number>(165.0);
  const [prevH, setPrevH] = useState<number>(114.5);
  const [intervalMonths, setIntervalMonths] = useState<number>(12);
  const [boneAge, setBoneAge] = useState<number>(6.5);
  const [hasBoneAge, setHasBoneAge] = useState<boolean>(true);
  const [tannerStage, setTannerStage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [basalLh, setBasalLh] = useState<number>(0.1);
  const [peakLh, setPeakLh] = useState<number>(2.4);
  const [selectedScenario, setSelectedScenario] = useState<'GHD' | 'CPP' | 'CDGP' | 'Turner' | 'CAH'>('GHD');

  // Przełączanie predefiniowanych scenariuszy
  const applyScenario = (sc: 'GHD' | 'CPP' | 'CDGP' | 'Turner' | 'CAH') => {
    setSelectedScenario(sc);
    if (sc === 'GHD') {
      setSex('M');
      setAgeYears(8.0);
      setHeightCm(114.0);
      setPrevH(111.0);
      setIntervalMonths(12);
      setBoneAge(5.5);
      setHasBoneAge(true);
      setTannerStage(1);
      setBasalLh(0.1);
      setPeakLh(1.8);
    } else if (sc === 'CPP') {
      setSex('K');
      setAgeYears(6.5);
      setHeightCm(128.0);
      setPrevH(118.0);
      setIntervalMonths(12);
      setBoneAge(9.0);
      setHasBoneAge(true);
      setTannerStage(3);
      setBasalLh(0.9);
      setPeakLh(12.5);
    } else if (sc === 'CDGP') {
      setSex('M');
      setAgeYears(14.5);
      setHeightCm(150.0);
      setPrevH(145.0);
      setIntervalMonths(12);
      setBoneAge(12.0);
      setHasBoneAge(true);
      setTannerStage(1);
      setBasalLh(0.2);
      setPeakLh(3.8);
    } else if (sc === 'Turner') {
      setSex('K');
      setAgeYears(9.0);
      setHeightCm(119.0);
      setPrevH(115.5);
      setIntervalMonths(12);
      setBoneAge(8.5);
      setHasBoneAge(true);
      setTannerStage(1);
      setBasalLh(2.8);
      setPeakLh(15.0);
    } else if (sc === 'CAH') {
      setSex('K');
      setAgeYears(5.0);
      setHeightCm(116.0);
      setPrevH(108.0);
      setIntervalMonths(12);
      setBoneAge(7.5);
      setHasBoneAge(true);
      setTannerStage(2);
      setBasalLh(0.1);
      setPeakLh(1.2);
    }
  };

  const currentSds = useMemo(() => calculateHeightSds(ageYears, sex, heightCm), [ageYears, sex, heightCm]);
  const targetHResult = useMemo(() => calculateTargetHeight(fatherH, motherH, sex), [fatherH, motherH, sex]);
  const velocityResult = useMemo(
    () => evaluateGrowthVelocity(heightCm, prevH, intervalMonths, ageYears),
    [heightCm, prevH, intervalMonths, ageYears]
  );
  const predictedHeightResult = useMemo(
    () => evaluatePredictedAdultHeight(heightCm, ageYears, hasBoneAge ? boneAge : undefined, targetHResult.targetHeightCm, sex),
    [heightCm, ageYears, hasBoneAge, boneAge, targetHResult.targetHeightCm, sex]
  );
  const gnRhResult = useMemo(() => evaluateGnRhAxis(basalLh, peakLh), [basalLh, peakLh]);
  const trajectoryPoints = useMemo(
    () => generateScenarioTrajectory(selectedScenario, ageYears, heightCm, sex),
    [selectedScenario, ageYears, heightCm, sex]
  );

  return (
    <div className="panel" style={{ margin: '16px 0', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="eyebrow">PEDIATRIC DIGITAL TWIN · AUKSIOLOGIA I POKWITANIE</span>
          <h2 style={{ margin: '4px 0' }}>Growth & Puberty Workbench</h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>
            Predykcje auksologiczne w pasmach ufności, tempo wzrastania, wiek kostny i oś GnRH.
          </p>
        </div>
        <div className="atlas-presets" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['GHD', 'CPP', 'CDGP', 'Turner', 'CAH'] as const).map(sc => (
            <button
              key={sc}
              className={selectedScenario === sc ? 'primary' : 'secondary'}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              onClick={() => applyScenario(sc)}
            >
              {sc === 'GHD' ? 'Niedobór GH (GHD)' : sc === 'CPP' ? 'Przedwczesne (CPP)' : sc === 'CDGP' ? 'Opóźnione (CDGP)' : sc === 'Turner' ? 'Zespół Turnera' : 'WPN (CAH)'}
            </button>
          ))}
        </div>
      </div>

      <hr style={{ margin: '16px 0', borderColor: 'var(--border)' }} />

      {/* Panele kontrolne parametrów pacjenta */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {/* Kolumna 1: Dane podstawowe i auksologia */}
        <div style={{ padding: '12px', background: 'var(--card-bg, rgba(0,0,0,0.03))', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>1. Parametry bieżące dziecka</h4>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
            <label style={{ fontSize: '0.85rem' }}>
              Płeć:{' '}
              <select value={sex} onChange={e => setSex(e.target.value as Sex)}>
                <option value="M">Chłopiec (M)</option>
                <option value="K">Dziewczynka (K)</option>
              </select>
            </label>
            <label style={{ fontSize: '0.85rem' }}>
              Wiek:{' '}
              <input
                type="number"
                step="0.5"
                min="2"
                max="18"
                style={{ width: '60px' }}
                value={ageYears}
                onChange={e => setAgeYears(parseFloat(e.target.value) || 2)}
              />{' '}
              lat
            </label>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '0.85rem' }}>
              Aktualna wysokość: <strong>{heightCm} cm</strong> (SDS: <strong>{currentSds.sds}</strong>, {currentSds.centile})
              <input
                type="range"
                min="80"
                max="190"
                step="0.5"
                value={heightCm}
                onChange={e => setHeightCm(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </label>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
            <label style={{ fontSize: '0.85rem', flex: 1 }}>
              Wzrost ojca (cm):
              <input
                type="number"
                value={fatherH}
                onChange={e => setFatherH(parseFloat(e.target.value) || 170)}
                style={{ width: '100%' }}
              />
            </label>
            <label style={{ fontSize: '0.85rem', flex: 1 }}>
              Wzrost matki (cm):
              <input
                type="number"
                value={motherH}
                onChange={e => setMotherH(parseFloat(e.target.value) || 160)}
                style={{ width: '100%' }}
              />
            </label>
          </div>
        </div>

        {/* Kolumna 2: Dynamika wzrastania i wiek kostny */}
        <div style={{ padding: '12px', background: 'var(--card-bg, rgba(0,0,0,0.03))', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>2. Dynamika wzrostu i dojrzałość szkieletowa</h4>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
            <label style={{ fontSize: '0.85rem', flex: 1 }}>
              Poprzedni wzrost (cm):
              <input
                type="number"
                step="0.5"
                value={prevH}
                onChange={e => setPrevH(parseFloat(e.target.value) || 100)}
                style={{ width: '100%' }}
              />
            </label>
            <label style={{ fontSize: '0.85rem', flex: 1 }}>
              Odstęp (miesiące):
              <input
                type="number"
                min="3"
                max="24"
                value={intervalMonths}
                onChange={e => setIntervalMonths(parseInt(e.target.value, 10) || 12)}
                style={{ width: '100%' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input type="checkbox" checked={hasBoneAge} onChange={e => setHasBoneAge(e.target.checked)} />
              Dostępny wiek kostny z RTG (Greulich-Pyle)
            </label>
            {hasBoneAge && (
              <div style={{ marginTop: '6px' }}>
                <label style={{ fontSize: '0.85rem' }}>
                  Wiek kostny: <strong>{boneAge} lat</strong> (różnica: {Number((boneAge - ageYears).toFixed(1))} lat)
                  <input
                    type="range"
                    min="1"
                    max="18"
                    step="0.5"
                    value={boneAge}
                    onChange={e => setBoneAge(parseFloat(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Kolumna 3: Dojrzewanie i oś gonadotropowa */}
        <div style={{ padding: '12px', background: 'var(--card-bg, rgba(0,0,0,0.03))', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>3. Dojrzewanie i oś GnRH–LH/FSH</h4>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '0.85rem' }}>
              Stadium pokwitania (Tanner I–V):{' '}
              <select value={tannerStage} onChange={e => setTannerStage(parseInt(e.target.value, 10) as any)}>
                <option value="1">Stadium I (prepubertalny, jądra &lt;4 ml / brak thelarche)</option>
                <option value="2">Stadium II (początek pokwitania, thelarche / jądra 4 ml)</option>
                <option value="3">Stadium III (skok wzrostowy, powiększenie piersi / prącia)</option>
                <option value="4">Stadium IV (zaawansowane cechy, menarche u części dziewcząt)</option>
                <option value="5">Stadium V (dojrzałość dorosłego)</option>
              </select>
            </label>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <label style={{ fontSize: '0.85rem', flex: 1 }}>
              Podstawowe LH (IU/l):
              <input
                type="number"
                step="0.1"
                min="0"
                value={basalLh}
                onChange={e => setBasalLh(parseFloat(e.target.value) || 0)}
                style={{ width: '100%' }}
              />
            </label>
            <label style={{ fontSize: '0.85rem', flex: 1 }}>
              Szczyt LH po GnRH (IU/l):
              <input
                type="number"
                step="0.1"
                min="0"
                value={peakLh}
                onChange={e => setPeakLh(parseFloat(e.target.value) || 0)}
                style={{ width: '100%' }}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Panele wyników i predykcji auksologicznych z pasmami ufności */}
      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {/* Wzrost docelowy (Mid-Parental Height) */}
        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--panel-bg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0 }}>Wzrost docelowy rodziców (MPH)</h4>
            <span style={{ fontSize: '0.75rem', background: '#2563eb', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
              {targetHResult.evidenceTier}
            </span>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '8px 0', color: 'var(--primary)' }}>
            {targetHResult.targetHeightCm} cm <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>(SDS: {targetHResult.targetSds})</span>
          </div>
          <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>
            Przedział 95% ufności genetycznej: <strong>{targetHResult.lowerLimitCm} – {targetHResult.upperLimitCm} cm</strong>
          </p>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)' }}>{targetHResult.formulaDescription}</p>
        </div>

        {/* Tempo wzrastania (Growth Velocity) */}
        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--panel-bg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0 }}>Tempo wzrastania (Growth Velocity)</h4>
            <span style={{ fontSize: '0.75rem', background: '#059669', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
              {velocityResult.evidenceTier}
            </span>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '8px 0', color: velocityResult.evaluation === 'zwolnione' ? '#dc2626' : 'var(--primary)' }}>
            {velocityResult.velocityCmPerYear ? `${velocityResult.velocityCmPerYear} cm/rok` : 'Brak danych'}
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>{velocityResult.interpretation}</p>
        </div>

        {/* Prognoza wzrostu ostatecznego (Adult Height Prediction) */}
        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--panel-bg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0 }}>Prognoza wzrostu dorosłego</h4>
            <span style={{ fontSize: '0.75rem', background: '#d97706', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
              {predictedHeightResult.evidenceTier}
            </span>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '8px 0', color: 'var(--primary)' }}>
            {predictedHeightResult.predictedHeightCmRange[0]} – {predictedHeightResult.predictedHeightCmRange[1]} cm
          </div>
          <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>{predictedHeightResult.clinicalNote}</p>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)' }}>Metoda: {predictedHeightResult.method}</p>
        </div>
      </div>

      {/* Ocena osi GnRH */}
      <div style={{ marginTop: '16px', padding: '12px 16px', background: gnRhResult.status === 'aktywacja_centralna' ? 'rgba(217, 119, 6, 0.1)' : 'var(--card-bg, rgba(0,0,0,0.02))', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>Ocena aktywności osi gonadotropowej (GnRH – LH/FSH):</strong>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>[{gnRhResult.evidenceTier}]</span>
        </div>
        <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>{gnRhResult.interpretation}</p>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>Zalecenie: {gnRhResult.recommendation}</p>
      </div>

      {/* Wykres trajektorii w czasie (Symulacja Scenariusza) */}
      <div style={{ marginTop: '20px', padding: '16px', background: 'var(--card-bg, rgba(0,0,0,0.02))', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h4 style={{ margin: 0 }}>Porównanie trajektorii wzrostu w czasie: Scenariusz {selectedScenario}</h4>
          <span style={{ fontSize: '0.75rem', background: '#7c3aed', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
            Simulation-Scenario
          </span>
        </div>
        <p style={{ margin: '0 0 12px 0', fontSize: '0.82rem', color: 'var(--muted)' }}>
          Wykres prezentuje krzywą bez leczenia (czerwona przerywana) vs z optymalną terapią (zielona ciągła) na tle populacyjnego pasma 3.–97. centyla (niebieski obrys).
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
                <th style={{ padding: '6px' }}>Wiek (lata)</th>
                <th style={{ padding: '6px' }}>Dolna norma (3. c.)</th>
                <th style={{ padding: '6px' }}>Mediana (50. c.)</th>
                <th style={{ padding: '6px' }}>Górna norma (97. c.)</th>
                <th style={{ padding: '6px', color: '#dc2626' }}>Bez leczenia</th>
                <th style={{ padding: '6px', color: '#16a34a', fontWeight: 'bold' }}>Z leczeniem</th>
              </tr>
            </thead>
            <tbody>
              {trajectoryPoints.map(p => (
                <tr key={p.age} style={{ borderBottom: '1px solid var(--border, #eee)' }}>
                  <td style={{ padding: '6px' }}>{p.age} lat</td>
                  <td style={{ padding: '6px', color: 'var(--muted)' }}>{p.lowerRangeCm} cm</td>
                  <td style={{ padding: '6px', color: 'var(--muted)' }}>{p.medianHeightCm} cm</td>
                  <td style={{ padding: '6px', color: 'var(--muted)' }}>{p.upperRangeCm} cm</td>
                  <td style={{ padding: '6px', color: '#dc2626' }}>{p.patientUntreatedCm} cm</td>
                  <td style={{ padding: '6px', color: '#16a34a', fontWeight: 'bold' }}>{p.patientTreatedCm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
