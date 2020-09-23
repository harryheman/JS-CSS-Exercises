import React, { useEffect, useState } from "react";

export const BasicEffect = () => {
  const [age, setAge] = useState(19);
  const handleClick = () => setAge(age + 1);

  useEffect(() => {
    document.title = `Тебе ${age} лет!`;
  });

  return (
    <>
      <p>Обратите внимание на заголовок текущей вкладки браузера.</p>
      <button onClick={handleClick}>Обновить заголовок!</button>
    </>
  );
};
