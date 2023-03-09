import React, { useContext, useEffect } from "react";
import NewWorkoutModal from "./NewWorkoutModal.js";
import AddWorkoutBtn from "./AddWorkoutBtn.js";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext.js";
import { useParams } from "react-router-dom";

import "./WorkoutGrid.css";
import logo from "../../images/workout.png";

const WorkoutGrid = () => {
  const { isModalOpen } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  const { workouts } = useContext(GlobalContext);
  const { getExercises } = useContext(GlobalContext);
  const { split_id } = useParams();
  const { getWorkouts } = useContext(GlobalContext);

  const navigate = useNavigate();

  const changeRoute = function (id) {
    getExercises(id);
    navigate(`/workout/${id}`);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    getWorkouts(split_id);
  }, [user, navigate]);

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
