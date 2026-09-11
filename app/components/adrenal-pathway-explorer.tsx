'use client';
import { useState, useMemo } from 'react';
import { Activity } from 'lucide-react';

// ============================================================================
// 21-HYDROXYLASE PATHWAY EXPLORER (CYP21A2 SHUNT & CLINICAL 17-OHP BENCH)
// ============================================================================
export function AdrenalEnzymeKinetics() {
  // Część A: Model korelacji genotyp–fenotyp i wektory zmian szlaku
  const [genotypeRange, setGenotypeRange] = useState<'salt_wasting' | 'simple_virilizing' | 'non_classical' | 'normal'>('simple_virilizing');

  // Część B: Narzędzie interpretacji rzeczywistego pomiaru laboratoryjnego 17-OHP
  const [measured17Ohp, setMeasured17Ohp] = useState<number>(12.5); // ng/ml
  const [assayMethod, setAssayMethod] = useState<'immunoassay' | 'lc_ms_ms'>('lc_ms_ms');
  const [clinicalContext, setClinicalContext] = useState<'morning_follicular' | 'synacthen_60' | 'neonatal_screen'>('synacthen_60');

  const genotypeProfiles = {
    salt_wasting: {
      label: '< 1% aktywności (Ciężka postać klasyczna z utratą soli)',
      badge: '<1% Vmax',
      cortisol: '↓ krytyczny brak biosyntezy',
      aldosterone: '↓ brak syntezy (utrata soli, hiponatremia, hiperkaliemia)',
      acth: '↑↑↑ masywne odhamowanie osi przysadkowej',
      substrate17Ohp: '↑↑↑ skrajne nagromadzenie przed blokiem CYP21A2',
      androgens: '↑↑↑ masywny bocznik przez CYP17A1 (wirylizacja 46,XX, 11-oksyandrogeny)',
      clinicalSummary: 'Brak aktywności enzymu w obu allelach. Objawia się w 2.–3. tygodniu życia kryzą solną z ciężkim odwodnieniem hipotonicznym i wstrząsem hipowolemicznym.',
      color: '#dc2626',
      bg: '#fef2f2',
      border: '#fecaca',
    },
    simple_virilizing: {
      label: '1–5% aktywności (Postać klasyczna prosta wirylizująca)',
      badge: '1–5% Vmax',
      cortisol: '↓↓ deficyt częściowo kompensowany wysokim ACTH',
      aldosterone: 'N–↓ wystarczający do zachowania homeostazy sodu',
      acth: '↑↑ znacznie podwyższone (powoduje przerost kory nadnerczy)',
      substrate17Ohp: '↑↑ bardzo wysoka kumulacja',
      androgens: '↑↑ znaczny bocznik androgenowy (ambiguous genitalia 46,XX, rzekome przedwczesne dojrzewanie)',
      clinicalSummary: 'Niewielka resztkowa synteza aldosteronu chroni przed utratą soli, lecz masywny nadmiar androgenów prowadzi do prenatalnej wirylizacji narządów płciowych u dziewczynek i przyspieszenia wieku kostnego.',
      color: '#d97706',
      bg: '#fffbeb',
      border: '#fde68a',
    },
    non_classical: {
      label: '20–50% aktywności (Postać nieklasyczna / NC-CAH)',
      badge: '20–50% Vmax',
      cortisol: 'N (prawidłowy przy nieznacznym podwyższeniu ACTH)',
      aldosterone: 'N (w pełni prawidłowy)',
      acth: '↑ umiarkowanie podwyższone lub prawidłowe',
      substrate17Ohp: '↑ umiarkowany wzrost (widoczny zwłaszcza po stymulacji)',
      androgens: '↑ łagodny/umiarkowany bocznik (hirsutyzm, trądzik, zaburzenia owulacji, niepłodność)',
      clinicalSummary: 'Częsta postać (ok. 1:200 w populacji ogólnej). Narządy płciowe przy urodzeniu prawidłowe; objawy hiperandrogenizmu ujawniają się w okresie dojrzewania lub wczesnej dorosłości.',
      color: '#0284c7',
      bg: '#f0f9ff',
      border: '#bae6fd',
    },
    normal: {
      label: '> 50% aktywności (Prawidłowa czynność / nosicielstwo)',
      badge: '50–100% Vmax',
      cortisol: 'N fizjologiczny rytm dobowy',
      aldosterone: 'N fizjologiczna regulacja RAA',
      acth: 'N prawidłowe ujemne sprzężenie zwrotne',
      substrate17Ohp: 'N stężenie fizjologiczne',
      androgens: 'N fizjologiczny przepływ szlaków',
      clinicalSummary: 'Stan fizjologiczny lub bezobjawowe nosicielstwo mutacji w jednym allelu. Aktywność enzymu w pełni pokrywa zapotrzebowanie organizmu.',
      color: '#16a34a',
      bg: '#f0fdf4',
      border: '#bbf7d0',
    },
  };

  const currentProfile = genotypeProfiles[genotypeRange];

  // Interpretacja zmierzonego 17-OHP
  const labInterpretation = useMemo(() => {
    const val = measured17Ohp;
    if (isNaN(val) || val < 0) return { verdict: 'Nieprawidłowa wartość', details: 'Wprowadź stężenie ≥ 0.' };

    if (clinicalContext === 'morning_follicular') {
      if (val < 2.0) {
        return {
          verdict: '17-OHP podstawowe < 2 ng/ml (< 6 nmol/l) — Prawidłowe',
          status: 'normal',
          details: 'Rozpoznanie NC-CAH jest praktycznie wykluczone. U pacjentek z objawami hiperandrogenizmu w pierwszej kolejności należy rozważyć zespół policystycznych jajników (PCOS) lub hiperandrogenizm idiopatyczny.',
        };
      } else if (val <= 10.0) {
        return {
          verdict: '17-OHP podstawowe 2–10 ng/ml (6–30 nmol/l) — Szara strefa',
          status: 'equivocal',
          details: 'Wynik niejednoznaczny. Wskazane wykonanie dynamicznego testu stymulacji Synacthenem (250 µg i.v./i.m. z oznaczeniem 17-OHP w 0. i 60. minucie) w celu definitywnego rozróżnienia NC-CAH od PCOS lub nosicielstwa.',
        };
      } else {
        return {
          verdict: '17-OHP podstawowe > 10 ng/ml (> 30 nmol/l) — Wysoce prawdopodobny NC-CAH',
          status: 'abnormal',
          details: 'Wysokie prawdopodobieństwo wrodzonego przerostu nadnerczy. Zalecane potwierdzenie testem z Synacthenem i badaniem genetycznym genu CYP21A2.',
        };
      }
    } else if (clinicalContext === 'synacthen_60') {
      if (val < 10.0) {
        return {
          verdict: '17-OHP po Synacthenie < 10 ng/ml (< 30 nmol/l) — Wynik ujemny (Norma)',
          status: 'normal',
          details: 'Prawidłowa odpowiedź 21-hydroksylacji wyklucza NC-CAH. Wartości w zakresie 5–10 ng/ml mogą niekiedy odpowiadać bezobjawowym heterozygotom (nosicielom mutacji CYP21A2).',
        };
      } else if (val <= 30.0) {
        return {
          verdict: '17-OHP po Synacthenie 10–30 ng/ml (30–90 nmol/l) — Dodatni (NC-CAH)',
          status: 'abnormal',
          details: 'Klasyczny próg diagnostyczny NC-CAH (>10 ng/ml wg wytycznych Endocrine Society). Wskazana konsultacja endokrynologiczna, ocena rezerwy kortyzolowej i analiza genu CYP21A2 (istotne zwłaszcza przed planowaniem ciąży).',
        };
      } else {
        return {
          verdict: '17-OHP po Synacthenie > 30 ng/ml (> 90 nmol/l) — Znacznie podwyższony',
          status: 'severe',
          details: 'Wyraźny blok enzymatyczny typowy dla WPN (w postaciach klasycznych stężenia po stymulacji często przekraczają 100 ng/ml).',
        };
      }
    } else {
      return {
        verdict: val > 30 ? 'Test przesiewowy noworodka: Wynik podwyższony' : 'Test przesiewowy noworodka: W granicach normy',
        status: val > 30 ? 'abnormal' : 'normal',
        details: 'Progi przesiewu na bibule są ściśle zależne od wieku ciążowego i masy urodzeniowej (wcześniaki wykazują fizjologicznie wyższe stężenia). ' +
          (assayMethod === 'immunoassay' ? 'UWAGA: Immunoenzymatyczne testy u noworodków wykazują częste wyniki fałszywie dodatnie przez reakcje krzyżowe z siarczanowanymi steroidami płodowymi. Wymagana weryfikacja metodą LC-MS/MS!' : 'LC-MS/MS eliminuje interferencje steroidów płodowych i stanowi złoty standard (second-tier testing w nowoczesnych programach badań przesiewowych).'),
      };
    }
  }, [measured17Ohp, clinicalContext, assayMethod]);

  return (
    <div style={{ background: '#fdf8f6', border: '1px solid #fed7aa', borderRadius: '12px', padding: '18px', margin: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#c2410c' }}>
        <Activity size={20} />
        <h4 style={{ margin: 0, fontSize: '15px' }}>Eksplorator Szlaku 21-Hydroksylazy i Diagnostyka 17-OHP (WPN / CAH)</h4>
      </div>
      <p style={{ fontSize: '12px', color: '#374151', margin: '0 0 14px' }}>
        Korelacja genotyp–fenotyp w WPN ma charakter jakościowy i spektralny. Aktywność resztkowa CYP21A2 decyduje o postaci klinicznej, ale nie pozwala na wyliczenie stężenia 17-OHP u konkretnego pacjenta. Poniżej zestawiono wektory zmian w szlaku oraz interpretację rzeczywistych pomiarów laboratoryjnych.
      </p>

      {/* SEKCJA 1: GENOTYP I SZLAK ENZYMATYCZNY */}
      <div style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#9a3412', marginBottom: '10px' }}>
          1. Wariant genetyczny i aktywność resztkowa CYP21A2 (korelacja genotyp–fenotyp)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '12px' }}>
          {(['salt_wasting', 'simple_virilizing', 'non_classical', 'normal'] as const).map(key => (
            <button
              key={key}
              type="button"
              onClick={() => setGenotypeRange(key)}
              style={{
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: genotypeRange === key ? genotypeProfiles[key].color : '#e2e8f0',
                background: genotypeRange === key ? genotypeProfiles[key].bg : '#fff',
                color: genotypeRange === key ? genotypeProfiles[key].color : '#475569',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {genotypeProfiles[key].badge}
              <div style={{ fontSize: '10px', fontWeight: 400, opacity: 0.9 }}>{key === 'salt_wasting' ? 'Utrata soli' : key === 'simple_virilizing' ? 'Prosta' : key === 'non_classical' ? 'Nieklasyczna' : 'Norma'}</div>
            </button>
          ))}
        </div>

        {/* Wektory zmian w szlaku */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '12px' }}>
          <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Kortyzol</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{currentProfile.cortisol}</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Aldosteron</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{currentProfile.aldosterone}</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Sprzężenie ACTH</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#c2410c' }}>{currentProfile.acth}</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Prekursor 17-OHP</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#dc2626' }}>{currentProfile.substrate17Ohp}</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Androgeny nadnerczowe</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#991b1b' }}>{currentProfile.androgens}</div>
          </div>
        </div>

        <div style={{ fontSize: '11px', color: currentProfile.color, background: currentProfile.bg, border: `1px solid ${currentProfile.border}`, padding: '8px 12px', borderRadius: '6px' }}>
          <strong>Podsumowanie fenotypu:</strong> {currentProfile.clinicalSummary}
        </div>
      </div>

      {/* SEKCJA 2: INTERPRETACJA RZECZYWISTEGO POMIARU 17-OHP */}
      <div style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: '10px', padding: '14px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#9a3412', marginBottom: '10px' }}>
          2. Interpretacja rzeczywistego pomiaru laboratoryjnego 17-OHP
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
              Zmierzone stężenie 17-OHP:
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="number"
                min="0"
                max="300"
                step="0.5"
                value={measured17Ohp}
                onChange={e => setMeasured17Ohp(Number(e.target.value))}
                style={{ width: '100px', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: 700 }}
              />
              <span style={{ fontSize: '12px', color: '#64748b' }}>ng/ml ({Math.round(measured17Ohp * 3.03 * 10) / 10} nmol/l)</span>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
              Kontekst kliniczny badania:
            </label>
            <select
              value={clinicalContext}
              onChange={e => setClinicalContext(e.target.value as 'morning_follicular' | 'synacthen_60' | 'neonatal_screen')}
              style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px' }}
            >
              <option value="synacthen_60">Test z Synacthenem 250 µg (60. min)</option>
              <option value="morning_follicular">Poranny pomiar podstawowy (godz. 8:00, faza folikularna)</option>
              <option value="neonatal_screen">Przesiew noworodkowy (bibuła NBS)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
              Metoda analityczna:
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => setAssayMethod('lc_ms_ms')}
                style={{
                  flex: 1,
                  padding: '6px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: assayMethod === 'lc_ms_ms' ? '#0284c7' : '#cbd5e1',
                  background: assayMethod === 'lc_ms_ms' ? '#f0f9ff' : '#fff',
                  color: assayMethod === 'lc_ms_ms' ? '#0369a1' : '#64748b',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                LC-MS/MS (złoty standard)
              </button>
              <button
                type="button"
                onClick={() => setAssayMethod('immunoassay')}
                style={{
                  flex: 1,
                  padding: '6px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: assayMethod === 'immunoassay' ? '#d97706' : '#cbd5e1',
                  background: assayMethod === 'immunoassay' ? '#fffbeb' : '#fff',
                  color: assayMethod === 'immunoassay' ? '#b45309' : '#64748b',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Immunoassay (RIA/ECLIA)
              </button>
            </div>
          </div>
        </div>

        {/* Werdykt i uzasadnienie */}
        <div style={{ padding: '10px 12px', borderRadius: '8px', background: labInterpretation.status === 'normal' ? '#f0fdf4' : labInterpretation.status === 'equivocal' ? '#fffbeb' : '#fef2f2', border: `1px solid ${labInterpretation.status === 'normal' ? '#bbf7d0' : labInterpretation.status === 'equivocal' ? '#fde68a' : '#fecaca'}` }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: labInterpretation.status === 'normal' ? '#166534' : labInterpretation.status === 'equivocal' ? '#92400e' : '#991b1b', marginBottom: '4px' }}>
            {labInterpretation.verdict}
          </div>
          <div style={{ fontSize: '11px', color: '#334155', lineHeight: 1.5 }}>
            {labInterpretation.details}
          </div>
        </div>
      </div>
    </div>
  );
}
