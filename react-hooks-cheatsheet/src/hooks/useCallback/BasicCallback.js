import React, { useState, useCallback } from "react";

export const BasicCallback = () => {
  const [age, setAge] = useState(19);
  const handleClick = () => setAge(age < 100 ? age + 1 : age);
  const someValue = "some value";
  const doSomething = useCallback(() => someValue, [someValue]);

  return (
    <>
      <Age age={age} handleClick={handleClick} />
      <Guide doSomething={doSomething} />
    </>
  );
};

const Age = ({ age, handleClick }) => {
  return (
    <div>
      <p>Мне {age} лет.</p>
      <p>Нажми на кнопку 👇</p>
      <button onClick={handleClick}>Стать старше!</button>
    </div>
  );
};

const Guide = React.memo((props) => {
  const color = `#${((Math.random() * 0xfff) << 0).toString(16)}`;
  return (
    <div style={{ background: color, padding: ".4rem" }}>
      <p style={{ color: color, filter: "invert()" }}>
        Следуй инструкциям максимально точно.
      </p>
    </div>
  );
});
