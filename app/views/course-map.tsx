'use client';
import { useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import { lessons, plannedModules } from '@/lib/course';
import type { LearningState } from '@/lib/learning';
import { LessonRow } from './lesson-row';
import type { Navigation } from './types';

export function CourseMap({ state, go }: { state: LearningState; go: Navigation }) {
  const [activeTab, setActiveTab] = useState<'all' | 'tarczyca' | 'przysadka' | 'nadnercza' | 'przytarczyce' | 'cukrzyca' | 'gonady' | 'nen' | 'otylosc'>('all');

  const thyroidCount = lessons.filter(l => l.moduleId === 'tarczyca').length;
  const pituitaryCount = lessons.filter(l => l.moduleId === 'przysadka').length;
  const adrenalCount = lessons.filter(l => l.moduleId === 'nadnercza').length;
  const parathyroidCount = lessons.filter(l => l.moduleId === 'przytarczyce').length;
  const diabetesCount = lessons.filter(l => l.moduleId === 'cukrzyca').length;
  const gonadCount = lessons.filter(l => l.moduleId === 'gonady').length;
  const nenCount = lessons.filter(l => l.moduleId === 'nen').length;
  const otyloscCount = lessons.filter(l => l.moduleId === 'otylosc').length;

  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">OD PODSTAW DO PRAKTYKI</p>
        <h1>Twoja mapa endokrynologii</h1>
        <p>Wybierz moduł lub przeglądaj cały program edukacyjny krok po kroku.</p>
      </div>

      <div className="filter-bar" aria-label="Wybór modułu">
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          Wszystkie działy ({lessons.length} lekcji)
        </button>
        <button
          className={activeTab === 'tarczyca' ? 'active' : ''}
          onClick={() => setActiveTab('tarczyca')}
        >
          Moduł 01: Tarczyca ({thyroidCount})
        </button>
        <button
          className={activeTab === 'przysadka' ? 'active' : ''}
          onClick={() => setActiveTab('przysadka')}
        >
          Moduł 02: Przysadka i podwzgórze ({pituitaryCount})
        </button>
        <button
          className={activeTab === 'nadnercza' ? 'active' : ''}
          onClick={() => setActiveTab('nadnercza')}
        >
          Moduł 03: Nadnercza ({adrenalCount})
        </button>
        <button
          className={activeTab === 'przytarczyce' ? 'active' : ''}
          onClick={() => setActiveTab('przytarczyce')}
        >
          Moduł 04: Przytarczyce i Ca–P ({parathyroidCount})
        </button>
        <button
          className={activeTab === 'cukrzyca' ? 'active' : ''}
          onClick={() => setActiveTab('cukrzyca')}
        >
          Moduł 05: Cukrzyca i metabolizm ({diabetesCount})
        </button>
        <button
          className={activeTab === 'gonady' ? 'active' : ''}
          onClick={() => setActiveTab('gonady')}
        >
          Moduł 06: Gonady i medycyna rozrodu ({gonadCount})
        </button>
        <button
          className={activeTab === 'nen' ? 'active' : ''}
          onClick={() => setActiveTab('nen')}
        >
          Moduł 07: Nowotwory neuroendokrynne i MEN ({nenCount})
        </button>
        <button
          className={activeTab === 'otylosc' ? 'active' : ''}
          onClick={() => setActiveTab('otylosc')}
        >
          Moduł 08: Otyłość i zaburzenia lipidowe ({otyloscCount})
        </button>
      </div>


      {/* Moduł 01: Tarczyca */}
      {(activeTab === 'all' || activeTab === 'tarczyca') && (
        <div style={{ marginBottom: '40px' }}>
          <section className="module-header">
            <span className="module-number">01</span>
            <div>
              <h2>Tarczyca</h2>
              <p>{thyroidCount} lekcji · Modele kinetyki, chemia syntezy, symulator HPT i klinika</p>
            </div>
            <span className="badge">DOSTĘPNY</span>
          </section>

          {(() => {
            const preferred = [
              'Fundamenty',
              'Praktyka kliniczna',
              'Sytuacje szczególne',
              'Matematyka i modele',
              'Chemia i biochemia',
            ];
            const actual = Array.from(new Set(lessons.filter(l => l.moduleId === 'tarczyca').map(l => l.group)));
            const allGroups = [
              ...preferred.filter(g => actual.includes(g)),
              ...actual.filter(g => !preferred.includes(g)),
            ];
            return allGroups.map(group => {
              const groupLessons = lessons.filter(l => l.moduleId === 'tarczyca' && l.group === group);
              if (!groupLessons.length) return null;
              return (
                <section key={`t-${group}`} className="course-group">
                  <h3>{group}</h3>
                  <div className="lesson-list">
                    {groupLessons.map(l => (
                      <LessonRow key={l.id} lesson={l} state={state} go={go} />
                    ))}
                  </div>
                </section>
              );
            });
          })()}
        </div>
      )}

      {/* Moduł 02: Przysadka i podwzgórze */}
      {(activeTab === 'all' || activeTab === 'przysadka') && (
        <div style={{ marginBottom: '40px' }}>
          <section className="module-header" style={{ background: '#eaf1f7', borderColor: '#c4d8e7' }}>
            <span className="module-number" style={{ color: '#45779e' }}>02</span>
            <div>
              <h2>Przysadka i podwzgórze</h2>
              <p>{pituitaryCount} lekcji · Pulsacja neuroendokrynna, osmolalność, chemia glikoprotein i farmakoterapia</p>
            </div>
            <span className="badge" style={{ color: '#255b85', borderColor: '#adc8dd', background: '#ffffffcc' }}>DOSTĘPNY</span>
          </section>

          {(() => {
            const preferred = [
              'Fundamenty',
              'Gruczolaki i hipersekrecja',
              'Niedoczynność i gospodarka wodna',
              'Sytuacje szczególne i chirurgia',
              'Matematyka i modele',
              'Chemia i biochemia',
            ];
            const actual = Array.from(new Set(lessons.filter(l => l.moduleId === 'przysadka').map(l => l.group)));
            const allGroups = [
              ...preferred.filter(g => actual.includes(g)),
              ...actual.filter(g => !preferred.includes(g)),
            ];
            return allGroups.map(group => {
              const groupLessons = lessons.filter(l => l.moduleId === 'przysadka' && l.group === group);
              if (!groupLessons.length) return null;
              return (
                <section key={`p-${group}`} className="course-group">
                  <h3>{group}</h3>
                  <div className="lesson-list">
                    {groupLessons.map(l => (
                      <LessonRow key={l.id} lesson={l} state={state} go={go} />
                    ))}
                  </div>
                </section>
              );
            });
          })()}
        </div>
      )}

      {/* Moduł 03: Nadnercza */}
      {(activeTab === 'all' || activeTab === 'nadnercza') && (
        <div style={{ marginBottom: '40px' }}>
          <section className="module-header" style={{ background: '#fdf6ee', borderColor: '#e6d3be' }}>
            <span className="module-number" style={{ color: '#b2651f' }}>03</span>
            <div>
              <h2>Nadnercza</h2>
              <p>{adrenalCount} lekcji · Kinetyka enzymatyczna Michaelis-Menten, stereochemia steranu i katecholamin</p>
            </div>
            <span className="badge" style={{ color: '#8c480a', borderColor: '#dcb892', background: '#ffffffcc' }}>DOSTĘPNY</span>
          </section>

          {(() => {
            const preferred = [
              'Fundamenty',
              'Niedoczynność kory i WPN',
              'Nadczynności i guz chromochłonny',
              'Stany nagłe i chirurgia',
              'Matematyka i modele',
              'Chemia i biochemia',
            ];
            const actual = Array.from(new Set(lessons.filter(l => l.moduleId === 'nadnercza').map(l => l.group)));
            const allGroups = [
              ...preferred.filter(g => actual.includes(g)),
              ...actual.filter(g => !preferred.includes(g)),
            ];
            return allGroups.map(group => {
              const groupLessons = lessons.filter(l => l.moduleId === 'nadnercza' && l.group === group);
              if (!groupLessons.length) return null;
              return (
                <section key={`n-${group}`} className="course-group">
                  <h3>{group}</h3>
                  <div className="lesson-list">
                    {groupLessons.map(l => (
                      <LessonRow key={l.id} lesson={l} state={state} go={go} />
                    ))}
                  </div>
                </section>
              );
            });
          })()}
        </div>
      )}

      {/* Moduł 04: Przytarczyce i Ca–P */}
      {(activeTab === 'all' || activeTab === 'przytarczyce') && (
        <div style={{ marginBottom: '40px' }}>
          <section className="module-header" style={{ background: '#f5f3fa', borderColor: '#dcd4f0' }}>
            <span className="module-number" style={{ color: '#6d4ba4' }}>04</span>
            <div>
              <h2>Przytarczyce i gospodarka wapniowo-fosforanowa</h2>
              <p>{parathyroidCount} lekcji · Sigmoida Hilla dla CaSR, kinetyka mineralizacji kości, allosteria i bisfosfoniany</p>
            </div>
            <span className="badge" style={{ color: '#56338e', borderColor: '#c2b2e5', background: '#ffffffcc' }}>DOSTĘPNY</span>
          </section>

          {(() => {
            const preferred = [
              'Fundamenty',
              'Nadczynności i hiperkalcemia',
              'Niedoczynności i tężyczka',
              'Kości, chirurgia i stany nagłe',
              'Matematyka i modele',
              'Chemia i biochemia',
            ];
            const actual = Array.from(new Set(lessons.filter(l => l.moduleId === 'przytarczyce').map(l => l.group)));
            const allGroups = [
              ...preferred.filter(g => actual.includes(g)),
              ...actual.filter(g => !preferred.includes(g)),
            ];
            return allGroups.map(group => {
              const groupLessons = lessons.filter(l => l.moduleId === 'przytarczyce' && l.group === group);
              if (!groupLessons.length) return null;
              return (
                <section key={`pt-${group}`} className="course-group">
                  <h3>{group}</h3>
                  <div className="lesson-list">
                    {groupLessons.map(l => (
                      <LessonRow key={l.id} lesson={l} state={state} go={go} />
                    ))}
                  </div>
                </section>
              );
            });
          })()}
        </div>
      )}

      {/* Moduł 05: Cukrzyca */}
      {(activeTab === 'all' || activeTab === 'cukrzyca') && (
        <div style={{ marginBottom: '40px' }}>
          <section className="module-header" style={{ background: '#f0f9f6', borderColor: '#c2e7db' }}>
            <span className="module-number" style={{ color: '#0d7a57' }}>05</span>
            <div>
              <h2>Cukrzyca i zaburzenia gospodarki węglowodanowej</h2>
              <p>{diabetesCount} lekcji · Model Bergmana, kaskada receptora insulinowego, ketogeneza, DKA/HHS i CGM</p>
            </div>
            <span className="badge" style={{ color: '#095c41', borderColor: '#a3d8c5', background: '#ffffffcc' }}>DOSTĘPNY</span>
          </section>

          {(() => {
            const preferred = [
              'Fundamenty i diagnostyka',
              'Klasyfikacja i patogeneza',
              'Ostre stany i powikłania',
              'Farmakoterapia i sytuacje szczególne',
              'Matematyka i modele',
              'Chemia i biochemia',
            ];
            const actual = Array.from(new Set(lessons.filter(l => l.moduleId === 'cukrzyca').map(l => l.group)));
            const allGroups = [
              ...preferred.filter(g => actual.includes(g)),
              ...actual.filter(g => !preferred.includes(g)),
            ];
            return allGroups.map(group => {
              const groupLessons = lessons.filter(l => l.moduleId === 'cukrzyca' && l.group === group);
              if (!groupLessons.length) return null;
              return (
                <section key={`dia-${group}`} className="course-group">
                  <h3>{group}</h3>
                  <div className="lesson-list">
                    {groupLessons.map(l => (
                      <LessonRow key={l.id} lesson={l} state={state} go={go} />
                    ))}
                  </div>
                </section>
              );
            });
          })()}
        </div>
      )}

      {/* Moduł 06: Gonady */}
      {(activeTab === 'all' || activeTab === 'gonady') && (
        <div className="module-group" style={{ marginTop: activeTab === 'all' ? '40px' : '0' }}>
          <section className="course-module-header">
            <span className="eyebrow">MODUŁ 06 · REPRODUKCJA I HORMONY PŁCIOWE</span>
            <h2>Gonady i medycyna rozrodu</h2>
            <p>
              Oś podwzgórze–przysadka–gonady, andrologia kliniczna, ginekologia endokrynologiczna, medycyna rozrodu (ART/IVF),
              hormonoterapia tranzycyjna (GAHT), zaburzenia rozwoju płci (DSD) oraz modele biofizyczne i stereochemia steroidogenezy.
            </p>
          </section>

          {(() => {
            const preferred = [
              'Fundamenty i diagnostyka',
              'Andrologia i gonady męskie',
              'Ginekologia endokrynologiczna',
              'Hormonoterapia tranzycyjna i zaburzenia rozwojowe',
              'Matematyka i modele',
              'Chemia i biochemia',
            ];
            const actual = Array.from(new Set(lessons.filter(l => l.moduleId === 'gonady').map(l => l.group)));
            const allGroups = [
              ...preferred.filter(g => actual.includes(g)),
              ...actual.filter(g => !preferred.includes(g)),
            ];
            return allGroups.map(group => {
              const groupLessons = lessons.filter(l => l.moduleId === 'gonady' && l.group === group);
              if (!groupLessons.length) return null;
              return (
                <section key={`gon-${group}`} className="course-group">
                  <h3>{group}</h3>
                  <div className="lesson-list">
                    {groupLessons.map(l => (
                      <LessonRow key={l.id} lesson={l} state={state} go={go} />
                    ))}
                  </div>
                </section>
              );
            });
          })()}
        </div>
      )}

      {/* Moduł 07: Nowotwory neuroendokrynne i MEN */}
      {(activeTab === 'all' || activeTab === 'nen') && (
        <div className="module-group" style={{ marginTop: activeTab === 'all' ? '40px' : '0' }}>
          <section className="course-module-header">
            <span className="eyebrow">MODUŁ 07 · ONKOLOGIA ENDOKRYNNA I ZESPOŁY GENETYCZNE</span>
            <h2>Nowotwory neuroendokrynne i zespoły MEN</h2>
            <p>
              Klasyfikacja WHO 2022/2024, guzy pNET (gastrinoma, insulinoma, glukagonoma, VIPoma), zespół rakowiaka i serce rakowiaka,
              zespoły MEN1, MEN2A/2B, MEN4, VHL, dozymetria nerkowa PRRT (177Lu-DOTATATE) oraz doustna chemioterapia CAPTEM.
            </p>
          </section>

          {(() => {
            const preferred = [
              'Fundamenty i diagnostyka',
              'Guzy neuroendokrynne trzustki (pNET)',
              'Zespół rakowiaka i NEN przewodu pokarmowego oraz płuc',
              'Zespoły uwarunkowane genetycznie',
              'Terapie celowane, PRRT i chirurgia',
              'Matematyka i modele',
              'Chemia i biochemia',
            ];
            const actual = Array.from(new Set(lessons.filter(l => l.moduleId === 'nen').map(l => l.group)));
            const allGroups = [
              ...preferred.filter(g => actual.includes(g)),
              ...actual.filter(g => !preferred.includes(g)),
            ];
            return allGroups.map(group => {
              const groupLessons = lessons.filter(l => l.moduleId === 'nen' && l.group === group);
              if (!groupLessons.length) return null;
              return (
                <section key={`nen-${group}`} className="course-group">
                  <h3>{group}</h3>
                  <div className="lesson-list">
                    {groupLessons.map(l => (
                      <LessonRow key={l.id} lesson={l} state={state} go={go} />
                    ))}
                  </div>
                </section>
              );
            });
          })()}
        </div>
      )}

      {/* Moduł 08: Otyłość, chirurgia bariatryczna i dyslipidemie */}
      {(activeTab === 'all' || activeTab === 'otylosc') && (
        <div className="module-group" style={{ marginTop: activeTab === 'all' ? '40px' : '0' }}>
          <section className="course-module-header">
            <span className="eyebrow">MODUŁ 08 · OTYŁOŚĆ, METABOLIZM I ZABURZENIA LIPIDOWE</span>
            <h2>Otyłość, chirurgia bariatryczna i dyslipidemie</h2>
            <p>
              Adipobiologia i przewlekły stan zapalny tkanki tłuszczowej, farmakoterapia inkretynowa GLP-1/GIP (semaglutyd, tirzepatyd),
              kwalifikacja bariatryczna IFSO 2023, powikłania kardiometaboliczne i MASLD, hipercholesterolemia rodzinna (FH),
              inhibitory PCSK9 i inklisiran, model dynamiczny Halla oraz kinetyka lipolizy i estrów cholesterolu.
            </p>
          </section>

          {(() => {
            const preferred = [
              'Fundamenty i diagnostyka',
              'Powikłania narządowe i kardiometaboliczne',
              'Farmakoterapia otyłości',
              'Chirurgia bariatryczna i metaboliczna',
              'Zaburzenia lipidowe i dyslipidemie',
              'Matematyka i modele',
              'Chemia i biochemia',
            ];
            const actual = Array.from(new Set(lessons.filter(l => l.moduleId === 'otylosc').map(l => l.group)));
            const allGroups = [
              ...preferred.filter(g => actual.includes(g)),
              ...actual.filter(g => !preferred.includes(g)),
            ];
            return allGroups.map(group => {
              const groupLessons = lessons.filter(l => l.moduleId === 'otylosc' && l.group === group);
              if (!groupLessons.length) return null;
              return (
                <section key={`otylosc-${group}`} className="course-group">
                  <h3>{group}</h3>
                  <div className="lesson-list">
                    {groupLessons.map(l => (
                      <LessonRow key={l.id} lesson={l} state={state} go={go} />
                    ))}
                  </div>
                </section>
              );
            });
          })()}
        </div>
      )}

      <h2 className="spaced-heading">Dalsza część Twojej ścieżki</h2>
      <div className="planned-grid">
        {plannedModules.map((name, i) => (
          <div className="planned-card" key={name}>
            <span>{String(i + 9).padStart(2, '0')}</span>
            <h3>{name}</h3>
            <small>
              <LockKeyhole size={13} />
              Planowany moduł
            </small>
          </div>
        ))}
      </div>

    </>
  );
}
