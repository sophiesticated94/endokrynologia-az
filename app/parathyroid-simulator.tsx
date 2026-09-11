'use client';
import { CalciumWorkbench } from './components/clinical-workbench';
import { MechanismWorkbench } from './components/physiology-workbench';
export function ParathyroidSimulator(_props: {embedded?:boolean;compact?:boolean} = {}) { return <><MechanismWorkbench system="bone"/><CalciumWorkbench/></>; }
