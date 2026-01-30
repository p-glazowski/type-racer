import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  id: string;
}

export default function InputSelect({ children, id }: Props) {
  return (
    <div className="border rounded-md flex-1 flex justify-center py-0.5 border-my-neutral-400/60">
      <label htmlFor={id}>
        <select name={id} id={id}>
          {children}
        </select>
      </label>
    </div>
  );
}
