import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons,questions,flashcards,sources} from '../lib/course.ts';
import {cases} from '../lib/cases.ts';
import {scheduleReview,sampleQuestions,grade,projectActivities,saveIdempotently,isSafePublicKey} from '../lib/learning.ts';
import {glossary,glossaryMap} from '../lib/glossary.ts';
import {calculateHormones,presets,defaultState,simulatorLegend} from '../lib/simulator.ts';
import {calculatePituitaryState,pituitaryPresets,defaultPituitaryState,pituitarySimulatorLegend} from '../lib/pituitary-simulator.ts';
const now=new Date('2026-09-11T12:00:00Z');
test('isSafePublicKey accepts anon JWT, publishable keys and rejects service_role and invalid keys',()=>{
 const anonJwt='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIn0.sig';
 const serviceRoleJwt='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UifQ.sig';
 assert.equal(isSafePublicKey('sb_publishable_demo123'),true);
 assert.equal(isSafePublicKey('sbp_project_anon'),true);
 assert.equal(isSafePublicKey(anonJwt),true);
 assert.equal(isSafePublicKey(serviceRoleJwt),false);
 assert.equal(isSafePublicKey('secret_key_123'),false);
 assert.equal(isSafePublicKey(''),false);
 assert.equal(isSafePublicKey(null),false);
});
test('complete curriculum: 24 lessons across 2 modules, 120 explained questions, 120 cards, 24 four-step cases',()=>{
 assert.equal(lessons.length,24);assert.equal(questions.length,120);assert.equal(flashcards.length,120);assert.equal(cases.length,24);
 const thyroidLessons = lessons.filter(l => l.moduleId === 'tarczyca');
 const pituitaryLessons = lessons.filter(l => l.moduleId === 'przysadka');
 assert.equal(thyroidLessons.length, 12);
 assert.equal(pituitaryLessons.length, 12);
 for(const l of lessons){assert.equal(l.questions.length,5);assert.ok(l.sections.length>=3);assert.ok(l.goals.length>=2);assert.ok(l.advanced.length>100);assert.ok(l.table.rows.length>=3);assert.ok(l.sourceIds.every(id=>sources[id]));}
 for(const c of cases){assert.equal(c.steps.length,4);assert.deepEqual(c.steps.map(s=>s.stage),['Objawy','Badania','Rozpoznanie','Postępowanie']);assert.ok(lessons.some(l=>l.id===c.lessonId));}
 const bank=[...questions,...cases.flatMap(c=>c.steps)];assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
 for(const q of bank){assert.ok(q.answer>=0&&q.answer<q.options.length);assert.ok(q.options.every(o=>o.explanation.length>15&&o.text.length>0));assert.equal(new Set(q.options.map(o=>o.text)).size,q.options.length);}
});
test('correct answers are distributed and physiology answer remains TSH after rotation',()=>{assert.deepEqual([...new Set(questions.map(q=>q.answer))].sort(),[0,1,2]);assert.equal(questions[0].options[questions[0].answer].text,'TSH');assert.equal(questions[1].options[questions[1].answer].text,'Spadek TSH');});
test('exam samples 30 unique questions, does not mutate bank, varies between runs',()=>{const before=questions.map(q=>q.id);const a=sampleQuestions(questions,30,()=>0.1);const b=sampleQuestions(questions,30,()=>0.8);assert.equal(a.length,30);assert.equal(new Set(a.map(q=>q.id)).size,30);assert.notDeepEqual(a,b);assert.deepEqual(questions.map(q=>q.id),before);assert.throws(()=>sampleQuestions(questions,121));});
test('grading handles perfect, empty and changed answers',()=>{const bank=questions.slice(0,5);const answers=Object.fromEntries(bank.map(q=>[q.id,q.answer]));assert.deepEqual(grade(bank,answers),{correct:5,total:5,percent:100});assert.equal(grade(bank,{}).correct,0);answers[bank[0].id]=(bank[0].answer+1)%3;assert.equal(grade(bank,answers).percent,80);assert.equal(grade([],{}).percent,0);});
test('review intervals progress 1,3,7,14,30 and cap at 30 days',()=>{let r;for(const days of [1,3,7,14,30,30]){r=scheduleReview(r,true,now);assert.equal((Date.parse(r.dueAt)-now.getTime())/86400000,days);}});
test('forgotten card resets to first stage including already mature cards',()=>{const r=scheduleReview({stage:4,dueAt:now.toISOString()},false,now);assert.deepEqual(r,{stage:0,dueAt:'2026-09-12T12:00:00.000Z'});assert.equal(scheduleReview(r,true,now).stage,1)});
const event=(id,kind,target_id,payload={},time='2026-09-11T12:00:00Z')=>({id,kind,target_id,payload,user_id:'test',content_version:'v1',created_at:time});
test('event projection is order-independent, deduplicates retries and preserves old attempts',()=>{
 const events=[event('1','lesson','fizjologia'),event('2','quiz','fizjologia',{correct:3}),event('3','profile','level',{level:'doctor'}),event('4','lesson','fizjologia')];
 const a=projectActivities(events);assert.deepEqual(a,projectActivities([...events].reverse()));assert.deepEqual(a,projectActivities([...events,events[1]]));assert.equal(a.attempts.length,1);assert.equal(a.attempts[0].content_version,'v1');assert.deepEqual(a.completed,['fizjologia']);assert.equal(a.level,'doctor');
});
test('multi-device review events converge in server-time order',()=>{
 const a=event('a','review','card',{remembered:true});const b=event('b','review','card',{remembered:true},'2026-09-12T12:00:00Z');const c=event('c','review','card',{remembered:false},'2026-09-13T12:00:00Z');
 const state=projectActivities([c,a,b]);assert.deepEqual(state,projectActivities([a,b,c,b]));assert.equal(state.reviews.card.stage,0);assert.equal(state.reviews.card.dueAt,'2026-09-14T12:00:00.000Z');
});
test('network failure followed by retry reuses id; duplicate acknowledgement is success',async()=>{
 const e=event('retry-id','exam','tarczyca');let calls=0;const received=[];
 const insert=async data=>{received.push(data.id);calls++;return {error:calls===1?{code:'network',message:'offline'}:null}};
 await assert.rejects(saveIdempotently(e,insert));await saveIdempotently(e,insert);assert.deepEqual(received,['retry-id','retry-id']);
 await saveIdempotently(e,async()=>({error:{code:'23505',message:'duplicate'}}));
 await assert.rejects(saveIdempotently(e,async()=>({error:{code:'42501',message:'forbidden'}})));
});
test('medical glossary contains essential terms with definitions and clinical significance',()=>{
 assert.ok(glossary.length>=20);
 const ids=new Set();
 for(const item of glossary){
  assert.ok(item.id&&item.id.length>0);
  assert.ok(!ids.has(item.id),'duplicate id: '+item.id);
  ids.add(item.id);
  assert.ok(item.term&&item.term.length>0);
  assert.ok(item.definition&&item.definition.length>20);
  assert.ok(item.clinicalSignificance&&item.clinicalSignificance.length>20);
  assert.ok(['hormony','diagnostyka','choroby','leki','anatomia','fizjologia'].includes(item.category));
 }
 assert.ok(glossaryMap.get('tsh'));
 assert.ok(glossaryMap.get('ft4'));
 assert.ok(glossaryMap.get('trab'));
 assert.ok(glossaryMap.get('eu-tirads'));
 assert.ok(glossaryMap.get('tyreotropina'));
});
test('HPT axis simulation model accurately reflects negative feedback and clinical phenotypes',()=>{
 const euthyroid=calculateHormones(defaultState);
 assert.ok(euthyroid.tsh>=0.4&&euthyroid.tsh<=4.0);
 assert.ok(euthyroid.ft4>=12.0&&euthyroid.ft4<=22.0);
 assert.equal(euthyroid.alertType,'normal');

 const hashimotoPreset=presets.find(p=>p.id==='hashimoto_unmanaged');
 const hashimoto=calculateHormones(hashimotoPreset.state);
 assert.ok(hashimoto.tsh>4.0,'TSH should be elevated');
 assert.ok(hashimoto.ft4<12.0,'FT4 should be low');
 assert.equal(hashimoto.alertType,'danger');
 assert.match(hashimoto.status,/Jawna pierwotna niedoczynność/);

 const treatedHashimoto=presets.find(p=>p.id==='hashimoto_managed');
 const treated=calculateHormones(treatedHashimoto.state);
 assert.ok(treated.tsh>=0.4&&treated.tsh<=4.0,'TSH normalized on LT4 substitution');
 assert.ok(treated.ft4>=12.0&&treated.ft4<=22.0,'FT4 normalized on LT4 substitution');
 assert.equal(treated.alertType,'normal');

 const gravesPreset=presets.find(p=>p.id==='graves');
 const graves=calculateHormones(gravesPreset.state);
 assert.ok(graves.tsh<0.4,'TSH should be suppressed');
 assert.ok(graves.ft4>22.0,'FT4 should be elevated');
 assert.equal(graves.alertType,'danger');
 assert.match(graves.status,/Jawna nadczynność/);

 const centralPreset=presets.find(p=>p.id==='central_hypo');
 const central=calculateHormones(centralPreset.state);
 assert.ok(central.ft4<12.0,'FT4 is low in secondary hypothyroidism');
 assert.ok(central.tsh<=4.0,'TSH is inappropriately normal or low');
 assert.equal(central.alertType,'danger');
 assert.match(central.status,/Wtórna \(przysadkowa\) niedoczynność/);

 const overdosePreset=presets.find(p=>p.id==='overdose_lt4');
 const overdose=calculateHormones(overdosePreset.state);
 assert.ok(overdose.tsh<0.4,'TSH suppressed due to excess exogenous LT4');
 assert.ok(overdose.ft4>22.0,'FT4 high due to overdose');
 assert.match(overdose.status,/Jatrogenna \(polekowa\) tyreotoksykoza/);
});
test('simulator legend covers all state sliders, hormones and valid curriculum lessons',()=>{
 const paramIds=new Set(simulatorLegend.parameters.map(p=>p.id));
 for(const key of Object.keys(defaultState)){
  assert.ok(paramIds.has(key),'missing legend entry for: '+key);
 }
 for(const p of simulatorLegend.parameters){
  assert.ok(p.title&&p.title.length>5);
  assert.ok(p.badge&&p.badge.length>3);
  assert.ok(p.description&&p.description.length>40);
 }
 assert.deepEqual(simulatorLegend.hormones.map(h=>h.id),['tsh','ft4','ft3']);
 for(const h of simulatorLegend.hormones){
  assert.ok(h.normalRange&&h.normalRange.length>3);
  assert.ok(h.description&&h.description.length>30);
 }
 assert.ok(simulatorLegend.curriculum.length>=4);
 for(const step of simulatorLegend.curriculum){
  assert.ok(lessons.some(l=>l.id===step.lessonId),'curriculum step points to invalid lesson: '+step.lessonId);
  assert.ok(step.title&&step.focus&&step.tag);
 }
 const currentStep=simulatorLegend.curriculum.find(s=>s.isCurrent);
 assert.ok(currentStep,'curriculum should highlight embedded simulator lesson');
 assert.equal(currentStep.lessonId,'diagnostyka');
});

