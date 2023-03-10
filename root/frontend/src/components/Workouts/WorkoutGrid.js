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
  const { deleteWorkout } = useContext(GlobalContext);
  const { setLoading } = useContext(GlobalContext);

  const navigate = useNavigate();

  const changeRoute = function (id) {
    getExercises(id);
    navigate(`/workout/${id}`);
  };

  const handleDelete = (e, split_id, workout_id) => {
    if (window.confirm("Are you sure you want to delete this Workout?")) {
      deleteWorkout(e, split_id, workout_id);
      setLoading(true);
    }
    e.stopPropagation();
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
                <div className="image-and-delete-container-workout">
                  <img
                    className="exercise-image"
                    src={logo}
                    alt="exercise"
                  ></img>
                  <button
                    onClick={(e) => handleDelete(e, split_id, el.workout_id)}
                    className="delete-split"
                  >
                    Delete
                  </button>
                </div>

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
