import axios from "axios";
import React, { createContext, useContext, useState } from "react";

//create context
export const GlobalContext = createContext();

//provider component
export const GlobalProvider = (props) => {
  const [user, setUser] = useState(null);
  const [splits, setSplits] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState();
  const [reps, setReps] = useState([]);
  const [prevSets, setPrevSets] = useState([]);
  const [prevReps, setPrevReps] = useState([]);

  const getCurrentUser = () => {
    axios
      .get("http://localhost:8000/api/auth/current", {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data.data);
        setUser(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    axios
      .get("http://localhost:8000/api/auth/logout", {
        withCredentials: true,
      })
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSplits = () => {
    axios
      .get("http://localhost:8000/api/auth/splits/current", {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data.data);
        setSplits(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getWorkouts = (id) => {
    axios
      .get(`http://localhost:8000/api/auth/splits/workouts/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data.data);
        setWorkouts(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getExercises = (id) => {
    axios
      .get(`http://localhost:8000/api/auth/splits/workouts/workout/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data.data);
        setExercises(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    getCurrentUser,
    logout,
    getSplits,
    getWorkouts,
    getExercises,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {props.children}
    </GlobalContext.Provider>
  );
};
