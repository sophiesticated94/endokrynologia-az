'use client';
import { useState } from 'react';
import { Activity } from 'lucide-react';
import { HptSimulator } from '../hpt-simulator';
import { PituitarySimulator } from '../pituitary-simulator';
import { AdrenalSimulator } from '../adrenal-simulator';
import { ParathyroidSimulator } from '../parathyroid-simulator';
import { DiabetesSimulator } from '../diabetes-simulator';
import { GonadSimulator } from '../gonad-simulator';
import { NenSimulator } from '../nen-simulator';
import { ObesitySimulator } from '../obesity-simulator';

export function EndocrinologySimulators() {
  const [simTab, setSimTab] = useState<
    'hpt' | 'pituitary' | 'adrenal' | 'parathyroid' | 'diabetes' | 'gonad' | 'nen' | 'otylosc'
  >('hpt');

  return (
    <div>
      <div className="filter-bar" style={{ marginBottom: '22px' }}>
        <button className={simTab === 'hpt' ? 'active' : ''} onClick={() => setSimTab('hpt')}>
          <Activity size={15} /> Moduł 01: Symulator osi HPT (Tarczyca)
        </button>
        <button className={simTab === 'pituitary' ? 'active' : ''} onClick={() => setSimTab('pituitary')}>
          <Activity size={15} /> Moduł 02: Konsola Przysadkowa (Przysadka i podwzgórze)
        </button>
        <button className={simTab === 'adrenal' ? 'active' : ''} onClick={() => setSimTab('adrenal')}>
          <Activity size={15} /> Moduł 03: Konsola Nadnerczowa (Kora i rdzeń nadnerczy)
        </button>
        <button className={simTab === 'parathyroid' ? 'active' : ''} onClick={() => setSimTab('parathyroid')}>
          <Activity size={15} /> Moduł 04: Konsola Przytarczycowa (Przytarczyce i Ca–P)
        </button>
        <button className={simTab === 'diabetes' ? 'active' : ''} onClick={() => setSimTab('diabetes')}>
          <Activity size={15} /> Moduł 05: Konsola Diabetologiczna (HOMA i DKA/HHS)
        </button>
        <button className={simTab === 'gonad' ? 'active' : ''} onClick={() => setSimTab('gonad')}>
          <Activity size={15} /> Moduł 06: Konsola Gonadowa (Gonady i medycyna rozrodu)
        </button>
        <button className={simTab === 'nen' ? 'active' : ''} onClick={() => setSimTab('nen')}>
          <Activity size={15} /> Moduł 07: Konsola Neuroendokrynna (NEN, MEN i PRRT)
        </button>
        <button className={simTab === 'otylosc' ? 'active' : ''} onClick={() => setSimTab('otylosc')}>
          <Activity size={15} /> Moduł 08: Konsola Metaboliczna (Masa, Lipidy i FIB-4)
        </button>
      </div>
      {simTab === 'hpt' && <HptSimulator />}
      {simTab === 'pituitary' && <PituitarySimulator />}
      {simTab === 'adrenal' && <AdrenalSimulator />}
      {simTab === 'parathyroid' && <ParathyroidSimulator />}
      {simTab === 'diabetes' && <DiabetesSimulator />}
      {simTab === 'gonad' && <GonadSimulator />}
      {simTab === 'nen' && <NenSimulator />}
      {simTab === 'otylosc' && <ObesitySimulator />}
    </div>
  );
}
