import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function OptionContainer({ children }: Props) {
  return (
    <div className="md:flex flex-row gap-2 md:justify-end">{children}</div>
  );
}
