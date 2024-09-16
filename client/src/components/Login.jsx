import React from "react";
import axios from "axios";
import $ from "jquery";

export default function Login() {
  function handleLogin(e) {
    e.preventDefault();

    const email = $("input[name='logEmail']").val();
    const password = $("input[name='logPassword']").val();

    console.log(email, password);
  }

  function showRegister() {
    console.log("HEllo");

    $(".loginDiv").hide();
    $(".regDiv").show();
  }

  return (
    <div className="loginDiv">
      <form className="loginForm bebas-neue" onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Email
          </span>
          <input
            type="email"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            name="logEmail"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Password
          </span>
          <input
            type="password"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            name="logPassword"
          />
        </div>
        <button type="submit" className="logRegButton bebas-neue">
          Login
        </button>
        <a className="switchButton">
          <button className="bebas-neue" onClick={showRegister}>
            Dont have an Account with us?
          </button>
        </a>
      </form>
    </div>
  );
}
