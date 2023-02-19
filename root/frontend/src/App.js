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
  const [blur, setBlur] = useState(false);

  return (
    <div className="App">
      <Navigation />
      <ModalProvider>
        <div className="content">
          <div
            className="blur"
            style={blur === true ? { filter: "blur(5px)" } : {}}
          >
            {/* <Login /> */}
            <Workout />
            {/* <div className="workout-grid">
            <CardWorkout />
            <CardWorkout />
            <CardWorkout />
          </div> */}

            <AddNewWorkout />

            <Particle />
          </div>
          {/* <NewWorkout /> */}
        </div>
      </ModalProvider>
    </div>
  );
}

export default App;
