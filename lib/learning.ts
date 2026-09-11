import type { Question } from './course';
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
export type Activity={id:string;user_id:string;kind:'lesson'|'quiz'|'exam'|'case'|'review'|'profile';target_id:string;content_version:string;payload:Record<string,unknown>;created_at:string};
export type LearningState={completed:string[];reviews:Record<string,Review>;attempts:Activity[];level:'student'|'doctor'};
export function projectActivities(rows:Activity[]):LearningState{
  const state:LearningState={completed:[],reviews:{},attempts:[],level:'student'};
  const unique=new Map(rows.map(r=>[r.id,r]));
  for(const row of [...unique.values()].sort((a,b)=>a.created_at.localeCompare(b.created_at)||a.id.localeCompare(b.id))){
    if(row.kind==='lesson'&&!state.completed.includes(row.target_id))state.completed.push(row.target_id);
    if(row.kind==='review'&&typeof row.payload.remembered==='boolean')state.reviews[row.target_id]=scheduleReview(state.reviews[row.target_id],row.payload.remembered,new Date(row.created_at));
    if(['quiz','exam','case'].includes(row.kind))state.attempts.push(row);
    if(row.kind==='profile'&&(row.payload.level==='student'||row.payload.level==='doctor'))state.level=row.payload.level;
  }return state;
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