test('pituitary simulator model accurately reflects hormone axes, dynamic testing and visual fields',()=>{
 const healthy = calculatePituitaryState(defaultPituitaryState);
 assert.equal(healthy.alertType, 'normal');
 assert.equal(healthy.visualFieldDefect, 'none');
 assert.ok(healthy.prl < 25);
 assert.ok(healthy.serumSodium >= 135 && healthy.serumSodium <= 145);

 // Prolactinoma preset
 const prolactinomaP = pituitaryPresets.find(p => p.id === 'prolactinoma_micro');
 const prolactinoma = calculatePituitaryState(prolactinomaP.state);
 assert.ok(prolactinoma.prl > 50, 'PRL should be significantly elevated in prolactinoma');
 assert.equal(prolactinoma.alertType, 'danger');
 const treatedProlactinoma = calculatePituitaryState({ ...prolactinomaP.state, cabergolineMg: 1.5 });
 assert.ok(treatedProlactinoma.prl < prolactinoma.prl, 'Cabergoline lowers PRL');

 // Acromegaly OGTT dynamic test
 const acromegalyP = pituitaryPresets.find(p => p.id === 'acromegaly_active');
 const acroBasal = calculatePituitaryState(acromegalyP.state);
 assert.ok(acroBasal.gh > 2.0 && acroBasal.igf1 > 350, 'High basal GH and IGF-1 in acromegaly');
 const acroOgtt = calculatePituitaryState({ ...acromegalyP.state, glucoseLoadG: 75 });
 assert.ok(acroOgtt.gh >= 1.0, 'GH fails to suppress <1.0 in acromegaly OGTT');
 const healthyOgtt = calculatePituitaryState({ ...defaultPituitaryState, glucoseLoadG: 75 });
 assert.ok(healthyOgtt.gh < 0.4, 'GH suppresses <0.4 in healthy OGTT');

 // Cushing overnight 1 mg DEX test
 const cushingP = pituitaryPresets.find(p => p.id === 'cushing_disease');
 const cushingBasal = calculatePituitaryState(cushingP.state);
 assert.ok(cushingBasal.cortisol > 20 && cushingBasal.acth > 50);
 const cushingDex = calculatePituitaryState({ ...cushingP.state, dexamethasoneMg: 1 });
 assert.ok(cushingDex.cortisol > 1.8, 'Cortisol fails to suppress <1.8 in Cushing');
 const healthyDex = calculatePituitaryState({ ...defaultPituitaryState, dexamethasoneMg: 1 });
 assert.ok(healthyDex.cortisol < 1.8, 'Cortisol suppresses <1.8 in healthy DEX test');

 // NFPA with suprasellar extension and bitemporal hemianopsia
 const nfpaP = pituitaryPresets.find(p => p.id === 'nfpa_chiasm');
 const nfpa = calculatePituitaryState(nfpaP.state);
 assert.equal(nfpa.visualFieldDefect, 'bitemporal_hemianopsia');
 assert.equal(nfpa.chiasmCompressed, true);
 assert.match(nfpa.comment, /dekompresji neurochirurgicznej/);

 // Central DI & dDAVP test
 const diP = pituitaryPresets.find(p => p.id === 'central_di');
 const diBasal = calculatePituitaryState(diP.state);
 assert.ok(diBasal.urineOsmolality < 300, 'Hypoosmolar urine in DI');
 assert.ok(diBasal.urineVolumeL > 5.0, 'Polyuria in DI');
 const diTreated = calculatePituitaryState({ ...diP.state, desmopressinMcg: 2 });
 assert.ok(diTreated.urineOsmolality > diBasal.urineOsmolality * 1.5, 'Osmolality increases >50% after dDAVP');

 // SIADH
 const siadhP = pituitaryPresets.find(p => p.id === 'siadh_euvolemic');
 const siadh = calculatePituitaryState(siadhP.state);
 assert.ok(siadh.serumSodium < 130, 'Hyponatremia in SIADH');
 assert.ok(siadh.urineOsmolality > 300, 'Inappropriately concentrated urine in SIADH');
 assert.match(siadh.comment, /8–10 mmol\/l\/24h/);
});

