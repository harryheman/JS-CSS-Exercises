import React, { useReducer } from "react";

const initializeState = () => ({
  width: 90,
});

// обратите внимание, как initializeState перезаписывает начальное значение
const initialState = { width: 0 };

const reducer = (state, action) => {
  switch (action) {
    case "plus":
      return { width: Math.min(state.width + 30, 600) };
    case "minus":
      return { width: Math.max(state.width - 30, 30) };
    default:
      throw new Error("Что происходит?");
  }
};

export const LazyState = () => {
  const [state, dispath] = useReducer(reducer, initialState, initializeState);
  const color = `#${((Math.random() * 0xfff) << 0).toString(16)}`;

  return (
    <>
      <div
        style={{
          margin: "0 auto",
          background: color,
          height: "100px",
          width: state.width,
        }}
      ></div>
      <button onClick={() => dispath("plus")}>
        Увеличить ширину контейнера.
      </button>
      <button onClick={() => dispath("minus")}>
        Уменьшить ширину контейнера.
      </button>
    </>
  );
};
