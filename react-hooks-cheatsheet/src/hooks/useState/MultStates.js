import React, { useState } from "react";

export const MultStates = () => {
  const [age, setAge] = useState(19);
  const [num, setNum] = useState(1);

  const handleAge = () => setAge(age + 1);
  const handleNum = () => setNum(num + 1);

  return (
    <>
      <p>Мне {age} лет.</p>
      <p>У меня {num} братьев и сестер.</p>
      <button onClick={handleAge}>Стать старше!</button>
      <button onClick={handleNum}>Больше братьев и сестер!</button>
    </>
  );
};
