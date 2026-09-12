'use client';
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { lessonExperiences, lessons } from '@/lib/course';
import type { Confidence, LearningActivity, PracticeRecordMeta } from '@/lib/course-types';
import type { LearningState } from '@/lib/learning';
import { findRepeatableActivity } from '@/lib/lesson-v2';
import { PracticeActivityCard } from '../components/practice-activity';
import { widgetActivitiesForExperience } from '../components/learning-widgets';
import type { Navigation } from './types';

function findActivity(id:string):LearningActivity|undefined {
  for(const experience of Object.values(lessonExperiences)){
    const lesson=lessons.find(item=>item.id===experience.lessonId);
    const widgets=lesson?.moduleId?widgetActivitiesForExperience(experience,lesson.moduleId):[];
    const activity=findRepeatableActivity(experience,id,widgets);
    if(activity)return activity;
  }
}

export function ErrorNotebook({state,go,recordPractice}:{
  state:LearningState;
  go:Navigation;
  recordPractice:(lessonId:string,activity:LearningActivity,correct:boolean,confidence?:Confidence,scored?:boolean,meta?:PracticeRecordMeta)=>Promise<boolean>;
}) {
  if(!state.mistakes.length)return <div className="reading"><div className="page-heading"><p className="eyebrow">NOTATNIK BŁĘDÓW</p><h1>Nie ma aktywnych luk do naprawy</h1><p>Błędy z aktywności v2 pojawią się tutaj wraz z krótką, dopasowaną powtórką.</p></div><section className="panel empty-state"><CheckCircle2 size={44}/><h2>Aktualna kolejka jest pusta</h2><p>Rozpocznij lekcję Tarczycy lub Cukrzycy, aby zebrać dowody opanowania celów.</p><button className="primary" onClick={()=>go('course')}>Wybierz lekcję<ArrowRight size={17}/></button></section></div>;

  return <div className="reading"><div className="page-heading"><p className="eyebrow">NOTATNIK BŁĘDÓW</p><h1>Napraw konkretną lukę</h1><p>Najpierw widzisz błędy popełnione z wysoką pewnością, potem pozostałe. Poprawna odpowiedź usuwa zadanie z kolejki.</p></div>
    {[...state.mistakes].sort((a,b)=>(b.confidence??0)-(a.confidence??0)).map(mistake=>{
      const activity=findActivity(mistake.activityId);const lesson=lessons.find(item=>item.id===mistake.lessonId);const experience=lessonExperiences[mistake.lessonId];
      return <section className="mistake-card" key={mistake.eventId}><div className="mistake-meta"><AlertTriangle size={18}/><span>{mistake.confidence===3?'Błąd wysokiej pewności':'Do ponownego przećwiczenia'}</span><button className="text-button" onClick={()=>go(`lesson/${mistake.lessonId}`)}>{lesson?.title??'Wróć do lekcji'}<ArrowRight size={14}/></button></div>
        <div className="objective-list">{mistake.objectiveIds.map(id=><span key={id}>{experience?.objectives.find(item=>item.id===id)?.statement??id}</span>)}</div>
        {activity?<PracticeActivityCard activity={activity} phase="review" onRecord={(item,correct,confidence,scored,meta)=>recordPractice(mistake.lessonId,item,correct,confidence,scored,meta)}/>:<p>Ta aktywność nie jest już dostępna w bieżącej wersji. Otwórz lekcję, aby wykonać najbliższą powtórkę tego celu.</p>}
      </section>;
    })}
  </div>;
}
