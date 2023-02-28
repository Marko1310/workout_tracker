import React, { useContext } from "react";
import { ModalContext } from "../ModalContext/ModalContext.js";
import NewExercise from "./NewWorkout.js";
import AddWorkoutBtn from "./AddWorkoutBtn.js";

import "./WorkoutGrid.css";
import logo from "../../images/workout.png";

const WorkoutGrid = () => {
  const [isModalOpen] = useContext(ModalContext);

  return (
    <div className="workoutGrid-main-container">
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
      <NewExercise />
      <AddWorkoutBtn />
    </div>
  );
};

export default WorkoutGrid;
