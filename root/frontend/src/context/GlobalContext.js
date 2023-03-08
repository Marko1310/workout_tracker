import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    axios
      .get("http://localhost:8000/api/auth/current", {
        withCredentials: true,
      })
      .then((user) => {
        if (!user) {
          setUser(null);
          setLoading(false);
        } else {
          setLoading(true);
          setUser(user.data);
          axios
            .get("http://localhost:8000/api/auth/splits/current", {
              withCredentials: true,
            })
            .then((data) => {
              setSplits(data.data);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        }
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

  const getWorkouts = (id) => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/auth/splits/workouts/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        setWorkouts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getExercises = (id) => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/auth/splits/workouts/workout/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        setExercises(data.data);
        setLoading(false);
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
    getWorkouts,
    getExercises,
    loading,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {props.children}
    </GlobalContext.Provider>
  );
};
