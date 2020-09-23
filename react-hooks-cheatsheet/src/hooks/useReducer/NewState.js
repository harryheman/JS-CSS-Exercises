import React, { useReducer } from "react";

const initialState = { width: 30 };

const reducer = (state, newState) => ({
  ...state,
  width: newState.width,
});

export const NewState = () => {
  const [state, setState] = useReducer(reducer, initialState);
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
      <button onClick={() => setState({ width: 300 })}>
        Увеличить ширину контейнера.
      </button>
      <button onClick={() => setState({ width: 30 })}>
        Уменьшить ширину контейнера.
      </button>
    </>
  );
};
