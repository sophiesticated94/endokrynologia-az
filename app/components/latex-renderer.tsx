'use client';
import React, { useMemo } from 'react';
import katex from 'katex';
import { GlossaryText } from '../glossary-components';

interface LatexProps {
  math: string;
  displayMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Latex({ math, displayMode = false, className = '', style }: LatexProps) {
  const renderedHtml = useMemo(() => {
    if (!math || typeof math !== 'string') return '';
    try {
      return katex.renderToString(math.trim(), {
        displayMode,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch {
      return '';
    }
  }, [math, displayMode]);

  if (!renderedHtml) {
    return (
      <code
        className={`font-mono text-xs px-1 py-0.5 rounded bg-slate-100 text-slate-800 ${className}`}
        style={style}
      >
        {math}
      </code>
    );
  }

  return (
    <span
      className={`katex-wrapper ${displayMode ? 'katex-display-block block text-center my-2 overflow-x-auto py-1' : 'inline-math inline'} ${className}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}

interface FormattedMathTextProps {
  text: string;
  className?: string;
  enableGlossary?: boolean;
}

/**
 * Parsuje tekst zawierający wzory matematyczne w notacji:
 * - Blokowe: $$wzór$$
 * - Liniowe: $wzór$
 * Pomiędzy wzorami tekst może być automatycznie wzbogacany o definicje ze słowniczka (GlossaryText).
 */
export function FormattedMathText({
  text,
  className = '',
  enableGlossary = true,
}: FormattedMathTextProps) {
  // Dzielimy tekst według bloków $$...$$ oraz $...$
  // Używamy grupy przechwytującej, aby zachować dopasowania w tablicy wynikowej
  const parts = useMemo(() => {
    const regex = /(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$)/g;
    return text.split(regex);
  }, [text]);

  if (!text) return null;

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;

        // Blokowe display math: $$...$$
        if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
          const math = part.slice(2, -2).trim();
          return <Latex key={index} math={math} displayMode />;
        }

        // Liniowe inline math: $...$
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const math = part.slice(1, -1).trim();
          return <Latex key={index} math={math} displayMode={false} />;
        }

        // Zwykły tekst - przepuszczamy przez GlossaryText lub renderujemy bezpośrednio
        if (enableGlossary) {
          return <GlossaryText key={index} text={part} />;
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
