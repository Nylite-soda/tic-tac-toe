"use client";
import { useState, useEffect, useCallback } from "react";

// A robust useLocalStorage hook that handles data migration and avoids infinite loops.
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);

  // This effect runs only once on the client, after the component has mounted.
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const storedData = JSON.parse(item);
        // Deep merge the stored data with the initial value.
        const mergedData = { ...initialValue };
        for (const topKey in mergedData) {
          if (storedData[topKey]) {
            mergedData[topKey] = { ...mergedData[topKey], ...storedData[topKey] };
          }
        }
        setStoredValue(mergedData);
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]); // We intentionally only run this on mount (and if the key changes).

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error("Error writing to localStorage", error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}