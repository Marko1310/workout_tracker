import "./Exercise.css";

const Exercise = () => {
  return (
    <div className="exercise-container">
      <p>Sets</p>
      <p>Previous</p>
      <p>kg</p>
      <p>Reps</p>

      {/* <form> */}
      <p className="sets">1</p>
      <p className="previous">100kg x 5</p>
      {/* <label htmlFor="name"></label> */}
      <input
        //   className="forms"
        type="text"
        id="kg"
        name="kg"
        placeholder="kg"
      ></input>
      <input
        //   className="forms"
        type="text"
        id="reps"
        name="reps"
        placeholder="reps"
      ></input>

      <p className="sets">1</p>
      <p className="previous">100kg x 5</p>
      {/* <label htmlFor="name"></label> */}
      <input
        //   className="forms"
        type="text"
        id="kg"
        name="kg"
        placeholder="kg"
      ></input>
      <input
        //   className="forms"
        type="text"
        id="reps"
        name="reps"
        placeholder="reps"
      ></input>
      {/* </form> */}
    </div>
  );
};

export default Exercise;