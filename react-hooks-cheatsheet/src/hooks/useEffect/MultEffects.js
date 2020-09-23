import React, { useEffect } from "react";

export const MultEffects = () => {
  // эффект номер раз
  useEffect(() => {
    const clicked = () => console.log("Клик!");
    window.addEventListener("click", clicked);

    return () => {
      window.removeEventListener("click", clicked);
    };
  }, []);

  // эффект номер два
  useEffect(() => {
    console.log("Второй эффект.");
  });

  return (
    <>
      <p>Загляните в консоль.</p>
    </>
  );
};
