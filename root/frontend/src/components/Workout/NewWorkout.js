import React, { useContext } from "react";
import { ModalContext } from "../ModalContext/ModalContext";

import "./NewWorkout.css";

const NewWorkout = () => {
  const [isModalOpen, setIsModalOpen] = useContext(ModalContext);

  return (
    <div className={`newWorkout-container + ${isModalOpen ? "show" : ""}`}>
      <p className="title">Create new workout</p>
      <form>
        <label htmlFor="title">Title of the workout</label>
        <input
          className="forms"
          type="text"
          id="title"
          name="title"
          placeholder="e.g. Push/Pull/Legs"
        ></input>

        <label htmlFor="days">Number of days in a week</label>

        <select className="forms">
          <option name="1">1</option>
          <option name="2">2</option>
          <option name="3">3</option>
        </select>

        <div className="button-container">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}
            className="button"
          >
            Create workout
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

export default NewWorkout;
