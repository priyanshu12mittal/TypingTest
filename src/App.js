import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import TypingTest from "./components/TypingTest";
import Results from "./components/Results";
import ThemeProvider from "./context/ThemeContext";
import "./App.css";

function App() {
  const [testComplete, setTestComplete] = useState(false);
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("typingHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("typingHistory", JSON.stringify(history));
  }, [history]);

  const handleTestComplete = (testResults) => {
    const newResult = {
      ...testResults,
      date: new Date().toISOString(),
      id: Date.now(),
    };

    setResults(newResult);
    setHistory((prev) => [newResult, ...prev].slice(0, 10)); // Keep only the last 10 tests
    setTestComplete(true);
  };

  const resetTest = () => {
    setTestComplete(false);
    setResults(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <main className="content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={testComplete ? "results" : "test"}
          >
            {!testComplete ? (
              <TypingTest onTestComplete={handleTestComplete} />
            ) : (
              <Results
                results={results}
                onReset={resetTest}
                history={history}
              />
            )}
          </motion.div>
        </main>
        <footer className="footer">
          <p>
            © {new Date().getFullYear()} Typing Master - Type Your Way to
            Greatness
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
