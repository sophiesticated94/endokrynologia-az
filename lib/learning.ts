import { questionObjectiveMap } from './course.ts';
import type { Question } from './course.ts';
import type { Confidence, LearningActivity, PracticeRecordMeta } from './course-types';
export const intervals=[1,3,7,14,30] as const;
export type Review={stage:number;dueAt:string};
export function scheduleReview(previous:Review|undefined,remembered:boolean,now=new Date()):Review {
  const stage=remembered?Math.min((previous?.stage??-1)+1,4):0;
  return {stage,dueAt:new Date(now.getTime()+intervals[stage]*86400000).toISOString()};
}
export function sampleQuestions<T>(bank:readonly T[],count:number,rng= Math.random):T[]{
  if(!Number.isInteger(count)||count<0||count>bank.length)throw new Error('Nieprawidłowa liczba pytań');
  const pool=[...bank]; for(let i=pool.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}return pool.slice(0,count);
}
export function grade(bank:Question[],answers:Record<string,number>){const correct=bank.filter(q=>answers[q.id]===q.answer).length;return {correct,total:bank.length,percent:bank.length?Math.round(correct/bank.length*100):0};}
/** Sample across topics, then shuffle answer positions without mutating the bank. */
export function sampleBalancedQuestions(bank:readonly Question[],count:number,topic:(q:Question)=>string,rng=Math.random):Question[]{
  const unique=[...new Map(bank.map(q=>[q.id,q])).values()];
  if(!Number.isInteger(count)||count<0||count>unique.length)throw new Error('Nieprawidłowa liczba pytań');
  const groups=new Map<string,Question[]>();
  for(const q of sampleQuestions(unique,unique.length,rng)){const key=topic(q);groups.set(key,[...(groups.get(key)??[]),q]);}
  const buckets=sampleQuestions([...groups.values()],groups.size,rng);const selected:Question[]=[];
  while(selected.length<count){for(const bucket of buckets){const q=bucket.pop();if(q)selected.push(q);if(selected.length===count)break;}}
  return sampleQuestions(selected,count,rng).map(q=>{const order=sampleQuestions(q.options.map((_,i)=>i),q.options.length,rng);return {...q,options:order.map(i=>q.options[i]),answer:order.indexOf(q.answer)};});
}
export type Activity={id:string;user_id:string;kind:'lesson'|'quiz'|'exam'|'case'|'review'|'profile'|'practice';target_id:string;content_version:string;payload:Record<string,unknown>;created_at:string};
export type MasteryStatus='new'|'learning'|'practicing'|'mastered';
export type MasteryRecord={status:MasteryStatus;correctEvidence:number;lastAttemptAt:string;highConfidenceError:boolean};
export type MistakeRecord={eventId:string;activityId:string;lessonId:string;objectiveIds:string[];confidence?:Confidence;createdAt:string};
export type LearningState={completed:string[];reviews:Record<string,Review>;attempts:Activity[];level:'student'|'doctor';mastery:Record<string,MasteryRecord>;mistakes:MistakeRecord[]};

export function practicePayload(lessonId:string,activity:LearningActivity,correct:boolean,confidence:Confidence|undefined,scored:boolean,meta?:PracticeRecordMeta):Record<string,unknown>{
  return {lessonId,objectiveIds:activity.objectiveIds,correct,confidence,activityType:activity.type,answerType:meta?.answerType,elapsedMs:meta?.elapsedMs,scored};
}

export function parseStoredActivities(raw:string|null):Activity[]{
  if(!raw)return[];
  try{const value=JSON.parse(raw);return Array.isArray(value)?value.filter(item=>item&&typeof item.id==='string'&&typeof item.kind==='string'):[];}catch{return[];}
}

