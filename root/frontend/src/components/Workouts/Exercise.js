import "./Exercise.css";

const Exercise = ({ el }) => {
  return (
    <div className="exercise-container">
      <div className="title-container">
        <p className="exercise-title">{el.exercise_name}</p>
        <div>...</div>
      </div>
      <div className="exercise">
        <p>Set</p>
        <p>Previous</p>
        <p>kg</p>
        <p>Reps</p>

        {/* <form> */}
        {el.sets_reps_weigh.map((el) => {
          return (
            <>
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
            </>
          );
        })}

        {/* </form> */}
      </div>
      <button className="addSetBtn">+ Add Set</button>
    </div>
  );
};

export default Exercise;
