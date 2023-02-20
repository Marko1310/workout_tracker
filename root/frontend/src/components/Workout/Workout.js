import React, { useContext } from "react";
import Exercise from "../Exercise/Exercise";
import Scroll from "../Scroll/Scroll";
import "./Workout.css";
import { ModalContext } from "../ModalContext/ModalContext";

const Workout = () => {
  const [isModalOpen] = useContext(ModalContext);
  return (
    <div className={`workout-container ${isModalOpen ? "blurred" : ""}`}>
      <div className="container">
        <div className="description-container">
          <p>Title</p>
          <p>Time</p>
          <div>Notes</div>
        </div>
        <div className="exercise-slider">
          <Scroll>
            <Exercise />
            <Exercise />
            <Exercise />
            <Exercise />
          </Scroll>
        </div>

        <div className="button-container">
          <button className="button">Add exercise</button>
          <button className="button">Save exercise</button>
        </div>
      </div>
    </div>
  );
};

export default Workout;
