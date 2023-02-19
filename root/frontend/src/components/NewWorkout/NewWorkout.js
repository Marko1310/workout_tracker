import "./NewWorkout.css";

const NewWorkout = () => {
  return (
    <div className="newWorkout-container">
      <form>
        <label htmlFor="title"></label>
        <input
          className="forms"
          type="text"
          id="title"
          name="title"
          placeholder="Name of the workout"
        ></input>

        <label htmlFor="days">Number of days in a week</label>

        <input
          className="forms"
          type="number"
          name="num-days"
          min="1"
          max="7"
        ></input>

        <button className="login-button">"Create workout"</button>
      </form>
    </div>
  );
};

export default NewWorkout;
