import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function TopContainer({ children }: Props) {
  return (
    <div className="p-6 flex flex-col gap-3 pb-0">
      {children}
      <div className="border-b border-my-neutral-500/50"></div>
    </div>
  );
}
