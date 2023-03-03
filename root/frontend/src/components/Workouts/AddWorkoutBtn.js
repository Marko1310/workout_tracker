import "./AddWorkoutBtn.css";
import { useContext } from "react";

import addLogo from "../../images/plus-circle.png";
import { ModalContext } from "../../context/ModalContext";

const AddWorkoutBtn = () => {
  const [isModalOpen, setIsModalOpen] = useContext(ModalContext);

  return (
    <div className={`addNewExercise-container ${isModalOpen ? `blurred` : ""}`}>
      <img
        onClick={() => setIsModalOpen(true)}
        className="addLogo"
        alt="addLogo"
        src={addLogo}
      />
      <p>Add new workout</p>
    </div>
  );
};

export default AddWorkoutBtn;
