'use client';
import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';
import { getMicroCase } from '@/lib/psychiatry/micro-cases';

export function MicroCaseCard({ caseId }: { caseId: string }) {
  const microCase = getMicroCase(caseId);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setRevealed(true);
  };

  const handleReset = () => {
    setSelectedIdx(null);
    setRevealed(false);
  };

  return (
    <div className="micro-case-card my-4 p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 shadow-xs space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-indigo-900 font-semibold text-xs uppercase tracking-wider">
          <HelpCircle size={15} className="text-indigo-600" />
          <span>Mikro-przypadek decyzyjny</span>
        </div>
        {revealed && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <RotateCcw size={12} />
            <span>Resetuj</span>
          </button>
        )}
      </div>

      <div className="font-semibold text-sm text-slate-900">{microCase.title}</div>
      <div className="p-3 bg-white rounded-lg border border-indigo-100 text-xs text-slate-700 leading-relaxed">
        {microCase.vignette}
      </div>

      <div className="text-xs font-semibold text-slate-800">{microCase.question}</div>

      <div className="space-y-1.5">
        {microCase.options.map((opt, idx) => {
          const isSelected = selectedIdx === idx;
          const isCorrect = idx === microCase.answer;
          let btnClass = 'w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-start justify-between gap-2 ';

          if (!revealed) {
            btnClass += 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-800';
          } else if (isCorrect) {
            btnClass += 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
          } else if (isSelected && !isCorrect) {
            btnClass += 'border-rose-400 bg-rose-50 text-rose-950';
          } else {
            btnClass += 'border-slate-200 bg-white text-slate-500 opacity-60';
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={revealed}
              onClick={() => handleSelect(idx)}
              className={btnClass}
            >
              <span>{opt}</span>
              {revealed && isCorrect && <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />}
              {revealed && isSelected && !isCorrect && <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />}
            </button>
          );
        })}
      </div>

      {revealed && selectedIdx !== null && (
        <div
          className={`p-3 rounded-lg border text-xs leading-relaxed ${
            selectedIdx === microCase.answer
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
              : 'bg-rose-50/80 border-rose-300 text-rose-900'
          }`}
        >
          <strong>Uzasadnienie:</strong> {microCase.rationales[selectedIdx]}
        </div>
      )}
    </div>
  );
}
