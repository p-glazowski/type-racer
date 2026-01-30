import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  borders?: boolean;
}

export default function ScoreBox({ children, borders = false }: Props) {
  return (
    <div
      className={`${borders ? 'border-x border-my-neutral-400/40' : ''} px-5 text-center`}
    >
      {children}
    </div>
  );
}
