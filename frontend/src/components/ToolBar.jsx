const ToolBar = ({
  wpmSpeed,
  accuracy,
  time,
  difficulty,
  setDifficulty,
  mode,
  setMode,
  start,
}) => {
  return (
    <div className="lg:flex justify-between items-center">
      {/* Status Section */}
      <div className="flex items-center gap-6 xl:gap-6 justify-center pb-3 lg:pb-0">
        <div>
          <h1 className="border-r border-neutral-600 pr-6 xl:pr-6">
            <span className="text-neutral-500 text-sm">WPM: </span> {wpmSpeed}
          </h1>
        </div>
        <div>
          <h1 className="border-r border-neutral-600 pr-6 xl:pr-6">
            <span className="text-neutral-500 text-sm">Accuracy: </span>
            {accuracy}%
          </h1>
        </div>
        <div>
          <h1>
            <span className="text-neutral-500 text-sm">Time: </span> 0:
            {time < 10 ? `0${time}` : time}
          </h1>
        </div>
      </div>

      {/* Controlls Section */}
      <div className="flex items-center justify-between gap-2 xl:gap-4">
        {/* Difficulty */}
        <div className="flex items-center gap-2 lg:border-r border-neutral-500 pr-4 xl:pr-6">
          <h1 className="text-neutral-500 text-[14px] xl:text-base">
            Difficulty:
          </h1>

          <button
            disabled={start}
            onClick={() => setDifficulty("easy")}
            className={`border-2 rounded-md px-2.5 py-0.5 cursor-pointer transition-all duration-300 ${difficulty === "easy" ? "text-cblue-600 border-cblue-600" : "border-neutral-600 hover:text-cblue-600 hover:border-cblue-600 disabled:text-neutral-500 disabled:border-neutral-500"} text-[10px] xl:text-base`}
          >
            Easy
          </button>
          <button
            disabled={start}
            onClick={() => setDifficulty("medium")}
            className={`border-2 rounded-md px-2.5 py-0.5 cursor-pointer transition-all duration-300 ${difficulty === "medium" ? "text-cblue-600 border-cblue-600" : "border-neutral-600 hover:text-cblue-600 hover:border-cblue-600 disabled:text-neutral-500 disabled:border-neutral-500"} text-[10px] xl:text-base`}
          >
            Medium
          </button>
          <button
            disabled={start}
            onClick={() => setDifficulty("hard")}
            className={`border-2 rounded-md px-2.5 py-0.5 cursor-pointer transition-all duration-300 ${difficulty === "hard" ? "text-cblue-600 border-cblue-600" : "border-neutral-600 hover:text-cblue-600 hover:border-cblue-600 disabled:text-neutral-500 disabled:border-neutral-500"} text-[10px] xl:text-base`}
          >
            Hard
          </button>
        </div>

        {/* Mode */}
        <div className="flex items-center gap-2">
          <h1 className="text-neutral-500 text-[14px] xl:text-base">Mode: </h1>

          <button
            disabled={start}
            onClick={() => setMode("timed")}
            className={`border-2 rounded-md px-2.5 py-0.5 cursor-pointer transition-all duration-300 ${mode === "timed" ? "text-cblue-600 border-cblue-600" : "border-neutral-600 hover:text-cblue-600 hover:border-cblue-600 disabled:text-neutral-500 disabled:border-neutral-500"} text-[10px] xl:text-base`}
          >
            Timed (60s)
          </button>
          <button
            disabled={start}
            onClick={() => setMode("passage")}
            className={`border-2 rounded-md px-2.5 py-0.5 cursor-pointer transition-all duration-300 ${mode === "passage" ? "text-cblue-600 border-cblue-600" : "border-neutral-600 hover:text-cblue-600 hover:border-cblue-600 disabled:text-neutral-500 disabled:border-neutral-500"} text-[10px] xl:text-base`}
          >
            Passage
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
