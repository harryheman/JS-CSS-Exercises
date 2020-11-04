import React, { useState, useEffect } from "react";
import axios from "axios";

const User = ({ user, deleteUser }) => (
  <tr>
    <td>{user.username}</td>
    <td>
      <button
        className="btn btn-danger ml-2"
        onClick={() => {
          deleteUser(user._id);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);

export const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:1234/users");
      const users = response.data;
      setUsers(users);
    })();
  }, []);

  const deleteUser = async (id) => {
    const response = await axios.delete(
      `http://localhost:1234/users/${id}`
    );
    console.log(response.data);
    const newUsers = users.filter((u) => u._id !== id);
    setUsers(newUsers);
  };

  const userList = () =>
    users.map((u) => (
      <User user={u} deleteUser={deleteUser} key={u._id} />
    ));

  return (
    <div>
      <h3 className="mt-2">Users List</h3>
      <table className="table text-center">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{userList()}</tbody>
      </table>
    </div>
  );
};
