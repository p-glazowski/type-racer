import { ReactNode } from 'react';

interface Props {
  id: string;
  value: string;
  changeLevel?: (levelObject: { level: string; number: number }) => void;
}

export default function InputSelect({
  value,
  id,
  changeLevel = () => {
    return;
  },
}: Props) {
  function getLevelNumber(levelName: string) {
    if (levelName === 'medium') return 4;
    if (levelName === 'hard') return 8;

    return 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    const randomNumber = Math.floor(4 * Math.random());
    const getTextNumber = getLevelNumber(value) + randomNumber;
    changeLevel({ level: value, number: getTextNumber });
  }

  return (
    <div className="border rounded-md flex-1 flex justify-center py-0.5 border-my-neutral-400/60 md:flex-0 px-2">
      <label htmlFor={id}>
        <select
          name={id}
          value={value}
          id={id}
          className="outline-0"
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    </div>
  );
}
