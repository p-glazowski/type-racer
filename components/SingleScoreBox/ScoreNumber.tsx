import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ScoreNumber({ children }: Props) {
  return <div className="font-bold text-xl">{children}</div>;
}
