import addLogo from "../../images/plus-circle.png";
import { useModal } from "../ModalContext/ModalContext";
import "./AddNewWorkout.css";

const AddNewWorkout = () => {
  const { isModalOpen } = useModal();

  return (
    <div className={`addNewWorkout-container ${isModalOpen ? `blurred` : ""}`}>
      <img className="addLogo" alt="addLogo" src={addLogo} />
      <p>Add new workout</p>
    </div>
  );
};

export default AddNewWorkout;
