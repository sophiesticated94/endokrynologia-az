'use client';
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PSYCHIATRY_EVIDENCE_REGISTRY } from '@/lib/psychiatry/evidence/model-limitations';
import { useEvidenceInspector } from './evidence-inspector-context';

export function EvidenceBadge({
  mode,
  claimKey,
  label,
  onClick,
}: {
  mode?: string;
  claimKey?: string;
  label?: string;
  onClick?: () => void;
}) {
  if (!mode && !claimKey) return null;

  const inspector = useEvidenceInspector();

  const modeLabels: Record<string, { label: string; color: string }> = {
    'pet-model': { label: 'Badania PET (Meyer / Kapur)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    'measured-tdm': { label: 'Oznaczenie TDM (AGNP 2026)', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    'validated-decision-rule': { label: 'Reguła walidowana (Hunter 2003)', color: 'bg-rose-100 text-rose-800 border-rose-300' },
    'pk-sensitivity': { label: 'Model wrażliwości PK', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    'safety-context': { label: 'Nadzór bezpieczeństwa', color: 'bg-red-100 text-red-800 border-red-300' },
    'clinical-framework': { label: 'Standard ICD-11 / DSM-5-TR', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  };

  const claimItem = claimKey ? PSYCHIATRY_EVIDENCE_REGISTRY[claimKey] : undefined;
  const current = mode ? (modeLabels[mode] || { label: 'Dowody kliniczne', color: 'bg-slate-100 text-slate-800 border-slate-300' }) : {
    label: claimItem ? `${claimItem.origin} · ${claimItem.level}` : 'EBM',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  };

  const displayLabel = label || (claimItem ? claimItem.claimLabel : current.label);

  const handleClick = onClick || (inspector ? () => inspector.openEvidence(claimKey, mode) : undefined);

  if (handleClick) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${current.color} hover:opacity-80 transition-opacity cursor-pointer shadow-xs`}
        title="Kliknij, aby otworzyć Evidence Inspector i poznać źródła oraz ograniczenia modelu"
      >
        <span>{displayLabel}</span>
        <ExternalLink size={12} className="opacity-70" />
      </button>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${current.color}`}
    >
      <span>{displayLabel}</span>
    </span>
  );
}
