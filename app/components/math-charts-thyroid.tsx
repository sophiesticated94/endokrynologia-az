'use client';
import { AccumulationChart } from './accumulation-chart';
import { useState, useMemo } from 'react';
import { Sliders, Activity, Sparkles, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

// ============================================================================
// 1. T4 TWO-COMPARTMENT & STEADY-STATE PHARMACOKINETICS CHART
// ============================================================================
export function T4TwoCompartmentChart(){return <AccumulationChart/>;}

export function DeiodinaseCatalyticCycle() {
  const [selectedCol, setSelectedCol] = useState<'core' | 'dio1' | 'dio2'>('core');

  const columns = {
    core: {
      title: '1. Wspólny Rdzeń Katalityczny (Sec, U)',
      status: 'USTALONE',
      statusColor: '#16a34a',
      statusBg: '#f0fdf4',
      statusBorder: '#bbf7d0',
      chemistry: 'Reszta selenocysteiny (Sec, pKa = 5,2) w pH 7,4 występuje niemal w 100% jako wysoce nukleofilowy selenolan (-Se⁻).',
      cycle: 'E-Se⁻ + T4 ⟶ [E-Se⁻ · T4] ⟶ E-[Se-I] + T3 (odszczepienie jodu 5\').',
      clinicalRole: 'Zarówno DIO1, jak i DIO2 wymagają selenu do syntezy aktywnego T3; zwykła cysteina (pKa 8,3) nie zapewnia dostatecznej szybkości reakcji.',
    },
    dio1: {
      title: '2. DIO1: Szlak wątrobowo-nerkowy (GSH)',
      status: 'USTALONY MECHANIZM',
      statusColor: '#0284c7',
      statusBg: '#f0f9ff',
      statusBorder: '#bae6fd',
      chemistry: 'Redukcja przejściowego adduktu E-[Se-I] zachodzi z udziałem glutationu (GSH) poprzez selenenylosulfid (E-Se-SG).',
      cycle: 'E-[Se-I] + GSH ⟶ E-Se-SG + I⁻ + H⁺ ; E-Se-SG + GSH ⟶ E-Se⁻ + GSSG + H⁺.',
      clinicalRole: 'Kluczowa dla obwodowej puli krążącego T3. Silnie hamowana przez propylotiouracyl (PTU), który kowalencyjnie blokuje przejściowy stan E-[Se-I].',
    },
    dio2: {
      title: '3. DIO2: Szlak tkankowy (Mózg, Przysadka)',
      status: 'NIEROZSTRZYGNIĘTY REDUKTOR / UBIKWITYNACJA',
      statusColor: '#d97706',
      statusBg: '#fffbeb',
      statusBorder: '#fde68a',
      chemistry: 'Endogenny reduktor fizjologiczny pozostaje nierozstrzygnięty (w in vitro działa DTT; in vivo proces jest niezależny od puli GSH).',
      cycle: 'Substrat T4 przyspiesza ubikwitynację DIO2 przez ligazę WSB-1 ⟶ degradacja w proteasomie 26S.',
      clinicalRole: 'Lokalna wewnątrzkomórkowa generacja T3 w przysadce (sprzężenie TSH) i OUN. Niewrażliwa na PTU w dawkach terapeutycznych. Podlega inaktywacji substratowej.',
    },
  };

  return (
    <div style={{ background: '#fcfaf8', border: '1px solid #e7d8c9', borderRadius: '12px', padding: '18px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#9a3412', letterSpacing: '0.05em' }}>
            CHEMIA ENZYMÓW SELENOWYCH I PATOMARKERY
          </span>
          <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#431407' }}>
            Trójkolumnowa architektura dejodynaz: Wspólny rdzeń Sec vs DIO1 vs DIO2
          </h4>
        </div>
      </div>

      {/* Wybór kolumny lub podgląd trójkolumnowy */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {(['core', 'dio1', 'dio2'] as const).map(key => {
          const col = columns[key];
          const isSelected = selectedCol === key;
          return (
            <div
              key={key}
              onClick={() => setSelectedCol(key)}
              style={{
                background: isSelected ? '#fff' : '#faf7f5',
                border: isSelected ? `2px solid ${col.statusColor}` : '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '9px', fontWeight: 800, color: col.statusColor, background: col.statusBg, border: `1px solid ${col.statusBorder}`, padding: '2px 6px', borderRadius: '4px' }}>
                  {col.status}
                </span>
              </div>
              <strong style={{ fontSize: '12px', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                {col.title}
              </strong>
              <p style={{ fontSize: '11px', color: '#475569', margin: '0 0 8px', lineHeight: 1.4 }}>
                {col.chemistry}
              </p>
              <div style={{ fontFamily: 'monospace', fontSize: '10px', background: '#f8fafc', padding: '6px 8px', borderRadius: '4px', color: '#334155', border: '1px solid #e2e8f0', marginBottom: '6px' }}>
                {col.cycle}
              </div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>
                <strong>Aspekt kliniczny:</strong> {col.clinicalRole}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: '11px', color: '#78350f', background: '#fef3c7', padding: '10px 14px', borderRadius: '6px', lineHeight: '1.45' }}>
        <strong>Zróżnicowanie izoenzymów:</strong> Podczas gdy nukleofilowy atak selenolanu (Sec, U) stanowi wspólny mechanizm katalityczny, odmienny los związku pośredniego E-[Se-I] decyduje o farmakologii: DIO1 tworzy addukt selenenylosulfidowy z glutationem (podatny na zablokowanie przez PTU), podczas gdy DIO2 nie zależy od GSH in vivo i podlega ścisłej regulacji potranslacyjnej przez ubikwitynację proteasomalną (WSB-1).
      </div>
    </div>
  );
}
