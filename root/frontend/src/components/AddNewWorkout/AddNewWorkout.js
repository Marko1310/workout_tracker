import "./AddNewWorkout.css";
import { useContext } from "react";

import addLogo from "../../images/plus-circle.png";
import { ModalContext } from "../ModalContext/ModalContext";

const AddNewWorkout = () => {
  const [isModalOpen, setIsModalOpen] = useContext(ModalContext);

  return (
    <div className={`addNewWorkout-container ${isModalOpen ? `blurred` : ""}`}>
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

export default AddNewWorkout;
