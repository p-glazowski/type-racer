import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function TopContainer({ children }: Props) {
  return (
    <div className="py-6 flex flex-col gap-3 pb-2 md:flex-row md:justify-between">
      {children}
    </div>
  );
}
