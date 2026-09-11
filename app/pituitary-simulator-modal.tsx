'use client';
import { useEffect } from 'react';
import {
  X,
  BookOpen,
  ArrowRight,
  Layers,
  Info,
} from 'lucide-react';
import { pituitarySimulatorLegend } from '@/lib/pituitary-simulator';

export function PituitaryLegendModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pituitary-legend-title"
    >
      <div className="hpt-legend-dialog">
        <div className="legend-dialog-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} className="icon-accent" />
            <h2 id="pituitary-legend-title">Konsola Przysadkowa — Przewodnik kliniczny</h2>
          </div>
          <button
            type="button"
            className="text-button legend-close-btn"
            onClick={onClose}
            aria-label="Zamknij okno przewodnika"
          >
            <X size={20} />
          </button>
        </div>

        <div className="legend-dialog-content">
          {pituitarySimulatorLegend.sections.map((section, idx) => (
            <div key={idx} className="legend-group" style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--teal)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={16} /> {section.title}
              </h3>
              <div className="legend-cards-grid">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="legend-card">
                    <strong>{item.term}</strong>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="curriculum-tip" style={{ marginTop: '20px' }}>
            <Info size={18} />
            <p>
              <strong>Złote zasady kliniczne konsoli:</strong>
              <br />1. W panhipopituitaryzmie podaj hydrokortyzon PRZED lewotyroksyną (zapobieganie przełomowi nadnerczowemu).
              <br />2. W SIADH tempo wzrostu natremii NIE może przekraczać 8–10 mmol/l/24h (zapobieganie mielinolizie mostu CPM).
              <br />3. W akromegalii kryterium potwierdzenia to brak supresji GH w teście OGTT 75 g (&lt;1,0 µg/l).
            </p>
          </div>
        </div>

        <div className="legend-dialog-footer">
          <button type="button" className="primary" onClick={onClose}>
            Wróć do konsoli <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
