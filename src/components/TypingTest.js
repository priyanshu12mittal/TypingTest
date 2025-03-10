import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TextDisplay from "./TextDisplay";
import Timer from "./Timer";
import Keyboard from "./Keyboard";
import sampleTexts from "../data/sampleTexts";
import { FaRedo, FaChevronDown } from "react-icons/fa";
import "./TypingTest.css";

function TypingTest({ onTestComplete }) {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [difficulty, setDifficulty] = useState("medium");
  const [pressedKey, setPressedKey] = useState("");

  const inputRef = useRef(null);
  const textContainerRef = useRef(null);

  // Initialize with a random text from the selected difficulty
  useEffect(() => {
    const textsForDifficulty = sampleTexts[difficulty];
    setText(
      textsForDifficulty[Math.floor(Math.random() * textsForDifficulty.length)]
    );
    resetTest();
  }, [difficulty]);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Auto-scroll text display
  useEffect(() => {
    if (textContainerRef.current && currentCharIndex > 0) {
      const charElements = textContainerRef.current.querySelectorAll(".char");
      if (charElements[currentCharIndex]) {
        charElements[currentCharIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  }, [currentCharIndex]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Start timer on first input
    if (!isActive && value.length === 1) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    // Track errors
    if (value.length > userInput.length) {
      const lastChar = value[value.length - 1];
      const expectedChar = text[value.length - 1];

      if (lastChar !== expectedChar) {
        setErrors((prev) => prev + 1);
      }

      // Simulate keyboard press
      setPressedKey(lastChar);
      setTimeout(() => setPressedKey(""), 100);
    }

    setUserInput(value);
    setCurrentCharIndex(value.length);

    // Check if test is complete
    if (value.length === text.length) {
      completeTest();
    }
  };

  const completeTest = () => {
    setIsActive(false);
    const endTime = Date.now();
    const timeInMinutes = (endTime - startTime) / 60000;
    const words = text.split(/\s+/).length;
    const wpm = Math.round(words / timeInMinutes);

    // Calculate accuracy
    const correctChars = [...userInput].filter(
      (char, i) => char === text[i]
    ).length;
    const accuracy = Math.round((correctChars / text.length) * 100);

    onTestComplete({
      wpm,
      accuracy,
      timeElapsed,
      errors,
      textLength: text.length,
      difficulty,
    });
  };

  const resetTest = () => {
    setUserInput("");
    setStartTime(null);
    setTimeElapsed(0);
    setIsActive(false);
    setCurrentCharIndex(0);
    setErrors(0);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleNewText = () => {
    const textsForDifficulty = sampleTexts[difficulty];
    let newText;
    do {
      newText =
        textsForDifficulty[
          Math.floor(Math.random() * textsForDifficulty.length)
        ];
    } while (newText === text);

    setText(newText);
    resetTest();
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const calculateCurrentWPM = () => {
    if (!startTime || !isActive) return 0;

    const timeInMinutes = (Date.now() - startTime) / 60000;
    const words = userInput.trim().split(/\s+/).length;
    return Math.round(words / timeInMinutes) || 0;
  };

  return (
    <motion.div
      className="typing-test"
      onClick={handleFocus}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="test-controls">
        <div className="difficulty-selector">
          <label htmlFor="difficulty">Difficulty:</label>
          <div className="custom-select">
            <select
              id="difficulty"
              value={difficulty}
              onChange={handleDifficultyChange}
              disabled={isActive}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <FaChevronDown />
          </div>
        </div>

        <button
          className="reset-button"
          onClick={handleNewText}
          disabled={isActive}
        >
          <FaRedo /> New Text
        </button>
      </div>

      <div className="stats-bar">
        <Timer seconds={timeElapsed} isActive={isActive} />
        <div className="stat">
          <span>WPM</span>
          <span className="stat-value">{calculateCurrentWPM()}</span>
        </div>
        <div className="stat">
          <span>Errors</span>
          <span className="stat-value">{errors}</span>
        </div>
      </div>

      <div className="text-container" ref={textContainerRef}>
        <TextDisplay
          originalText={text}
          userInput={userInput}
          currentIndex={currentCharIndex}
        />
      </div>

      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        className="typing-input"
        placeholder="Click here and start typing..."
        autoFocus
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />

      <Keyboard pressedKey={pressedKey} />
    </motion.div>
  );
}

export default TypingTest;
