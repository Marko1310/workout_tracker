import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

import "./NewWorkoutModal.css";

const NewWorkoutModal = () => {
  const { isModalOpen } = useContext(GlobalContext);
  const { setIsModalOpen } = useContext(GlobalContext);

  return (
    <div className={`newWorkout-container ${isModalOpen ? "show" : ""}`}>
      <p className="newWorkout-title">Add new workout</p>
      <form>
        <label htmlFor="newWorkout-title">Title of the workout</label>
        <input
          className="forms"
          type="text"
          id="title"
          name="title"
          placeholder="e.g. Push day"
        ></input>

        <div className="button-container">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}
            className="button"
          >
            Add workout
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

export default NewWorkoutModal;
