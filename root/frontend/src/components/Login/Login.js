import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [form, setForm] = useState("login");

  return (
    <div className="login-container">
      <form className="form-validate">
        <p className="title">{form === "login" ? `Login Form` : `Signup`}</p>
        {form === "signup" && (
          <>
            <label htmlFor="name"></label>
            <input
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
          className="forms"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
        ></input>
        {alert.email && <p className="register-alert">Wrong credentials</p>}

        <label htmlFor="password"></label>
        <input className="forms" type="text" placeholder="Password"></input>

        <button className="login-button">Login</button>
        <div className="login-footer">
          <p>Not a member? </p>
          <a className="sign-up">Sign up now</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
