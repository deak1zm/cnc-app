import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    console.log("useDebounce - Value changed:", value); // Debugging log

    const timer = setTimeout(() => {
      console.log("useDebounce - Setting debounced value:", value); // Debugging log
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
      console.log("useDebounce - Timer cleared for value:", value); // Debugging log
    };
  }, [value, delay]);

  return debouncedValue;
}
