import React from "react";
import "../index.css";
import "../css/pages/status.css";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";

function StatusTop() {
  const navigate = useNavigate();

  return (
    <div id="top" className="top">
      <div className="img-container" onClick={() => navigate(-1)}>
        <img
          src={require("../images/arrow.png")}
          style={{ width: "15.5vw" }}
          alt=""
        ></img>
      </div>
      <p className="top-title">Row Selection</p>
    </div>
  );
}

function StatusContent() {
  const navigate = useNavigate();

  let StatusRow = [];

  for (let i = 1; i <= 12; i++) {
    StatusRow.push(
      <div
        className="status-item"
        onClick={() => navigate("/status", { state: { index: i } })}
        key={i}
      >
        <div
          style={{
            margin: "0 0 0 10%",
            width: "10%",
          }}
        >
          <p style={{ fontSize: "2vh", color: "#7AA0B8" }}>{i}</p>
        </div>
        <div className="status-row-status" style={{ width: "70%" }}>
          <p
            style={{ fontSize: "1.75vh", color: "#737373", fontWeight: "bold" }}
          >
            ROW {i}
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
