import React, { createContext, useContext, useState } from "react";

//create context
export const GlobalContext = createContext();

//provider component
export const GlobalProvider = (props) => {
  const [user, setUser] = useState(null);
  const [splits, setSplits] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState([]);
  const [reps, setReps] = useState([]);
  const [prevSets, setPrevSets] = useState([]);
  const [prevReps, setPrevReps] = useState([]);

  const globalState = {
    user,
    setUser,
    splits,
    setSplits,
    workouts,
    setWorkouts,
    exercises,
    setExercises,
    sets,
    setSets,
    reps,
    setReps,
    prevSets,
    setPrevSets,
    prevReps,
    setPrevReps,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {props.children}
    </GlobalContext.Provider>
  );
};
