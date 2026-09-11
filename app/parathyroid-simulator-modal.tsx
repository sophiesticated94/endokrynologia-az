'use client';
import { BookOpen, X } from 'lucide-react';
import { parathyroidSimulatorLegend } from '@/lib/parathyroid-simulator';

export function ParathyroidSimulatorModal({
  titleId,
  onClose,
}: {
  titleId: string;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="#059669" />
            <h3 id={titleId} style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>
              Legenda Konsoli Przytarczycowej i zasady bezpieczeństwa
            </h3>
          </div>
          <button
            type="button"
            className="text-button"
            onClick={onClose}
            style={{ padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>
          <h4 style={{ color: '#059669', margin: '14px 0 6px' }}>1. Tryby symulatora</h4>
          {parathyroidSimulatorLegend.modes.map(mode => (
            <div key={mode.id} style={{ marginBottom: '8px' }}>
              <strong>{mode.title}:</strong> {mode.description}
            </div>
          ))}

          <h4 style={{ color: '#b91c1c', margin: '18px 0 6px' }}>2. Żelazne reguły bezpieczeństwa w gospodarce Ca–P</h4>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            <li style={{ marginBottom: '6px' }}>
              <strong>ZAKAZ OPERACJI W FHH:</strong> Wskaźnik CCCR &lt; 0,01 przy mutacji CASR chroni przed
              niepotrzebną, nieskuteczną i szkodliwą paratyreoidktomią!
            </li>
            <li style={{ marginBottom: '6px' }}>
              <strong>NAWODNIENIE PRZED FUROSEMIDEM:</strong> W przełomie hiperkalcemicznym podanie furosemidu
              u odwodnionego chorego doprowadza do wstrząsu hipowolemicznego i zgonu.
            </li>
            <li style={{ marginBottom: '6px' }}>
              <strong>MAGNEZ W TĘŻYCZCE:</strong> Bez uzupełnienia magnezu podawanie samego wapnia nie zniesie
              tężyczki, ponieważ hipomagnezemia blokuje wydzielanie i działanie PTH!
            </li>
          </ul>
        </div>

        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <button type="button" className="primary" onClick={onClose}>
            Rozumiem, zamknij
          </button>
        </div>
      </div>
    </div>
  );
}
