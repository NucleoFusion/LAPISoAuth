import React from "react";
import Login from "./Login";
import Register from "./Register";

export default function Home() {
  return (
    <div className="homeDiv">
      <Login />
      <Register />
    </div>
  );
}
