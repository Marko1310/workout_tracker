import React, { useContext } from "react";
import { ModalContext } from "../ModalContext/ModalContext.js";
import AddWorkoutBtn from "../Workout/AddWorkoutBtn.js";
import NewWorkout from "../Workout/NewWorkout.js";

import "./ExerciseGrid.css";
import logo from "../../images/workout.png";

const CardExercise = () => {
  const [isModalOpen] = useContext(ModalContext);

  return (
    <>
      <div className={`exercise-grid ${isModalOpen ? "blurred" : ""}`}>
        <ul className="exercise-list-container">
          <img className="exercise-image" src={logo} alt="exercise"></img>
          <div className="exercise-card">
            <li className="exercise-card-title">Day 1 - Upper day: </li>

            <li> - Bench press</li>
            <li> - Pullups</li>
            <li> - Incline dumbell bech</li>
            <li> - Seated row</li>
            <li> - Laterall raises</li>
            <li> - Biceps bench</li>
            <li> - Triceps rope</li>
            <li>--------------------------------</li>
            <li>Date created: 2022-12-20</li>
          </div>
        </ul>
        {/* ////////////////////////////////////////////////////// */}
        <ul className="exercise-list-container">
          <img className="exercise-image" src={logo} alt="exercise"></img>
          <div className="exercise-card">
            <li className="exercise-card-title">Day 1 - Upper day: </li>

            <li> - Bench press</li>
            <li> - Pullups</li>
            <li> - Incline dumbell bech</li>
            <li> - Seated row</li>
            <li> - Laterall raises</li>
            <li> - Biceps bench</li>
            <li> - Triceps rope</li>
            <li>--------------------------------</li>
            <li>Date created: 2022-12-20</li>
          </div>
        </ul>
        {/* ////////////////////////////////////////////////////// */}
        <ul className="exercise-list-container">
          <img className="exercise-image" src={logo} alt="exercise"></img>
          <div className="exercise-card">
            <li className="exercise-card-title">Day 1 - Upper day: </li>

            <li> - Bench press</li>
            <li> - Pullups</li>
            <li> - Incline dumbell bech</li>
            <li> - Seated row</li>
            <li> - Laterall raises</li>
            <li> - Biceps bench</li>
            <li> - Triceps rope</li>
            <li>--------------------------------</li>
            <li>Date created: 2022-12-20</li>
          </div>
        </ul>
        {/* ////////////////////////////////////////////////////// */}
      </div>
      <AddWorkoutBtn />
      <NewWorkout />
    </>
  );
};

export default CardExercise;
