import { useEffect } from "react";
import "./Exercise.css";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Exercise = ({ el }) => {
  const { addNewSet } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  const { setLoading } = useContext(GlobalContext);
  const { deleteExercise } = useContext(GlobalContext);
  const { deleteSet } = useContext(GlobalContext);
  const { setLoadingTimeout } = useContext(GlobalContext);
  const isTrackEmpty = el.sets_reps_weight[0].id === null;
  const { id } = useParams();

  const handleNewSet = (e) => {
    e.preventDefault();
    setLoadingTimeout();
    addNewSet(el.exercise_id, id);
  };

  const handleDeleteExercise = (e, workout_id, exercise_id) => {
    if (
      window.confirm(
        "By removing the exercise, you will also remove all previous data?"
      )
    ) {
      deleteExercise(e, workout_id, exercise_id);
      setLoadingTimeout();
    }
    e.stopPropagation();
  };

  const handleDeleteSet = (e, workout_id, exercise_id, track_id) => {
    deleteSet(e, workout_id, exercise_id, track_id);
    setLoadingTimeout();
  };

  let lastSet = 0;
  el.sets_reps_weight.map((el) => {
    if (el.sets > lastSet) lastSet = el.sets;
  });

  return (
    <div className="exercise-container">
      <div className="title-container">
        <p className="exercise-title">
          {el.exercise_name} ({el.goal_sets} x {el.goal_reps})
        </p>
        <p
          onClick={(e) => handleDeleteExercise(e, id, el.exercise_id)}
          className="delete-exercise"
        >
          Delete
        </p>
      </div>
      <div className="exercise-navbar">
        <p className="exercise-navbar-title">Set</p>
        <p className="exercise-navbar-title">Previous</p>
        <p className="exercise-navbar-title">kg</p>
        <p className="exercise-navbar-title">Reps</p>
      </div>
      {!isTrackEmpty &&
        el.sets_reps_weight.map((element) => {
          return (
            <div
              parent-id={element.exercise_id}
              key={element.id}
              className="exercise"
            >
              <p className="set">{element.sets}</p>
              <p className="previous">
                {element.weight} kg x {element.reps}
              </p>
              <input
                className="exercise-forms"
                type="text"
                id="kg"
                name="kg"
                placeholder="kg"
              ></input>
              <input
                className="exercise-forms"
                type="text"
                id="reps"
                name="reps"
                placeholder="reps"
              ></input>
              {lastSet === element.sets && (
                <p
                  onClick={(e) => {
                    handleDeleteSet(e, id, el.exercise_id, element.id);
                  }}
                  className="delete-set"
                >
                  x
                </p>
              )}
            </div>
          );
        })}
      <button onClick={(e) => handleNewSet(e)} className="addSetBtn">
        + Add Set
      </button>
    </div>
  );
};

export default Exercise;
