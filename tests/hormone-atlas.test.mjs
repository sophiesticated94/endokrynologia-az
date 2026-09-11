import test from 'node:test';
import assert from 'node:assert/strict';
import {initialAtlas,describeAtlas} from '../lib/hormone-atlas.ts';
import {gahtLessons,gahtLessonIds} from '../lib/course-gaht.ts';
import {lessons,questions,flashcards} from '../lib/course.ts';
import {sampleBalancedQuestions} from '../lib/learning.ts';
import legacyIds from '../lib/question-ids.json' with {type:'json'};

test('positive ovarian feedback requires physiological preovulatory conditions',()=>{
  const cycle={...initialAtlas,gonads:'ovaries',hormone:'none',cycle:'ovulatory'};
  assert.equal(describeAtlas(cycle).positiveFeedback,true);
  for(const patch of [{function:'absent'},{function:'impaired'},{hormone:'testosterone'},{progesterone:true},{blocker:'cpa'}])
    assert.equal(describeAtlas({...cycle,...patch}).positiveFeedback,false);
  assert.match(describeAtlas({...cycle,cycle:'luteal'}).progesterone,/ciałka żółtego/);
});

test('gonad removal eliminates gonadal production but preserves peripheral conversion',()=>{
  for(const gonads of ['testes','ovaries'])for(const blocker of ['none','spiro','cpa','agonist','antagonist','fivear']){
    const r=describeAtlas({...initialAtlas,gonads,blocker,function:'absent',hormone:'testosterone'});
    assert.equal(r.gonadal,'Brak produkcji gonadalnej');
    assert.match(r.estradiol,/Aromatyzacja egzogennego T/);
    assert.match(r.inhibin,/Brak gonadalnej inhibiny/);
    assert.match(r.fertility,/Brak produkcji gamet/);
  }
});
test('hysterectomy alone does not remove ovarian endocrine activity',()=>{
  const s={...initialAtlas,gonads:'ovaries',hormone:'none',uterus:true};
  assert.equal(describeAtlas(s).gonadal,describeAtlas({...s,uterus:false}).gonadal);
  assert.ok(describeAtlas({...s,uterus:false}).notes.some(n=>n.includes('Brak macicy')));
});
test('GnRH agonist depends on phase, antagonist has no flare, spiro is not central suppression',()=>{
  assert.equal(describeAtlas({...initialAtlas,blocker:'agonist',phase:'early'}).flare,true);
  assert.equal(describeAtlas({...initialAtlas,blocker:'agonist',phase:'established'}).central,true);
  assert.equal(describeAtlas({...initialAtlas,blocker:'antagonist',phase:'early'}).flare,false);
  const spiro=describeAtlas({...initialAtlas,blocker:'spiro'});
  assert.equal(spiro.central,false);assert.equal(spiro.arBlocked,true);
  assert.equal(describeAtlas({...initialAtlas,blocker:'fivear'}).arBlocked,false);
});
test('no replacement after gonadectomy and amenorrhea do not silently imply safety or infertility',()=>{
  const r=describeAtlas({...initialAtlas,function:'absent',hormone:'none'});
  assert.match(r.feedback,/wzrostu LH/);
  assert.ok(r.notes.some(n=>n.includes('zdrowie kości')));
  assert.ok(describeAtlas({...initialAtlas,gonads:'ovaries',uterus:true,hormone:'testosterone'}).notes.some(n=>n.includes('nie są antykoncepcją')));
});
test('GAHT pathway has 8 fully explained lessons and unique authored retrieval cards',()=>{
  assert.equal(gahtLessons.length,8);
  assert.ok(gahtLessons.every(l=>l.questions.length===5&&l.review?.checkedAt&&l.questions.every(q=>q.id)));
  assert.equal(new Set(flashcards.map(c=>c.id)).size,flashcards.length);
  assert.equal(flashcards.filter(c=>c.id.endsWith('concept-v2')).length,40);
});
test('unchanged questions retain frozen IDs, independent of ordering',()=>{
  for(const lesson of [...lessons].reverse())for(const q of [...lesson.questions].reverse()){
    if(!gahtLessonIds.includes(lesson.id))assert.equal(q.id,legacyIds[lesson.id][q.prompt]);
  }
});
test('balanced exam covers every GAHT lesson, preserves answers and does not mutate bank',()=>{
  const bank=questions.filter(q=>gahtLessonIds.includes(q.lessonId));const before=JSON.stringify(bank);
  const selected=sampleBalancedQuestions(bank,30,q=>q.lessonId,()=>0.32);
  assert.equal(selected.length,30);assert.equal(new Set(selected.map(q=>q.id)).size,30);
  for(const id of gahtLessonIds)assert.ok([3,4].includes(selected.filter(q=>q.lessonId===id).length));
  for(const q of selected){const original=bank.find(o=>o.id===q.id);assert.equal(q.options[q.answer].text,original.options[original.answer].text);}
  assert.equal(JSON.stringify(bank),before);
  assert.throws(()=>sampleBalancedQuestions(bank,41,q=>q.lessonId));
});
