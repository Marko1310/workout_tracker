import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

//create context
export const GlobalContext = createContext();

//provider component
export const GlobalProvider = (props) => {
  const [user, setUser] = useState(null);
  const [splits, setSplits] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [currentTrackData, setCurrentTrackData] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");
  // const [prevSets, setPrevSets] = useState([]);
  // const [prevReps, setPrevReps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTrackData, setNewTrackData] = useState("");

  const [test, setTest] = useState([{ track_id: 326 }]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  let timeout;
  const setLoadingTimeout = () => {
    timeout = setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

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
        setLoading(false);
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
        setSplits(data.data);
        clearTimeout(timeout);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const getWorkouts = (split_id) => {
    axios
      .get(`http://localhost:8000/api/auth/splits/workouts/${split_id}`, {
        withCredentials: true,
      })
      .then((data) => {
        setWorkouts(data.data);
        clearTimeout(timeout);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const getCurrentWorkout = (workout_id) => {
    axios
      .get(`http://localhost:8000/api/auth/splits/workout/${workout_id}`, {
        withCredentials: true,
      })
      .then((data) => {
        setCurrentWorkout(data.data[0]);
        clearTimeout(timeout);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const getCurrentTrackData = (workout_id) => {
    axios
      .get(
        `http://localhost:8000/api/auth/splits/workout/trackData/${workout_id}`,
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        setCurrentTrackData(data.data);
        clearTimeout(timeout);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const getExercises = (workout_id) => {
    axios
      .get(
        `http://localhost:8000/api/auth/splits/workouts/exercises/${workout_id}`,
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        setExercises(data.data);
        const newArray = [];
        data.data.map((el) => {
          el.trackdata.map((data) => newArray.push(data));
        });
        setCurrentTrackData(newArray);
        clearTimeout(timeout);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const addSplit = (e, title, days) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/auth/split/new",
        { title, days },
        { withCredentials: true }
      )
      .then((data) => {
        if (data) {
          setIsModalOpen(false);
          getSplits();
        }
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  };

  const addWorkout = (e, title, split_id) => {
    axios
      .post(
        "http://localhost:8000/api/auth/split/workout/new",
        { title, split_id },
        { withCredentials: true }
      )
      .then(() => {
        getWorkouts(split_id);
        setIsModalOpen(false);
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  };

  const addExercise = (e, title, goal_sets, goal_reps, workout_id) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/auth/split/workout/exercise/new",
        { title, goal_sets, goal_reps, workout_id },
        { withCredentials: true }
      )
      .then(() => {
        setIsModalOpen(false);
        getExercises(workout_id);
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  };

  const addNewSet = (exercise_id, workout_id, day) => {
    axios
      .post(
        "http://localhost:8000/api/auth/split/workout/exercise/set/new",
        { exercise_id, workout_id, day },
        { withCredentials: true }
      )
      .then((data) => {
        getExercises(workout_id);
        setTest((prevData) => [...prevData, data.data[0]]);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const addTrackData = (workout_id) => {
    axios
      .post(
        "http://localhost:8000/api/auth/split/workout/exercise/track",
        { workout_id, currentTrackData },
        { withCredentials: true }
      )
      .then((data) => {
        getExercises(workout_id);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const deleteSplit = (e, split_id) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/auth/split/delete", {
      method: "DELETE",
      credentials: "include", // include cookies in the request
      body: JSON.stringify({ split_id: split_id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getSplits();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const deleteWorkout = (e, split_id, workout_id) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/auth/split/workout/delete", {
      method: "DELETE",
      credentials: "include", // include cookies in the request
      body: JSON.stringify({ split_id: split_id, workout_id: workout_id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getWorkouts(split_id);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const deleteExercise = (e, workout_id, exercise_id) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/auth/split/workout/exercise/delete", {
      method: "DELETE",
      credentials: "include", // include cookies in the request
      body: JSON.stringify({
        workout_id: workout_id,
        exercise_id: exercise_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getExercises(workout_id);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const deleteSet = (e, workout_id, exercise_id, track_id) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/auth/split/workout/exercise/set/delete", {
      method: "DELETE",
      credentials: "include", // include cookies in the request
      body: JSON.stringify({
        workout_id: workout_id,
        exercise_id: exercise_id,
        track_id: track_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getExercises(workout_id);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const globalState = {
    user,
    setUser,
    setLoadingTimeout,
    splits,
    setSplits,
    workouts,
    setWorkouts,
    exercises,
    setExercises,
    getCurrentUser,
    logout,
    getSplits,
    getWorkouts,
    getCurrentWorkout,
    getCurrentTrackData,
    getExercises,
    loading,
    addSplit,
    addWorkout,
    addExercise,
    addNewSet,
    deleteSplit,
    deleteWorkout,
    deleteExercise,
    deleteSet,
    isModalOpen,
    setIsModalOpen,
    setLoading,
    error,
    setError,
    currentWorkout,
    currentTrackData,
    setCurrentTrackData,
    addTrackData,
    setTest,
    test,
    setNewTrackData,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {props.children}
    </GlobalContext.Provider>
  );
};
