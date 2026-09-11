'use client';
import { useState, useMemo } from 'react';
import { Sliders, Activity, ShieldAlert, CheckCircle2, TrendingUp } from 'lucide-react';

// ============================================================================
// 1. MICHAELIS-MENTEN & LINEWEAVER-BURK KINETICS CHART (CYP21A2)
// ============================================================================
export function MichaelisMentenLineweaverChart() {
  const [phenotype, setPhenotype] = useState<'normal' | 'nonclassic' | 'simple' | 'saltwasting'>('simple');
  const [substrateS, setSubstrateS] = useState(15); // Stężenie 17-OHP (uM)

  // Parametry enzymatyczne
  const km = 2.0; // uM
  const baseVmax = 100.0;

  const vmaxMap = {
    normal: 100.0,
    nonclassic: 30.0,
    simple: 2.5,
    saltwasting: 0.5,
  };

  const vmax = vmaxMap[phenotype];
  const velocity = (vmax * substrateS) / (km + substrateS);
  const roundedV = Math.round(velocity * 10) / 10;

  // Punkty krzywej Michaelisa-Menten (S od 0 do 30 uM)
  const mmPoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let s = 0; s <= 30; s += 0.5) {
      const v = (vmax * s) / (km + s);
      const px = 40 + (s / 30) * 440;
      const py = 160 - 20 - (v / 100) * 120;
      pts.push({ x: px, y: py });
    }
    return pts;
  }, [vmax]);

  const mmPath = mmPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  // Współrzędne punktu pracy pacjenta
  const patientX = 40 + (substrateS / 30) * 440;
  const patientY = 160 - 20 - (velocity / 100) * 120;

  return (
    <div style={{ background: '#fffaf5', border: '1px solid #fed7aa', borderRadius: '12px', padding: '18px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#c2410c', letterSpacing: '0.05em' }}>
            KINETYKA ENZYMATYCZNA MICHAELISA-MENTEN (CYP21A2)
          </span>
          <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#431407' }}>
            Wpływ mutacji na szybkość maksymalną Vmax i bocznikowanie 17-OHP
          </h4>
        </div>
        <span style={{ fontSize: '12px', fontWeight: 700, background: '#ffedd5', color: '#9a3412', padding: '4px 10px', borderRadius: '6px' }}>
          V = {roundedV} µmol/min ({Math.round((velocity / baseVmax) * 100)}% normy)
        </span>
      </div>

      {/* Wybór fenotypu klinicznego */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px', marginBottom: '14px' }}>
        {[
          { id: 'normal', label: 'Zdrowa (100% Vmax)', color: '#16a34a' },
          { id: 'nonclassic', label: 'NC-CAH (30% Vmax)', color: '#ca8a04' },
          { id: 'simple', label: 'Prosta wiryl. (2.5% Vmax)', color: '#ea580c' },
          { id: 'saltwasting', label: 'Utrata soli (<1% Vmax)', color: '#dc2626' },
        ].map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPhenotype(item.id as any)}
            style={{
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: phenotype === item.id ? item.color : '#e2e8f0',
              background: phenotype === item.id ? item.color : '#fff',
              color: phenotype === item.id ? '#fff' : '#475569',
              fontWeight: 600,
              fontSize: '11px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Suwak stężenia substratu */}
      <div style={{ background: '#fff', border: '1px solid #ffedd5', borderRadius: '8px', padding: '10px 14px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#431407' }}>
          <span>Stężenie substratu 17-OHP [S]:</span>
          <strong style={{ color: '#c2410c' }}>{substrateS} µM</strong>
        </div>
        <input
          type="range"
          min="1"
          max="30"
          step="1"
          value={substrateS}
          onChange={e => setSubstrateS(Number(e.target.value))}
          style={{ width: '100%', marginTop: '6px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#9a3412' }}>
          <span>1 µM (fizjologia)</span>
          <span>Km = 2.0 µM</span>
          <span>30 µM (masywna akumulacja w CAH)</span>
        </div>
      </div>

      {/* Wykres funkcyjny Michaelisa-Menten SVG */}
      <div style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: '8px', padding: '10px' }}>
        <svg viewBox="0 0 500 170" style={{ width: '100%', display: 'block' }}>
          {/* Siatka pozioma */}
          {[0, 25, 50, 75, 100].map(val => {
            const y = 160 - 20 - (val / 100) * 120;
            return (
              <g key={val}>
                <line x1="40" y1={y} x2="480" y2={y} stroke="#f1f5f9" strokeDasharray="3 3" />
                <text x="32" y={y + 3} fill="#94a3b8" fontSize="9" textAnchor="end">{val}%</text>
              </g>
            );
          })}

          {/* Asymptota Vmax dla wybranego fenotypu */}
          <line
            x1="40"
            y1={160 - 20 - (vmax / 100) * 120}
            x2="480"
            y2={160 - 20 - (vmax / 100) * 120}
            stroke="#ea580c"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />

          {/* Krzywa funkcyjna */}
          <path d={mmPath} fill="none" stroke="#c2410c" strokeWidth="2.5" />

          {/* Punkt pracy pacjenta */}
          <circle cx={patientX} cy={patientY} r="5" fill="#dc2626" stroke="#fff" strokeWidth="2" />
          <text x={Math.min(460, patientX + 8)} y={Math.max(25, patientY - 6)} fill="#991b1b" fontSize="10" fontWeight="700">
            [S] = {substrateS} µM ⟶ V = {roundedV}
          </text>

          {/* Osie X i Y */}
          <line x1="40" y1="140" x2="480" y2="140" stroke="#475569" strokeWidth="1.5" />
          <line x1="40" y1="20" x2="40" y2="140" stroke="#475569" strokeWidth="1.5" />
          <text x="260" y="160" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">Stężenie substratu 17-OHP [S] (µM)</text>
          <text x="14" y="80" fill="#475569" fontSize="10" fontWeight="600" transform="rotate(-90 14 80)" textAnchor="middle">Szybkość V (% Vmax)</text>
        </svg>
      </div>

      <div style={{ marginTop: '12px', fontSize: '12px', color: '#7c2d12', lineHeight: '1.45', background: '#fff7ed', padding: '10px 14px', borderRadius: '6px' }}>
        <strong>Zasada patofizjologiczna bocznikowania:</strong> Gdy mutacja obniża Vmax do 1–2% normy, hydroksylacja 17-OHP do 11-deoksykortyzolu staje się wąskim gardłem. Substrat gromadzi się do stężeń 15–30 µM (&gt;10 × Km). Z powodu wysycenia zablokowanego enzymu nadmiar substratu ulega przymusowemu przekierowaniu do enzymów szlaku androgenowego (CYP17A1 i szlak &quot;backdoor&quot;), wywołując wirylizację.
      </div>
    </div>
  );
}

