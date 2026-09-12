/**
 * Wersjonowany model dydaktyczny PK/PD osi HPG.
 * Wartości są rozkładami populacyjnymi i nie służą do wyznaczania dawki.
 */

export const GONAD_MODEL_VERSION = 'hpg-pkpd-2026.09-v1';

export type GonadType = 'testes' | 'ovaries' | 'mixed' | 'none';
export type GonadFunction = 'active' | 'impaired' | 'absent';
export type PhysiologicStage = 'mini_puberty' | 'prepubertal' | 'tanner2' | 'tanner3' | 'tanner4' | 'tanner5' | 'adult' | 'perimenopause' | 'postmenopause' | 'older';
export type ClinicalContext = 'gaht_feminizing' | 'gaht_masculinizing' | 'hypogonadism' | 'fertility_ivf' | 'puberty' | 'oncology' | 'pregnancy' | 'dsd';
export type DsdPreset = 'none' | 'cais' | 'five_alpha_deficiency' | 'gonadal_dysgenesis' | 'cah' | 'ovotesticular';
export type DrugFamily = 'estradiol' | 'testosterone' | 'progestogen' | 'gnrh_agonist' | 'gnrh_antagonist' | 'hcg' | 'serm' | 'aromatase_inhibitor' | 'spironolactone' | 'cyproterone' | 'finasteride';
export type EvidenceLevel = 'high' | 'moderate' | 'low' | 'extrapolated';
export type PredictionOrigin = 'model' | 'calibrated' | 'extrapolated';
export type AnalyteId =
  | 'estradiol' | 'testosterone' | 'freeTestosterone' | 'dht' | 'progesterone' | 'lh' | 'fsh' | 'shbg' | 'inhibin'
  | 'arActivity' | 'erActivity' | 'gnrhActivity' | 'aromataseActivity' | 'fiveAlphaActivity'
  | 'hemoglobin' | 'hematocrit' | 'potassium' | 'creatinine' | 'egfr' | 'prolactin' | 'alt' | 'ast'
  | 'ldl' | 'hdl' | 'triglycerides' | 'systolicBp' | 'diastolicBp';

export type EvidenceDescriptor = {
  id: string;
  title: string;
  year: string;
  url: string;
  population: string;
  sampleSize: string;
  kind: string;
  reviewedAt: string;
};

export type DrugDefinition = {
  id: string;
  family: DrugFamily;
  label: string;
  route: string;
  doseUnit: string;
  defaultDose: number;
  minDose: number;
  maxDose: number;
  defaultIntervalHours: number;
  halfLifeHours: number;
  variability: number;
  region: 'PL/EU' | 'research';
  evidence: EvidenceLevel;
  sourceIds: string[];
  direct?: Partial<Record<'estradiol' | 'testosterone' | 'progesterone', number>>;
  axisSuppression?: number;
  arBlock?: number;
  dhtReduction?: number;
  aromataseReduction?: number;
  gonadStimulation?: number;
};

export type PatientContext = {
  ageYears: number;
  stage: PhysiologicStage;
  weightKg: number;
  heightCm: number;
  egfr: number;
  hepaticFunction: 'normal' | 'impaired';
  gonads: GonadType;
  gonadFunction: GonadFunction;
  gonadReserve: number;
  uterusPresent: boolean;
  pregnant: boolean;
  gestationalWeek: number;
  dsdPreset: DsdPreset;
  arSensitivity: number;
  aromataseActivity: number;
  fiveAlphaActivity: number;
  steroidogenicActivity: number;
};

export type DrugRegimen = {
  id: string;
  drugId: string;
  dose: number;
  intervalHours: number;
  hoursSinceLastDose: number;
  durationDays: number;
  adherence: number;
};

export type Observation = { analyte: AnalyteId; value: number; hoursFromNow: number };
export type SimulationInput = {
  id: string;
  label: string;
  context: ClinicalContext;
  patient: PatientContext;
  regimens: DrugRegimen[];
  observations: Observation[];
  horizonHours: number;
};

export type PredictionInterval = {
  median: number;
  p25: number;
  p75: number;
  p05: number;
  p95: number;
  unit: string;
  origin: PredictionOrigin;
  evidence: EvidenceLevel;
  sourceIds: string[];
};
export type PredictionPoint = { hour: number; values: Record<AnalyteId, PredictionInterval> };
export type PredictionSeries = {
  modelVersion: string;
  inputId: string;
  points: PredictionPoint[];
  sample: PredictionPoint;
  evidence: EvidenceDescriptor[];
  warnings: string[];
};

