import "./Exercise.css";

const Exercise = () => {
  return (
    <div className="exercise-container">
      <div className="title-container">
        <p className="exercise-title">Name of the exercise</p>
        <div>...</div>
      </div>
      <div className="exercise">
        <p>Set</p>
        <p>Previous</p>
        <p>kg</p>
        <p>Reps</p>

        {/* <form> */}
        <p className="set">1</p>
        <p className="previous">100 kg x 5</p>
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

        <p className="set">2</p>
        <p className="previous">100kg x 5</p>
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

        <p className="set">3</p>
        <p className="previous">100kg x 5</p>
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

        <p className="set">3</p>
        <p className="previous">100kg x 5</p>
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
        {/* </form> */}
      </div>
      <button className="addSetBtn">+ Add Set</button>
    </div>
  );
};

export default Exercise;
