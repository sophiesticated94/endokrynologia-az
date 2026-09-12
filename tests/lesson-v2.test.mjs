import test from 'node:test';
import assert from 'node:assert/strict';
import { lessonExperiences, lessons, questionObjectiveMap, sources } from '../lib/course.ts';
import { gradeActivity } from '../lib/activity-grading.ts';
import { projectActivities } from '../lib/learning.ts';

test('all 32 thyroid and diabetes lessons use the complete v2 learning structure', () => {
  const pilot = lessons.filter(lesson => lesson.moduleId === 'tarczyca' || lesson.moduleId === 'cukrzyca');
  assert.equal(pilot.length, 32);
  assert.equal(Object.keys(lessonExperiences).length, 32);
  const ids = new Set();
  for (const lesson of pilot) {
    const experience = lessonExperiences[lesson.id];
    assert.equal(experience.experienceVersion, 2);
    assert.ok(experience.objectives.length >= 2 && experience.objectives.length <= 4);
    assert.equal(experience.blocks.length, lesson.sections.length);
    assert.equal(experience.activities.length, 2);
    assert.equal(experience.exitTicket.length, 2);
    assert.ok(experience.widgetIds.length >= 1);
    for (const activity of [experience.diagnostic, ...experience.activities, experience.teachBack, ...experience.exitTicket]) {
      assert.ok(!ids.has(activity.id), `duplicate activity id: ${activity.id}`);
      ids.add(activity.id);
      assert.ok(activity.objectiveIds.every(id => experience.objectives.some(objective => objective.id === id)));
      assert.ok(activity.sourceIds.length > 0 && activity.sourceIds.every(id => sources[id]));
      assert.ok(activity.reasoning);
    }
  }
});

test('legacy question ids map to v2 objectives without rewriting snapshots', () => {
  for (const lesson of lessons.filter(item => item.moduleId === 'tarczyca' || item.moduleId === 'cukrzyca')) {
    assert.ok(lesson.questions.every(question => questionObjectiveMap[question.id]?.length));
  }
});

test('activity grader handles every deterministic response type', () => {
  const base = {id:'a',objectiveIds:['o'],prompt:'p',explanation:'e',difficulty:'both',reasoning:'mechanism',sourceIds:['s']};
  assert.equal(gradeActivity({...base,type:'single_choice',options:['a','b'],answer:1},1),true);
  assert.equal(gradeActivity({...base,type:'multi_select',options:['a','b','c'],answers:[0,2]},[2,0]),true);
  assert.equal(gradeActivity({...base,type:'ordering',items:['a','b'],correctOrder:[1,0]},[1,0]),true);
  assert.equal(gradeActivity({...base,type:'matching',pairs:[['a','1'],['b','2']]},{a:'1',b:'2'}),true);
  assert.equal(gradeActivity({...base,type:'numeric',answer:10,tolerance:.2,unit:'mmol/l'},'10.1'),true);
  assert.equal(gradeActivity({...base,type:'recall',modelAnswer:'x'},'dowolne'),null);
});

test('mastery needs spaced evidence from two activity types and returns to learning after an error', () => {
  const event=(id,created_at,correct,activityType='single_choice')=>({id,user_id:'u',kind:'practice',target_id:id,content_version:'v2',created_at,payload:{lessonId:'fizjologia',objectiveIds:['objective'],correct,confidence:3,activityType,scored:true}});
  const practicing=projectActivities([event('a','2026-09-10T10:00:00Z',true)]);
  assert.equal(practicing.mastery.objective.status,'practicing');
  const mastered=projectActivities([event('a','2026-09-10T10:00:00Z',true),event('b','2026-09-11T11:00:00Z',true,'quiz')]);
  assert.equal(mastered.mastery.objective.status,'mastered');
  const relearning=projectActivities([event('a','2026-09-10T10:00:00Z',true),event('b','2026-09-11T11:00:00Z',true,'quiz'),event('c','2026-09-12T12:00:00Z',false)]);
  assert.equal(relearning.mastery.objective.status,'learning');
  assert.equal(relearning.mistakes.length,1);
  assert.equal(relearning.mastery.objective.highConfidenceError,true);
});

test('diagnostic and recall events do not affect mastery or the mistake notebook', () => {
  const state=projectActivities([{id:'x',user_id:'u',kind:'practice',target_id:'diagnostic',content_version:'v2',created_at:'2026-09-10T10:00:00Z',payload:{lessonId:'fizjologia',objectiveIds:['objective'],correct:false,confidence:3,activityType:'single_choice',scored:false}}]);
  assert.deepEqual(state.mastery,{});
  assert.deepEqual(state.mistakes,[]);
});