export const ANALYTES: Record<AnalyteId, { label: string; unit: string; decimals: number }> = {
  estradiol:{label:'Estradiol',unit:'pg/ml',decimals:0}, testosterone:{label:'Testosteron całkowity',unit:'ng/dl',decimals:0}, freeTestosterone:{label:'Wolny testosteron',unit:'pg/ml',decimals:1},
  dht:{label:'DHT',unit:'ng/dl',decimals:0}, progesterone:{label:'Progesteron',unit:'ng/ml',decimals:1}, lh:{label:'LH',unit:'IU/l',decimals:1}, fsh:{label:'FSH',unit:'IU/l',decimals:1}, shbg:{label:'SHBG',unit:'nmol/l',decimals:0}, inhibin:{label:'Inhibina — indeks',unit:'%',decimals:0},
  arActivity:{label:'Aktywność AR',unit:'%',decimals:0}, erActivity:{label:'Aktywność ER',unit:'%',decimals:0}, gnrhActivity:{label:'Sygnał GnRH',unit:'%',decimals:0}, aromataseActivity:{label:'Aktywność aromatazy',unit:'%',decimals:0}, fiveAlphaActivity:{label:'Aktywność 5α-reduktazy',unit:'%',decimals:0},
  hemoglobin:{label:'Hemoglobina',unit:'g/dl',decimals:1}, hematocrit:{label:'Hematokryt',unit:'%',decimals:1}, potassium:{label:'Potas',unit:'mmol/l',decimals:2}, creatinine:{label:'Kreatynina',unit:'mg/dl',decimals:2}, egfr:{label:'eGFR — przybliżenie',unit:'ml/min/1,73 m²',decimals:0}, prolactin:{label:'Prolaktyna',unit:'ng/ml',decimals:1}, alt:{label:'ALT',unit:'U/l',decimals:0}, ast:{label:'AST',unit:'U/l',decimals:0},
  ldl:{label:'LDL-C',unit:'mg/dl',decimals:0}, hdl:{label:'HDL-C',unit:'mg/dl',decimals:0}, triglycerides:{label:'Triglicerydy',unit:'mg/dl',decimals:0}, systolicBp:{label:'Ciśnienie skurczowe',unit:'mmHg',decimals:0}, diastolicBp:{label:'Ciśnienie rozkurczowe',unit:'mmHg',decimals:0},
};

