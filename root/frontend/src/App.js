import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

import Particle from "./components/Particle/Particle.js";

import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Workout from "./components/Workout/Workout";
import NewWorkout from "./components/Workout/NewWorkout";
import AddNewWorkout from "./components/AddNewWorkout/AddNewWorkout";
import CardWorkout from "./components/CardWorkout/CardWorkout";
import CardExercise from "./components/CardExercise/CardExercise";
import NotFound from "./components/NotFound/NotFound";

import { ModalContext } from "./components/ModalContext/ModalContext";

// Layouts
import RootLayout from "./layouts/RootlLayout";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       <Route path="login" element={<Login />} />
//       <Route path="cardWorkout/:id" element={<Workout />} />
//       <Route path="cardWorkout" element={<CardWorkout />} />
//       <Route path="cardExercise" element={<CardExercise />} />

//       <Route path="*" element={<NotFound />} />
//     </Route>
//   )
// );

function App() {
  const [isModalOpen] = useContext(ModalContext);

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Navigation />

          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="cardWorkout/:id" element={<Workout />} />
            <Route path="cardWorkout" element={<CardWorkout />} />
            <Route path="cardExercise" element={<CardExercise />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* <Navigation /> */}
          {/* <RouterProvider router={router} /> */}
          {/* <Login /> */}
          {/* <Workout /> */}
          {/* {isModalOpen && <NewWorkout />} */}
          {/* <NewWorkout /> */}
          {/* <CardWorkout /> */}
          <Particle />
          {/* <NewWorkout /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
