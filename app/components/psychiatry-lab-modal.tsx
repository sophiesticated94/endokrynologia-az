'use client';
import { useEffect } from 'react';
import { Sliders, X, Maximize2, ArrowLeft } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/75 sm:backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white w-full h-[100dvh] max-h-[100dvh] sm:h-[90vh] sm:max-h-[90vh] sm:max-w-6xl sm:rounded-2xl flex flex-col shadow-2xl border-0 sm:border sm:border-slate-200 overflow-hidden">
        {/* Pasek nagłówka - zawsze przypięty na górze z obsługą safe-area (notch) */}
        <div
          className="sticky top-0 z-20 flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-slate-200 bg-white shrink-0 shadow-xs"
          style={{ paddingTop: 'max(env(safe-area-inset-top), 10px)' }}
        >
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
            <div className="p-1.5 sm:p-2 bg-indigo-600 text-white rounded-lg shadow-sm shrink-0">
              <Sliders size={16} />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-slate-900 text-sm sm:text-base leading-tight truncate">
                {preset ? preset.title : 'Pracownia kliniczna (Command Center)'}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                {preset ? preset.patientSummary : 'Eksploracja przypadku bez opuszczania lekcji'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenFullScreen && (
              <button
                type="button"
                onClick={onOpenFullScreen}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
                title="Otwórz pracownię w osobnym widoku"
              >
                <Maximize2 size={13} />
                <span>Pełny ekran</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-900 hover:bg-slate-800 active:bg-black text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer touch-manipulation shrink-0"
              aria-label="Zamknij pracownię i wróć do lekcji"
            >
              <X size={16} className="stroke-[2.5]" />
              <span>Zamknij</span>
            </button>
          </div>
        </div>

        {/* Ciało z Command Center z gwarancją niezależnego przewijania na mobile (min-h-0 + WebkitOverflowScrolling) */}
        <div
          className="flex-1 min-h-0 w-full overflow-y-auto overscroll-contain p-3 sm:p-6 bg-slate-50/50"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
        >
          <PsychiatryCommandCenter initialPresetId={presetId || undefined} />

          {/* Dolny przycisk powrotu do lekcji */}
          <div className="mt-8 pt-4 pb-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Przeglądasz przypadek kliniczny w oknie lekcji.
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm cursor-pointer transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Wróć do czytania lekcji</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
