import "./NewWorkout.css";

const NewWorkout = () => {
  return (
    <div className="newWorkout-container">
      <p className="title">Create new workout</p>
      <form>
        <label htmlFor="title">Title of the workout</label>
        <input
          className="forms"
          type="text"
          id="title"
          name="title"
          placeholder="e.g. Push/Pull/Legs"
        ></input>

        <label htmlFor="days">Number of days in a week</label>

        <select className="forms">
          <option name="1">1</option>
          <option name="2">2</option>
          <option name="3">3</option>
        </select>

        <button className="login-button">Create workout</button>
      </form>
    </div>
  );
};

export default NewWorkout;
