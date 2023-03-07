// React
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Css
import "./Login.css";

// Context
import { GlobalContext } from "../../context/GlobalContext";

function Login() {
  // States
  const { user, setUser } = useContext(GlobalContext);
  const [form, setForm] = useState("login");
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { getSplits } = useContext(GlobalContext);

  // Routing
  const navigate = useNavigate();

  useEffect(() => {
    if (user && navigate) {
      navigate("/dashboard");
    }
  }, [user, navigate, getSplits]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let data = {};

    if (form === "signup") {
      data = {
        name: input.name,
        email: input.email,
        password: input.password,
      };
    } else {
      data = {
        email: input.email,
        password: input.password,
      };
    }

    axios
      .post(
        form === "signup"
          ? "http://localhost:8000/api/auth/register"
          : "http://localhost:8000/api/auth/login",
        data,
        { withCredentials: true }
      )
      .then(() => {
        getSplits();
        setUser("aaa");
      })
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data);
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-validate">
        <p className="title">{form === "login" ? `Login` : `Signup`}</p>
        <div className="buttons-container">
          <button
            onClick={(e) => {
              setForm("login");
              e.preventDefault();
            }}
            className={`loginButtons ${form === "login" ? "current" : ""}`}
          >
            Login
          </button>
          <button
            onClick={(e) => {
              setForm("signup");
              e.preventDefault("signup");
            }}
            className={`loginButtons ${form === "signup" ? "current" : ""}`}
          >
            Signup
          </button>
        </div>

        {form === "signup" && (
          <>
            <label htmlFor="name"></label>
            <input
              onChange={(e) =>
                setInput((prevInput) => ({
                  ...prevInput,
                  name: e.target.value,
                }))
              }
              className="forms"
              type="text"
              id="fname"
              name="fname"
              placeholder="Name"
            ></input>
          </>
        )}

        <label htmlFor="email"></label>
        <input
          onChange={(e) =>
            setInput((prevInput) => ({
              ...prevInput,
              email: e.target.value,
            }))
          }
          className="forms"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
        ></input>
        {alert.email && <p className="register-alert">Wrong credentials</p>}

        <label htmlFor="password"></label>
        <input
          onChange={(e) =>
            setInput((prevInput) => ({
              ...prevInput,
              password: e.target.value,
            }))
          }
          className="forms"
          type="password"
          placeholder="Password"
        ></input>

        <button type="submit" className="login-button">
          {form === "login" ? "Login" : "Register"}
        </button>
        {form === "login" && (
          <div className="login-footer">
            <p>Not a member? </p>
            <a onClick={() => setForm("signup")} className="sign-up">
              Sign up now
            </a>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
