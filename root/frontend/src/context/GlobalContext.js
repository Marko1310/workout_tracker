import React, { createContext, useContext, useState } from "react";

//create context
export const GlobalContext = createContext();

//provider component
export const GlobalProvider = ({ children }) => {
  const [uset, setUser] = useState(null);
  const [splits, setSplits] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState([]);
  const [reps, setReps] = useState([]);
  const [prevSets, setPrevSets] = useState([]);
  const [prevReps, setPrevReps] = useState([]);
};
