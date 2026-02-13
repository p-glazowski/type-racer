'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface WPMContextProps {
  children: ReactNode;
}

interface MyContext {
  globalWPM: string;
  changeWPM: (WPM: string) => void;
}

const ContextTheme = createContext<MyContext | undefined>(undefined);

export default function WPMContext({ children }: WPMContextProps) {
  const [globalWPM, setGlobalWPM] = useState('');

  function changeWPM(WPM: string) {
    if (Number(globalWPM) > Number(WPM)) {
      return;
    }
    setGlobalWPM(WPM);

    return;
  }
  return (
    <ContextTheme.Provider value={{ globalWPM, changeWPM }}>
      {children}
    </ContextTheme.Provider>
  );
}

export function useWPMContext() {
  const context = useContext(ContextTheme);
  if (!context) throw new Error('this component needs WPMContext Provider');
  return context;
}
