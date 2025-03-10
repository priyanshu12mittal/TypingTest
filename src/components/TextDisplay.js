import React from "react";
import "./TextDisplay.css";

function TextDisplay({ originalText, userInput, currentIndex }) {
  return (
    <div className="text-display">
      {originalText.split("").map((char, index) => {
        let className = "char";

        if (index < userInput.length) {
          className += char === userInput[index] ? " correct" : " incorrect";
        } else if (index === currentIndex) {
          className += " current";
        }

        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      })}
    </div>
  );
}

export default TextDisplay;
