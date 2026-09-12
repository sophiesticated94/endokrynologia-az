'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EvidenceInspectorModal } from './psychiatry-lesson-enhancements';

interface EvidenceInspectorContextValue {
  openEvidence: (claimKey?: string, mode?: string) => void;
  closeEvidence: () => void;
}

const EvidenceInspectorContext = createContext<EvidenceInspectorContextValue | null>(null);

export function useEvidenceInspector() {
  return useContext(EvidenceInspectorContext);
}

export function EvidenceInspectorProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [claimKey, setClaimKey] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState<string | undefined>(undefined);

  const openEvidence = (key?: string, m?: string) => {
    setClaimKey(key);
    setMode(m);
    setIsOpen(true);
  };

  const closeEvidence = () => {
    setIsOpen(false);
    setClaimKey(undefined);
    setMode(undefined);
  };

  return (
    <EvidenceInspectorContext.Provider value={{ openEvidence, closeEvidence }}>
      {children}
      {isOpen && (
        <EvidenceInspectorModal
          claimKey={claimKey}
          mode={mode}
          onClose={closeEvidence}
        />
      )}
    </EvidenceInspectorContext.Provider>
  );
}
