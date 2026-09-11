'use client';
import { Eye } from 'lucide-react';
import type { PituitarySimulationResult } from '@/lib/pituitary-simulator';

export function PituitaryPerimetryView({ res }: { res: PituitarySimulationResult }) {
  return (
    <>
      <div style={{ background: '#f6f9f8', border: '1px solid #dbe6e0', borderRadius: '8px', padding: '16px', margin: '14px 0' }}>
        <h4 style={{ margin: '0 0 10px', fontSize: '13px', color: '#355447', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Eye size={15} /> Perymetria (Badanie pola widzenia)
        </h4>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
          {/* Oko lewe */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#e2ece6',
              border: '2px solid #5a8771',
              margin: 'auto',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Ubytek skroniowy oka lewego = lewa połowa */}
              {res.visualFieldDefect === 'bitemporal_hemianopsia' && (
                <div style={{ position: 'absolute', inset: '0 50% 0 0', background: '#24322a' }} />
              )}
              {res.visualFieldDefect === 'quadrantanopsia' && (
                <div style={{ position: 'absolute', inset: '0 50% 50% 0', background: '#24322a' }} />
              )}
            </div>
            <small style={{ display: 'block', marginTop: '4px', fontSize: '11px', color: '#556c60' }}>Oko lewe</small>
          </div>

          {/* Oko prawe */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#e2ece6',
              border: '2px solid #5a8771',
              margin: 'auto',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Ubytek skroniowy oka prawego = prawa połowa */}
              {res.visualFieldDefect === 'bitemporal_hemianopsia' && (
                <div style={{ position: 'absolute', inset: '0 0 0 50%', background: '#24322a' }} />
              )}
              {res.visualFieldDefect === 'quadrantanopsia' && (
                <div style={{ position: 'absolute', inset: '0 0 50% 50%', background: '#24322a' }} />
              )}
            </div>
            <small style={{ display: 'block', marginTop: '4px', fontSize: '11px', color: '#556c60' }}>Oko prawe</small>
          </div>
        </div>
        <p style={{ fontSize: '12px', color: '#446153', margin: '10px 0 0', textAlign: 'center' }}>
          <strong>Obraz:</strong> {res.visualFieldDescription}
        </p>
      </div>

      {/* Objawy ucisku zatoki jamistej */}
      {res.cranialNervesPalsy.length > 0 && (
        <div className="alert" style={{ margin: '10px 0', fontSize: '12px' }}>
          <div>
            <strong>Inwazja do zatoki jamistej:</strong> Porażenie nerwów: {res.cranialNervesPalsy.join(', ')}. Ryzyko opadania powieki (ptoza) i podwójnego widzenia (diplopia).
          </div>
        </div>
      )}
    </>
  );
}
