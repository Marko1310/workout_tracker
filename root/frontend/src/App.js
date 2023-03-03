// React
import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// css
import "./index.css";

// Components
import Particle from "./components/Particle/Particle.js";
import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Workout from "./components/Workouts/Workout";
import SplitGrid from "./components/Splits/SplitGrid";
import WorkoutGrid from "./components/Workouts/WorkoutGrid";
import NotFound from "./components/NotFound/NotFound";

// Context
import { GlobalContext } from "./context/GlobalContext";
import { ModalContext } from "./context/ModalContext";

function App() {
  const { user } = useContext(GlobalContext);
  const [isModalOpen] = useContext(ModalContext);

  return (
    <Router>
      <div className="App">
        <div className="content">
          a{user && <Navigation />}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="dashboard" element={<SplitGrid />} />
            <Route path="workouts/:id" element={<WorkoutGrid />} />
            <Route path="workout/:id" element={<Workout />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="test" element={<Timer />} /> */}
          </Routes>
          <Particle />
        </div>
      </div>
    </Router>
  );
}

export default App;
