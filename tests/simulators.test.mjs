import test from 'node:test';
import assert from 'node:assert/strict';
import {lipidCalculations,fib4,calciumClearance,washout,gepGrade,hyperglycemicCriteria,volumeDoubling} from '../lib/clinical-calculations.ts';
import {calculateVermeulen} from '../lib/gonad-simulator.ts';

test('LDL reference arithmetic and TG applicability boundaries',()=>{
  const r=lipidCalculations(200,50,150);
  assert.equal(r.friedewald,120);assert.ok(Math.abs(r.sampson-123.40)<.02);assert.equal(r.nonHdl,150);
  assert.notEqual(lipidCalculations(300,40,399).friedewald,null);
  assert.equal(lipidCalculations(300,40,400).friedewald,null);
  assert.notEqual(lipidCalculations(300,40,800).sampson,null);
  assert.equal(lipidCalculations(300,40,801).sampson,null);
  assert.equal(lipidCalculations(100,90,300).friedewald,null);
  assert.equal(lipidCalculations(100,110,50).nonHdl,null);
  assert.equal(lipidCalculations(NaN,50,150).sampson,null);
});
test('CCCR uses measured values, preserves zero and rejects invalid denominators',()=>{
  assert.equal(calciumClearance(4,.9,12,100),.003);
  assert.equal(calciumClearance(40,.9,12,100),.03);
  assert.equal(calciumClearance(0,.9,12,100),0);
  assert.equal(calciumClearance(4,.9,12,0),null);
  assert.equal(calciumClearance(NaN,.9,12,100),null);
});
test('washout preserves arithmetic without clipping',()=>{
  assert.deepEqual(washout(20,100,40),{absolute:75,relative:60});
  assert.equal(washout(20,20,10),null);assert.equal(washout(20,10,5),null);
  assert.equal(washout(20,100,120),null);assert.equal(washout(20,100,0).absolute,125);
});
test('FIB4 reference value and no false zero with missing inputs',()=>{
  assert.equal(fib4(50,40,100,200),1);assert.equal(fib4(50,40,0,200),null);
  assert.equal(fib4(50,40,100,0),null);assert.equal(fib4(17,40,100,200),null);
});
test('NEN morphology and organ take precedence over a Ki67 shortcut',()=>{
  assert.equal(gepGrade(65,4,'well','digestive'),'NET G3');
  assert.match(gepGrade(65,4,'unknown','digestive'),/Brak oceny/);
  assert.match(gepGrade(10,4,'poor','digestive'),/^NEC/);
  assert.match(gepGrade(65,4,'well','lung'),/^Płuco/);
  assert.equal(gepGrade(2,2,'well','digestive'),'NET G2');
  assert.equal(gepGrade(20,20,'well','digestive'),'NET G2');
  assert.equal(gepGrade(2,21,'well','digestive'),'NET G3');
  assert.equal(gepGrade(101,4,'well','digestive'),'Nieprawidłowe dane');
});
test('DKA needs all groups of criteria; known diabetes supports euglycemic DKA',()=>{
  assert.equal(hyperglycemicCriteria(150,136,7,4,7.2,14,true).dka,true);
  assert.equal(hyperglycemicCriteria(150,136,7,4,7.2,14,false).dka,false);
  assert.equal(hyperglycemicCriteria(250,136,7,2.9,7.2,14,true).dka,false);
  assert.equal(hyperglycemicCriteria(250,136,7,3,7.3,18,true).dka,false);
  assert.equal(hyperglycemicCriteria(250,136,7,3,7.3,17,true).dka,true);
});
test('HHS uses measured sodium and distinguishes hyperosmolar ketosis',()=>{
  const h=hyperglycemicCriteria(720,140,10,1,7.35,24,true);
  assert.equal(h.effective,320);assert.equal(h.total,330);assert.equal(h.hhs,true);
  assert.equal(hyperglycemicCriteria(599,150,10,1,7.35,24,true).hhs,false);
  const mixed=hyperglycemicCriteria(720,140,10,4,7.2,14,true);
  assert.equal(mixed.hhs,false);assert.equal(mixed.mixed,true);assert.equal(mixed.dka,true);
  assert.equal(hyperglycemicCriteria(NaN,140,10,1,7.35,24,true),null);
});
test('volume doubling handles true volume doubling, stability and shrinkage',()=>{
  assert.ok(Math.abs(volumeDoubling(10,10*Math.cbrt(2),100)-100)<1e-9);
  assert.equal(volumeDoubling(10,10,100),null);assert.equal(volumeDoubling(10,8,100),null);
  assert.equal(volumeDoubling(0,10,100),null);
});
test('Vermeulen satisfies binding mass balance and physical monotonicity',()=>{
  const r=calculateVermeulen(15,30,43),free=r.freeT_pmol*1e-12;
  const reconstructed=free*(1+3.6e4*43/66437)+1e9*30e-9*free/(1+1e9*free);
  assert.ok(Math.abs(reconstructed*1e9-15)<.01);
  assert.ok(calculateVermeulen(15,90,43).freeT_pmol<r.freeT_pmol);
  assert.equal(calculateVermeulen(0,30,43).freeT_pmol,0);
  assert.throws(()=>calculateVermeulen(15,0,43),RangeError);
  assert.throws(()=>calculateVermeulen(NaN,30,43),RangeError);
});
