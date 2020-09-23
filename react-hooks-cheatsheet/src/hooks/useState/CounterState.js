import React, { useState } from "react";

export const CounterState = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Значение счетчика равно {count}.</p>
      <button onClick={() => setCount(0)}>Сбросить</button>
      <button onClick={() => setCount((prevVal) => prevVal + 1)}>
        Плюс (+)
      </button>
      <button onClick={() => setCount((prevVal) => prevVal - 1)}>
        Минус (-)
      </button>
    </>
  );
};
