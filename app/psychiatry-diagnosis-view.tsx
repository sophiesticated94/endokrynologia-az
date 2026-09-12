'use client';
import { CheckCircle2, XCircle, AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';
import type { PatientProfile } from '@/lib/psychiatry-engine';
import { evaluateDiagnosticCriteria } from '@/lib/psychiatry-engine';

interface Props {
  patient: PatientProfile;
}

export function PsychiatryDiagnosisView({ patient }: Props) {
  const evaluations = evaluateDiagnosticCriteria(patient);

  return (
    <div className="panel" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <span className="eyebrow">DIAGNOSTIC DETECTIVE</span>
        <h2 style={{ margin: '4px 0 6px 0' }}>Różnicowanie Diagnostyczne: ICD-11 CDDR 2024 & DSM-5-TR</h2>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          Kryteria nozologiczne sprawdzane w czasie rzeczywistym. Wykrywanie pułapek (switch w ChAD, podłoże somatyczne).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {evaluations.map(diag => {
          const isMet = diag.status === 'spełnione';
          const isPending = diag.status === 'brak danych';

          return (
            <div
              key={diag.diagnosisId}
              style={{
                border: `1px solid ${isMet ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '10px',
                padding: '18px',
                background: isMet ? 'var(--accent-subtle)' : 'var(--bg-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{diag.name}</h3>
                <span
                  className="badge"
                  style={{
                    background: isMet ? 'var(--accent)' : isPending ? 'var(--warning-subtle)' : 'var(--border)',
                    color: isMet ? '#fff' : isPending ? 'var(--warning)' : 'var(--text-muted)',
                  }}
                >
                  {diag.status.toUpperCase()}
                </span>
              </div>

              {diag.trapWarning && (
                <div
                  style={{
                    background: 'var(--warning-subtle)',
                    color: 'var(--warning-text)',
                    padding: '10px',
                    borderRadius: '6px',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                  }}
                >
                  <ShieldAlert size={18} style={{ flexShrink: 0 }} />
                  <span>{diag.trapWarning}</span>
                </div>
              )}

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {diag.criteriaList.map((crit, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      marginBottom: '8px',
                      fontSize: '0.9rem',
                    }}
                  >
                    {crit.met ? (
                      <CheckCircle2 size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    ) : (
                      <XCircle size={16} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    )}
                    <div>
                      <strong>{crit.label}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{crit.note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '24px', padding: '16px', background: 'var(--surface)', borderRadius: '8px', border: '1px dashed var(--border)' }}>
        <h4 style={{ margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={16} /> Złote reguły różnicowania w psychiatrii
        </h4>
        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          1. Zawsze zbadaj TSH przed diagnozą depresji pierwotnej. 2. Zmniejszenie potrzeby snu to objaw manii/hipomanii (nie mylić z bezsennością!). 3. Nigdy nie stosuj monoterapii SSRI w podejrzeniu ChAD z uwagi na ryzyko wywołania manii.
        </p>
      </div>
    </div>
  );
}
