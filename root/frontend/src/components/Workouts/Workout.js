import React, { useContext, useEffect } from "react";
import Exercise from "./Exercise";
import Scroll from "../Scroll/Scroll";
import "./Workout.css";
import { GlobalContext } from "../../context/GlobalContext";
import NewExercise from "./NewExercise";
import Timer from "../Timer/Timer";
import { useNavigate } from "react-router-dom";

const WorkoutSplit = () => {
  const [isModalOpen] = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  const { exercises } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="workout-main-container">
      <div className={`workout ${isModalOpen ? "blurred" : ""}`}>
        <div className="container">
          <div className="description-container">
            {<p>{"Push"}</p>}
            <Timer />
            <button className="buttonFinish">Finish</button>
            {/* <div>Notes</div> */}
          </div>
          <Scroll>
            {exercises.map((el) => {
              return <Exercise key={el.exercise_id} el={el} />;
            })}
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
