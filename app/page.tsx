'use client';

import TopContainer from '@/components/TopContainer';
import Scores from '@/components/Scores';
import ScoreBox from '@/components/SingleScoreBox/ScoreBox';
import ScoreNumber from '@/components/SingleScoreBox/ScoreNumber';
import ScoreTitle from '@/components/SingleScoreBox/ScoreTitle';
import OptionContainer from '@/components/OptionContainer';
import InputSelect from '@/components/Inputs/InputSelect';
import Select from '@/components/Inputs/Option';
import Option from '@/components/Inputs/Option';
import TextField from '@/components/TextField';
import { Span } from 'next/dist/trace';

export default function Page() {
  const text =
    'Hello, my name is Peter and I live in Warsaw. I like programming and video games.';

  const writtenText = text.split('');
  const wordtest = [
    { id: 0, typed: true, correct: true, letter: 'L' },
    { id: 1, typed: true, correct: false, letter: 'o' },
    { id: 2, typed: false, correct: true, letter: 'L' },
  ];

  //EVERY TEXT CHANGED INTO ARRAY WITH OBJECT WITH EACH LETTER ABOVE, WE SHOW THE TEXT AND HAVE FUNCTION THAT CHECKS IF OUR TYPED OBJECT WITH ID SAME AND THE SAME LETTER IS IN THE SAME POSITION MAYBE?

  console.log(writtenText);

  return (
    <main className="flex flex-col flex-1">
      <TopContainer>
        <Scores>
          <ScoreBox>
            <ScoreTitle txtFormat="uppercase">wpm:</ScoreTitle>
            <ScoreNumber>40</ScoreNumber>
          </ScoreBox>
          <ScoreBox borders={true}>
            <ScoreTitle>Accuracy:</ScoreTitle>
            <ScoreNumber>90%</ScoreNumber>
          </ScoreBox>
          <ScoreBox>
            <ScoreTitle>Time:</ScoreTitle>
            <ScoreNumber>0:46</ScoreNumber>
          </ScoreBox>
        </Scores>
        <OptionContainer>
          <InputSelect id="level">
            <Option value="easy">Easy</Option>
            <Option value="med">Medium</Option>
            <Option value="hard">Hard</Option>
          </InputSelect>
          <InputSelect id="time">
            <Option value="timed">Timed(60s)</Option>
            <Option value="best">Best</Option>
            <Option value="practice">Practice</Option>
          </InputSelect>
        </OptionContainer>
      </TopContainer>
      <div>
        {wordtest.map((letter) => (
          <span
            key={letter.id}
            className={`${letter.typed ? (letter.correct ? 'text-my-green-500' : 'text-my-red-500') : 'text-my-neutral-400'}`}
          >
            {letter.letter}
          </span>
        ))}
      </div>
      <TextField>{text}</TextField>
    </main>
  );
}
