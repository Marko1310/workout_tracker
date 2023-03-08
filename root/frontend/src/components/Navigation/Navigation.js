import "./Navigation.css";
import logo from "../../images/workout-icon.jpg";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";

const Navigation = () => {
  const { user, setUser } = useContext(GlobalContext);
  const { logout } = useContext(GlobalContext);
  return (
    <div className="navigation-container">
      <div className="user">
        <img className="navigation-logo" src={logo} alt="Logo" />
        {user && <div className="navigation-user">Hello {user.name}</div>}
      </div>
      {user && (
        <div className="links">
          <NavLink to="/dashboard">Home</NavLink>
          <NavLink onClick={() => logout()} to="/">
            Logout
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navigation;
