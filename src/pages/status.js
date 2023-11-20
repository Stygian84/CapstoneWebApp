import React from "react";
import "../index.css";
import "../css/pages/status.css";
import {
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
  useLocation,
} from "react-router-dom";

function StatusTop() {
  const navigate = useNavigate();
  const location = useLocation();
  const { index } = location.state || {}; // Extract the index from the state
  return (
    <div id="top" className="top">
      <div className="img-container" onClick={() => navigate(-1)}>
        <img
          src={require("../images/arrow.png")}
          style={{ width: "15.5vw" }}
          alt=""
        ></img>
      </div>
      <p className="top-title">ROW {index} STATUS</p>
    </div>
  );
}

function StatusContent() {
  const navigate = useNavigate();

  let StatusRow = [];
  let Status = [
    "LIGHTS",
    "AIR TEMPERATURE",
    "SOIL MOISTURE",
    "HUMIDITY",
    "SOIL pH",
    "LIGHT INTENSITY",
    "AIR QUALITY",
  ];
  for (let i = 0; i < Status.length; i++) {
    
    StatusRow.push(
      <div
        className="status-item"
        key={i}
      >
        <img
          style={{
            margin: "3% 0 3% 3%",
            padding: "3%",
            width: "10%",
          }}
          src={require(`../images/${Status[i]}.png`)}
          alt="Status"
        ></img>

        <div className="status-row-status" style={{ width: "70%" }}>
          <p
            style={{ fontSize: "1.75vh", color: "#737373", fontWeight: "bold" }}
          >
            {Status[i]}
          </p>
          <p style={{ fontSize: "1vh", color: "#A5A5A5", fontWeight: "500" }}>
            Overall Status : GOOD
          </p>
        </div>
        <div style={{ width: "10%" }}>
          <p
            style={{
              marginLeft: "auto",
              marginTop: "0",
              marginBottom: "0",
              paddingRight: "2%",
              fontSize: "3.5vh",
              color: "#C8C8C8",
            }}
          >
            &gt;
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="content" className="content">
      <div id="status-container">{StatusRow}</div>
    </div>
  );
}
export { StatusContent, StatusTop };
