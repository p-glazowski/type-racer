interface FinalMsgProps {
  wpm: string;
  acc: string;
  timer: number;
  resetGame: () => void;
}

export default function FinalMsg({
  wpm,
  acc,
  timer,
  resetGame,
}: FinalMsgProps) {
  return (
    <div className="px-6 mt-10 bg-my-neutral-800 py-10 rounded-md flex flex-col gap-4 z-40">
      <p className="text-center font-bold">
        {timer === 0 ? (
          <span className="text-my-red-500">
            You failed the test, try again!
          </span>
        ) : (
          <span className="text-my-green-500">
            Congratz, you passed the test!
          </span>
        )}
      </p>
      <h2 className="text-center text-2xl font-bold">Your results</h2>
      <div className="grid grid-cols-3 text-center mt-5">
        <div className="flex flex-col gap-1">
          <h3 className="">WPM:</h3>
          <p
            className={`font-bold text-2xl ${Number(wpm) > 60 ? 'text-green-500' : 'text-yellow-500'}`}
          >
            {wpm}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="">Accuracy:</h3>
          <p
            className={`font-bold text-2xl ${Number(acc) > 98 ? 'text-purple-600' : 'text-green-500'}`}
          >
            {acc}%
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="">Time left:</h3>
          <p
            className={`font-bold text-2xl ${timer === 0 ? 'text-red-500' : 'text-green-500'}`}
          >
            {timer < 10 ? `0:0${timer}` : `0:${timer}`}
          </p>
        </div>
      </div>
      <button
        className="bg-blue-600 py-2 mx-auto px-8 rounded-md mt-5 cursor-pointer hover:shadow-[0px_0px_20px_0px] shadow-blue-500/20 hover:font-bold"
        onClick={resetGame}
      >
        Play again!
      </button>
    </div>
  );
}
