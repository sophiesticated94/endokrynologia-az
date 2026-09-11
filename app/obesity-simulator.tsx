'use client';
import { WeightWorkbench, LipidWorkbench, FibrosisWorkbench } from './components/clinical-workbench';
export function ObesitySimulator(_props: {embedded?:boolean;compact?:boolean} = {}) { return <><WeightWorkbench/><LipidWorkbench/><FibrosisWorkbench/></>; }