type Evidence={correct:boolean;activityType:string;createdAt:string;confidence?:Confidence};
function asConfidence(value:unknown):Confidence|undefined{return value===1||value===2||value===3?value:undefined}
function masteryFrom(evidence:Evidence[]):MasteryRecord{
  const latest=evidence[evidence.length-1];
  const correct=evidence.filter(item=>item.correct);
  const distinctTypes=new Set(correct.map(item=>item.activityType));
  const first=correct[0]&&Date.parse(correct[0].createdAt);
  const last=correct.at(-1)&&Date.parse(correct.at(-1)!.createdAt);
  const spaced=Boolean(first&&last&&last-first>=86400000);
  const status:MasteryStatus=!latest.correct?'learning':correct.length>=2&&distinctTypes.size>=2&&spaced?'mastered':'practicing';
  return {status,correctEvidence:correct.length,lastAttemptAt:latest.createdAt,highConfidenceError:evidence.some(item=>!item.correct&&item.confidence===3)};
}
export function projectActivities(rows:Activity[]):LearningState{
  const state:LearningState={completed:[],reviews:{},attempts:[],level:'student',mastery:{},mistakes:[]};
  const evidence=new Map<string,Evidence[]>();
  const latestPractice=new Map<string,boolean>();
  const unique=new Map(rows.map(r=>[r.id,r]));
  for(const row of [...unique.values()].sort((a,b)=>a.created_at.localeCompare(b.created_at)||a.id.localeCompare(b.id))){
    if(row.kind==='lesson'&&!state.completed.includes(row.target_id))state.completed.push(row.target_id);
    if(row.kind==='review'&&typeof row.payload.remembered==='boolean')state.reviews[row.target_id]=scheduleReview(state.reviews[row.target_id],row.payload.remembered,new Date(row.created_at));
    if(['quiz','exam','case'].includes(row.kind))state.attempts.push(row);
    if(row.kind==='profile'&&(row.payload.level==='student'||row.payload.level==='doctor'))state.level=row.payload.level;
    if(row.kind==='practice'){
      const ids=Array.isArray(row.payload.objectiveIds)?row.payload.objectiveIds.filter((id):id is string=>typeof id==='string'):[];
      const correct=row.payload.correct===true;
      const activityType=typeof row.payload.activityType==='string'?row.payload.activityType:'practice';
      latestPractice.set(row.target_id,correct);
      if(row.payload.scored!==false){
        for(const objectiveId of ids)evidence.set(objectiveId,[...(evidence.get(objectiveId)??[]),{correct,activityType,createdAt:row.created_at,confidence:asConfidence(row.payload.confidence)}]);
        if(!correct)state.mistakes.push({eventId:row.id,activityId:row.target_id,lessonId:String(row.payload.lessonId??''),objectiveIds:ids,confidence:asConfidence(row.payload.confidence),createdAt:row.created_at});
      }
    }
    if(['quiz','exam','case'].includes(row.kind)&&Array.isArray(row.payload.questions)){
      for(const raw of row.payload.questions){
        const question=raw as {id?:unknown;answer?:unknown;selected?:unknown;lessonId?:unknown};
        if(typeof question.id!=='string')continue;
        const ids=questionObjectiveMap[question.id]??[];
        const correct=question.answer===question.selected;
        for(const objectiveId of ids)evidence.set(objectiveId,[...(evidence.get(objectiveId)??[]),{correct,activityType:row.kind,createdAt:row.created_at}]);
      }
    }
  }
  for(const [objectiveId,items] of evidence)state.mastery[objectiveId]=masteryFrom(items);
  state.mistakes=state.mistakes.filter((mistake,index,all)=>all.findLastIndex(item=>item.activityId===mistake.activityId)===index&&!latestPractice.get(mistake.activityId)).reverse();
  return state;
}
// The same immutable event id is reused on retry; no duplicate attempt is created.
export async function saveIdempotently(event:Activity,insert:(event:Activity)=>Promise<{error:{code?:string;message:string}|null}>){
  const {error}=await insert(event);if(error&&error.code!=='23505')throw new Error(error.message);
}

export function isSafePublicKey(key: string): boolean {
  if (!key || typeof key !== 'string') return false;
  if (key.startsWith('sb_publishable_') || key.startsWith('sbp_')) return true;
  if (key.startsWith('eyJ')) {
    try {
      const parts = key.split('.');
      if (parts.length !== 3) return false;
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const jsonStr = atob(base64);
      const payload = JSON.parse(jsonStr) as { role?: string };
      if (payload.role === 'service_role' || payload.role === 'supabase_admin') return false;
      return payload.role === 'anon';
    } catch {
      return false;
    }
  }
  return false;
}
