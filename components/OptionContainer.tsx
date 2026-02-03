import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function OptionContainer({ children }: Props) {
  return (
    <div className="flex flex-row gap-2 md:justify-end w-full">{children}</div>
  );
}
