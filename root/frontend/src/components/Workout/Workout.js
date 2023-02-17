import React from "react";
import Exercise from "../Exercise/Exercise";

const Workout = () => {
  return (
    <div className="workout-container">
      <p>Title</p>
      <p>Time</p>
      <div>Notes</div>
      <Exercise />
      <button>Add exercise</button>
      <button>Save exercise</button>
    </div>
  );
};

export default Workout;
