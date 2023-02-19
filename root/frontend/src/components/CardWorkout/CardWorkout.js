import "./CardWorkout.css";
import logo from "../../images/workout.png";

const CardWorkout = () => {
  return (
    <div className="carDB--container">
      <div className="carDB">
        <ul className="carDB--list--container">
          <div>
            <img className="carDB--list--image" src={logo} alt="Workout"></img>
          </div>
          <div className="carDB--list--card">
            <li className="carDB--list--card--title">Workout title</li>
            <li>4 day split:</li>
            <li> - Upper day</li>
            <li> - Lower day</li>
            <li> - Upper day</li>
            <li>--------------------------------</li>
            <li>Date created: 2022-12-20</li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default CardWorkout;
