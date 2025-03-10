import React from "react";
import { FaClock } from "react-icons/fa";
import "./Timer.css";

function Timer({ seconds, isActive }) {
  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={`timer ${isActive ? "active" : ""}`}>
      <FaClock />
      <span>{formatTime(seconds)}</span>
    </div>
  );
}

export default Timer;
