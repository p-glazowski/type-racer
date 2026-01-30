import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  value: string;
}

export default function Option({ children, value }: Props) {
  return <option value={value}>{children}</option>;
}
