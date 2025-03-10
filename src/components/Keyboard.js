import React from "react";
import "./Keyboard.css";

function Keyboard({ pressedKey }) {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {rowIndex === 2 && <div className="key shift">Shift</div>}
          {row.map((key) => (
            <div
              key={key}
              className={`key ${
                pressedKey.toLowerCase() === key ? "active" : ""
              }`}
            >
              {key}
            </div>
          ))}
          {rowIndex === 2 && <div className="key shift">Shift</div>}
        </div>
      ))}
      <div className="keyboard-row">
        <div className="key space">Space</div>
      </div>
    </div>
  );
}

export default Keyboard;
