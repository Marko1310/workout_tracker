import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import Particle from "./components/Particle/Particle.js";

import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Workout from "./components/Workout/Workout";
import WorkoutGrid from "./components/Workout/WorkoutGrid";
import ExerciseGrid from "./components/Exercise/ExerciseGrid";
import NotFound from "./components/NotFound/NotFound";
import NewExercise from "./components/Exercise/NewExercise";

import { ModalContext } from "./components/ModalContext/ModalContext";

function App() {
  const [isModalOpen] = useContext(ModalContext);

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Navigation />

          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="exercise/:id" element={<ExerciseGrid />} />
            <Route path="/" element={<WorkoutGrid />} />
            <Route path="workout/:id" element={<ExerciseGrid />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Particle />
        </div>
      </div>
    </Router>
  );
}

export default App;
