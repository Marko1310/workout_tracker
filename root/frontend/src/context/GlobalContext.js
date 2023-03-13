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
  const [prevTrackData, setPrevTrackData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  let timeout;
  const setLoadingTimeout = () => {
    timeout = setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  ///////////////////////////// USER ////////////////////////////
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

  ///////////////////////////// RETRIEVE DATA ////////////////////////////
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

  // const getCurrentTrackData = (workout_id) => {
  //   axios
  //     .get(
  //       `http://localhost:8000/api/auth/splits/workout/trackData/${workout_id}`,
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((data) => {
  //       // setCurrentTrackData(data.data);
  //       clearTimeout(timeout);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // };

  const getPrevTrackData = (workout_id) => {
    axios
      .get(
        `http://localhost:8000/api/auth/splits/workouts/exercises/${workout_id}`,
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        setPrevTrackData(data.data);
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
        `http://localhost:8000/api/auth/splits/workouts/exercises/data/${workout_id}`,
        {
          withCredentials: true,
        }
      )
      .then((data) => {
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

  ///////////////////////////// ADD DATA ////////////////////////////
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
        getPrevTrackData(workout_id);
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
        console.log(data.data[0]);
        getPrevTrackData(workout_id);
        setCurrentTrackData((prevData) => [...prevData, data.data[0]]);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const addTrackData = (workout_id) => {
    console.log(currentTrackData);
    axios
      .post(
        "http://localhost:8000/api/auth/split/workout/exercise/track",
        { workout_id, currentTrackData },
        { withCredentials: true }
      )
      .then((data) => {
        getPrevTrackData(workout_id);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  ///////////////////////////// DELETE DATA ////////////////////////////
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
        getPrevTrackData(workout_id);
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
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0].track_id);
        const newArray = currentTrackData.filter(
          (el) => el.track_id !== data[0].track_id
        );
        setCurrentTrackData(newArray);
        getPrevTrackData(workout_id);
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
    prevTrackData,
    getCurrentUser,
    logout,
    getSplits,
    getWorkouts,
    getCurrentWorkout,
    getCurrentTrackData,
    getPrevTrackData,
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
    addTrackData,
    setCurrentTrackData,
    currentTrackData,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {props.children}
    </GlobalContext.Provider>
  );
};
