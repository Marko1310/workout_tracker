import React, { useContext, useEffect } from "react";
import Exercise from "./Exercise";
import Scroll from "../Scroll/Scroll";
import "./Workout.css";
import { GlobalContext } from "../../context/GlobalContext";
import NewExerciseModal from "./NewExerciseModal";
import Timer from "../Timer/Timer";
import { useNavigate } from "react-router-dom";

const WorkoutSplit = () => {
  const { isModalOpen } = useContext(GlobalContext);
  const { setIsModalOpen } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  const { exercises } = useContext(GlobalContext);
  const { setError } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleModal = () => {
    setError("");
    setIsModalOpen((setIsModalOpen) => !setIsModalOpen);
  };

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
          {/* <Scroll> */}
          {exercises.map((el) => {
            return <Exercise key={el.exercise_id} el={el} />;
          })}
          {/* </Scroll> */}

          <div className="button-container">
            <button onClick={() => handleModal()} className="workoutBtn add">
              Add exercise
            </button>
            <button className="workoutBtn">Save workout</button>
          </div>
        </div>
      </div>
      <NewExerciseModal />
    </div>
  );
};

export default WorkoutSplit;
