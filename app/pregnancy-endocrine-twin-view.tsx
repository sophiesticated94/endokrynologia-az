'use client';
import { useState, useMemo } from 'react';
import {
  calculateGestationalProfile,
  evaluateOgtt75g,
  evaluateNeonatalTransition,
} from '../lib/pregnancy-endocrine-engine.ts';

export function PregnancyEndocrineTwinView() {
  const [week, setWeek] = useState<number>(24);
  const [selectedScenario, setSelectedScenario] = useState<
    'normal' | 'hashimoto_no_adj' | 'graves_trab' | 'gdm' | 'pgdm' | 'phpt'
  >('gdm');

  // Manual overrides for OGTT
  const [fastingGluc, setFastingGluc] = useState<number>(94);
  const [oneHourGluc, setOneHourGluc] = useState<number>(162);
  const [twoHourGluc, setTwoHourGluc] = useState<number>(138);

  const applyScenario = (
    sc: 'normal' | 'hashimoto_no_adj' | 'graves_trab' | 'gdm' | 'pgdm' | 'phpt'
  ) => {
    setSelectedScenario(sc);
    if (sc === 'normal') {
      setWeek(24);
      setFastingGluc(84);
      setOneHourGluc(135);
      setTwoHourGluc(115);
    } else if (sc === 'hashimoto_no_adj') {
      setWeek(6);
      setFastingGluc(86);
      setOneHourGluc(130);
      setTwoHourGluc(112);
    } else if (sc === 'graves_trab') {
      setWeek(8);
      setFastingGluc(88);
      setOneHourGluc(138);
      setTwoHourGluc(120);
    } else if (sc === 'gdm') {
      setWeek(26);
      setFastingGluc(95);
      setOneHourGluc(164);
      setTwoHourGluc(142);
    } else if (sc === 'pgdm') {
      setWeek(28);
      setFastingGluc(132);
      setOneHourGluc(215);
      setTwoHourGluc(190);
    } else if (sc === 'phpt') {
      setWeek(22);
      setFastingGluc(85);
      setOneHourGluc(130);
      setTwoHourGluc(118);
    }
  };

  const options = useMemo(() => {
    return {
      hasHashimotoHypo: selectedScenario === 'hashimoto_no_adj',
      lt4DoseAdjusted: false,
      hasGravesDisease: selectedScenario === 'graves_trab',
      hasGdm: selectedScenario === 'gdm' || selectedScenario === 'pgdm',
    };
  }, [selectedScenario]);

  const profile = useMemo(() => {
    return calculateGestationalProfile(week, options);
  }, [week, options]);

  const ogttResult = useMemo(() => {
    return evaluateOgtt75g({
      fastingGlucose: fastingGluc,
      oneHourGlucose: oneHourGluc,
      twoHourGlucose: twoHourGluc,
      gestationalWeek: week,
    });
  }, [fastingGluc, oneHourGluc, twoHourGluc, week]);

  const neonatalRisk = useMemo(() => {
    return evaluateNeonatalTransition({
      isGdmOrPgdm: selectedScenario === 'gdm' || selectedScenario === 'pgdm',
      maternalHba1c: selectedScenario === 'pgdm' ? 8.2 : selectedScenario === 'gdm' ? 5.8 : 5.1,
      maternalPhpt: selectedScenario === 'phpt',
      maternalGravesTrabPositive: selectedScenario === 'graves_trab',
    });
  }, [selectedScenario]);

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                Endokrynologia Położnicza & Ciąża
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                [EBM FIGO/ATA/IADPSG]
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Pregnancy & GDM Endocrine Digital Twin
            </h2>
            <p className="text-sm text-slate-400">
              Model zmian osi hormonalnych 0–40 hbd, symulator OGTT 75g oraz przejście neonatologiczne.
            </p>
          </div>
        </div>

        {/* Scenarios */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Wybierz scenariusz kliniczny:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { id: 'normal', label: 'Ciąża fizjologiczna' },
              { id: 'gdm', label: 'GDM (IADPSG)' },
              { id: 'hashimoto_no_adj', label: 'Hashimoto w I trym.' },
              { id: 'graves_trab', label: 'Graves-Basedow (TRAb)' },
              { id: 'pgdm', label: 'Jawna cukrzyca (PGDM)' },
              { id: 'phpt', label: 'PHPT (Wapń / PTHrP)' },
            ].map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => applyScenario(sc.id as any)}
                className={`text-xs px-3 py-2 rounded-lg font-medium border transition-all text-left ${
                  selectedScenario === sc.id
                    ? 'bg-pink-600/30 border-pink-500/80 text-pink-200 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Week Slider */}
      <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">
              Oś Czasu Ciąży & Połogu
            </span>
            <div className="text-2xl font-bold text-white mt-0.5">
              {week <= 40 ? `${week}. tydzień ciąży (hbd)` : 'Połóg / Postpartum'}
              <span className="text-sm font-normal text-slate-400 ml-2">
                {profile.trimester === 1
                  ? 'I Trymestr (Organogeneza, szczyt hCG)'
                  : profile.trimester === 2
                  ? 'II Trymestr (Wzrost łożyska, optymalne okno zabiegowe)'
                  : profile.trimester === 3
                  ? 'III Trymestr (Szczyt insulinooporności, transfer Ca2+)'
                  : 'Okres poporodowy (gwałtowny spadek hormonów łożyskowych)'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Wrażliwość tkankowa (Si):</span>
            <div className="text-lg font-mono font-bold text-amber-300">
              {profile.insulinSensitivitySiPercent}% wyjściowej
            </div>
          </div>
        </div>

        <div className="mt-4">
          <input
            type="range"
            min={1}
            max={41}
            step={1}
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
            className="w-full accent-pink-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1 font-mono">
            <span>1 hbd</span>
            <span>8–10 hbd (Szczyt hCG)</span>
            <span>24–28 hbd (Skrining OGTT)</span>
            <span>36 hbd (Szczyt hPL)</span>
            <span>40 hbd</span>
            <span>Połóg</span>
          </div>
        </div>

        {/* Clinical alerts for this week */}
        {profile.clinicalAlerts.length > 0 && (
          <div className="mt-4 space-y-2">
            {profile.clinicalAlerts.map((alert, i) => (
              <div
                key={i}
                className="text-xs p-2.5 rounded-lg bg-slate-800/90 border border-amber-500/30 text-amber-200"
              >
                {alert}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hormonal Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TSH Card */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Tyreotropina (TSH)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
              [EBM-norm]
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {profile.hormones.tsh.value.toFixed(2)}{' '}
            <span className="text-sm font-normal text-slate-400">{profile.hormones.tsh.unit}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Norma trymestralna: {profile.hormones.tsh.rangeMin}–{profile.hormones.tsh.rangeMax} {profile.hormones.tsh.unit}
          </div>
          <div className="text-[11px] text-slate-500 mt-2 border-t border-slate-800 pt-1.5">
            {profile.hormones.tsh.note}
          </div>
        </div>

        {/* FT4 Card */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Wolna tyroksyna (FT4)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
              [EBM-norm]
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {profile.hormones.ft4.value.toFixed(1)}{' '}
            <span className="text-sm font-normal text-slate-400">{profile.hormones.ft4.unit}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Zakres referencyjny: {profile.hormones.ft4.rangeMin}–{profile.hormones.ft4.rangeMax} {profile.hormones.ft4.unit}
          </div>
          <div className="text-[11px] text-slate-500 mt-2 border-t border-slate-800 pt-1.5">
            {profile.hormones.ft4.note}
          </div>
        </div>

        {/* hCG Card */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Gonadotropina (hCG)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
              [EBM-norm]
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-pink-300 mt-1">
            {profile.hormones.hcg.value.toLocaleString()}{' '}
            <span className="text-sm font-normal text-slate-400">{profile.hormones.hcg.unit}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Szacunek trymestru: {profile.hormones.hcg.rangeMin.toLocaleString()}–{profile.hormones.hcg.rangeMax.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-2 border-t border-slate-800 pt-1.5">
            {profile.hormones.hcg.note}
          </div>
        </div>

        {/* TBG & PTHrP Card */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">TBG & PTHrP Łożyskowe</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              [Mechanistic]
            </span>
          </div>
          <div className="text-lg font-bold font-mono text-white mt-1">
            TBG: {profile.hormones.tbg.value} mg/l
          </div>
          <div className="text-sm font-mono text-amber-300">
            PTHrP: {profile.hormones.pthrp.value} pmol/l
          </div>
          <div className="text-[11px] text-slate-500 mt-2 border-t border-slate-800 pt-1.5">
            PTHrP napędza transfer Ca2+, TBG podwaja pulę hormonów całkowitych.
          </div>
        </div>
      </div>

      {/* OGTT 75g Simulator */}
      <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">
              Symulator Diagnostyczny OGTT 75 g (Standard IADPSG / WHO / PTD)
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
              [EBM-norm]
            </span>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
              ogttResult.severity === 'norma'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : ogttResult.severity === 'gdm'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}
          >
            {ogttResult.diagnosis}
          </span>
        </div>

        <p className="text-xs text-slate-400 mt-1">
          Wprowadź wartości glikemii osoczowej w teście obciążenia 75 g glukozy. Do rozpoznania GDM wystarczy spełnienie co najmniej 1 punktu odcięcia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Glikemia na czczo (0 min)</span>
              <span className="font-mono text-slate-300">Norma &lt; 92 mg/dl</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={fastingGluc}
                onChange={(e) => setFastingGluc(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white font-mono text-lg"
              />
              <span className="text-xs text-slate-400">mg/dl</span>
            </div>
            {ogttResult.fasting.elevated && (
              <span className="text-[11px] text-rose-400 font-semibold mt-1 block">
                Przekroczony próg (≥92 mg/dl)
              </span>
            )}
          </div>

          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Glikemia po 1 godzinie (60 min)</span>
              <span className="font-mono text-slate-300">Norma &lt; 180 mg/dl</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={oneHourGluc}
                onChange={(e) => setOneHourGluc(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white font-mono text-lg"
              />
              <span className="text-xs text-slate-400">mg/dl</span>
            </div>
            {ogttResult.oneHour.elevated && (
              <span className="text-[11px] text-rose-400 font-semibold mt-1 block">
                Przekroczony próg (≥180 mg/dl)
              </span>
            )}
          </div>

          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Glikemia po 2 godzinach (120 min)</span>
              <span className="font-mono text-slate-300">Norma &lt; 153 mg/dl</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={twoHourGluc}
                onChange={(e) => setTwoHourGluc(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white font-mono text-lg"
              />
              <span className="text-xs text-slate-400">mg/dl</span>
            </div>
            {ogttResult.twoHour.elevated && (
              <span className="text-[11px] text-rose-400 font-semibold mt-1 block">
                Przekroczony próg (≥153 mg/dl)
              </span>
            )}
          </div>
        </div>

        {/* OGTT Recommendations */}
        <div className="mt-4 p-3.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs space-y-1.5">
          <div className="font-semibold text-slate-200">Zalecenia i ocena ryzyka płodowego:</div>
          <div className="text-slate-300">{ogttResult.fetalRiskSummary}</div>
          <ul className="list-disc pl-4 text-slate-400 space-y-1 mt-1">
            {ogttResult.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Neonatal Transition Risks */}
      <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">
            Transformacja Metaboliczna Noworodka (Neonatal Transition Risks)
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            [Mechanistic]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400 block">Ryzyko wczesnej hipoglikemii noworodkowej:</span>
            <span
              className={`text-base font-bold font-mono mt-1 block ${
                neonatalRisk.riskHypoglycemia === 'niskie'
                  ? 'text-emerald-400'
                  : neonatalRisk.riskHypoglycemia === 'umiarkowane'
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}
            >
              {neonatalRisk.riskHypoglycemia.toUpperCase()}
            </span>
            <span className="text-[11px] text-slate-500 block mt-1">
              {neonatalRisk.fetalHyperinsulinism
                ? 'Matczyna hiperglikemia wywołała hipertrofię komórek beta płodu.'
                : 'Fizjologiczna homeostaza glikemii płodowej.'}
            </span>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400 block">Fizjologiczny wyrzut TSH (30. min życia):</span>
            <span className="text-base font-bold font-mono text-cyan-400 mt-1 block">
              do ~{neonatalRisk.tshSurgeExpectedMax} mIU/l
            </span>
            <span className="text-[11px] text-slate-500 block mt-1">
              Gwałtowny wyrzut adaptacyjny na zimno. Skrining na bibułę dopiero w 3.–5. dobie!
            </span>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400 block">Ryzyko tężyczki noworodkowej (Ca-tetany):</span>
            <span
              className={`text-base font-bold font-mono mt-1 block ${
                neonatalRisk.riskNeonatalTetany === 'brak' ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {neonatalRisk.riskNeonatalTetany.toUpperCase()}
            </span>
            <span className="text-[11px] text-slate-500 block mt-1">
              {selectedScenario === 'phpt'
                ? 'Matczyna hiperkalcemia tłumiła przytarczyce płodu → groźna hipokalcemia!'
                : 'Prawidłowy transfer 30 g wapnia przez łożyskowy PTHrP.'}
            </span>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs space-y-1">
          <div className="font-semibold text-slate-200">Protokół monitorowania okołoporodowego noworodka:</div>
          <ul className="list-disc pl-4 text-slate-400 space-y-1">
            {neonatalRisk.monitoringProtocol.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
