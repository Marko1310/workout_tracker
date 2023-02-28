import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import Particle from "./components/Particle/Particle.js";

import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Workout from "./components/Splits/Workout";
import SplitGrid from "./components/Splits/SplitGrid";
import WorkoutGrid from "./components/Workouts/WorkoutGrid";
import NotFound from "./components/NotFound/NotFound";
import NewExercise from "./components/Workouts/NewExercise";

import { ModalContext } from "./components/ModalContext/ModalContext";
import Exercise from "./components/Workouts/Exercise";
// import CardExercise from "./components/Workouts/CardExercise";

function App() {
  const [isModalOpen] = useContext(ModalContext);

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Navigation />

          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<SplitGrid />} />
            <Route path="/test" element={<Workout />} />

            <Route path="workout/:id" element={<WorkoutGrid />} />
            <Route path="exercise/:id" element={<Workout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Particle />
        </div>
      </div>
    </Router>
  );
}

export default App;
