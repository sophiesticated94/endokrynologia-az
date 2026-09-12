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
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 pb-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Karta modalu - na mobile elegancki bottom-sheet (86vh), widoczne tło lekcji z tyłu */}
      <div
        className="relative bg-white w-full max-w-5xl h-[86vh] max-h-[86vh] sm:h-[88vh] sm:max-h-[88vh] rounded-2xl sm:rounded-3xl flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Pasek nagłówka - zakotwiczony z uchwytem i dużym przyciskiem zamknięcia */}
        <div className="shrink-0 bg-white border-b border-slate-200 px-3.5 sm:px-6 pt-2.5 pb-3">
          {/* Uchwyt dla urządzeń dotykowych */}
          <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-2 sm:hidden" />

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="p-1.5 sm:p-2 bg-indigo-600 text-white rounded-lg shadow-xs shrink-0">
                <Sliders size={16} />
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-slate-900 text-xs sm:text-base leading-tight truncate">
                  {preset ? preset.title : 'Pracownia kliniczna (Command Center)'}
                </h2>
                <p className="text-[10px] sm:text-xs text-slate-500 truncate">
                  {preset ? preset.patientSummary : 'Eksploracja przypadku w oknie lekcji'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {onOpenFullScreen && (
                <button
                  type="button"
                  onClick={onOpenFullScreen}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
                  title="Otwórz pracownię w osobnym pełnym oknie"
                >
                  <Maximize2 size={13} />
                  <span>Pełny ekran</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-slate-900 hover:bg-slate-800 active:bg-black text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer touch-manipulation"
                aria-label="Zamknij pracownię i wróć do lekcji"
              >
                <X size={15} className="stroke-[2.5]" />
                <span>Zamknij</span>
              </button>
            </div>
          </div>
        </div>

        {/* Treść z przewijaniem dotykowym */}
        <div
          className="flex-1 min-h-0 w-full overflow-y-auto overscroll-contain p-3.5 sm:p-6 bg-slate-50/60"
          style={{ WebkitOverflowScrolling: 'touch' }}
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
