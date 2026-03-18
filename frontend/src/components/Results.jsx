import React from "react";
import completed from "../assets/images/icon-completed.svg";
import { CircleCheck, RotateCcw } from "lucide-react";

const Results = ({ wpmSpeed, accuracy, characters, restartTest, getTotalAttemptedChars }) => {
  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <CircleCheck
        size={52}
        className="bg-cgreen-500 rounded-2xl shadow-[0px_0px_2px_3px_#16a34a,0px_0px_8px_6px_#16a34a5c]"
      />

      <h1 className="text-4xl font-bold mt-8 mb-0.5">Baseline Established!</h1>
      <p className="text-sm text-neutral-500">
        You ̓ ve set the bar. Now the real challange begin--time to beat it.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center rounded-lg border border-neutral-500 px-9 py-3">
          <h3 className="text-neutral-500">WPM</h3>
          <h1>{wpmSpeed}</h1>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-neutral-500 px-9 py-3">
          <h3 className="text-neutral-500">Accuracy</h3>
          <h1 className="text-cred-500">{accuracy}%</h1>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-neutral-500 px-9 py-3">
          <h3 className="text-neutral-500">Characters</h3>
          <h1>
            <span className="text-cgreen-500 font-bold">{characters}</span>
            <span className="font-bold text-neutral-500">/</span>
            <span className="text-cred-500 font-bold">{getTotalAttemptedChars}</span>
          </h1>
        </div>
      </div>

      <button onClick={() => restartTest()} className="flex items-center mt-12 cursor-pointer bg-neutral-100 hover:bg-neutral-300 transition-all duration-300 text-neutral-900 font-medium px-3 py-2.5 rounded-xl hover:*:-rotate-32">
        Beat This Score <RotateCcw className="ml-2 transition-all duration-300" />
      </button>
    </div>
  );
};

export default Results;
