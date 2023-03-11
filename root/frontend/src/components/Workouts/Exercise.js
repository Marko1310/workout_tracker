import "./Exercise.css";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const Exercise = ({ el }) => {
  const { addNewSet } = useContext(GlobalContext);
  const { setLoading } = useContext(GlobalContext);
  const { deleteExercise } = useContext(GlobalContext);
  const { deleteSet } = useContext(GlobalContext);
  const isTrackEmpty = el.sets_reps_weight[0].id === null;
  const { id } = useParams();

  const handleNewSet = (e) => {
    e.preventDefault();
    setLoading(true);
    addNewSet(el.exercise_id, id);
  };

  const handleDeleteExercise = (e, workout_id, exercise_id) => {
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

  const handleDeleteSet = (e, workout_id, exercise_id, track_id) => {
    deleteSet(e, workout_id, exercise_id, track_id);
    setLoading(true);
  };

  return (
    <div className="exercise-container">
      <div className="title-container">
        <p className="exercise-title">
          {el.exercise_name} {el.goal_sets} x {el.goal_reps}
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

      {/* <form> */}
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
              <p
                onClick={(e) => {
                  // const parentId = this.getAttribute("data-parent-id");
                  handleDeleteSet(e, id, el.exercise_id, element.id);
                }}
                className="delete-set"
              >
                x
              </p>
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
