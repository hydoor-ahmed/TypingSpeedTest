import { useEffect, useState } from "react";
import Header from "./components/Header";
import ToolBar from "./components/ToolBar";
import WordsSection from "./components/WordsSection";
import wordlist from "./assets/json/wordlist.json";
import Results from "./components/Results";

function App() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [results, setResults] = useState([]);

  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("timed");
  const [start, setStart] = useState(false);
  const [typingInput, setTypingInput] = useState("");

  // * Results
  const [lastWpm, setLastWpm] = useState(0);
  const [wpmSpeed, setWpmSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [characters, setCharacters] = useState(0);

  // * Timer
  const [timeLeft, setTimeLeft] = useState(60); // * Default 60sec
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timer;
    if (start && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsFinished(true);
      setStart(false);
      clearInterval(timer);

      const finalWPM = calcWPM();
      setLastWpm(finalWPM);
      localStorage.setItem("lastWpm", finalWPM);
    }

    return () => clearInterval(timer);
  }, [start, timeLeft]);

  // * Restart Test
  const restartTest = () => {
    setTimeLeft(60);
    setIsFinished(false);
    setStart(false);
    setTypingInput("");
    setActiveWordIndex(0);
    setResults([]);
  };

  // * WPM & Accuracy & Characters Calculation
  const calcWPM = () => {
    if (timeLeft === 60) return 0;

    const correctChars = results.reduce((acc, isCorrect, index) => {
      if (isCorrect) {
        const word = wordlist[difficulty][index];
        return acc + word.length + 1; // * 1 For Space Between Words
      }
      return acc;
    }, 0);

    const timeSpentMin = (60 - timeLeft) / 60;
    return Math.round(correctChars / 5 / timeSpentMin) || 0;
  };

  const calcAccuracy = () => {
    if (results.length === 0) return 100;
    const correctWords = results.filter(Boolean).length;
    return Math.round((correctWords / results.length) * 100);
  };

  const calcCharacters = () => {
    return results.reduce((acc, isCorrect, index) => {
      if (isCorrect) {
        const word = wordlist[difficulty][index];
        return acc + word.length + 1;
      }
      return acc;
    }, 0);
  }

  const getTotalAttemptedChars = () => {
    return results.reduce((acc, _, index) => {
      const word = wordlist[difficulty][index];
      return acc + word.length + 1;
    }, 0);
  };

  // * Word Check Function
  const checkedWord = (value) => {
    // * Space
    if (value.endsWith(" ")) {
      const trimmedValue = value.trim();
      const currentWord = wordlist[difficulty][activeWordIndex];

      const isCorrect = trimmedValue === currentWord;

      setResults((prev) => [...prev, isCorrect]);
      setActiveWordIndex((prev) => prev + 1);

      setTypingInput("");

    } else {
      setTypingInput(value);
    }
  };

  // * Get Last WPM When Page is Open
  useEffect(() => {
    const storedWpm = localStorage.getItem("lastWpm");

    if (storedWpm) {
      setLastWpm(Number(storedWpm));
    }
  }, []);

  return (
    <div className="container px-8 mx-auto flex flex-col h-screen overflow-hidden">
      <Header personalBestWpm={lastWpm} />

      {!isFinished ? (
        <>
          <ToolBar
            wpmSpeed={calcWPM()}
            accuracy={calcAccuracy()}
            time={timeLeft}
            restartTest={restartTest}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            mode={mode}
            setMode={setMode}
            start={start}
          />
          <WordsSection
            start={start}
            setStart={setStart}
            difficulty={difficulty}
            typingInput={typingInput}
            checkedWord={checkedWord}
            activeWordIndex={activeWordIndex}
            results={results}
          />
        </>
      ) : (
        <Results
          wpmSpeed={calcWPM()}
          accuracy={calcAccuracy()}
          characters={calcCharacters()}
          restartTest={restartTest}
          getTotalAttemptedChars={getTotalAttemptedChars()}
        />
      )}
    </div>
  );
}

export default App;
