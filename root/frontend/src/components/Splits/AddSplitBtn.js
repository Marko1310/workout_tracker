import "./AddSplitBtn.css";
import { useContext } from "react";

import addLogo from "../../images/plus-circle.png";
import { GlobalContext } from "../../context/GlobalContext";

const AddNewWorkoutBtn = () => {
  const { isModalOpen } = useContext(GlobalContext);
  const { setIsModalOpen } = useContext(GlobalContext);

  return (
    <div className={`addNewWorkout-container ${isModalOpen ? `blurred` : ""}`}>
      <img
        onClick={() => setIsModalOpen(true)}
        className="addLogo"
        alt="addLogo"
        src={addLogo}
      />
      <p>Add new workout split</p>
    </div>
  );
};

export default AddNewWorkoutBtn;
