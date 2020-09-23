import React, { useEffect } from "react";

export const CleanupEffect = () => {
  useEffect(() => {
    const clicked = () => console.log("Клик!");
    window.addEventListener("click", clicked);

    return () => {
      window.removeEventListener("click", clicked);
    };
  }, []);

  return (
    <>
      <p>После клика по области просмотра в консоли появится сообщение.</p>
    </>
  );
};
