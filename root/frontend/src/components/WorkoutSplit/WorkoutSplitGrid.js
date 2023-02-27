import React, { useContext } from "react";
import { ModalContext } from "../ModalContext/ModalContext.js";
import AddWorkoutSplitBtn from "./AddWorkoutSplitBtn";
import NewWorkoutSplit from "./NewWorkoutSplit.js";

import "./WorkoutSplitGrid.css";
import logo from "../../images/workout.png";

const WorkoutSplitGrid = () => {
  const [isModalOpen] = useContext(ModalContext);

  return (
    <div className="main-container">
      <div className={`workout-grid ${isModalOpen ? "blurred" : ""}`}>
        <ul className="workout-container">
          <img className="workout-image" src={logo} alt="Workout"></img>
          <div className="workout-card">
            <li className="workout-card-title">Workout split title</li>
            <li>4 day split:</li>
            <li> - Push day</li>
            <li> - Pull day</li>
            <li> - Legs day</li>
            <li> - Core day</li>
            <li>--------------------------------</li>
            <li>Date created: 2022-12-20</li>
          </div>
        </ul>
        {/* ////////////////////////////////////////////////////// */}
        <ul className="workout-container">
          <img className="workout-image" src={logo} alt="Workout"></img>
          <div className="workout-card">
            <li className="workout-card-title">Workout split title</li>
            <li>3 day split:</li>
            <li> - Upper day</li>
            <li> - Lower day</li>
            <li> - Upper day</li>
            <li>--------------------------------</li>
            <li>Date created: 2022-12-20</li>
          </div>
        </ul>
        {/* ////////////////////////////////////////////////////// */}
        <ul className="workout-container">
          <img className="workout-image" src={logo} alt="Workout"></img>
          <div className="workout-card">
            <li className="workout-card-title">Workout split title</li>
            <li>4 day split:</li>
            <li> - Upper day</li>
            <li> - Lower day</li>
            <li> - Upper day</li>
            <li>--------------------------------</li>
            <li>Date created: 2022-12-20</li>
          </div>
        </ul>
        {/* ////////////////////////////////////////////////////// */}
        <ul className="workout-container">
          <img className="workout-image" src={logo} alt="Workout"></img>
          <div className="workout-card">
            <li className="workout-card-title">Workout split title</li>
            <li>4 day split:</li>
            <li> - Upper day</li>
            <li> - Lower day</li>
            <li> - Upper day</li>
            <li>--------------------------------</li>
            <li>Date created: 2022-12-20</li>
          </div>
        </ul>
        {/* ////////////////////////////////////////////////////// */}
      </div>
      <NewWorkoutSplit />
      <AddWorkoutSplitBtn />
    </div>
  );
};

export default WorkoutSplitGrid;
