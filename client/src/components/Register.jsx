import React from "react";
import axios from "axios";
import $ from "jquery";
import { useLocation } from "react-router-dom";

export default function Register() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  // console.log(query.get("page"));

  async function handleRegister(e) {
    e.preventDefault();

    if ($(".regDiv:hidden")) {
      return;
    }

    const name = $("input[name='regName']").val();
    const email = $("input[name='regEmail']").val();
    const password = $("input[name='regPassword']").val();

    console.log(
      `${process.env.REACT_APP_BASE_URL}api/register?email=${email}&password=${password}&name=${name}`
    );

    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/register?email=${email}&password=${password}&name=${name}`
    );

    if ((await result.data.Message) === "Authenticated") {
      if (!queryParams.get("successRedirect")) {
        alert("Invalid Redriection Link Provided");
        return;
      } else {
        window.location.href =
          queryParams.get("successRedirect") + `?id=${result.data.Id}`;
      }
    } else {
      if (!queryParams.get("failureRedirect")) {
        alert("Invalid Redriection Link Provided");
        return;
      } else {
        window.location.href =
          queryParams.get("failureRedirect") + `?id=${result.data.Id}`;
      }
    }
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
            type="text"
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
            name="regPassword"
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
