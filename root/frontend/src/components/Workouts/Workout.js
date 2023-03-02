import React, { useContext } from "react";
import Exercise from "./Exercise";
import Scroll from "../Scroll/Scroll";
import "./Workout.css";
import { ModalContext } from "../ModalContext/ModalContext";
import NewExercise from "./NewExercise";
import Timer from "../Timer/Timer";
const WorkoutSplit = () => {
  const [isModalOpen] = useContext(ModalContext);

  return (
    <div className="workout-main-container">
      <div className={`workout ${isModalOpen ? "blurred" : ""}`}>
        <div className="container">
          <div className="description-container">
            <p>Title</p>
            <Timer />
            <button className="buttonFinish">Finish</button>
            {/* <div>Notes</div> */}
          </div>
          <Scroll>
            <Exercise />
            <Exercise />
            <Exercise />
            <Exercise />
            <Exercise />
            <Exercise />
            <Exercise />
          </Scroll>

          <div className="button-container">
            <button className="workoutBtn add">Add exercise</button>
            <button className="workoutBtn">Save workout</button>
          </div>
        </div>
      </div>
      <NewExercise />
    </div>
  );
};

export default WorkoutSplit;
