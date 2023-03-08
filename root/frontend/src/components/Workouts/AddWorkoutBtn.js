import "./AddWorkoutBtn.css";
import { useContext } from "react";

import addLogo from "../../images/plus-circle.png";
import { GlobalContext } from "../../context/GlobalContext";

const AddWorkoutBtn = () => {
  const { isModalOpen } = useContext(GlobalContext);
  const { setIsModalOpen } = useContext(GlobalContext);

  return (
    <div className={`addNewExercise-container ${isModalOpen ? `blurred` : ""}`}>
      <img
        onClick={isModalOpen ? null : () => setIsModalOpen(true)}
        className="addLogo"
        alt="addLogo"
        src={addLogo}
      />
      <p>Add new workout</p>
    </div>
  );
};

export default AddWorkoutBtn;
