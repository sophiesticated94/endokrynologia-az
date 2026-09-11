'use client';
import { WaterWorkbench, MechanismWorkbench } from './components/physiology-workbench';
export function PituitarySimulator(_props: {embedded?:boolean;compact?:boolean} = {}) { return <><MechanismWorkbench system="pituitary"/><WaterWorkbench/></>; }
