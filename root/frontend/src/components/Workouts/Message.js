// React
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

// Context
import { GlobalContext } from "../../context/GlobalContext";

// css
import "./Message.css";

// image
import success from "../../images/success.png";
import errorImg from "../../images/error.png";

const NewExerciseModal = ({ successMsg }) => {
  const { isModalOpen } = useContext(GlobalContext);
  const { setIsModalOpen } = useContext(GlobalContext);
  const { addExercise } = useContext(GlobalContext);
  const { setLoadingTimeout } = useContext(GlobalContext);
  const { error } = useContext(GlobalContext);
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [goal_sets, setGoal_sets] = useState(0);
  const [goal_reps, setGoal_reps] = useState(0);

  const handleNewExercise = (e) => {
    if (title && goal_sets && goal_reps) {
      setLoadingTimeout();
    }
    addExercise(e, title, goal_sets, goal_reps, id);
  };

  return (
    <div
      className={`message-container ${isModalOpen && successMsg ? "show" : ""}`}
    >
      <div className="success-images-container">
        {successMsg === "success" ? (
          <img className="success" src={success} alt="success"></img>
        ) : (
          <img className="error" src={errorImg} alt="error"></img>
        )}
        {successMsg === "success" ? (
          <p className="message-title">Workout saved</p>
        ) : (
          <p className="message-title">Error</p>
        )}
      </div>
    </div>
  );
};

export default NewExerciseModal;
