import { useEffect, useLayoutEffect, useRef, useState } from "react";
import wordlist from "../assets/json/wordlist.json";

const WordsSection = ({
  start,
  setStart,
  difficulty,
  typingInput,
  checkedWord,
  activeWordIndex,
  results,
}) => {
  const ref = useRef(null);
  const [caretPos, setCaretPos] = useState({ top: 0, left: 0 });
  const activeCharRef = useRef(null);
  const containerRef = useRef(null);

  const handleKeepFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  useLayoutEffect(() => {
    if (start && activeCharRef.current && containerRef.current) {
      const charRect = activeCharRef.current.getBoundingClientRect();
      const contRect = containerRef.current.getBoundingClientRect();

      const newTop = charRect.top - contRect.top + 8;
      const newLeft = charRect.left - contRect.left;

      if (newTop >= 0 && newLeft >= 0) {
        setCaretPos({ top: newTop, left: newLeft });
      }
    }
  }, [typingInput, activeWordIndex, start]);

  useEffect(() => {
    if (start && ref.current) {
      ref.current.focus();
    }
  }, [start]);

  return (
    <div
      ref={containerRef}
      onClick={handleKeepFocus}
      className="mt-6 relative flex flex-col flex-1 p-2 cursor-text border border-transparent"
    >
      {!start && (
        <div
          onClick={() => setStart(true)}
          className="absolute top-0 left-0 w-full h-full bg-neutral-900/10 backdrop-blur-[3px] z-30 flex flex-col gap-y-3 justify-center items-center cursor-pointer"
        >
          <button className="bg-cblue-600 hover:bg-cblue-400 transition-all duration-300 px-4 py-2 rounded-md cursor-pointer text-white">
            Start Typing Test
          </button>
          <p className="text-sm text-white">
            Or click the text and start typing
          </p>
        </div>
      )}

      {start && caretPos.top > 0 && (
        <div
          className="caret-smooth absolute w-[2px] h-[1.2em] bg-cblue-600 animate-pulse z-20 pointer-events-none"
          style={{
            top: caretPos.top,
            left: caretPos.left,
            transition: "all 0.1s linear",
          }}
        />
      )}

      <div className="px-0.5 max-w-full text-2xl leading-relaxed flex flex-wrap">
        {wordlist[difficulty].map((word, wIdx) => {
          const isActive = wIdx === activeWordIndex;

          let colorClass = "text-neutral-500";
          if (isActive) {
            colorClass = "text-white";
          } else if (results[wIdx] === true) {
            colorClass = "text-green-500";
          } else if (results[wIdx] === false) {
            colorClass = "text-red-500";
          }

          return (
            <span
              key={wIdx}
              className={`mx-1.5 relative inline-block ${colorClass}`}
            >
              {isActive ? (
                word.split("").map((char, cIdx) => (
                  <span
                    key={cIdx}
                    ref={cIdx === typingInput.length ? activeCharRef : null}
                    className={
                      cIdx < typingInput.length
                        ? "text-white"
                        : "text-neutral-500"
                    }
                  >
                    {char}
                  </span>
                ))
              ) : (
                <span>{word}</span>
              )}

              {isActive && typingInput.length >= word.length && (
                <span ref={activeCharRef} className="bsolute right-[-4px] top-0 w-1 h-full" />
              )}
            </span>
          );
        })}
      </div>

      <div className="flex justify-center items-center mt-auto mb-12">
        <input
          ref={ref}
          onChange={(e) => checkedWord(e.target.value)}
          value={typingInput}
          type="password"
          onBlur={handleKeepFocus}
          className="opacity-0 absolute inset-0 w-full h-full cursor-default z-0"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default WordsSection;
