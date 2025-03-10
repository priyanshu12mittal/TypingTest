import React from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      {isDarkTheme ? (
        <>
          <FaSun />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <FaMoon />
          <span>Dark Mode</span>
        </>
      )}
    </motion.button>
  );
}

export default ThemeToggle;
