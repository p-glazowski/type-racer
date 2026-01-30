import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function TextField({ children }: Props) {
  return (
    <div
      className="p-6 text-2xl text-my-neutral-400 border flex-1"
      tabIndex={0}
    >
      {children}
    </div>
  );
}
