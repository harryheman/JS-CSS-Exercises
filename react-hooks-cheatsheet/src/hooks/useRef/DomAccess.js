import React, { useRef } from "react";

export const DomAccess = () => {
  const textareaEl = useRef(null);
  const handleClick = () => {
    textareaEl.current.value =
      "Ты - человек, в данный момент изучающий хуки. Да, кэп снова в деле!";
    textareaEl.current.focus();
  };
  const color = `#${((Math.random() * 0xfff) << 0).toString(16)}`;

  return (
    <>
      <button onClick={handleClick}>
        Получить сообщение.
      </button>
      <label htmlFor="msg">
        После нажатия кнопки в поле для ввода текста появится сообщение.
      </label>
      <textarea ref={textareaEl} id="msg" />
    </>
  );
};
