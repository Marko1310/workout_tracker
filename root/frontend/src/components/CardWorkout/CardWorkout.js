import React, { useContext } from "react";
import { ModalContext } from "../ModalContext/ModalContext.js";
import AddNewWorkout from "../AddNewWorkout/AddNewWorkout.js";
import NewWorkout from "../NewWorkout/NewWorkout.js";

import "./CardWorkout.css";
import logo from "../../images/workout.png";

const CardWorkout = () => {
  const [isModalOpen] = useContext(ModalContext);

  return (
    <>
      <div className={`workout-grid ${isModalOpen ? "blurred" : ""}`}>
        <div className="carDB--container">
          <ul className="workout-container">
            <img className="workout-image" src={logo} alt="Workout"></img>
            <div className="workout-card">
              <li className="workout-card-title">Workout title</li>
              <li>4 day split:</li>
              <li> - Upper day</li>
              <li> - Lower day</li>
              <li> - Upper day</li>
              <li>--------------------------------</li>
              <li>Date created: 2022-12-20</li>
            </div>
          </ul>
        </div>
        {/* ////////////////////////////////////////////////////// */}
        <div className="carDB--container">
          <ul className="workout-container">
            <img className="workout-image" src={logo} alt="Workout"></img>
            <div className="workout-card">
              <li className="workout-card-title">Workout title</li>
              <li>4 day split:</li>
              <li> - Upper day</li>
              <li> - Lower day</li>
              <li> - Upper day</li>
              <li>--------------------------------</li>
              <li>Date created: 2022-12-20</li>
            </div>
          </ul>
        </div>
        {/* ////////////////////////////////////////////////////// */}

        <div className="carDB--container">
          <ul className="workout-container">
            <img className="workout-image" src={logo} alt="Workout"></img>
            <div className="workout-card">
              <li className="workout-card-title">Workout title</li>
              <li>4 day split:</li>
              <li> - Upper day</li>
              <li> - Lower day</li>
              <li> - Upper day</li>
              <li>--------------------------------</li>
              <li>Date created: 2022-12-20</li>
            </div>
          </ul>
        </div>
        {/* ////////////////////////////////////////////////////// */}
      </div>
      <AddNewWorkout />
      <NewWorkout />
    </>
  );
};

export default CardWorkout;
