import React from "react";
import { motion } from "framer-motion";
import { FaKeyboard } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <motion.div
        className="logo"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FaKeyboard />
        <h1>Typing Master</h1>
      </motion.div>

      <motion.nav
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ThemeToggle />
      </motion.nav>
    </header>
  );
}

export default Header;
