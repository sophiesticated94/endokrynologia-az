'use client';
import { NenGradeWorkbench, PrrtWorkbench, TumorGrowthWorkbench } from './components/clinical-workbench';
import { MechanismWorkbench } from './components/physiology-workbench';
export function NenSimulator(_props: {embedded?:boolean;compact?:boolean} = {}) { return <><NenGradeWorkbench/><MechanismWorkbench system="nen"/><PrrtWorkbench/><TumorGrowthWorkbench/></>; }
