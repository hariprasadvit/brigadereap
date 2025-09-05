// hooks/useOtpTimer.js
import { useEffect, useState } from "react";

export const useOtpTimer = (active) => {
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!active) return;

    setCanResend(false);
    setTimer(60);
  }, [active]);

  useEffect(() => {
    if (!active || timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, active]);

  return { timer, canResend, resetTimer: () => setTimer(60), setCanResend };
};
