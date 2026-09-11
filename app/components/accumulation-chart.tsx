'use client';
import { useState } from 'react';
import { Workbench, NumberField, Reason } from './clinical-workbench';
export function AccumulationChart() {
  const [half,H]=useState(7),[day,D]=useState(14);
  const valid=Number.isFinite(half)&&half>0&&Number.isFinite(day)&&day>=0;
  const pct=(t:number)=>100*(1-2**(-t/half));
  const path=valid?Array.from({length:57},(_,t)=>`${t?'L':'M'} ${45+t*7.5} ${175-pct(t)*1.4}`).join(' '):'';
  return <Workbench title="Akumulacja: kiedy zbliżamy się do stanu stacjonarnego?"><div className="workbench-inputs"><NumberField label="Założony okres półtrwania (dni)" value={half} set={H} min={1} max={14} step={.5}/><NumberField label="Czas od zmiany (dni)" value={day} set={D} max={56}/></div><svg viewBox="0 0 500 210" role="img" aria-label="Wykres procentu docelowej zmiany w modelu eliminacji pierwszego rzędu" style={{width:'100%'}}><path d="M45 25V175H470" fill="none" stroke="#64748b"/>{[0,50,100].map(v=><g key={v}><text x="8" y={180-v*1.4} fontSize="11">{v}%</text><path d={`M45 ${175-v*1.4}H470`} stroke="#d8e6e8"/></g>)}<path d={path} stroke="#168a87" strokeWidth="3" fill="none"/><text x="220" y="202" fontSize="12">Czas (0–56 dni)</text></svg><p className="workbench-result">{valid?pct(day).toFixed(1):'—'}% docelowej zmiany · 95% po {valid?(Math.log2(20)*half).toFixed(1):'—'} dniach</p><p>Model jednego kompartmentu, eliminacja pierwszego rzędu i stała podaż: 1 − 2^(−t/t½). Krzywa jest względna; nie wylicza FT4 ani TSH z dawki LT4.</p><Reason question="Czy osiągnięcie 95% oznacza właściwą dawkę?"><p>Nie. To tylko czas zbliżenia do nowego stanu przy założeniach modelu. Docelowy stan może być nieodpowiedni; TSH ma odrębną dynamikę, a termin kontroli zależy od sytuacji klinicznej.</p></Reason></Workbench>;
}
