import React, { useState } from "react";
import axios from "axios";

export const CreateUser = () => {
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:1234/users/add", {
        username,
      });

      console.log(response.data);

      const timer = setTimeout(() => {
        clearTimeout(timer);
        window.location = "/";
      }, 1500);
    } catch (error) {
      console.error(error);
    }

    setUsername("");
  };

  return (
    <div>
      <h3 className="mt-2">Create User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};
