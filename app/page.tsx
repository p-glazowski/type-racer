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
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const [game, setGame] = useState(false);
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

  const textRef = useRef(null);

  useEffect(() => {
    const startTime = Date.now() / 1000;
    const gameTime = 60;

    if (!game) return;

    const id = setInterval(() => {
      const currentTime = Date.now();
      const timePassed = Math.floor(currentTime / 1000 - startTime).toFixed(0);
      setTimePass(Number(timePassed));

      const timer = gameTime - Number(timePassed);
      if (timer === 0) {
        setGame(false);
        setTimer(0);
        console.log('END!');
        return;
      }

      setTimer(timer);
    }, 1000);

    return () => clearInterval(id);
  }, [game]);

  const [timer, setTimer] = useState(60);

  // WPM = (characters_typed / 5) * (60 / time_in_seconds)

  const [timePass, setTimePass] = useState(1);
  const words = textSplit.filter((letter) => letter.firstTyped).length;
  const WPM = ((words / 5) * (60 / timePass)).toFixed(0);

  return (
    <main className="flex flex-col flex-1">
      <TopContainer>
        <Scores>
          <ScoreBox>
            <ScoreTitle txtFormat="uppercase">wpm:</ScoreTitle>
            <ScoreNumber>{WPM}</ScoreNumber>
          </ScoreBox>
          <ScoreBox borders={true}>
            <ScoreTitle>Accuracy:</ScoreTitle>
            <ScoreNumber>{accu === 'NaN' ? '100' : accu}%</ScoreNumber>
          </ScoreBox>
          <ScoreBox>
            <ScoreTitle>Time:</ScoreTitle>
            <ScoreNumber>0:{timer < 10 ? `0${timer}` : timer}</ScoreNumber>
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
      <button
        className="px-6 py-1 bg-red-500"
        onClick={() => {
          textRef.current.focus();
          setGame((pS) => !pS);
        }}
      >
        CLICK
      </button>

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
          ref={textRef}
          onKeyDown={(e) => {
            handleKeys(e);
          }}
        ></textarea>
      </div>
    </main>
  );
}

// TO DO:
// ACCU SHOULD STILL GO DOWN IF WE TYPE THE WRONG LETTER MULTIPLE TIMES
