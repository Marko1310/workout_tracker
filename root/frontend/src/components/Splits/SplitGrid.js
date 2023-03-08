import React, { useContext, useEffect } from "react";
import AddSplitBtn from "./AddSplitBtn";
import NewSplit from "./NewSplitModal.js";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext.js";

import "./SplitGrid.css";
import logo from "../../images/workout.png";
import axios from "axios";

const WorkoutSplitGrid = () => {
  const { isModalOpen } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  const { splits } = useContext(GlobalContext);
  const { getWorkouts } = useContext(GlobalContext);
  const navigate = useNavigate();

  const changeRoute = function (id) {
    getWorkouts(id);
    navigate(`/workouts/:${id}`);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
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
                  onClick={() => changeRoute(el.split_id)}
                  className="workout-container"
                >
                  <img className="workout-image" src={logo} alt="Workout"></img>
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
