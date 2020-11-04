import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = ({ exercise, deleteExercise }) => (
  <tr>
    <td>{exercise.username}</td>
    <td>{exercise.description}</td>
    <td>{exercise.duration}</td>
    <td>
      <Link to={`/edit/${exercise._id}`} className="btn btn-success">
        edit
      </Link>
      <button
        className="btn btn-danger ml-2"
        onClick={() => {
          deleteExercise(exercise._id);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);

export const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:1234/exercises");
      const exercises = response.data;
      setExercises(exercises);
    })();
  }, []);

  const deleteExercise = async (id) => {
    const response = await axios.delete(
      `http://localhost:1234/exercises/${id}`
    );
    console.log(response.data);
    const newExercises = exercises.filter((ex) => ex._id !== id);
    setExercises(newExercises);
  };

  const exerciseList = () =>
    exercises.map((ex) => (
      <Exercise exercise={ex} deleteExercise={deleteExercise} key={ex._id} />
    ));

  return (
    <div>
      <h3 className="mt-2">Exercise List</h3>
      <table className="table text-center">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};
