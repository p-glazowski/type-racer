import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Scores({ children }: Props) {
  return (
    <section className="flex flex-row justify-between">{children}</section>
  );
}
