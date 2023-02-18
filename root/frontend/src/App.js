import "./index.css";

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
        <Workout />
        <Particle />
      </div>
    </div>
  );
}

export default App;
