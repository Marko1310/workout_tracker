import React, { useContext } from "react";
import Exercise from "../Exercise/Exercise";
import Scroll from "../Scroll/Scroll";
import "./Workout.css";
import { ModalContext } from "../ModalContext/ModalContext";

const Workout = () => {
  const [isModalOpen] = useContext(ModalContext);
  return (
    <div className={`workout-container ${isModalOpen ? "blurred" : ""}`}>
      <p>Title</p>
      <p>Time</p>
      <div>Notes</div>
      <div className="exercise-slider">
        <Scroll>
          <Exercise />
          <Exercise />
          <Exercise />
          <Exercise />
        </Scroll>
      </div>

      <button>Add exercise</button>
      <button>Save exercise</button>
    </div>
  );
};

export default Workout;
