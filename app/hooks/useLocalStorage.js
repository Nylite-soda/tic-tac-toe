"use client";
import { useState, useEffect, useCallback } from "react";

export function useLocalStorage(key, initialValue) {
  // Initialize state with the initialValue.
  // This ensures the server and the initial client render are the same.
  const [storedValue, setStoredValue] = useState(initialValue);

  // This effect runs only on the client, after the component has mounted.
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      // If a value exists in localStorage, update the state to use it.
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      // If there's an error, we default to the initial value.
      console.error(error);
    }
  }, [key]);

  const setValue = useCallback(
    (value) => {
      try {
        // Allow value to be a function, like the useState setter.
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Update state.
        setStoredValue(valueToStore);
        // Persist to localStorage.
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}