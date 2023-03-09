import React, { useContext, useEffect } from "react";
import AddSplitBtn from "./AddSplitBtn";
import NewSplit from "./NewSplitModal.js";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext.js";

import "./SplitGrid.css";
import logo from "../../images/workout.png";

const WorkoutSplitGrid = () => {
  const { isModalOpen } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  const { splits } = useContext(GlobalContext);
  const { getWorkouts } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { getSplits } = useContext(GlobalContext);
  const { deleteSplit } = useContext(GlobalContext);
  const { setLoading } = useContext(GlobalContext);

  const changeRoute = (id) => {
    getWorkouts(id);
    navigate(`/workouts/${id}`);
  };

  const handleDelete = (e, split_id) => {
    deleteSplit(e, split_id);
    setLoading(true);
    e.stopPropagation();
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    getSplits();
  }, [user, navigate]);

  return (
    <div className="main-container">
      <div className={`${isModalOpen ? "blurred" : ""}`}>
        <p className="choose">Choose a Workout Split</p>
        <div className="workout-grid">
          {splits.length > 0 &&
            splits.map((el) => {
              return (
                <ul
                  key={el.split_id}
                  onClick={isModalOpen ? null : () => changeRoute(el.split_id)}
                  className="workout-container"
                >
                  <div className="image-and-delete-container">
                    <img
                      className="workout-image"
                      src={logo}
                      alt="Workout"
                    ></img>
                    <button
                      onClick={(e) => handleDelete(e, el.split_id)}
                      className="delete-split"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="workout-card">
                    <li className="workout-card-title">{el.split_name}</li>
                    <li>{el.days} day split:</li>
                    {el.array_agg.map((name) => {
                      return <li> - {name} day</li>;
                    })}
                    <li>--------------------------------</li>
                    <li>Created on: {el.date.slice(0, 10)}</li>
                  </div>
                </ul>
              );
            })}
        </div>
      </div>

      <NewSplit />
      <AddSplitBtn />
    </div>
  );
};

export default WorkoutSplitGrid;
