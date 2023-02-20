import React, { useContext, useState } from "react";

import "./index.css";

import Particle from "./components/Particle/Particle.js";

import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Workout from "./components/Workout/Workout";
import NewWorkout from "./components/NewWorkout/NewWorkout";
import AddNewWorkout from "./components/AddNewWorkout/AddNewWorkout";
import CardWorkout from "./components/CardWorkout/CardWorkout";

import { ModalContext } from "./components/ModalContext/ModalContext";

function App() {
  const [isModalOpen] = useContext(ModalContext);

  return (
    <div className="App">
      <div className="content">
        <Navigation />
        {/* <Login /> */}
        <Workout />
        {/* {isModalOpen && <NewWorkout />} */}
        {/* <NewWorkout /> */}
        {/* <CardWorkout /> */}

        {/* {<AddNewWorkout />} */}

        <Particle />
        {/* <NewWorkout /> */}
      </div>
    </div>
  );
}

export default App;