test('pituitary glossary contains key neuroendocrine terms with mappings',()=>{
 assert.ok(glossaryMap.get('prl'));
 assert.ok(glossaryMap.get('makroprolaktyna'));
 assert.ok(glossaryMap.get('efekt hook'));
 assert.ok(glossaryMap.get('kabergolina'));
 assert.ok(glossaryMap.get('gh'));
 assert.ok(glossaryMap.get('igf-1'));
 assert.ok(glossaryMap.get('somatostatyna'));
 assert.ok(glossaryMap.get('oktreotyd'));
 assert.ok(glossaryMap.get('acth'));
 assert.ok(glossaryMap.get('deksametazon'));
 assert.ok(glossaryMap.get('bipss'));
 assert.ok(glossaryMap.get('avp'));
 assert.ok(glossaryMap.get('desmopresyna'));
 assert.ok(glossaryMap.get('siadh'));
 assert.ok(glossaryMap.get('zespół sheehana'));
 assert.ok(glossaryMap.get('apopleksja przysadkowa'));
 assert.ok(glossaryMap.get('niedowidzenie połowicze dwuskroniowe'));
});

test('course map grouping completely covers all lessons in both modules without omissions', () => {
  const thyroidLessons = lessons.filter(l => l.moduleId === 'tarczyca');
  const pituitaryLessons = lessons.filter(l => l.moduleId === 'przysadka');
  assert.equal(thyroidLessons.length, 12);
  assert.equal(pituitaryLessons.length, 12);

  const thyroidGroups = ['Fundamenty', 'Praktyka kliniczna', 'Sytuacje szczególne'];
  const coveredThyroid = thyroidGroups.flatMap(g => thyroidLessons.filter(l => l.group === g));
  assert.equal(coveredThyroid.length, 12, 'All 12 thyroid lessons must belong to thyroid groups');

  const pituitaryGroups = [
    'Fundamenty',
    'Gruczolaki i hipersekrecja',
    'Niedoczynność i gospodarka wodna',
    'Sytuacje szczególne i chirurgia',
  ];
  const coveredPituitary = pituitaryGroups.flatMap(g => pituitaryLessons.filter(l => l.group === g));
  assert.equal(coveredPituitary.length, 12, 'All 12 pituitary lessons must belong to pituitary groups');
});
