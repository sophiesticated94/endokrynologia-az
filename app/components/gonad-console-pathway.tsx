'use client';
import { useState } from 'react';
import { Atom, ShieldAlert } from 'lucide-react';

interface PathwayStep {
  id: string;
  name: string;
  substrate: string;
  product: string;
  enzyme: string;
  inhibitors: string[];
  clinicalUse: string;
  details: string;
}

const PATHWAY_STEPS: PathwayStep[] = [
  {
    id: 'aromatase',
    name: 'Aromataza (CYP19A1): Synteza estrogenów',
    substrate: 'Androstenedion / Testosteron',
    product: 'Estron (E1) / 17β-Estradiol (E2)',
    enzyme: 'CYP19A1 (kompleks aromatazy cytochromu P450)',
    inhibitors: ['Letrozol (niesteroidowy, odwracalny)', 'Anastrozol', 'Eksemestan (steroidowy, samobójczy/nieodwracalny)'],
    clinicalUse: 'Indukcja owulacji w PCOS (lek I rzutu wg 2023), leczenie raka piersi ER+, ginekomastia.',
    details: 'Aromatyzacja pierścienia A wymaga trzech kolejnych utlenień z zużyciem NADPH i tlenu. Usunięcie grupy metylowej C19 przekształca pierścień steroidowy w fenolowy.',
  },
  {
    id: '5alpha_reductase',
    name: '5α-Reduktaza (SRD5A): Generowanie aktywnego DHT',
    substrate: 'Testosteron',
    product: '5α-Dihydrotestosteron (DHT)',
    enzyme: 'SRD5A1 (typ 1: skóra, wątroba) oraz SRD5A2 (typ 2: prostata, narządy płciowe)',
    inhibitors: ['Finasteryd (selektywny inhibitor typu 2)', 'Dutasteryd (podwójny inhibitor typu 1 i 2)'],
    clinicalUse: 'Łagodny rozrost stercza (BPH), łysienie androgenowe, hirsutyzm u kobiet.',
    details: 'DHT wiąże receptor androgenowy (AR) z powinowactwem 2–5-krotnie wyższym niż testosteron, a jego dysocjacja jest 5-krotnie wolniejsza, co czyni go kluczowym mediatorem wirylizacji zewnętrznej.',
  },
  {
    id: 'cyp17a1',
    name: '17α-Hydroksylaza / 17,20-Liaza (CYP17A1)',
    substrate: 'Pregnenolon / Progesteron',
    product: 'DHEA / Androstenedion',
    enzyme: 'CYP17A1 (dwufunkcyjny enzym siateczki śródplazmatycznej)',
    inhibitors: ['Abirateron (leczenie opornego na kastrację raka prostaty mCRPC)', 'Ketokonazol', 'Spironolakton (słabe hamowanie)'],
    clinicalUse: 'Onkologia urologiczna (całkowita blokada steroidogenezy androgenowej w nadnerczach i guzie).',
    details: 'Aktywność 17,20-liazy wymaga fosforylacji serynowej enzymu oraz obecności cytochromu b5 jako allosterycznego kofaktora, co decyduje o boczniku androgenowym.',
  },
  {
    id: 'ar_blockade',
    name: 'Blokada Receptora Androgenowego (AR)',
    substrate: 'Androgeny (T, DHT)',
    product: 'Blokada transkrypcji genów zależnych od AR',
    enzyme: 'Receptor jądrowy NR3C4 (AR)',
    inhibitors: ['Bikalutamid / Enzalutamid (onkologia)', 'Octan cyproteronu (CPA)', 'Spironolakton (dermatologia/GAHT)'],
    clinicalUse: 'Rak stercza, maskulinizacja/hirsutyzm, feminizująca terapia hormonalna (GAHT).',
    details: 'Antagoniści kompetycyjnie wiążą kieszeń LBD receptora androgenowego, uniemożliwiając rekrutację koaktywatorów i wiązanie z elementami ARE na DNA.',
  },
  {
    id: 'serm_action',
    name: 'Selektywne Modulatory Receptora Estrogenowego (SERM)',
    substrate: 'Estradiol (konkurencja o LBD receptora ER)',
    product: 'Tkankowo specyficzny agonizm lub antagonizm',
    enzyme: 'Receptory estrogenowe jądrowe ERα (ESR1) i ERβ (ESR2)',
    inhibitors: ['Tamoksyfen (antagonist w piersi, agonista w kościach/endometrium)', 'Raloksyfen (antagonist w piersi/endometrium, agonista w kości)', 'Klomifen (oś HPG)'],
    clinicalUse: 'Rak piersi ER+, osteoporoza pomenopauzalna, indukcja owulacji (klomifen).',
    details: 'SERM wiążą się ortosterycznie w kieszeni LBD, powodując przemieszczenie helisy 12 (H12). W zależności od obecności koaktywatorów lub korepresorów w danej tkance lek działa pro- lub antyestrogenowo.',
  },
];

export function GonadConsolePathway() {
  const [selectedStep, setSelectedStep] = useState<string>('aromatase');

  const current = PATHWAY_STEPS.find(s => s.id === selectedStep) || PATHWAY_STEPS[0];

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <Atom size={20} color="#0d9488" />
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
          Szlak Steroidogenezy Gonadowej i Farmakologiczne Punkty Uchwytu
        </h3>
      </div>
      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px' }}>
        Synteza hormonów steroidowych w gonadach i konwersja obwodowa stanowią cel precyzyjnych terapii farmakologicznych. Kliknij w enzym lub receptor, aby przeanalizować mechanizm blokady i zastosowanie kliniczne.
      </p>

      {/* Wizualizacja kroków szlaku */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginBottom: '16px' }}>
        {PATHWAY_STEPS.map(step => {
          const isSel = step.id === selectedStep;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setSelectedStep(step.id)}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: isSel ? '#0d9488' : '#cbd5e1',
                background: isSel ? '#f0fdfa' : '#fff',
                color: isSel ? '#0f766e' : '#334155',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div>{step.name.split(':')[0]}</div>
              <div style={{ fontSize: '10px', fontWeight: 400, color: '#64748b', marginTop: '2px' }}>
                {step.inhibitors[0].split('(')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Karta szczegółów wybranego szlaku */}
      <div style={{ background: '#f8fafc', border: '1px solid #ccfbf1', borderRadius: '10px', padding: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f766e', marginBottom: '12px' }}>
          {current.name}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '14px' }}>
          <div style={{ background: '#fff', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b' }}>Substrat:</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{current.substrate}</div>
          </div>
          <div style={{ background: '#fff', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b' }}>Produkt reakcji:</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0d9488' }}>{current.product}</div>
          </div>
          <div style={{ background: '#fff', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b' }}>Enzym / Cel molekularny:</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#4338ca' }}>{current.enzyme}</div>
          </div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
            Leki hamujące / modulatory receptora:
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {current.inhibitors.map((inh, idx) => (
              <span
                key={idx}
                style={{
                  padding: '4px 8px',
                  background: '#ccfbf1',
                  color: '#115e59',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                {inh}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>
            Główne zastosowanie kliniczne:
          </div>
          <div style={{ fontSize: '11px', color: '#334155', lineHeight: 1.5 }}>
            {current.clinicalUse}
          </div>
        </div>

        <div style={{ padding: '10px', background: '#f0fdfa', borderRadius: '6px', border: '1px solid #99f6e4', fontSize: '11px', color: '#134e4a', lineHeight: 1.5 }}>
          <strong>Mechanizm biochemiczny:</strong> {current.details}
        </div>
      </div>
    </div>
  );
}
