import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

import "./NewSplitModal.css";

const NewWorkoutSplit = () => {
  const { isModalOpen } = useContext(GlobalContext);
  const { setIsModalOpen } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [days, setDays] = useState("");
  const { addSplit } = useContext(GlobalContext);

  return (
    <div className={`newWorkout-container + ${isModalOpen ? "show" : ""}`}>
      <p className="newWorkout-title">Create new workout split</p>
      <form onSubmit={(e) => addSplit(e, title, days)}>
        <label htmlFor="title">Title of the split</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="forms"
          type="text"
          id="title"
          name="title"
          placeholder="e.g. Push/Pull/Legs"
        ></input>

        <label htmlFor="days">Number of days in a week</label>

        <select onChange={(e) => setDays(e.target.value)} className="forms">
          <option name="1">1</option>
          <option name="2">2</option>
          <option name="3">3</option>
          <option name="4">4</option>
          <option name="5">5</option>
          <option name="6">6</option>
          <option name="7">7</option>
        </select>

        <div className="button-container">
          <button
            onClick={(e) => {
              // e.preventDefault();
              // setIsModalOpen(false);
            }}
            className="button"
          >
            Create workout split
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

export default NewWorkoutSplit;
