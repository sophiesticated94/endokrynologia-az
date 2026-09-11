'use client';
import {useId, useState} from 'react';
import {initialAtlas, describeAtlas, blockerLabels, atlasTimeline, type AtlasState, type Blocker} from '../lib/hormone-atlas';

const details: Record<string,string> = {
  Progesteron:'Progesteron działa przez PR i moduluje oś. W fizjologii jajnikowej główne źródło po owulacji stanowi ciałko żółte. Hormon egzogenny może działać także po gonadektomii; nie oznacza to rutynowego wskazania w GAHT.',
  PR:'Receptory progesteronowe uczestniczą m.in. w odpowiedzi endometrium. Brak macicy usuwa ten konkretny narząd docelowy, ale nie wszystkie działania progesteronu w organizmie.',
  GnRH:'Pulsacyjny GnRH pobudza przysadkę. Ciągła stymulacja agonistą prowadzi z czasem do desensytyzacji. Antagonista blokuje receptor bez początkowego flare.',
  LH:'LH pobudza komórki Leydiga w jądrach i komórki osłonki w jajniku. Bez czynnej tkanki gonadalnej sam wzrost LH nie odtworzy produkcji steroidów.',
  FSH:'FSH działa na komórki Sertoliego lub ziarniste. Inhibina ogranicza wydzielanie FSH. Nie należy wyliczać FSH jako stałego procentu LH.',
  Gonady:'Obecność narządu, jego rezerwa i farmakologiczne hamowanie to osobne informacje. Usunięcie macicy nie oznacza usunięcia jajników.',
  'T → DHT':'5α-reduktaza przekształca T w DHT. Finasteryd nie jest antagonistą receptora androgenowego i nie blokuje aromatazy.',
  'T → E2':'Aromataza przekształca androgeny w estrogeny. Ten szlak nadal działa w tkankach obwodowych po usunięciu gonad. E2 ma znaczenie m.in. dla kości także podczas terapii T.',
  Receptory:'AR odbiera sygnał T/DHT, a ER estradiolu. Stężenie we krwi, wiązanie z białkami, lokalna konwersja i blokada receptora to różne poziomy opisu.',
};
function Map({state,title}:{state:AtlasState;title:string}) {
  const r=describeAtlas(state); const uid=useId().replace(/:/g,''); const [selected,setSelected]=useState('GnRH');
  const node=(key:string,x:number,y:number,label=key,muted=false)=><g key={key} role="button" tabIndex={0} aria-label={`Wyjaśnij: ${key}`} onClick={()=>setSelected(key)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(key)}}} className="atlas-node"><rect x={x} y={y} width="132" height="48" rx="10" fill={muted?'#edf1f5':selected===key?'#d0f3ed':'#fff'} stroke={muted?'#a7b2c1':'#117c77'} strokeDasharray={muted?'5 4':undefined}/><text x={x+66} y={y+29} textAnchor="middle" fontSize="15" fill="#15344f">{label}</text></g>;
  return <article className="atlas-panel"><h3>{title}</h3><p className="atlas-status">{r.gonadal}</p>
    <svg viewBox="0 0 420 535" role="group" aria-label={`${title}: interaktywna mapa osi HPG`}>
      <defs><marker id={`${uid}arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#117c77"/></marker></defs>
      <g stroke="#117c77" fill="none" strokeWidth="2" markerEnd={`url(#${uid}arrow)`}><path d="M210 64V87H108V104"/><path d="M210 87H310V104"/><path d="M108 152V179H210V198"/><path d="M310 152V179H210"/><path d="M210 246V275H108V304" strokeDasharray={r.absent?'5 4':undefined}/><path d="M210 275H310V304" strokeDasharray={r.absent?'5 4':undefined}/><path d="M108 352V375H210V395"/><path d="M310 352V375H210"/></g>
      {r.positiveFeedback?<path d="M310 375H400V80H108V102" stroke="#b45309" strokeWidth="2" fill="none" markerEnd={`url(#${uid}arrow)`}/>:<path d="M310 375H400V39H283M283 30V48" stroke="#b45309" strokeWidth="2" fill="none"/>}
      <path d="M144 222H22V494H42M174 494H244" stroke="#6d28d9" strokeWidth="2" fill="none" markerEnd={`url(#${uid}arrow)`} strokeDasharray={r.absent?'5 4':undefined}/>
      <text x="32" y="465" fill="#6d28d9" fontSize="12">+ P4 egzogenny (jeśli wybrany)</text>
      {node('Progesteron',42,470)}{node('PR',244,470,'PR / tkanki')}
      <path d="M277 226H382V151M373 151H391" stroke="#7c3aed" strokeWidth="2" fill="none" strokeDasharray={r.absent?'3 6':undefined} opacity={r.absent?0.3:1}/>
      <text x="394" y="242" textAnchor="end" fill="#6d28d9" fontSize="12">− inhibina / FSH</text>
      <text x="394" y="190" textAnchor="end" fill="#92400e" fontSize="12">{r.positiveFeedback?'+ E2 → wyrzut LH':'− steroidy / oś'}</text>
      <text x="12" y="272" fill="#52687c" fontSize="12">+ hormon egzogenny / prekursory nadnerczowe</text>
      {node('GnRH',144,16)}{node('LH',42,104)}{node('FSH',244,104)}{node('Gonady',144,198,r.absent?'Brak gonad':state.gonads==='testes'?'Jądra':'Jajniki',r.absent)}{node('T → DHT',42,304)}{node('T → E2',244,304)}{node('Receptory',144,395)}
      {r.central&&<text x="210" y="98" textAnchor="middle" fill="#b45309" fontSize="13">↓ sygnał przysadkowy</text>}
      {r.flare&&<text x="210" y="98" textAnchor="middle" fill="#b45309" fontSize="13">↑ przejściowy flare</text>}
      {r.arBlocked&&<text x="286" y="427" fill="#b45309" fontSize="13">⊣ AR</text>}
      {state.blocker==='fivear'&&<text x="108" y="296" textAnchor="middle" fill="#b45309" fontSize="13">⊣ 5α-reduktaza</text>}
    </svg>
    <p className="atlas-explanation" aria-live="polite"><strong>{selected}: </strong>{details[selected]}</p>
    <dl className="atlas-readouts">{[['LH / FSH',r.feedback],['Inhibina',r.inhibin],['Testosteron',r.testosterone],['Estradiol',r.estradiol],['Progesteron / PR',r.progesterone],['DHT',r.dht],['Działanie tkankowe',r.receptor],['SHBG',r.shbg],['Płodność',r.fertility]].map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    <details><summary>Konsekwencje kliniczne tego scenariusza</summary><ul>{r.notes.map(n=><li key={n}>{n}</li>)}</ul></details>
  </article>;
}

export function HormoneAtlas({initialGoal='fem'}:{initialGoal?:'fem'|'masc'|'trt'|'physiology'}) {
  const [s,set]=useState<AtlasState>(()=>initialGoal==='masc'?{...initialAtlas,gonads:'ovaries',uterus:true,hormone:'testosterone'}:initialGoal==='trt'?{...initialAtlas,hormone:'testosterone'}:initialGoal==='physiology'?{...initialAtlas,hormone:'none'}:initialAtlas);
  const [compare,setCompare]=useState(true); const [time,setTime]=useState(0); const [prediction,predict]=useState<string|null>(null);
  const update=(patch:Partial<AtlasState>)=>{set(v=>({...v,...patch}));predict(null)};
  return <section className="hormone-atlas"><div className="atlas-heading"><span className="eyebrow">ATLAS SPRZĘŻEŃ · GAHT</span><h2>Co zmienia obecność gonad?</h2><p>Porównaj źródła hormonów, sprzężenia i działanie w tkankach. Kliknij element mapy, aby prześledzić mechanizm.</p></div>
    <div className="atlas-presets"><button className="secondary" onClick={()=>{set(initialAtlas);predict(null)}}>Scenariusz feminizujący</button><button className="secondary" onClick={()=>{set({...initialAtlas,gonads:'ovaries',uterus:true,hormone:'testosterone'});predict(null)}}>Scenariusz maskulinizujący</button><button className="secondary" onClick={()=>{set({...initialAtlas,hormone:'none'});predict(null)}}>Fizjologia bez terapii</button></div>
    <div className="atlas-controls">
      <label>Rodzaj gonad<select value={s.gonads} onChange={e=>update({gonads:e.target.value as AtlasState['gonads'],uterus:e.target.value==='ovaries'})}><option value="testes">Jądra</option><option value="ovaries">Jajniki</option></select></label>
      <label>Czynność / obecność<select value={s.function} onChange={e=>update({function:e.target.value as AtlasState['function']})}><option value="active">Obecne, zachowana rezerwa</option><option value="impaired">Obecne, niewydolne</option><option value="absent">Obustronnie usunięte</option></select></label>
      <label>Hormon egzogenny<select value={s.hormone} onChange={e=>update({hormone:e.target.value as AtlasState['hormone']})}><option value="none">Brak</option><option value="estradiol">17β-estradiol</option><option value="testosterone">Testosteron</option></select></label>
      <label>Droga podania<select disabled={s.hormone==='none'} value={s.route} onChange={e=>update({route:e.target.value as AtlasState['route']})}><option value="oral">Doustna</option><option value="transdermal">Przezskórna</option><option value="injection">Iniekcyjna</option></select></label>
      <label>Miejsce działania leku<select value={s.blocker} onChange={e=>update({blocker:e.target.value as Blocker})}>{Object.entries(blockerLabels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>
      <label>Etap działania<select value={s.phase} onChange={e=>update({phase:e.target.value as AtlasState['phase']})}><option value="early">Początek terapii</option><option value="established">Utrwalone działanie</option></select></label>
      {s.gonads==='ovaries'&&s.function==='active'&&s.hormone==='none'&&s.blocker==='none'&&!s.progesterone&&<label>Fizjologiczny cykl jajnikowy<select value={s.cycle??'follicular'} onChange={e=>update({cycle:e.target.value as AtlasState['cycle']})}><option value="follicular">Faza folikularna</option><option value="ovulatory">Utrzymany wzrost E2 przed owulacją</option><option value="luteal">Faza lutealna</option></select></label>}
    </div>
    <div className="atlas-switches"><label><input type="checkbox" checked={s.uterus} onChange={e=>update({uterus:e.target.checked})}/> Macica / endometrium obecne</label><label><input type="checkbox" checked={!!s.progesterone} onChange={e=>update({progesterone:e.target.checked})}/> Pokaż dodanie progesteronu</label><label><input type="checkbox" checked={compare} onChange={e=>setCompare(e.target.checked)}/> Porównaj z {s.function==='absent'?'gonadami o zachowanej rezerwie':'brakiem gonad'}</label></div>
    <p className="atlas-limit">Model jakościowy dla dorosłych ze sprawną osią podwzgórzowo-przysadkową. Nie wylicza dawki, stężeń, ryzyka zakrzepicy ani szans na ciążę. Zestawienie mechanizmów nie jest propozycją schematu leczenia.</p>
    <div className={`atlas-comparison ${compare?'':'atlas-single'}`}><Map state={s} title="A · Wybrany scenariusz"/>{compare&&<Map state={{...s,function:s.function==='absent'?'active':'absent'}} title="B · Zmieniamy tylko obecność gonad"/>}</div>
    <section className="atlas-exercise"><h3>Najpierw przewidź</h3><p>Po usunięciu obu gonad, bez hormonów egzogennych i bez leku hamującego przysadkę, co zwykle dzieje się z LH/FSH przy sprawnej osi?</p><div className="atlas-presets">{['Rosną','Spadają','Pozostają zawsze bez zmian'].map(v=><button key={v} className="secondary" aria-pressed={prediction===v} onClick={()=>predict(v)}>{v}</button>)}</div>{prediction&&<p role="status">{prediction==='Rosną'?'Tak.':'Sprawdź ponownie sprzężenie zwrotne.'} Znika gonadalne źródło steroidów i inhibiny. Przysadka zwiększa sygnał, lecz nie odtworzy usuniętej tkanki. Hormony egzogenne lub leki działające na przysadkę mogą zmienić ten obraz.</p>}</section>
    <section className="atlas-exercise"><h3>Jedna terapia, trzy skale czasu</h3><div className="atlas-presets">{atlasTimeline.map((t,i)=><button key={t.label} className="secondary" aria-pressed={time===i} onClick={()=>setTime(i)}>{t.label}</button>)}</div><p aria-live="polite">{atlasTimeline[time].text}</p></section>
    <details><summary>Źródła i granice modelu</summary><p>Sprawdzono mechanizmy i monitorowanie 11.09.2026; bez recenzji klinicznej i walidacji predykcyjnej. Cykl pokazujemy schematycznie; nie przewidujemy terminu owulacji. Nie modelujemy ciąży, DSD ani stopnia zmian wyglądu.</p><p><a href="https://academic.oup.com/jcem/article/102/11/3869/4157558" target="_blank" rel="noreferrer">Endocrine Society 2017</a> · <a href="https://transcare.ucsf.edu/guidelines/feminizing-hormone-therapy" target="_blank" rel="noreferrer">UCSF 2016 — mechanizmy GAHT (strona oczekuje aktualizacji)</a> · <a href="https://www.cdc.gov/contraception/hcp/usspr/testosterone-pregnancy-risk.html" target="_blank" rel="noreferrer">CDC 2024 — antykoncepcja</a></p></details>
  </section>;
}
