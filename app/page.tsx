'use client';

import TopContainer from '@/components/TopContainer';
import Scores from '@/components/Scores';
import ScoreBox from '@/components/SingleScoreBox/ScoreBox';
import ScoreNumber from '@/components/SingleScoreBox/ScoreNumber';
import ScoreTitle from '@/components/SingleScoreBox/ScoreTitle';
import OptionContainer from '@/components/OptionContainer';
import InputSelect from '@/components/Inputs/InputSelect';
import Option from '@/components/Inputs/Option';
import { useEffect, useRef, useState } from 'react';
import { texts } from '@/data/texts';
import FinalMsg from '@/components/FinalMsg';

export default function Page() {
  const [level, setLevel] = useState({ level: 'easy', number: 0 });
  const importedTexts = texts;
  let id = 0;
  const splitText = importedTexts[level.number].text.split('').map((letter) => {
    return {
      id: id++,
      typed: false,
      correct: false,
      letter: letter,
      firstTyped: false,
      firstMistake: false,
    };
  });
  const [topScore, setTopScore] = useState(0);

  const [started, setStarted] = useState(false);
  const [game, setGame] = useState(false);
  const [timer, setTimer] = useState(60);
  const [letterNumber, setLetterNumber] = useState(0);

  const [textSplit, setTextSplit] = useState(splitText);

  const gameOver =
    (started && textSplit.every((letter) => letter.typed)) || timer === 0;

  const accu = (
    (textSplit.filter((letter) => !letter.firstMistake && letter.typed).length /
      textSplit.filter((letter) => letter.firstTyped).length) *
    100
  ).toFixed(0);

  function handleKeys(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Shift') {
      return;
    }

    setGame(true);

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

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startTime = Date.now() / 1000;
    const gameTime = 60;

    if (!game) return;

    if (gameOver) {
      setGame(false);
      return;
    }

    const id = setInterval(() => {
      const currentTime = Date.now();
      const timePassed = Math.floor(currentTime / 1000 - startTime).toFixed(0);
      setTimePass(Number(timePassed));

      const timer = gameTime - Number(timePassed);

      setTimer(timer);
    }, 1000);

    return () => clearInterval(id);
  }, [game, gameOver]);

  // WPM = (characters_typed / 5) * (60 / time_in_seconds)

  const [timePass, setTimePass] = useState(1);
  const words = textSplit.filter((letter) => letter.firstTyped).length;
  const WPM = ((words / 5) * (60 / timePass)).toFixed(0);

  useEffect(() => {
    if (started && textRef.current) {
      textRef.current.focus();
    }
  }, [started]);

  function resetGame() {
    setGame(false);
    setStarted(false);
    setTimer(60);
    setLetterNumber(0);
    id = 0;
    setTextSplit(
      importedTexts[level.number].text.split('').map((letter) => {
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
  }

  function changeLevel(levelObject: { level: string; number: number }) {
    setLevel(levelObject);
  }

  useEffect(() => {
    resetGame();
  }, [level]);

  return (
    <main className="flex-1 max-w-300 w-full mx-auto flex flex-col gap-4 px-10 relative">
      {gameOver && (
        <FinalMsg wpm={WPM} acc={accu} timer={timer} resetGame={resetGame} />
      )}
      {!gameOver && (
        <>
          {' '}
          <TopContainer>
            <Scores>
              <ScoreBox>
                <ScoreTitle txtFormat="uppercase">wpm:</ScoreTitle>
                <ScoreNumber>{WPM}</ScoreNumber>
              </ScoreBox>
              <ScoreBox borders={true}>
                <ScoreTitle>Accuracy:</ScoreTitle>
                <ScoreNumber>
                  {accu === 'NaN' ? (
                    '100%'
                  ) : (
                    <span
                      className={`${Number(accu) < 90 ? 'text-yellow-500' : 'text-green-500'}`}
                    >
                      {accu}%
                    </span>
                  )}
                </ScoreNumber>
              </ScoreBox>
              <ScoreBox>
                <ScoreTitle>Time:</ScoreTitle>
                <ScoreNumber>
                  {timer < 10 ? (
                    <span className="text-red-500">0:0{timer}</span>
                  ) : (
                    <span className={`${timer < 40 ? 'text-yellow-500' : ''}`}>
                      0:{timer}
                    </span>
                  )}
                </ScoreNumber>
              </ScoreBox>
            </Scores>
            <OptionContainer>
              <InputSelect
                id="level"
                changeLevel={changeLevel}
                value={level.level}
              />
            </OptionContainer>
          </TopContainer>
          <div className="border-b border-my-neutral-500/50 mb-2"></div>
          <div
            className="relative px-6 bg-gray-500/5 py-10 rounded-md outline-0"
            tabIndex={1}
            ref={textRef}
            onKeyDown={(e) => {
              if (gameOver) return;
              if (started) {
                handleKeys(e);
              }
            }}
          >
            {!started && (
              <>
                <div className=" absolute inset-0 z-10 backdrop-blur-xs rounded-md"></div>
                <button
                  className="bg-my-blue-600 z-20 absolute top-1/2 left-1/2 -translate-1/2 px-6 py-2 shadow-[0px_0px_20px_0px] shadow-my-blue-600 font-bold text-2xl rounded-md cursor-pointer hover:shadow-[0px_0px_40px_0px]"
                  onClick={() => {
                    setStarted(true);
                  }}
                >
                  Start test
                </button>
              </>
            )}
            {textSplit.map((letter) => (
              <span
                key={letter.id}
                className={`text-2xl ${letter.typed ? (letter.correct ? 'text-my-green-500' : 'text-my-red-500 bg-my-red-500/50') : 'text-my-neutral-400'} ${letter.id === letterNumber ? 'bg-my-neutral-400/40' : ''} ${letter.letter === ' ' ? 'px-1 mx-1' : ''}`}
              >
                {letter.letter}
              </span>
            ))}
          </div>
        </>
      )}
      {/*      <div className="px-6 mt-10 bg-my-neutral-800 py-10 rounded-md flex flex-col gap-4 z-40">
        <p className="text-center text-my-green-500">
          Congratz, you passed the test!
        </p>
        <h2 className="text-center text-2xl font-bold">Your results</h2>
        <div className="grid grid-cols-3 text-center mt-10">
          <div className="flex flex-col gap-1">
            <h3 className="">WPM:</h3>
            <p className="font-bold">{WPM}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="">Accuracy:</h3>
            <p className="font-bold">{accu}%</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="">Time left:</h3>
            <p className="font-bold">
              {timer < 10 ? `0:0${timer}` : `0:${timer}`}
            </p>
          </div>
        </div>
      </div> */}
    </main>
  );
}

// TO DO:
// ACCU SHOULD STILL GO DOWN IF WE TYPE THE WRONG LETTER MULTIPLE TIMES
