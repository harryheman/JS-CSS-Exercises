import React, { useState, useEffect } from "react";

export default function Greeting() {
  const [fName, setFName] = useState(
    () => window.localStorage.getItem("hooksFN") || "Harry"
  );
  const [lName, setLName] = useState(
    () => localStorage.getItem("hooksLN") || "Heman"
  );

  const handleFNChange = (e) => setFName(e.target.value);
  const handleLNChange = (e) => setLName(e.target.value);

  useEffect(() => {
    window.localStorage.setItem("hooksFN", fName);
    window.localStorage.setItem("hooksLN", lName);
  }, [fName, lName]);

  return (
    <div>
      <input value={fName} onChange={handleFNChange} />
      <input value={lName} onChange={handleLNChange} />
      <p>
        Hello, {fName} {lName}!
      </p>
    </div>
  );
}
