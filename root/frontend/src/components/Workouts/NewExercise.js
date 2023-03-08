import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

import "./NewExercise.css";

const NewExercise = () => {
  const { isModalOpen } = useContext(GlobalContext);
  const { setIsModalOpen } = useContext(GlobalContext);

  return (
    <div className={`newExercise-container ${isModalOpen ? "show" : ""}`}>
      <p className="newExercise-title">Add new exercise</p>
      <form>
        <label htmlFor="title">Title of the exercise</label>
        <input
          className="forms"
          type="text"
          id="title"
          name="title"
          placeholder="e.g. Bench Press"
        ></input>

        <label htmlFor="days">Number of sets</label>
        <input
          className="forms"
          type="number"
          id="sets"
          name="sets"
          placeholder="e.g. 4"
        ></input>

        <label htmlFor="days">Number of reps</label>
        <input
          className="forms"
          type="number"
          id="reps"
          name="reps"
          placeholder="e.g. 12"
        ></input>

        <div className="button-container">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}
            className="button"
          >
            Add exercise
          </button>
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

export default NewExercise;
