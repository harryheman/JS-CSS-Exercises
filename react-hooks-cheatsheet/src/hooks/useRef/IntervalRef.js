import React, { useRef, useState, useEffect } from "react";

export const IntervalRef = () => {
  const [time, setTime] = useState(0);
  const setIntervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      setTime((time) => (time = new Date().toLocaleTimeString()));
    }, 1000);

    setIntervalRef.current = id;

    return () => clearInterval(setIntervalRef.current);
  }, [time]);

  return (
    <>
      <p>Текущее время:</p>
      <time>{time}</time>
    </>
  );
};
