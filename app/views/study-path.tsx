'use client';
import {lessons,modulesList} from '../../lib/course';
import {gahtLessonIds} from '../../lib/course-gaht';
import {studyPrompts, type EndocrineModuleId} from '../../lib/study-paths';
import type {LearningState} from '../../lib/learning';
import type {Navigation} from './types';
export function StudyPath({scope,state,go}:{scope:EndocrineModuleId|'all';state:LearningState;go:Navigation}){
  const topic=scope==='all'?'gonady':scope;
  const prompt=studyPrompts[topic];
  const sequence=scope==='all'||scope==='gonady'?gahtLessonIds.map(id=>lessons.find(l=>l.id===id)!):lessons.filter(l=>l.moduleId===scope);
  const next=sequence.find(l=>!state.completed.includes(l.id));
  return <section className="panel" style={{margin:'24px 0'}}><span className="eyebrow">UCZ SIĘ MECHANIZMÓW, POTEM DECYZJI</span><h2>{scope==='all'||scope==='gonady'?'Ścieżka GAHT · 8 kroków':`${modulesList.find(m=>m.id===scope)?.name} · plan pracy`}</h2><p>1. Wyjaśnij mechanizm → 2. Zinterpretuj wyniki → 3. Rozwiąż przypadek → 4. Wróć do błędów i powtórek.</p><p>Ukończone lekcje: {sequence.filter(l=>state.completed.includes(l.id)).length}/{sequence.length}. Ukończenie lekcji nie jest potwierdzeniem opanowania tematu.</p><div className="atlas-presets">{next&&<button className="primary" onClick={()=>go(`lesson/${next.id}`)}>Kontynuuj: {next.title}</button>}<button className="secondary" onClick={()=>go('cases')}>Przypadki kliniczne</button><button className="secondary" onClick={()=>go('cards')}>Powtórki</button></div>
    {(scope==='all'||scope==='gonady')&&<ol>{sequence.map(l=><li key={l.id}><button className="text-button" onClick={()=>go(`lesson/${l.id}`)}>{state.completed.includes(l.id)?'✓ ':''}{l.title}</button></li>)}</ol>}
    <details><summary>Sprawdź rozumienie: {prompt.question}</summary><p>{prompt.answer}</p><p><strong>Pułapka:</strong> {prompt.pitfall}</p></details>
    {state.level==='doctor'&&<p><strong>Poziom lekarski:</strong> przed wyborem postępowania nazwij alternatywne rozpoznanie, brakujące badanie, czynnik zakłócający i warunek zmiany decyzji.</p>}
  </section>;
}
