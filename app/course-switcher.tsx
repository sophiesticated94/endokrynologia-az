'use client';
import { useState, useRef, useEffect } from 'react';
import { FlaskConical, BrainCircuit, ChevronDown, Check, LayoutGrid } from 'lucide-react';
import type { CourseId } from '@/lib/course-types';
import { COURSES } from '@/lib/courses-registry';

interface Props {
  activeCourse: CourseId;
  onSelectCourse: (id: CourseId) => void;
  onOpenCatalog?: () => void;
  variant?: 'topbar' | 'sidebar';
}

export function CourseSwitcher({
  activeCourse,
  onSelectCourse,
  onOpenCatalog,
  variant = 'topbar',
}: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const current = COURSES[activeCourse] || COURSES.endocrinology;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: variant === 'sidebar' ? '100%' : 'auto',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="course-switcher-btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          padding: variant === 'sidebar' ? '8px 12px' : '6px 12px',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          color: 'var(--text)',
          cursor: 'pointer',
          width: variant === 'sidebar' ? '100%' : 'auto',
          fontSize: '0.88rem',
          fontWeight: 600,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
          {activeCourse === 'endocrinology' ? (
            <FlaskConical size={18} color="var(--accent)" />
          ) : (
            <BrainCircuit size={18} color="var(--accent)" />
          )}
          <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {current.shortTitle}
          </span>
        </span>
        <ChevronDown size={14} style={{ opacity: 0.6, flexShrink: 0 }} />
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            zIndex: 100,
            minWidth: '260px',
            width: variant === 'sidebar' ? '100%' : '280px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            padding: '6px',
          }}
        >
          <div style={{ padding: '6px 10px', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>
            WYBIERZ KURS MEDYCZNY
          </div>

          <button
            role="option"
            aria-selected={activeCourse === 'endocrinology'}
            onClick={() => {
              onSelectCourse('endocrinology');
              setOpen(false);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 10px',
              borderRadius: '6px',
              border: 'none',
              background: activeCourse === 'endocrinology' ? 'var(--accent-subtle)' : 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
              marginBottom: '2px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FlaskConical size={18} color="var(--accent)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>Endokrynologia</div>
                <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>146 lekcji · 8 modułów</small>
              </div>
            </div>
            {activeCourse === 'endocrinology' && <Check size={16} color="var(--accent)" />}
          </button>

          <button
            role="option"
            aria-selected={activeCourse === 'psychiatry'}
            onClick={() => {
              onSelectCourse('psychiatry');
              setOpen(false);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 10px',
              borderRadius: '6px',
              border: 'none',
              background: activeCourse === 'psychiatry' ? 'var(--accent-subtle)' : 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
              marginBottom: '4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BrainCircuit size={18} color="var(--accent)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>Psychiatria</div>
                <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>21 lekcji · 2 moduły pilotażowe</small>
              </div>
            </div>
            {activeCourse === 'psychiatry' && <Check size={16} color="var(--accent)" />}
          </button>

          {onOpenCatalog && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '4px', marginTop: '4px' }}>
              <button
                onClick={() => {
                  onOpenCatalog();
                  setOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--accent)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
              >
                <LayoutGrid size={15} />
                <span>Katalog wszystkich dziedzin (Hub)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
