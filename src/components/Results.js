import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaHistory, FaRedo, FaShare } from "react-icons/fa";
import "./Results.css";

function Results({ results, onReset, history }) {
  const [showHistory, setShowHistory] = useState(false);

  const { wpm, accuracy, timeElapsed, errors, textLength, difficulty } =
    results;

  // Calculate a performance score out of 100
  const calculateScore = () => {
    // Base the score on WPM and accuracy, with difficulty multiplier
    const difficultyMultiplier =
      difficulty === "easy" ? 0.8 : difficulty === "medium" ? 1 : 1.2;

    const baseScore = wpm * 0.6 + accuracy * 0.4;
    return Math.min(100, Math.round(baseScore * difficultyMultiplier));
  };

  const score = calculateScore();

  // Get a performance message based on the score
  const getPerformanceMessage = () => {
    if (score >= 90) return "Excellent! You're a typing master!";
    if (score >= 80) return "Great job! Keep up the good work!";
    if (score >= 70) return "Good typing skills! Practice for perfection.";
    if (score >= 60) return "Nice effort! Regular practice will help improve.";
    return "Keep practicing to improve your typing skills!";
  };

  // Format date for history items
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  // Share results functionality
  const shareResults = () => {
    const shareText = `I just scored ${score}/100 on Typing Master with ${wpm} WPM and ${accuracy}% accuracy! Try to beat my score!`;

    if (navigator.share) {
      navigator
        .share({
          title: "My Typing Test Results",
          text: shareText,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
          // Fallback
          copyToClipboard(shareText);
        });
    } else {
      // Fallback for browsers that don't support navigator.share
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Results copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <motion.div
      className="results-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="results-header">
        <FaTrophy className="trophy-icon" />
        <h2>Test Complete!</h2>
      </div>

      <div className="score-display">
        <div className="score-circle">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path
              className="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray={`${score}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">
              {score}
            </text>
          </svg>
        </div>
        <p className="performance-message">{getPerformanceMessage()}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{wpm}</span>
          <span className="stat-label">Words Per Minute</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{accuracy}%</span>
          <span className="stat-label">Accuracy</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{timeElapsed}</span>
          <span className="stat-label">Seconds</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{errors}</span>
          <span className="stat-label">Errors</span>
        </div>
      </div>

      <div className="results-actions">
        <button className="action-button reset" onClick={onReset}>
          <FaRedo />
          <span>Try Again</span>
        </button>
        <button className="action-button share" onClick={shareResults}>
          <FaShare />
          <span>Share Results</span>
        </button>
        <button
          className="action-button history"
          onClick={() => setShowHistory(!showHistory)}
        >
          <FaHistory />
          <span>{showHistory ? "Hide History" : "Show History"}</span>
        </button>
      </div>

      {showHistory && (
        <motion.div
          className="history-container"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3>Your Recent Tests</h3>
          {history.length > 0 ? (
            <ul className="history-list">
              {history.map((item, index) => (
                <li key={item.id || index} className="history-item">
                  <div className="history-info">
                    <span className="history-date">
                      {formatDate(item.date)}
                    </span>
                    <span className="history-difficulty">
                      {item.difficulty}
                    </span>
                  </div>
                  <div className="history-stats">
                    <span>{item.wpm} WPM</span>
                    <span>{item.accuracy}% Accuracy</span>
                    <span>Score: {calculateScore(item)}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-history">No test history yet.</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Results;
