import "./Exercise.css";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const Exercise = ({ el }) => {
  const { addNewSet } = useContext(GlobalContext);
  const { setLoading } = useContext(GlobalContext);
  const { deleteExercise } = useContext(GlobalContext);
  const isTrackEmpty = el.sets_reps_weight[0].id === null;
  const { id } = useParams();

  const handleNewSet = (e) => {
    e.preventDefault();
    setLoading(true);
    addNewSet(el.exercise_id, id);
  };

  const handleDelete = (e, workout_id, exercise_id) => {
    if (
      window.confirm(
        "By removing the exercise, you will also remove all previous data?"
      )
    ) {
      deleteExercise(e, workout_id, exercise_id);
      setLoading(true);
    }
    e.stopPropagation();
  };

  return (
    <div className="exercise-container">
      <div className="title-container">
        <p className="exercise-title">
          {el.exercise_name} {el.goal_sets} x {el.goal_reps}
        </p>
        <p
          onClick={(e) => handleDelete(e, id, el.exercise_id)}
          className="delete-exercise"
        >
          Delete
        </p>
      </div>
      <div className="exercise-navbar">
        <p>Set</p>
        <p>Previous</p>
        <p>kg</p>
        <p>Reps</p>
      </div>

      {/* <form> */}
      {!isTrackEmpty &&
        el.sets_reps_weight.map((el) => {
          return (
            <div key={el.id} className="exercise">
              <p className="set">{el.sets}</p>
              <p className="previous">
                {el.weight} kg x {el.reps}
              </p>
              {/* <label htmlFor="name"></label> */}
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
            </div>
          );
        })}

      {/* </form> */}
      <button onClick={(e) => handleNewSet(e)} className="addSetBtn">
        + Add Set
      </button>
    </div>
  );
};

export default Exercise;
