import test from 'node:test';
import assert from 'node:assert/strict';
import { lessonExperiences, lessons, questionObjectiveMap, sources } from '../lib/course.ts';
import { gradeActivity } from '../lib/activity-grading.ts';
import { parseStoredActivities, practicePayload, projectActivities } from '../lib/learning.ts';
import { findRepeatableActivity, isLessonCoreComplete, requiredCompletionActivityIds } from '../lib/lesson-v2.ts';

test('all 48 thyroid, diabetes, and pituitary lessons use the complete v2 learning structure', () => {
  const pilot = lessons.filter(
    lesson => lesson.moduleId === 'tarczyca' || lesson.moduleId === 'cukrzyca' || lesson.moduleId === 'przysadka'
  );
  assert.equal(pilot.length, 48);
  assert.equal(Object.keys(lessonExperiences).length, 48);
  const ids = new Set();
  for (const lesson of pilot) {
    const experience = lessonExperiences[lesson.id];
    assert.equal(experience.experienceVersion, 2);
    assert.ok(experience.objectives.length >= 2 && experience.objectives.length <= 4);
    assert.equal(experience.blocks.length, lesson.sections.length);
    assert.equal(experience.activities.length, 2);
    assert.equal(experience.exitTicket.length, 2);
    assert.ok(experience.widgetIds.length >= 1);
    const reasoning = new Set([...experience.activities, ...experience.exitTicket].map(activity => activity.reasoning));
    assert.ok(reasoning.has('mechanism') && reasoning.has('interpretation') && reasoning.has('decision'));
    const scoredObjectiveIds = new Set([...experience.activities, ...experience.exitTicket].flatMap(activity => activity.objectiveIds));
    assert.ok(experience.objectives.every(objective => scoredObjectiveIds.has(objective.id)));
    for (const activity of [experience.diagnostic, ...experience.activities, experience.teachBack, ...experience.exitTicket]) {
      assert.ok(!ids.has(activity.id), `duplicate activity id: ${activity.id}`);
      ids.add(activity.id);
      assert.ok(activity.objectiveIds.every(id => experience.objectives.some(objective => objective.id === id)));
      assert.ok(activity.sourceIds.length > 0 && activity.sourceIds.every(id => sources[id]));
      assert.ok(activity.reasoning);
      if ('options' in activity) {
        assert.equal(activity.optionFeedback?.length, activity.options.length);
        assert.ok(activity.optionFeedback.every(Boolean));
      }
    }
    const required = requiredCompletionActivityIds(experience);
    assert.equal(isLessonCoreComplete(experience, new Set(required)), true);
    assert.equal(isLessonCoreComplete(experience, new Set(required.slice(1))), false);
  }
});

test('legacy question ids map to v2 objectives without rewriting snapshots', () => {
  for (const lesson of lessons.filter(
    item => item.moduleId === 'tarczyca' || item.moduleId === 'cukrzyca' || item.moduleId === 'przysadka'
  )) {
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

test('practice payload records timing and answer shape without free-form response text', () => {
  const activity=lessonExperiences.fizjologia.teachBack;
  const payload=practicePayload('fizjologia',activity,true,undefined,false,{answerType:'self_assessment',elapsedMs:12400});
  assert.equal(payload.answerType,'self_assessment');
  assert.equal(payload.elapsedMs,12400);
  assert.equal(payload.activityType,'recall');
  assert.equal('response' in payload,false);
  assert.equal('text' in payload,false);
});

test('stored offline queues reject malformed JSON and preserve valid immutable events', () => {
  const event={id:'offline-1',user_id:'u',kind:'practice',target_id:'a',content_version:'v2',created_at:'2026-09-12T10:00:00Z',payload:{}};
  assert.deepEqual(parseStoredActivities('{broken'),[]);
  assert.deepEqual(parseStoredActivities(JSON.stringify([null,{bad:true},event])),[event]);
});

test('mistake resolver includes repeatable widget activities', () => {
  const experience=lessonExperiences.fizjologia;
  const widget={...experience.diagnostic,id:'fizjologia-axis-map-v2'};
  assert.equal(findRepeatableActivity(experience,widget.id,[widget]),widget);
});
