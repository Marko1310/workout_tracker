import "./index.css";
import addLogo from "./images/plus-circle.png";

import Particle from "./components/Particle/Particle.js";

import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Workout from "./components/Workout/Workout";
import NewWorkout from "./components/NewWorkout/NewWorkout";

function App() {
  return (
    <div>
      <div className="App">
        <Navigation />
        <div className="content">
          <div className="blur">
            {/* <Login /> */}
            {/* <Workout /> */}
            <div className="addNewWorkout-container">
              <img className="addLogo" alt="addLogo" src={addLogo} />
              <p>Add new workout</p>
            </div>
            <Particle />
          </div>
        </div>
      </div>
      <NewWorkout />
    </div>
  );
}

export default App;
