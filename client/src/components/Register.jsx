import React from "react";
import axios from "axios";
import $ from "jquery";

export default function Register() {
  function handleRegister(e) {
    e.preventDefault();

    const name = $("input[name='regName']").val();
    const email = $("input[name='regEmail']").val();
    const password = $("input[name='regPassword']").val();
  }

  function showLogin() {
    $(".loginDiv").show();
    $(".regDiv").hide();
  }

  return (
    <div className="regDiv" style={{ display: "none" }}>
      <form className="loginForm bebas-neue" onSubmit={handleRegister}>
        <h1 className="bebas-neue">Register</h1>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Name
          </span>
          <input
            type="email"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            name="regName"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Email
          </span>
          <input
            type="email"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            name="regEmail"
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
            name="rogPassword"
          />
        </div>
        <button type="submit" className="logRegButton bebas-neue">
          Register
        </button>
        <a className="switchButton">
          <button className="bebas-neue" onClick={showLogin}>
            have an Account with us?
          </button>
        </a>
      </form>
    </div>
  );
}
