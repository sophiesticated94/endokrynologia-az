'use client';
import { useState, useRef, useEffect } from 'react';
import { BookA, Search, Info, X, ExternalLink, Sparkles } from 'lucide-react';
import { glossary, type GlossaryItem, type GlossaryCategory } from '@/lib/glossary';
import type { Route } from './content-views';

export function GlossaryTerm({ item, children }: { item: GlossaryItem; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <span className="glossary-term-wrap">
      <button
        ref={triggerRef}
        type="button"
        className="glossary-term-trigger"
        onClick={() => setOpen(v => !v)}
        onMouseEnter={() => setOpen(true)}
        aria-expanded={open}
        aria-label={`Definicja terminu ${item.term}`}
      >
        <span>{children ?? item.term}</span>
        <span className="glossary-indicator">
          <Info size={11} />
        </span>
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="glossary-popover"
          role="tooltip"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="glossary-popover-header">
            <div>
              <span className="glossary-badge">{item.category}</span>
              <strong>{item.term}</strong>
            </div>
            <button
              type="button"
              className="glossary-close"
              aria-label="Zamknij definicję"
              onClick={e => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              <X size={14} />
            </button>
          </div>
          <p className="glossary-definition">{item.definition}</p>
          {item.normalRange && (
            <div className="glossary-meta">
              <span>Norma:</span> <strong>{item.normalRange}</strong>
            </div>
          )}
          <div className="glossary-significance">
            <span className="glossary-sig-label">
              <Sparkles size={12} /> Znaczenie kliniczne:
            </span>
            <p>{item.clinicalSignificance}</p>
          </div>
        </div>
      )}
    </span>
  );
}

// Regex to detect terms safely without breaking text
const termRegex = new RegExp(
  `\\b(${glossary
    .flatMap(g => [g.term, ...(g.aliases ?? [])])
    .sort((a, b) => b.length - a.length)
    .map(t => t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'))
    .join('|')})\\b`,
  'i'
);

export function GlossaryText({ text }: { text: string }) {
  if (!text) return null;

  const parts = text.split(termRegex);
  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, index) => {
        const lower = part.toLowerCase();
        const found = glossary.find(
          g => g.term.toLowerCase() === lower || g.aliases?.some(a => a.toLowerCase() === lower)
        );
        if (found) {
          return (
            <GlossaryTerm key={`${found.id}-${index}`} item={found}>
              {part}
            </GlossaryTerm>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

const categories: { id: 'all' | GlossaryCategory; label: string }[] = [
  { id: 'all', label: 'Wszystkie pojęcia' },
  { id: 'hormony', label: 'Hormony i białka' },
  { id: 'diagnostyka', label: 'Diagnostyka i skale' },
  { id: 'choroby', label: 'Jednostki chorobowe' },
  { id: 'leki', label: 'Farmakoterapia' },
  { id: 'anatomia', label: 'Anatomia i enzymy' },
];

export function GlossaryView({ go }: { go: (route: Route) => void }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | GlossaryCategory>('all');

  const filtered = glossary.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const query = search.toLowerCase().trim();
    if (!query) return matchesCat;
    const matchesSearch =
      item.term.toLowerCase().includes(query) ||
      item.aliases?.some(a => a.toLowerCase().includes(query)) ||
      item.definition.toLowerCase().includes(query) ||
      item.clinicalSignificance.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="reading glossary-layout">
      <div className="page-heading">
        <p className="eyebrow">
          <BookA size={16} /> WIEDZA W PIGUŁCE
        </p>
        <h1>Słowniczek pojęć medycznych</h1>
        <p>
          Kluczowe skróty, parametry laboratoryjne, enzymy i skale diagnostyczne w endokrynologii
          tarczycy.
        </p>
      </div>

      <div className="glossary-controls">
        <div className="glossary-search-wrap">
          <Search size={18} className="glossary-search-icon" />
          <input
            type="search"
            placeholder="Szukaj terminu, skrótu lub definicji (np. TSH, TRAb, Bethesda)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="glossary-search-input"
            aria-label="Szukaj w słowniczku"
          />
          {search && (
            <button
              type="button"
              className="text-button"
              onClick={() => setSearch('')}
              style={{ padding: '0 8px' }}
            >
              Wyczyść
            </button>
          )}
        </div>

        <div className="filter-bar" style={{ marginTop: '14px', marginBottom: '24px' }}>
          {categories.map(c => (
            <button
              key={c.id}
              className={activeCategory === c.id ? 'active' : ''}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="glossary-count-note">
        Znaleziono <strong>{filtered.length}</strong> pojęć
      </div>

      <div className="glossary-cards-grid">
        {filtered.map(item => (
          <article key={item.id} className="glossary-card">
            <div className="glossary-card-top">
              <span className="glossary-badge">{item.category}</span>
              <h2>{item.term}</h2>
              {item.aliases && item.aliases.length > 0 && (
                <span className="glossary-aliases">({item.aliases.join(', ')})</span>
              )}
            </div>

            <p className="glossary-card-def">{item.definition}</p>

            {item.normalRange && (
              <div className="glossary-meta-pill">
                <span>Przedział referencyjny:</span> <strong>{item.normalRange}</strong>
              </div>
            )}

            <div className="glossary-card-sig">
              <strong>
                <Sparkles size={14} /> Znaczenie kliniczne
              </strong>
              <p>{item.clinicalSignificance}</p>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="panel empty-state" style={{ gridColumn: '1 / -1' }}>
            <BookA size={40} />
            <h2>Brak wyników wyszukiwania</h2>
            <p>Nie znaleziono pojęć odpowiadających frazie „{search}”.</p>
            <button
              className="secondary"
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
            >
              Pokaż wszystkie hasła
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: '36px', textAlign: 'center' }}>
        <button className="primary" onClick={() => go('course')}>
          Wróć do mapy kursu <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
}
