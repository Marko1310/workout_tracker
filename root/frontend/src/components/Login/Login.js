const Login = () => {
  return (
    <div className="login-container">
      <form className="form-validate">
        <p className="title">LOGIN</p>
        <label htmlFor="email"></label>
        <input
          className="forms"
          type="text"
          id="fname"
          name="fname"
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
};

export default Login;
