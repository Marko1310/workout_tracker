import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useParams } from "react-router-dom";

import "./NewExerciseModal.css";

const NewExerciseModal = () => {
  const { isModalOpen } = useContext(GlobalContext);
  const { setIsModalOpen } = useContext(GlobalContext);
  const { addExercise } = useContext(GlobalContext);
  const { setLoading } = useContext(GlobalContext);
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [goal_sets, setGoal_sets] = useState("");
  const [goal_reps, setGoal_reps] = useState("");

  const handleNewExercise = (e) => {
    e.preventDefault();
    setLoading(true);
    addExercise(title, goal_sets, goal_reps, id);
  };

  return (
    <div className={`newExercise-container ${isModalOpen ? "show" : ""}`}>
      <p className="newExercise-title">Add new exercise</p>
      <form onSubmit={(e) => handleNewExercise(e)}>
        <label htmlFor="title">Title of the exercise</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="forms"
          type="text"
          id="title"
          name="title"
          placeholder="e.g. Bench Press"
        ></input>

        <label htmlFor="days">Number of sets</label>
        <input
          onChange={(e) => setGoal_sets(e.target.value)}
          className="forms"
          type="number"
          id="sets"
          name="sets"
          placeholder="e.g. 4"
        ></input>

        <label htmlFor="days">Number of reps</label>
        <input
          onChange={(e) => setGoal_reps(e.target.value)}
          className="forms"
          type="number"
          id="reps"
          name="reps"
          placeholder="e.g. 12"
        ></input>

        <div className="button-container">
          <button className="button">Add exercise</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}
            className="button dismiss"
          >
            Dismiss
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewExerciseModal;
