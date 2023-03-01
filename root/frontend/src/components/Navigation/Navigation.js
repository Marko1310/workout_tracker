import "./Navigation.css";
import logo from "../../images/workout-icon.jpg";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation-container">
      <div className="user">
        <img className="navigation-logo" src={logo} alt="Logo" />
        <div className="navigation-user">Marko</div>
      </div>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Logout</NavLink>
      </div>
    </div>
  );
};

export default Navigation;
