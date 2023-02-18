import "./index.css";

import Particle from "./components/Particle/Particle.js";

import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Workout from "./components/Workout/Workout";

function App() {
  return (
    <div className="App">
      <Navigation />
      {/* <Login /> */}
      <Workout />
      <Particle />
    </div>
  );
}

export default App;
