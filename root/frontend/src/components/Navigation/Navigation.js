import "./Navigation.css";
import logo from "../../images/workout-icon.jpg";

const Navigation = () => {
  return (
    <div className="navigation-container">
      <img className="navigation-logo" src={logo} alt="Logo" />
      <div className="navigation-user">Hello Marko!</div>
    </div>
  );
};

export default Navigation;
