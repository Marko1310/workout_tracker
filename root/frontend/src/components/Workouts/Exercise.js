import "./Exercise.css";

const Exercise = ({ el }) => {
  return (
    <div className="exercise-container">
      <div className="title-container">
        <p className="exercise-title">{el.exercise_name}</p>
        <div>...</div>
      </div>
      <div className="exercise-navbar">
        <p>Set</p>
        <p>Previous</p>
        <p>kg</p>
        <p>Reps</p>
      </div>

      {/* <form> */}
      {el.sets_reps_weigh.map((el) => {
        return (
          <div className="exercise">
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
      <button className="addSetBtn">+ Add Set</button>
    </div>
  );
};

export default Exercise;
