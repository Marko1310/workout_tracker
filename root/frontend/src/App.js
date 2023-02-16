import "./index.css";

import Particle from "./components/Particle/Particle.js";

import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Particle />
      <Login />
    </div>
  );
}

export default App;
