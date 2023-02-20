import React, { useState } from "react";
import { ModalProvider } from "./components/ModalContext/ModalContext";

import "./index.css";

import Particle from "./components/Particle/Particle.js";

import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Workout from "./components/Workout/Workout";
import NewWorkout from "./components/NewWorkout/NewWorkout";
import AddNewWorkout from "./components/AddNewWorkout/AddNewWorkout";
import CardWorkout from "./components/CardWorkout/CardWorkout";

function App() {
  return (
    <ModalProvider>
      <div className="App">
        <div className="content">
          <Navigation />
          {/* <Login /> */}
          {/* <Workout /> */}

          <CardWorkout />

          <AddNewWorkout />

          <Particle />
          {/* <NewWorkout /> */}
        </div>
      </div>
    </ModalProvider>
  );
}

export default App;