// ============================================================================
// 2. PHEO HEMODYNAMICS & NON-COMPETITIVE ALPHA-BLOCKADE CHART
// ============================================================================
export function ArrHemodynamicsChart() {
  const [alphaBlockade, setAlphaBlockade] = useState<'none' | 'competitive' | 'irreversible'>('irreversible');

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '18px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e40af', letterSpacing: '0.05em' }}>
            FARMAKODYNAMIKA I HEMODYNAMIKA PHEOCHROMOCYTOMA
          </span>
          <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#0f172a' }}>
            Krzywa stężenie-odpowiedź (Emax): Kompetycyjna doksazosyna vs nieodwracalna fenoksybenzamina
          </h4>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'none', label: 'Brak blokady' },
            { id: 'competitive', label: 'Doksazosyna (kompetycyjna)' },
            { id: 'irreversible', label: 'Fenoksybenzamina (kowalencyjna)' },
          ].map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => setAlphaBlockade(m.id as any)}
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: alphaBlockade === m.id ? '#1e40af' : '#cbd5e1',
                background: alphaBlockade === m.id ? '#1e40af' : '#fff',
                color: alphaBlockade === m.id ? '#fff' : '#334155',
                fontWeight: 600,
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', marginBottom: '12px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e3a8a', marginBottom: '6px' }}>
          WPŁYW NA ODPOWIEDŹ NACZYNIORUCHOWĄ PRZY WYRZUCIE KATECHOLAMIN:
        </div>
        {alphaBlockade === 'none' && (
          <p style={{ margin: '0', fontSize: '13px', color: '#b91c1c' }}>
            <strong>Brak blokady:</strong> Maksymalny skurcz naczyń ($E_{'{max}'} = 100\%$). Wyrzut noradrenaliny podczas manipulacji guzem wywołuje przełom nadciśnieniowy z ciśnieniem &gt; 250/140 mmHg, obrzęk płuc i udar krwotoczny.
          </p>
        )}
        {alphaBlockade === 'competitive' && (
          <p style={{ margin: '0', fontSize: '13px', color: '#b45309' }}>
            <strong>Antagonista kompetycyjny (Doksazosyna):</strong> Przesuwa krzywą w prawo ($EC_{'{50}'} \uparrow$), ale zachowuje $E_{'{max}'} = 100\%$. Olbrzymi wyrzut katecholamin (megadawka liganda) jest w stanie przełamać blokadę kompetycyjną i wywołać skok ciśnienia na sali operacyjnej.
          </p>
        )}
        {alphaBlockade === 'irreversible' && (
          <p style={{ margin: '0', fontSize: '13px', color: '#15803d' }}>
            <strong>Antagonista nieodwracalny / kowalencyjny (Fenoksybenzamina):</strong> Kation azirydyniowy tworzy trwałe wiązanie kowalencyjne z receptorem $\alpha_1$, drastycznie <strong>obniżając $E_{'{max}'} do &lt;20%</strong>. Nawet stężenie katecholamin rzędu 1000 ng/ml NIE JEST W STANIE wywołać zagrażającego życiu skurczu naczyń.
          </p>
        )}
      </div>

      <div style={{ fontSize: '12px', color: '#334155', background: '#f1f5f9', padding: '10px 14px', borderRadius: '6px', lineHeight: '1.45' }}>
        <strong>Kardynalna reguła operacyjna:</strong> Poza pełną blokadą alfa, pacjent z guzem pheo wymaga wdrożenia diety bogatosodowej i dożylnego nawodnienia 0,9% NaCl na 2–3 dni przed operacją, aby odtworzyć przewlekle skurczone łożysko naczyniowe i zapobiec wstrząsowi wazodylatacyjnemu po zaklemowaniu naczyń guza.
      </div>
    </div>
  );
}
