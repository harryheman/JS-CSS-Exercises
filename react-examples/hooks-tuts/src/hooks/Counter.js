import React, { useState, useEffect } from "react";
// import useDocumentTitle from "@rehooks/document-title";

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  // useDocumentTitle(`You clicked ${count} times`);

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={increment}>Click Me</button>
    </div>
  );
}

export default HookCounter;
