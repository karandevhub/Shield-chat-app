import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";

let user;
const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
  console.log(user);
};
const Join = () => {
  const [name, setName] = useState("");
  console.log(name);
  return (
    <div className="body">
      <div className="container">
        <h1>Join Chat</h1>
        <form className="form">
          <input
            className="input"
            type="text"
            placeholder="Enter your name"
            id="joinInput"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Link to="/chat" onClick={(e) => (!name ? e.preventDefault() : null)}>
            <button className="button" onClick={sendUser} type="submit">
              Join
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Join;
export { user };
