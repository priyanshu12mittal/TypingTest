import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // Get from local storage then parse stored json or return initialValue
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key", error);
      return initialValue;
    }
  });

  // Save to local storage whenever value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage key", error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
