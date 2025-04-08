import { useRef } from "react";
const useThrottle = (fn, time) => {
  const lastCall = useRef(0);
  const throttledFunction = (...args) => {
    const now = new Date().getTime();
    if (now - lastCall.current >= time) {
      lastCall.current = now;
      fn(...args);
    }
  };

  return throttledFunction;
};
export default useThrottle;