export const GONAD_EVIDENCE: EvidenceDescriptor[] = [
  {id:'endo-trans-2017',title:'Endocrine Society — endocrine treatment of gender-dysphoric/gender-incongruent persons',year:'2017',url:'https://academic.oup.com/jcem/article/102/11/3869/4157558',population:'Dorośli i młodzież korzystający z GAHT',sampleSize:'wytyczne',kind:'monitorowanie i cele terapii',reviewedAt:'2026-09-12'},
  {id:'wpath-soc8-2022',title:'WPATH Standards of Care, version 8 — Hormone Therapy',year:'2022',url:'https://doi.org/10.1080/26895269.2022.2100644',population:'Osoby transpłciowe i różnorodne płciowo',sampleSize:'standard opieki',kind:'zalecenia',reviewedAt:'2026-09-12'},
  {id:'estradiol-patch-label',title:'Estradiol transdermal system — dane farmakokinetyczne',year:'2025',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c714974b-766f-42f2-a846-b0c1f5a60560',population:'Zdrowe osoby pomenopauzalne',sampleSize:'197 w sześciu badaniach',kind:'etykieta produktu / PK',reviewedAt:'2026-09-12'},
  {id:'testosterone-gel-label',title:'Testosterone gel 1.62% — dane farmakokinetyczne',year:'2025',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=10dab294-6a43-4bb3-9d91-2d200c624ffb',population:'Dorośli mężczyźni z hipogonadyzmem',sampleSize:'badania rejestracyjne',kind:'etykieta produktu / PK',reviewedAt:'2026-09-12'},
  {id:'gaht-concentrations-2021',title:'Serum hormone concentrations during gender-affirming hormone therapy',year:'2021',url:'https://doi.org/10.1016/j.eprac.2020.10.001',population:'Dorośli korzystający z feminizującej lub maskulinizującej GAHT',sampleSize:'kohorta retrospektywna',kind:'zależność dawka–stężenie',reviewedAt:'2026-09-12'},
  {id:'ema-cpa-2020',title:'EMA — ograniczenia stosowania cyproteronu z powodu ryzyka oponiaka',year:'2020',url:'https://www.ema.europa.eu/en/medicines/human/referrals/cyproterone-containing-medicinal-products',population:'Osoby stosujące cyproteron',sampleSize:'przegląd bezpieczeństwa',kind:'bezpieczeństwo',reviewedAt:'2026-09-12'},
  {id:'drug-label-extrapolation',title:'ChPL i dane klasowe — model dydaktyczny',year:'2026',url:'https://www.ema.europa.eu/en/medicines',population:'Różne populacje właściwe dla preparatu',sampleSize:'zależne od substancji',kind:'ekstrapolacja mechanistyczna',reviewedAt:'2026-09-12'},
];

const d = (value: DrugDefinition) => value;
export const DRUG_DEFINITIONS: DrugDefinition[] = [
  d({id:'e2_oral',family:'estradiol',label:'17β-estradiol doustny',route:'doustna',doseUnit:'mg/d',defaultDose:2,minDose:.5,maxDose:8,defaultIntervalHours:24,halfLifeHours:14,variability:.65,region:'PL/EU',evidence:'moderate',sourceIds:['endo-trans-2017','gaht-concentrations-2021'],direct:{estradiol:105},axisSuppression:.34}),
  d({id:'e2_patch',family:'estradiol',label:'17β-estradiol — plaster',route:'przezskórna',doseUnit:'µg/24 h',defaultDose:100,minDose:25,maxDose:400,defaultIntervalHours:84,halfLifeHours:72,variability:.5,region:'PL/EU',evidence:'moderate',sourceIds:['estradiol-patch-label'],direct:{estradiol:85},axisSuppression:.28}),
  d({id:'e2_gel',family:'estradiol',label:'17β-estradiol — żel',route:'przezskórna',doseUnit:'mg/d',defaultDose:1.5,minDose:.5,maxDose:4,defaultIntervalHours:24,halfLifeHours:20,variability:.55,region:'PL/EU',evidence:'low',sourceIds:['drug-label-extrapolation'],direct:{estradiol:75},axisSuppression:.25}),
  d({id:'e2_valerate_inj',family:'estradiol',label:'Walerianian estradiolu — iniekcja',route:'IM/SC',doseUnit:'mg',defaultDose:4,minDose:1,maxDose:10,defaultIntervalHours:168,halfLifeHours:84,variability:.7,region:'research',evidence:'low',sourceIds:['gaht-concentrations-2021'],direct:{estradiol:190},axisSuppression:.52}),
  d({id:'t_gel',family:'testosterone',label:'Testosteron — żel 1–1,62%',route:'przezskórna',doseUnit:'mg/d',defaultDose:40.5,minDose:10,maxDose:100,defaultIntervalHours:24,halfLifeHours:20,variability:.48,region:'PL/EU',evidence:'moderate',sourceIds:['testosterone-gel-label'],direct:{testosterone:430},axisSuppression:.62}),
  d({id:'t_enanthate',family:'testosterone',label:'Enantan testosteronu',route:'IM/SC',doseUnit:'mg',defaultDose:100,minDose:20,maxDose:250,defaultIntervalHours:168,halfLifeHours:108,variability:.55,region:'PL/EU',evidence:'moderate',sourceIds:['endo-trans-2017','gaht-concentrations-2021'],direct:{testosterone:560},axisSuppression:.72}),
  d({id:'t_cypionate',family:'testosterone',label:'Cypionian testosteronu',route:'IM/SC',doseUnit:'mg',defaultDose:100,minDose:20,maxDose:250,defaultIntervalHours:168,halfLifeHours:120,variability:.55,region:'research',evidence:'moderate',sourceIds:['endo-trans-2017'],direct:{testosterone:540},axisSuppression:.7}),
  d({id:'t_undecanoate',family:'testosterone',label:'Undekanian testosteronu — depot',route:'IM',doseUnit:'mg',defaultDose:1000,minDose:750,maxDose:1000,defaultIntervalHours:2016,halfLifeHours:840,variability:.42,region:'PL/EU',evidence:'moderate',sourceIds:['endo-trans-2017','drug-label-extrapolation'],direct:{testosterone:470},axisSuppression:.78}),
  d({id:'progesterone',family:'progestogen',label:'Progesteron mikronizowany',route:'doustna',doseUnit:'mg/d',defaultDose:100,minDose:50,maxDose:300,defaultIntervalHours:24,halfLifeHours:16,variability:.75,region:'PL/EU',evidence:'low',sourceIds:['drug-label-extrapolation'],direct:{progesterone:5},axisSuppression:.12}),
  d({id:'mpa',family:'progestogen',label:'Medroksyprogesteron (MPA)',route:'doustna/depot',doseUnit:'mg/d',defaultDose:5,minDose:2.5,maxDose:150,defaultIntervalHours:24,halfLifeHours:30,variability:.65,region:'PL/EU',evidence:'low',sourceIds:['drug-label-extrapolation'],axisSuppression:.28}),
  d({id:'leuprorelin',family:'gnrh_agonist',label:'Leuprorelina — depot',route:'IM/SC',doseUnit:'mg',defaultDose:3.75,minDose:1,maxDose:45,defaultIntervalHours:672,halfLifeHours:720,variability:.35,region:'PL/EU',evidence:'moderate',sourceIds:['drug-label-extrapolation'],axisSuppression:.94}),
  d({id:'triptorelin',family:'gnrh_agonist',label:'Triptorelina — depot',route:'IM',doseUnit:'mg',defaultDose:3.75,minDose:.1,maxDose:22.5,defaultIntervalHours:672,halfLifeHours:720,variability:.35,region:'PL/EU',evidence:'moderate',sourceIds:['drug-label-extrapolation'],axisSuppression:.94}),
  d({id:'goserelin',family:'gnrh_agonist',label:'Goserelina — implant',route:'SC',doseUnit:'mg',defaultDose:3.6,minDose:3.6,maxDose:10.8,defaultIntervalHours:672,halfLifeHours:720,variability:.35,region:'PL/EU',evidence:'moderate',sourceIds:['drug-label-extrapolation'],axisSuppression:.93}),
  d({id:'cetrorelix',family:'gnrh_antagonist',label:'Cetroreliks (IVF)',route:'SC',doseUnit:'mg/d',defaultDose:.25,minDose:.25,maxDose:3,defaultIntervalHours:24,halfLifeHours:30,variability:.35,region:'PL/EU',evidence:'moderate',sourceIds:['drug-label-extrapolation'],axisSuppression:.78}),
  d({id:'degarelix',family:'gnrh_antagonist',label:'Degareliks (onkologia)',route:'SC',doseUnit:'mg',defaultDose:80,minDose:80,maxDose:240,defaultIntervalHours:672,halfLifeHours:672,variability:.38,region:'PL/EU',evidence:'moderate',sourceIds:['drug-label-extrapolation'],axisSuppression:.96}),
  d({id:'relugolix',family:'gnrh_antagonist',label:'Relugoliks (onkologia)',route:'doustna',doseUnit:'mg/d',defaultDose:120,minDose:120,maxDose:360,defaultIntervalHours:24,halfLifeHours:25,variability:.4,region:'PL/EU',evidence:'moderate',sourceIds:['drug-label-extrapolation'],axisSuppression:.95}),
  d({id:'rhcg',family:'hcg',label:'Choriogonadotropina alfa (rhCG)',route:'SC',doseUnit:'µg',defaultDose:250,minDose:125,maxDose:500,defaultIntervalHours:168,halfLifeHours:30,variability:.48,region:'PL/EU',evidence:'moderate',sourceIds:['drug-label-extrapolation'],gonadStimulation:.85}),
  d({id:'hcg_urinary',family:'hcg',label:'hCG pochodzenia moczowego',route:'IM/SC',doseUnit:'IU',defaultDose:5000,minDose:500,maxDose:10000,defaultIntervalHours:168,halfLifeHours:30,variability:.5,region:'PL/EU',evidence:'moderate',sourceIds:['drug-label-extrapolation'],gonadStimulation:.8}),
  d({id:'clomiphene',family:'serm',label:'Klomifen',route:'doustna',doseUnit:'mg/d',defaultDose:50,minDose:12.5,maxDose:100,defaultIntervalHours:24,halfLifeHours:120,variability:.6,region:'PL/EU',evidence:'low',sourceIds:['drug-label-extrapolation'],gonadStimulation:.42}),
  d({id:'tamoxifen',family:'serm',label:'Tamoksyfen',route:'doustna',doseUnit:'mg/d',defaultDose:20,minDose:10,maxDose:40,defaultIntervalHours:24,halfLifeHours:168,variability:.52,region:'PL/EU',evidence:'low',sourceIds:['drug-label-extrapolation'],gonadStimulation:.2}),
  d({id:'letrozole',family:'aromatase_inhibitor',label:'Letrozol',route:'doustna',doseUnit:'mg/d',defaultDose:2.5,minDose:1,maxDose:5,defaultIntervalHours:24,halfLifeHours:48,variability:.45,region:'PL/EU',evidence:'moderate',sourceIds:['drug-label-extrapolation'],aromataseReduction:.92,gonadStimulation:.28}),
  d({id:'anastrozole',family:'aromatase_inhibitor',label:'Anastrozol',route:'doustna',doseUnit:'mg/d',defaultDose:1,minDose:.25,maxDose:1,defaultIntervalHours:24,halfLifeHours:50,variability:.45,region:'PL/EU',evidence:'moderate',sourceIds:['drug-label-extrapolation'],aromataseReduction:.85,gonadStimulation:.22}),
  d({id:'spironolactone',family:'spironolactone',label:'Spironolakton',route:'doustna',doseUnit:'mg/d',defaultDose:100,minDose:25,maxDose:400,defaultIntervalHours:24,halfLifeHours:16,variability:.65,region:'PL/EU',evidence:'low',sourceIds:['endo-trans-2017','drug-label-extrapolation'],arBlock:.5,axisSuppression:.08}),
  d({id:'cyproterone',family:'cyproterone',label:'Octan cyproteronu (CPA)',route:'doustna',doseUnit:'mg/d',defaultDose:10,minDose:2.5,maxDose:50,defaultIntervalHours:24,halfLifeHours:40,variability:.45,region:'PL/EU',evidence:'moderate',sourceIds:['ema-cpa-2020','drug-label-extrapolation'],arBlock:.76,axisSuppression:.72}),
  d({id:'finasteride',family:'finasteride',label:'Finasteryd',route:'doustna',doseUnit:'mg/d',defaultDose:1,minDose:.2,maxDose:5,defaultIntervalHours:24,halfLifeHours:7,variability:.25,region:'PL/EU',evidence:'moderate',sourceIds:['drug-label-extrapolation'],dhtReduction:.68}),
];

const drugMap = new Map(DRUG_DEFINITIONS.map(x => [x.id, x]));
export const getDrugDefinition = (id: string) => drugMap.get(id) ?? DRUG_DEFINITIONS[0];
const clamp = (v:number,min:number,max:number) => Math.min(max,Math.max(min,v));

const defaultPatient: PatientContext = {
  ageYears:28,stage:'adult',weightKg:72,heightCm:174,egfr:105,hepaticFunction:'normal',gonads:'testes',gonadFunction:'active',gonadReserve:100,uterusPresent:false,pregnant:false,gestationalWeek:12,dsdPreset:'none',arSensitivity:100,aromataseActivity:100,fiveAlphaActivity:100,steroidogenicActivity:100,
};

const regimen = (id:string, drugId:string, dose:number, intervalHours:number, hoursSinceLastDose=12, durationDays=120):DrugRegimen => ({id,drugId,dose,intervalHours,hoursSinceLastDose,durationDays,adherence:95});
export const GONAD_PRESETS: SimulationInput[] = [
  {id:'fem-intact',label:'Feminizacja · jądra obecne',context:'gaht_feminizing',patient:{...defaultPatient,gonads:'testes'},regimens:[regimen('e2','e2_patch',100,84,36),regimen('aa','spironolactone',100,24,12)],observations:[],horizonHours:168},
  {id:'fem-no-gonads',label:'Feminizacja · po orchiektomii',context:'gaht_feminizing',patient:{...defaultPatient,ageYears:36,gonads:'none',gonadFunction:'absent',gonadReserve:0},regimens:[regimen('e2','e2_patch',75,84,36)],observations:[],horizonHours:168},
  {id:'masc-intact',label:'Maskulinizacja · jajniki obecne',context:'gaht_masculinizing',patient:{...defaultPatient,ageYears:24,weightKg:68,heightCm:168,gonads:'ovaries',uterusPresent:true},regimens:[regimen('t','t_enanthate',75,168,84)],observations:[],horizonHours:168},
  {id:'masc-no-gonads',label:'Maskulinizacja · po owariektomii',context:'gaht_masculinizing',patient:{...defaultPatient,ageYears:42,weightKg:78,heightCm:170,gonads:'none',gonadFunction:'absent',gonadReserve:0},regimens:[regimen('t','t_gel',40.5,24,8)],observations:[],horizonHours:168},
];

function stageFactor(p:PatientContext){
  const map:Record<PhysiologicStage,number>={mini_puberty:.32,prepubertal:.06,tanner2:.2,tanner3:.42,tanner4:.7,tanner5:.92,adult:1,perimenopause:.62,postmenopause:.12,older:.16};
  return map[p.stage];
}

function baselineValues(p:PatientContext):Record<AnalyteId,number>{
  const stage=stageFactor(p); const reserve=p.gonadFunction==='absent'||p.gonads==='none'?0:clamp(p.gonadReserve/100,0,1)*(p.gonadFunction==='impaired'?.42:1);
  const steroid=clamp(p.steroidogenicActivity/100,0,1.5); const ovaries=p.gonads==='ovaries'||p.gonads==='mixed'; const testes=p.gonads==='testes'||p.gonads==='mixed';
  let t=12+stage*reserve*steroid*(testes?500:ovaries?24:0); let e2=12+stage*reserve*steroid*(ovaries?88:testes?14:0); let p4=ovaries&&reserve?2.2*stage*reserve:.25;
  let lh=reserve?5:24, fsh=reserve?5:38, inhibin=reserve*stage*100;
  if(p.stage==='postmenopause'||(ovaries&&p.stage==='older')){e2=15;t=18;p4=.3;lh=28;fsh=52;inhibin=8;}
  if(p.pregnant){const w=clamp(p.gestationalWeek,1,42);e2=350+Math.pow(w,1.7)*45;p4=12+w*3.4;lh=.2;fsh=.2;inhibin=80;}
  if(p.dsdPreset==='cais') p.arSensitivity=0;
  if(p.dsdPreset==='five_alpha_deficiency') p.fiveAlphaActivity=8;
  if(p.dsdPreset==='gonadal_dysgenesis'){t*=.18;e2*=.4;lh*=2;fsh*=2;}
  if(p.dsdPreset==='cah') t+=140;
  if(p.dsdPreset==='ovotesticular'){t=120*reserve*stage+18;e2=65*reserve*stage+14;}
  const shbg=ovaries?62:34; const dht=t*.085*(p.fiveAlphaActivity/100); const freeT=t/(shbg*.7+18);
  const bmi=p.weightKg/Math.pow(p.heightCm/100,2); const creat=.72+(p.weightKg-65)*.004+(t>250?.12:0);
  return {estradiol:e2,testosterone:t,freeTestosterone:freeT,dht,progesterone:p4,lh,fsh,shbg,inhibin,
    arActivity:clamp(t/(t+120)*100*(p.arSensitivity/100),0,100),erActivity:clamp(e2/(e2+55)*100,0,100),gnrhActivity:p.pregnant?5:reserve?70:95,aromataseActivity:p.aromataseActivity,fiveAlphaActivity:p.fiveAlphaActivity,
    hemoglobin:testes?15.1:13.5,hematocrit:testes?45:40.5,potassium:4.2,creatinine:creat,egfr:p.egfr,prolactin:10,alt:22,ast:21,ldl:112,hdl:ovaries?58:48,triglycerides:110+(bmi>30?25:0),systolicBp:118+(bmi>30?6:0),diastolicBp:74+(bmi>30?4:0)};
}

function exposure(def:DrugDefinition,r:DrugRegimen,hour:number){
  const adherence=clamp(r.adherence/100,0,1); const doseRatio=clamp(r.dose/def.defaultDose,0,8); const interval=Math.max(1,r.intervalHours); const k=Math.log(2)/Math.max(2,def.halfLifeHours);
  const treatmentHours=Math.max(1,r.durationDays*24+hour); const accumulation=1-Math.exp(-k*treatmentHours);
  const phase=((r.hoursSinceLastDose+hour)%interval+interval)%interval;
  const meanWave=(1-Math.exp(-k*interval))/(k*interval);
  const wave=Math.exp(-k*phase)/Math.max(.12,meanWave);
  const depot=def.halfLifeHours>interval*2?.72+.28*wave:wave;
  return doseRatio*adherence*accumulation*depot;
}

function interval(median:number,rel:number,unit:string,evidence:EvidenceLevel,sourceIds:string[],origin:PredictionOrigin='model'):PredictionInterval{
  const m=Math.max(0,median); const r=clamp(rel,.06,1.8); return {median:m,p25:Math.max(0,m*(1-r*.32)),p75:m*(1+r*.32),p05:Math.max(0,m*(1-r)),p95:m*(1+r),unit,origin,evidence,sourceIds};
}

function valuesAt(input:SimulationInput,hour:number){
  const p={...input.patient}; const v=baselineValues(p); let axis=0,arBlock=0,dhtReduction=0,ai=0,stim=0,e2Load=0,tLoad=0,p4Load=0,spiro=0,cpa=0,oralE2=0;
  let uncertainty=.25; let evidence:EvidenceLevel='moderate'; const sourceIds=new Set<string>();
  for(const r of input.regimens){const def=getDrugDefinition(r.drugId);const x=exposure(def,r,hour);def.sourceIds.forEach(s=>sourceIds.add(s));uncertainty=Math.max(uncertainty,def.variability);if(def.evidence==='low'||def.evidence==='extrapolated')evidence='low';
    e2Load+=(def.direct?.estradiol??0)*x;tLoad+=(def.direct?.testosterone??0)*x;p4Load+=(def.direct?.progesterone??0)*x;axis=1-(1-axis)*(1-clamp((def.axisSuppression??0)*Math.min(x,1.4),0,.99));arBlock=1-(1-arBlock)*(1-clamp((def.arBlock??0)*Math.min(x,1.5),0,.98));dhtReduction=1-(1-dhtReduction)*(1-clamp((def.dhtReduction??0)*Math.min(x,1.4),0,.95));ai=1-(1-ai)*(1-clamp((def.aromataseReduction??0)*Math.min(x,1.4),0,.98));stim+=clamp((def.gonadStimulation??0)*x,0,1.8);if(def.family==='spironolactone')spiro+=x;if(def.family==='cyproterone')cpa+=x;if(def.id==='e2_oral')oralE2+=x;
    if(def.family==='gnrh_agonist'&&r.durationDays<10&&hour<168){axis*=.15;stim+=.45*x;}
  }
  const hasGonads=p.gonads!=='none'&&p.gonadFunction!=='absent'; const isTestes=p.gonads==='testes'||p.gonads==='mixed'; const isOvaries=p.gonads==='ovaries'||p.gonads==='mixed'; const gonadResponse=hasGonads?stim*(p.gonadReserve/100):0;
  v.lh=Math.max(.15,v.lh*(1-axis)*(1+gonadResponse*.75));v.fsh=Math.max(.15,v.fsh*(1-axis)*(1+gonadResponse*.55));
  if(isTestes&&hasGonads)v.testosterone=Math.max(8,v.testosterone*(1-axis)*(1+gonadResponse*1.25));
  if(isOvaries&&hasGonads){v.estradiol=Math.max(8,v.estradiol*(1-axis)*(1+gonadResponse*1.7));v.progesterone*=1+gonadResponse*1.1;}
  v.testosterone+=tLoad;v.estradiol=(v.estradiol+e2Load+v.testosterone*.018*(p.aromataseActivity/100))*(1-ai);v.progesterone+=p4Load;
  v.shbg*=1+oralE2*.38+e2Load/900-cpa*.08;v.dht=v.testosterone*.085*(p.fiveAlphaActivity/100)*(1-dhtReduction);v.freeTestosterone=v.testosterone/(v.shbg*.7+18);
  v.aromataseActivity=clamp(p.aromataseActivity*(1-ai),0,180);v.fiveAlphaActivity=clamp(p.fiveAlphaActivity*(1-dhtReduction),0,180);v.arActivity=clamp((v.testosterone/(v.testosterone+120)*75+v.dht/(v.dht+25)*25)*(p.arSensitivity/100)*(1-arBlock),0,100);v.erActivity=clamp(v.estradiol/(v.estradiol+55)*100,0,100);v.gnrhActivity=clamp((hasGonads?70:95)*(1-axis),0,100);v.inhibin=hasGonads?clamp(v.inhibin*(1-axis+gonadResponse*.8),0,160):0;
  const tRatio=v.testosterone/500,eRatio=v.estradiol/100;v.hematocrit=clamp(v.hematocrit+3.1*tRatio-1.1*eRatio,25,65);v.hemoglobin=v.hematocrit*.335;v.potassium=clamp(4.2+spiro*.28*(100/Math.max(20,p.egfr)),2.5,7);v.prolactin=clamp(10+eRatio*2.2+cpa*4.5,2,100);v.alt=clamp(22+cpa*5+(p.hepaticFunction==='impaired'?18:0),5,180);v.ast=clamp(21+cpa*3+(p.hepaticFunction==='impaired'?14:0),5,160);v.ldl=clamp(112+ai*8+tRatio*4-eRatio*3,35,260);v.hdl=clamp(v.hdl+eRatio*3-tRatio*4,20,110);v.triglycerides=clamp(v.triglycerides+oralE2*25+tRatio*5,40,500);v.systolicBp=clamp(v.systolicBp+tRatio*2-spiro*3,80,190);v.diastolicBp=clamp(v.diastolicBp+tRatio-spiro*2,45,120);
  const units=ANALYTES; const output={} as Record<AnalyteId,PredictionInterval>; (Object.keys(v) as AnalyteId[]).forEach(key=>{const synthetic=['hemoglobin','hematocrit','potassium','creatinine','egfr','prolactin','alt','ast','ldl','hdl','triglycerides','systolicBp','diastolicBp'].includes(key); const rel=synthetic?Math.max(.12,uncertainty*.72):uncertainty;output[key]=interval(v[key],rel,units[key].unit,evidence,[...sourceIds],evidence==='low'?'extrapolated':'model');});
  return output;
}

export function calibrateHormoneScenario(series:PredictionSeries,observations:Observation[]):PredictionSeries{
  if(!observations.length)return series; const points=series.points.map(point=>({hour:point.hour,values:{...point.values}}));
  for(const obs of observations){const nearest=points.reduce((a,b)=>Math.abs(b.hour-obs.hoursFromNow)<Math.abs(a.hour-obs.hoursFromNow)?b:a);const predicted=nearest.values[obs.analyte]?.median;if(!predicted||obs.value<0)continue;const ratio=clamp(obs.value/predicted,.2,5);
    for(const point of points){const old=point.values[obs.analyte];const median=old.median*ratio;point.values[obs.analyte]={...interval(median,Math.max(.08,(old.p95-old.p05)/(Math.max(.01,old.median)*2)*.55),old.unit,old.evidence,old.sourceIds,'calibrated')};}
  }
  const sample=points.reduce((a,b)=>Math.abs(b.hour)<Math.abs(a.hour)?b:a);return {...series,points,sample,warnings:[...series.warnings,'Co najmniej jedno pasmo skalibrowano względem wpisanego pomiaru; kalibracja nie przenosi się automatycznie między preparatami.']};
}

export function simulateHormoneScenario(input:SimulationInput):PredictionSeries{
  const horizon=clamp(input.horizonHours,24,2160);const count=49;const points=Array.from({length:count},(_,i)=>{const hour=-horizon*.25+(horizon*1.25*i)/(count-1);return {hour,values:valuesAt(input,hour)};});
  const sourceIds=new Set(input.regimens.flatMap(r=>getDrugDefinition(r.drugId).sourceIds));const warnings=['Zakresy opisują modelowaną populację, nie wynik konkretnej osoby i nie wyznaczają dawki.'];
  if(input.regimens.some(r=>getDrugDefinition(r.drugId).evidence==='low'||getDrugDefinition(r.drugId).region==='research'))warnings.push('Scenariusz zawiera dane o niskiej zgodności lub preparat badawczy; szerokie pasmo jest celowe.');
  if(input.patient.pregnant)warnings.push('Ciąża silnie zmienia fizjologię i bezpieczeństwo leków. Symulacja nie ocenia bezpieczeństwa płodu ani nie stanowi rekomendacji leczenia.');
  if(input.patient.stage!=='adult')warnings.push('Dla wieku rozwojowego lub późnego zastosowano osobną fizjologiczną warstwę, lecz dane PK/PD mogą pochodzić z innej populacji.');
  const raw:PredictionSeries={modelVersion:GONAD_MODEL_VERSION,inputId:input.id,points,sample:points.reduce((a,b)=>Math.abs(b.hour)<Math.abs(a.hour)?b:a),evidence:GONAD_EVIDENCE.filter(e=>sourceIds.has(e.id)),warnings};return calibrateHormoneScenario(raw,input.observations);
}

export function convertDisplay(analyte:AnalyteId,value:number,si:boolean){
  if(!si)return {value,unit:ANALYTES[analyte].unit};
  if(analyte==='estradiol')return {value:value*3.671,unit:'pmol/l'};
  if(['testosterone','dht'].includes(analyte))return {value:value*.0347,unit:'nmol/l'};
  if(analyte==='freeTestosterone')return {value:value*3.467,unit:'pmol/l'};
  if(['ldl','hdl'].includes(analyte))return {value:value*.02586,unit:'mmol/l'};
  if(analyte==='triglycerides')return {value:value*.01129,unit:'mmol/l'};
  if(analyte==='creatinine')return {value:value*88.4,unit:'µmol/l'};
  return {value,unit:ANALYTES[analyte].unit};
}
