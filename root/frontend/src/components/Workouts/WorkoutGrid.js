import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext.js";
import NewWorkoutModal from "./NewWorkoutModal.js";
import AddWorkoutBtn from "./AddWorkoutBtn.js";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext.js";

import "./WorkoutGrid.css";
import logo from "../../images/workout.png";

const WorkoutGrid = () => {
  const [isModalOpen] = useContext(ModalContext);
  const workouts = useContext(GlobalContext).workouts;
  const { getExercises } = useContext(GlobalContext);
  console.log(workouts);

  const navigate = useNavigate();

  const changeRoute = function (id) {
    getExercises(id);
    navigate(`/workout/:${id}`);
  };

  return (
    <div className="workoutGrid-main-container">
      <div className={`${isModalOpen ? "blurred" : ""}`}>
        <p className="choose">Choose a Workout</p>
        <div className="exercise-grid">
          {workouts.map((el) => {
            return (
              <ul
                key={el.workout_id}
                onClick={() => changeRoute(el.workout_id)}
                className="exercise-list-container"
              >
                <img className="exercise-image" src={logo} alt="exercise"></img>
                <div className="exercise-card">
                  <li className="exercise-card-title">
                    {el.workout_name} day:
                  </li>
                  {el.array_agg.map((name) => {
                    return <li> - {name}</li>;
                  })}
                  <li>--------------------------------</li>
                  <li>Date created: {el.date.slice(0, 10)}</li>
                </div>
              </ul>
            );
          })}
        </div>
      </div>
      <NewWorkoutModal />
      <AddWorkoutBtn />
    </div>
  );
};

export default WorkoutGrid;
