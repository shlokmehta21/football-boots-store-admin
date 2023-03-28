import React, { useState } from "react";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();

    login(dispatch, { username, password });
  };

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <h1>SIGN IN</h1>
        <form className="loginForm">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick}>
            {/* {isFetching ? "Loading..." : "Login"} */}
            Login
          </button>
          {/* {error && <p className="error">Something went wrong :(</p>} */}
        </form>
      </div>
    </div>
  );
}

export default Login;
