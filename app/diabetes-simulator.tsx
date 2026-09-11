'use client';
import { DiabetesEmergencyWorkbench } from './components/clinical-workbench';
import { InsulinMathWorkbench } from './components/physiology-workbench';
export function DiabetesSimulator(_props: {embedded?:boolean;compact?:boolean} = {}) { return <><InsulinMathWorkbench/><DiabetesEmergencyWorkbench/></>; }
