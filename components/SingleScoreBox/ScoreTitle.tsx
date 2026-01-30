import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  txtFormat?: 'uppercase' | 'capitalize';
}

export default function ScoreTitle({
  children,
  txtFormat = 'capitalize',
}: Props) {
  return <div className={`text-my-neutral-400 ${txtFormat}`}>{children}</div>;
}
