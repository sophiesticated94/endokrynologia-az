'use client';
import {useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {createClient,type SupabaseClient,type User} from '@supabase/supabase-js';
import {CONTENT_VERSION} from './course';
import {projectActivities,saveIdempotently,type Activity} from './learning';
export function useLearning(){
 const [client,setClient]=useState<SupabaseClient|null>(null);
 const [configured,setConfigured]=useState<boolean|null>(null);
 const [user,setUser]=useState<User|null>(null);
 const userRef=useRef<User|null>(null);
 const [rows,setRows]=useState<Activity[]>([]);
 const [pending,setPending]=useState<Activity[]>([]);
 const [loading,setLoading]=useState(true);
 const [saving,setSaving]=useState(false);
 const [error,setError]=useState('');
 const [recovery,setRecovery]=useState(false);
 const [online,setOnline]=useState(true);
 const [configRetry,setConfigRetry]=useState(0);
 const busy=useRef(false); const epoch=useRef(0);
 useEffect(()=>{const update=()=>setOnline(navigator.onLine);update();window.addEventListener('online',update);window.addEventListener('offline',update);return()=>{window.removeEventListener('online',update);window.removeEventListener('offline',update)}},[]);
 useEffect(()=>{
  let disposed=false;let cleanup=()=>{};
  async function init(){try{
   const response=await fetch('/api/config');if(!response.ok)throw new Error('Nie udało się pobrać konfiguracji.');
   const cfg=await response.json() as {configured:boolean;url:string;key:string};if(disposed)return;setConfigured(cfg.configured);
   if(!cfg.configured){setLoading(false);return;}
   const supa=createClient(cfg.url,cfg.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'}});setClient(supa);
   const {data}=supa.auth.onAuthStateChange((event,session)=>{
    if(disposed)return;
    if(event==='PASSWORD_RECOVERY')setRecovery(true);
    if(userRef.current?.id!==session?.user?.id){epoch.current++;userRef.current=session?.user??null;setUser(session?.user??null);setRows([]);setPending([]);setError('');}
    setLoading(false);
   });cleanup=()=>data.subscription.unsubscribe();
   const {data:session,error:sessionError}=await supa.auth.getSession();if(sessionError)throw sessionError;
   if(!disposed){userRef.current=session.session?.user??null;setUser(session.session?.user??null);setLoading(false);}
  }catch{if(!disposed){setError('Nie udało się połączyć z usługą kont. Spróbuj ponownie.');setLoading(false);}}}
  void init();return()=>{disposed=true;cleanup();};
 },[configRetry]);
 const refresh=useCallback(async()=>{
  if(!client||!userRef.current)return;const id=userRef.current.id;const generation=epoch.current;setLoading(true);
  try{const all:Activity[]=[];for(let from=0;;from+=500){
   const {data,error}=await client.from('learning_events').select('*').eq('user_id',id).order('created_at').order('id').range(from,from+499);
   if(error)throw error;all.push(...data as Activity[]);if(data.length<500)break;
  }if(epoch.current===generation){setRows(current=>[...new Map([...all,...current].map(e=>[e.id,e])).values()]);setError('');}}
  catch{if(epoch.current===generation)setError('Nie udało się odczytać postępu. Sprawdź połączenie i konfigurację bazy.');}
  finally{if(epoch.current===generation)setLoading(false);}
 },[client]);
 useEffect(()=>{if(user)queueMicrotask(()=>void refresh());},[user,refresh]);
 useEffect(()=>{const focus=()=>{if(userRef.current&&!busy.current)void refresh()};window.addEventListener('focus',focus);const timer=setInterval(focus,30000);return()=>{window.removeEventListener('focus',focus);clearInterval(timer)}},[refresh]);
 useEffect(()=>{if(!pending.length)return;const prevent=(event:BeforeUnloadEvent)=>{event.preventDefault();event.returnValue=''};window.addEventListener('beforeunload',prevent);return()=>window.removeEventListener('beforeunload',prevent)},[pending]);
 const persist=useCallback(async(event:Activity)=>{
  if(!client||!userRef.current||event.user_id!==userRef.current.id)return false;
  const generation=epoch.current;setSaving(true);busy.current=true;
  try{
   let saved:Activity=event;
   await saveIdempotently(event,async(e)=>{
    const {created_at,...insert}=e;void created_at;
    const {data,error}=await client.from('learning_events').insert(insert).select().single();
    if(data)saved=data as Activity;
    if(error?.code==='23505'){
     const existing=await client.from('learning_events').select('*').eq('id',e.id).eq('user_id',e.user_id).single();
     if(existing.error)return {error:existing.error};saved=existing.data as Activity;
    }return {error};
   });
   if(epoch.current===generation){setRows(current=>[...new Map([...current,saved].map(e=>[e.id,e])).values()]);setPending(current=>current.filter(e=>e.id!==event.id));setError('');}return true;
  }catch{if(epoch.current===generation){setPending(current=>[...current.filter(e=>e.id!==event.id),event]);setError('Nie zapisano aktywności. Twoja odpowiedź czeka na ponowienie — nie zamykaj tej karty.');}return false;}
  finally{busy.current=false;setSaving(false);}
 },[client]);
 const record=useCallback(async(kind:Activity['kind'],target_id:string,payload:Activity['payload']={},id=crypto.randomUUID())=>{
  if(busy.current||loading)return false;
  const event:Activity={id,user_id:userRef.current?.id??'guest',kind,target_id,payload,content_version:CONTENT_VERSION,created_at:new Date().toISOString()};
  if(!userRef.current){setRows(current=>[...current.filter(e=>e.id!==id),event]);return true;}
  return persist(event);
 },[persist,loading]);
 const retry=useCallback(async()=>{if(busy.current)return;for(const event of pending){if(!await persist(event))break;}},[pending,persist]);
 const state=useMemo(()=>projectActivities(rows),[rows]);
 return {client,configured,user,loading,saving,error,pending,state,recovery,setRecovery,record,refresh,retry,online,retryConfig:()=>{setError('');setLoading(true);setConfigRetry(v=>v+1)}};
}
