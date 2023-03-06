// React
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Css
import "./Login.css";

// Context
import { GlobalContext } from "../../context/GlobalContext";

function Login() {
  const { user, setUser } = useContext(GlobalContext);
  const [form, setForm] = useState("signup");
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user && navigate) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/auth/login", {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input.email,
        password: input.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user.id) {
          setUser(data);
        }
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="form-validate">
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

        <button className="login-button">
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
