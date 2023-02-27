import "./AddExerciseBtn.css";
import { useContext } from "react";

import addLogo from "../../images/plus-circle.png";
import { ModalContext } from "../ModalContext/ModalContext";

const AddExerciseBtn = () => {
  const [isModalOpen, setIsModalOpen] = useContext(ModalContext);

  return (
    <div className={`addNewExercise-container ${isModalOpen ? `blurred` : ""}`}>
      <img
        onClick={() => setIsModalOpen(true)}
        className="addLogo"
        alt="addLogo"
        src={addLogo}
      />
      <p>Add new exercise</p>
    </div>
  );
};

export default AddExerciseBtn;
