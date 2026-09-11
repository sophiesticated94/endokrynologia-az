'use client';
import { AdrenalImagingWorkbench } from './components/clinical-workbench';
import { MechanismWorkbench } from './components/physiology-workbench';
export function AdrenalSimulator(_props: {embedded?:boolean;compact?:boolean} = {}) { return <><MechanismWorkbench system="adrenal"/><AdrenalImagingWorkbench/></>; }
