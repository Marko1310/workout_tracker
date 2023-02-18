import "./index.css";
import addLogo from "./images/plus-circle.png";

import Particle from "./components/Particle/Particle.js";

import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Workout from "./components/Workout/Workout";

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="content">
        {/* <Login /> */}
        {/* <Workout /> */}
        <Particle />
      </div>
      <div className="addNewWorkout-container">
        <img className="addLogo" alt="addLogo" src={addLogo} />
        <p>Add new workout</p>
      </div>
    </div>
  );
}

export default App;
