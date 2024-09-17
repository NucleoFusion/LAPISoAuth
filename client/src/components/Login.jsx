import React from "react";
import axios from "axios";
import $ from "jquery";
import { useLocation } from "react-router-dom";

export default function Login() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  // console.log(queryPara.get("page"));

  async function handleLogin(e) {
    e.preventDefault();

    const email = $("input[name='logEmail']").val();
    const password = $("input[name='logPassword']").val();

    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/login?email=${email}&password=${password}`
    );

    if ((await result.data.Message) === "Authenticated") {
      window.location.href = queryParams.get("successRedirect");
    } else {
      window.location.href = queryParams.get("failureRedirect");
    }
  }

  function showRegister() {
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
