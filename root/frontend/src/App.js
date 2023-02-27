import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import Particle from "./components/Particle/Particle.js";

import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import WorkoutSplit from "./components/WorkoutSplit/WorkoutSplit";
import WorkoutSplitGrid from "./components/WorkoutSplit/WorkoutSplitGrid";
import ExerciseGrid from "./components/Workouts/ExerciseGrid";
import NotFound from "./components/NotFound/NotFound";
import NewExercise from "./components/Workouts/NewExercise";

import { ModalContext } from "./components/ModalContext/ModalContext";
import Exercise from "./components/Workouts/Exercise";

function App() {
  const [isModalOpen] = useContext(ModalContext);

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Navigation />

          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<WorkoutSplitGrid />} />
            <Route path="workout/:id" element={<WorkoutSplit />} />
            <Route path="exercise/:id" element={<ExerciseGrid />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Particle />
        </div>
      </div>
    </Router>
  );
}

export default App;
