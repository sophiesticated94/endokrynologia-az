'use client';
import { PrrtWorkbench, TumorGrowthWorkbench } from './clinical-workbench';
import { MechanismWorkbench } from './physiology-workbench';
export function PrrtDosimetryCalculator(){return <PrrtWorkbench/>;}
export function Ki67TumorKineticsModel(){return <TumorGrowthWorkbench/>;}
export function SerotoninShuntAndSstrVisualizer(){return <MechanismWorkbench system="nen"/>;}
