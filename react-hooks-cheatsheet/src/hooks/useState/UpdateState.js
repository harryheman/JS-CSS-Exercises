import React, { useState } from "react";

export const UpdateState = () => {
  const [age, setAge] = useState(19);
  const handleClick = () => setAge(age + 1);

  return (
    <>
      <p>Мне {age} лет.</p>
      <button onClick={handleClick}>Стать старше!</button>
    </>
  );
};
