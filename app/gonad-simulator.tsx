'use client';
import { useState } from 'react';
import { HormoneAtlas } from './hormone-atlas';
import { OhssLearning } from './ohss-learning';
import { VermeulenFreeTestosteroneCalculator } from './components/math-chem-widgets-4';
export function GonadSimulator(_props:{embedded?:boolean}={}) {
 const [mode,setMode]=useState<'physiology'|'fem'|'masc'|'trt'|'ohss'|'binding'>('physiology');
 return <section><div className="atlas-presets">{([['physiology','Fizjologia'],['fem','GAHT feminizująca'],['masc','GAHT maskulinizująca'],['trt','Testosteron przy obecnych jądrach'],['ohss','Stymulacja i OHSS'],['binding','Wiązanie z SHBG']] as const).map(([key,label])=><button className="secondary" key={key} aria-pressed={mode===key} onClick={()=>setMode(key)}>{label}</button>)}</div>{mode==='ohss'?<OhssLearning/>:mode==='binding'?<VermeulenFreeTestosteroneCalculator/>:<HormoneAtlas key={mode} initialGoal={mode}/>}</section>;
}
