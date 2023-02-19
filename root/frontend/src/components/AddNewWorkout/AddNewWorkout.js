import addLogo from "../../images/plus-circle.png";
import "./AddNewWorkout.css";

const AddNewWorkout = () => {
  return (
    <div className="addNewWorkout-container">
      <img className="addLogo" alt="addLogo" src={addLogo} />
      <p>Add new workout</p>
    </div>
  );
};

export default AddNewWorkout;
