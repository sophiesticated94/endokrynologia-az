'use client';
import { useState } from 'react';
import { GonadConsoleHpg } from './components/gonad-console-hpg';
import { GonadConsoleDiagnostics } from './components/gonad-console-diagnostics';
import { GonadConsoleCycle } from './components/gonad-console-cycle';
import { GonadConsoleIvf } from './components/gonad-console-ivf';
import { GonadConsolePathway } from './components/gonad-console-pathway';
import { HormoneAtlas } from './hormone-atlas';

export type GonadTab = 'hpg' | 'diagnostics' | 'cycle' | 'ivf' | 'pathway' | 'gaht';

export function GonadSimulator(_props: { embedded?: boolean; compact?: boolean } = {}) {
  const [tab, setTab] = useState<GonadTab>('hpg');

  const tabs: { key: GonadTab; label: string }[] = [
    { key: 'hpg', label: '1. Oś HPG & Farmakodynamika' },
    { key: 'diagnostics', label: '2. Diagnostyka & Vermeulen cFT' },
    { key: 'cycle', label: '3. Cykl & Sprzężenia E2/LH' },
    { key: 'ivf', label: '4. Stymulacja IVF & OHSS' },
    { key: 'pathway', label: '5. Szlak Steroidogenezy' },
    { key: 'gaht', label: 'Atlas GAHT' },
  ];

  return (
    <section style={{ margin: '14px 0' }}>
      <div
        className="atlas-presets"
        style={{
          display: 'flex',
          gap: '6px',
          flexWrap: 'wrap',
          marginBottom: '16px',
        }}
      >
        {tabs.map(t => (
          <button
            type="button"
            key={t.key}
            className={tab === t.key ? 'primary' : 'secondary'}
            aria-pressed={tab === t.key}
            onClick={() => setTab(t.key)}
            style={{ fontSize: '11px', padding: '6px 12px' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div>
        {tab === 'hpg' && <GonadConsoleHpg />}
        {tab === 'diagnostics' && <GonadConsoleDiagnostics />}
        {tab === 'cycle' && <GonadConsoleCycle />}
        {tab === 'ivf' && <GonadConsoleIvf />}
        {tab === 'pathway' && <GonadConsolePathway />}
        {tab === 'gaht' && <HormoneAtlas key="gaht" initialGoal="fem" />}
      </div>
    </section>
  );
}
