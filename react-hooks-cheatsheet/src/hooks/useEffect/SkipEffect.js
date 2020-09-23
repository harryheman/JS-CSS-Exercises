import React, { useEffect, useState } from "react";

export const SkipEffect = () => {
  const [randomInt, setRandomInt] = useState(0);
  const [effectLogs, setEffectLogs] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setEffectLogs((prevEffectLogs) => [
      ...prevEffectLogs,
      `Вызов функции номер ${count}.`,
    ]);
    setCount(count + 1);
  }, []);

  return (
    <>
      <h3>{randomInt}</h3>
      <button onClick={() => setRandomInt(~~(Math.random() * 10))}>
        Получить случайное целое число!
      </button>
      <ul>
        {effectLogs.map((effect, i) => (
          <li key={i}>{" 😈 ".repeat(i) + effect}</li>
        ))}
      </ul>
    </>
  );
};
