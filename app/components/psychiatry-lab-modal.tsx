'use client';
import { useEffect } from 'react';
import { Sliders, X, Maximize2 } from 'lucide-react';
import { getPsychiatryPreset } from '@/lib/psychiatry/presets';
import { PsychiatryCommandCenter } from '../psychiatry-command-center';

export function PsychiatryLabModal({
  presetId,
  onClose,
  onOpenFullScreen,
}: {
  presetId: string | null;
  onClose: () => void;
  onOpenFullScreen?: () => void;
}) {
  const preset = presetId ? getPsychiatryPreset(presetId) : undefined;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Pasek nagłówka */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-3">
            <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm shrink-0">
              <Sliders size={18} />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-slate-900 text-base sm:text-lg leading-tight truncate">
                {preset ? preset.title : 'Pracownia kliniczna (Psychiatry Command Center)'}
              </h2>
              <p className="text-xs text-slate-500 truncate">
                {preset ? preset.patientSummary : 'Eksploracja przypadku bez opuszczania lekcji'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenFullScreen && (
              <button
                type="button"
                onClick={onOpenFullScreen}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
                title="Otwórz pracownię w pełnym widoku"
              >
                <Maximize2 size={13} />
                <span>Pełny ekran</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Zamknij pracownię"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Ciało z Command Center */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          <PsychiatryCommandCenter initialPresetId={presetId || undefined} />
        </div>
      </div>
    </div>
  );
}
