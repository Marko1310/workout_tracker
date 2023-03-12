import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Exercise from "./Exercise";
import Scroll from "../Scroll/Scroll";
import "./Workout.css";
import { GlobalContext } from "../../context/GlobalContext";
import NewExerciseModal from "./NewExerciseModal";
// import Timer from "../Timer/Timer";
import { useNavigate } from "react-router-dom";

const WorkoutSplit = () => {
  const { isModalOpen } = useContext(GlobalContext);
  const { setIsModalOpen } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  const { exercises } = useContext(GlobalContext);
  const { setError } = useContext(GlobalContext);
  const { getExercises } = useContext(GlobalContext);
  const { currentWorkout } = useContext(GlobalContext);
  const { getCurrentWorkout } = useContext(GlobalContext);

  const { getCurrentTrackData } = useContext(GlobalContext);

  const { id } = useParams();
  const [trackData, setTrackData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    getExercises(id);
    getCurrentWorkout(id);
    getCurrentTrackData(id);
    // updateTrackData()
  }, [user, navigate]);

  // const updateTrackData = (exercises) => {
  //   exercises.map((exercise) => {
  //     setTrackData((prevData) => {
  //       const existingId = prevData.findIndex((obj) => obj.id === exercise_id);
  //       if (existingId !== -1) {
  //         const updateObject = {
  //           ...prevData[existingId],
  //           exercise_id: exercise.exercise_id,
  //           weight: 0,
  //           reps: 0,
  //           day: currentWorkout.day,
  //         };
  //         return [...prevData.slice(0, existingId), updateObject];
  //       } else {
  //         const newObject = {
  //           exercise_id: exercise.exercise_id,
  //           weight: 0,
  //           reps: 0,
  //           day: currentWorkout.day,
  //         };
  //         return [...prevData, newObject];
  //       }
  //     });
  //   });
  // };

  // [
  //   ...prevData,
  //   {
  //     exercise_id: exercise.exercise_id,
  //     weight: 0,
  //     reps: 0,
  //     day: currentWorkout.day,
  //   },
  // ]

  // updateTrackData();

  const handleModal = () => {
    setError("");
    setIsModalOpen((setIsModalOpen) => !setIsModalOpen);
  };

  return (
    <div className="workout-main-container">
      <div className={`workout ${isModalOpen ? "blurred" : ""}`}>
        <div className="container">
          <div className="description-container">
            <p>{currentWorkout.workout_name}</p>
            <p>{`Workout #${currentWorkout.day}`}</p>
            {/* <Timer /> */}
            <button className="buttonFinish">Finish</button>
            {/* <div>Notes</div> */}
          </div>
          {/* <Scroll> */}
          {exercises.map((el) => {
            return (
              <Exercise
                key={el.exercise_id}
                el={el}
                setTrackData={setTrackData}
              />
            );
          })}
          {/* </Scroll> */}

          <div className="button-container">
            <button onClick={() => handleModal()} className="workoutBtn add">
              Add exercise
            </button>
            <button className="workoutBtn">Save workout</button>
          </div>
        </div>
      </div>
      <NewExerciseModal />
    </div>
  );
};

export default WorkoutSplit;
