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
import { useEffect, useState } from 'react';

export default function Page() {
  const [letterNumber, setLetterNumber] = useState(0);
  let id = 0;
  const text =
    'Manhattan is the most densely populated and geographically smallest of the five boroughs of New York City. Coextensive with New York County, Manhattan is the smallest county by area in the U.S. state of New York, and one of the smallest in the United States. Located almost entirely on Manhattan Island near the southern tip of the state, Manhattan is centrally located in the Northeast megalopolis and represents the urban core of the New York metropolitan area.';
  const [textSplit, setTextSplit] = useState(
    text.split('').map((letter) => {
      return {
        id: id++,
        typed: false,
        correct: false,
        letter: letter,
        firstTyped: false,
        firstMistake: false,
      };
    }),
  );

  const accu = (
    (textSplit.filter((letter) => !letter.firstMistake && letter.typed).length /
      textSplit.filter((letter) => letter.firstTyped).length) *
    100
  ).toFixed(0);
  console.log(accu === 'NaN' ? 'yes' : 'no');

  function handleKeys(e) {
    if (e.key === 'Shift') {
      return;
    }

    if (letterNumber > 0 && textSplit[letterNumber - 1].correct === false) {
      if (e.key === 'Backspace') {
        setLetterNumber((pS) => (pS === 0 ? 0 : pS - 1));
        setTextSplit((pS) =>
          pS.map((letter) =>
            letter.id === letterNumber - 1
              ? { ...letter, typed: false, correct: false }
              : letter,
          ),
        );
        return;
      }
      return;
    }

    if (e.key === 'Backspace') {
      return;
    }

    if (e.key === textSplit[letterNumber].letter) {
      setTextSplit((pS) =>
        pS.map((letter) =>
          letter.id === letterNumber
            ? { ...letter, correct: true, typed: true, firstTyped: true }
            : letter,
        ),
      );
      setLetterNumber((pS) => pS + 1);
    }

    if (e.key !== textSplit[letterNumber].letter) {
      setTextSplit((pS) =>
        pS.map((letter) =>
          letter.id === letterNumber
            ? {
                ...letter,
                correct: false,
                typed: true,
                firstMistake: true,
                firstTyped: true,
              }
            : letter,
        ),
      );
      setLetterNumber((pS) => pS + 1);
    }
  }

  //EVERY TEXT CHANGED INTO ARRAY WITH OBJECT WITH EACH LETTER ABOVE, WE SHOW THE TEXT AND HAVE FUNCTION THAT CHECKS IF OUR TYPED OBJECT WITH ID SAME AND THE SAME LETTER IS IN THE SAME POSITION MAYBE?

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
            <ScoreNumber>{accu === 'NaN' ? '100' : accu}%</ScoreNumber>
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

      <div className="flex-1 relative flex pt-6">
        <div className="absolute px-6">
          {textSplit.map((letter) => (
            <span
              key={letter.id}
              className={`text-2xl ${letter.typed ? (letter.correct ? 'text-my-green-500' : 'text-my-red-500 bg-my-red-500/50') : 'text-my-neutral-400'} ${letter.id === letterNumber ? 'bg-my-neutral-400/40' : ''} ${letter.letter === ' ' ? 'px-1 mx-1' : ''}`}
            >
              {letter.letter}
            </span>
          ))}
        </div>
        <textarea
          className="w-full z-20 text-transparent"
          spellCheck="false"
          autoCapitalize="off"
          onKeyDown={(e) => {
            handleKeys(e);
          }}
        ></textarea>
      </div>
    </main>
  );
}

{
  /*       {wordTest.map((letter) => (
            <span
              key={letter.id}
              className={`${letter.typed ? (letter.correct ? 'text-my-green-500' : 'text-my-red-500') : 'text-my-neutral-400'} ${wordNow >= letter.id && !letter.typed ? 'bg-my-neutral-400/30' : ''} text-2xl`}
            >
              {letter.letter}
            </span>
          ))} */
}

{
  /* 
      <TextField>
        {wordTest.map((letter) => (
          <span
            key={letter.id}
            className={`${letter.typed ? (letter.correct ? 'text-my-green-500' : 'text-my-red-500') : 'text-my-neutral-400'} ${wordNow >= letter.id && !letter.typed ? 'bg-my-neutral-400/30' : ''} text-2xl`}
          >
            {letter.letter}
          </span>
        ))}
      </TextField> */
}
