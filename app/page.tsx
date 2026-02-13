'use client';

import TopContainer from '@/components/TopContainer';
import Scores from '@/components/Scores';
import ScoreBox from '@/components/SingleScoreBox/ScoreBox';
import ScoreNumber from '@/components/SingleScoreBox/ScoreNumber';
import ScoreTitle from '@/components/SingleScoreBox/ScoreTitle';
import OptionContainer from '@/components/OptionContainer';
import InputSelect from '@/components/Inputs/InputSelect';
import { useEffect, useRef, useState } from 'react';
import { texts } from '@/data/texts';
import FinalMsg from '@/components/FinalMsg';
import { useWPMContext } from '@/Context/WPMContext';

export default function Page() {
  const keyboard = 'qwertyuiopasdfghjklzxcvbnm,. ';
  const { changeWPM } = useWPMContext();
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

  const [timePass, setTimePass] = useState(1);
  const words = textSplit.filter((letter) => letter.firstTyped).length;
  const WPM = ((words / 5) * (60 / timePass)).toFixed(0);

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
      changeWPM(WPM);
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
    <main className="flex-1 max-w-300 w-full mx-auto items-center justify-center flex md:block">
      <div className="flex justify-center items-center flex-col h-full gap-2 md:hidden">
        <h2 className="text-2xl text-center font-bold">
          Mobile Word Racer version coming soon... 🏎️
        </h2>
        <p className="text-my-neutral-400">Sorry!</p>
      </div>
      <div className="md:flex flex-col gap-4 px-10 relative hidden">
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
                      <span
                        className={`${timer < 40 ? 'text-yellow-500' : ''}`}
                      >
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
            <div className="border-b border-my-neutral-500/50"></div>
            <p className="text-my-blue-400 h-5">
              {started && WPM === '0' && 'Type to start...'}
            </p>
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
              {/* <div className="h-20  overflow-x-scroll text-nowrap"> */}
              {textSplit.map((letter) => (
                <span
                  key={letter.id}
                  className={`text-2xl ${letter.typed ? (letter.correct ? 'text-my-green-500' : 'text-my-red-500 bg-my-red-500/50') : 'text-my-neutral-400'} ${letter.id === letterNumber ? 'bg-my-neutral-400/40' : ''} ${letter.letter === ' ' ? 'px-1 mx-1' : ''}`}
                >
                  {letter.letter}
                </span>
              ))}
            </div>
            {/* </div> */}
          </>
        )}
        {started && !gameOver && (
          <div className="flex justify-center mt-10">
            <button
              className="bg-my-blue-600 font-bold px-8 py-2 rounded-md mb-15"
              onClick={resetGame}
            >
              Reset
            </button>
          </div>
        )}
        {/*       <div className="flex gap-2 flex-wrap justify-center mt-10">
        {keyboard.split('').map((key) => (
          <div
            key={key}
            className="border w-12 h-12 grid place-items-center uppercase"
          >
            {key}
          </div>
        ))}
      </div> */}
      </div>
    </main>
  );
}

// TO DO:
// ACCU SHOULD STILL GO DOWN IF WE TYPE THE WRONG LETTER MULTIPLE TIMES
