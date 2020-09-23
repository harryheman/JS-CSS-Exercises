import React, { useState } from "react";

export const StateObject = () => {
  const [state, setState] = useState({ age: 19, num: 1 });
  const handleClick = (val) =>
    setState({
      ...state,
      [val]: state[val] + 1,
    });
  const { age, num } = state;

  return (
    <>
      <p>Мне {age} лет.</p>
      <p>У меня {num} братьев и сестер.</p>
      <button onClick={() => handleClick("age")}>Стать старше!</button>
      <button onClick={() => handleClick("num")}>
        Больше братьев и сестер!
      </button>
    </>
  );
};
