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
import { useState } from 'react';

export default function Page() {
  const [wordNow, setWordNow] = useState(0);
  const letters = 'qwertyuiopasdfghjklzxcvbnm,. ';
  const [typedLetters, setTypedLetters] = useState<string>();
  console.log(typedLetters);
  const text =
    'Hello, my name is Peter and I live in Warsaw. I like programming and video games.';

  const writtenText = text.split('');
  const wordtestx = [
    { id: 0, typed: true, correct: true, letter: 'L' },
    { id: 1, typed: true, correct: false, letter: 'o' },
    { id: 2, typed: false, correct: true, letter: 'L' },
  ];

  let id = 0;

  const wordTest = text.split('').map((letter) => {
    return { id: id++, typed: false, correct: false, letter: letter };
  });

  //EVERY TEXT CHANGED INTO ARRAY WITH OBJECT WITH EACH LETTER ABOVE, WE SHOW THE TEXT AND HAVE FUNCTION THAT CHECKS IF OUR TYPED OBJECT WITH ID SAME AND THE SAME LETTER IS IN THE SAME POSITION MAYBE?

  function pressDown(e) {
    if (e.key === 'Backspace') {
      setWordNow((pS) => (pS === 0 ? pS : pS - 1));
    }

    if (letters.split('').includes(e.key)) {
      setWordNow((pS) => pS + 1);
    }
  }

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
      {/* 
      <TextField>
        {wordTest.map((letter) => (
          <span
            key={letter.id}
            className={`${letter.typed ? (letter.correct ? 'text-my-green-500' : 'text-my-red-500') : 'text-my-neutral-400'} ${wordNow >= letter.id && !letter.typed ? 'bg-my-neutral-400/30' : ''} text-2xl`}
          >
            {letter.letter}
          </span>
        ))}
      </TextField> */}
      <div className="flex-1 relative">
        <div className="absolute left-6 right-6 top-4">
          {' '}
          {wordTest.map((letter) => (
            <span
              key={letter.id}
              className={`${letter.typed ? (letter.correct ? 'text-my-green-500' : 'text-my-red-500') : 'text-my-neutral-400'} ${wordNow >= letter.id && !letter.typed ? 'bg-my-neutral-400/30' : ''} text-2xl`}
            >
              {letter.letter}
            </span>
          ))}
        </div>
        <input
          className="w-full text-black border-white  bg-white border"
          onChange={(e) => {
            setTypedLetters((pS) => e.target.value);
          }}
        ></input>
      </div>
    </main>
  );
}
