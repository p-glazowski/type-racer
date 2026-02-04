'use client';

import { ReactNode } from 'react';
import { createContext } from 'vm';

interface WPMContextProps {
  children: ReactNode;
}

interface ContextProps {
  WPM: number;
}

const MyContext = createContext<ContextProps | null>(null);

export default function WPMContext({ children }: WPMContextProps) {
  return <MyContext.Provider>{children}</MyContext.Provider>;
}
