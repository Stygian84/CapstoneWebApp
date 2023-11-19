import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div id="wrapper" className="wrapper">
        <Top />
        <Content />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

function Top() {
  return (
    <div id="top" className="top">
      <div className="img-container">
        <img
          src={require("./images/bars.png")}
          style={{ width: "15.5vw" }}
          alt=""
        ></img>
      </div>
      <p className="top-title">Home Monitoring</p>
    </div>
  );
}
function Content() {
  return (
    <div id="content" className="content">
      {/* Header Section */}
      <div id="header-container">
        <div id="morning">
          <p style={{ fontSize: "3vh" }}>Good Morning,</p>
          <p style={{ fontSize: "2.5vh" }}>Ron and Jen!</p>
        </div>
        <div id="weather-container">
          <p style={{ fontSize: "2vh" }}>Singapore</p>
          <p>Thursday 9am</p>
          <p>Mostly Cloudy</p>
          <p style={{ fontWeight: "bold" }}>28 °C</p>
        </div>
      </div>

      {/* Box Feature Section */}
      <div id="feature-container">
        <div className="feature-item">
          <img src={require("./images/greenstatus.png")} alt="Status"></img>
          <p style={{ color: "#8FA586" }}>Status</p>
        </div>
        <div className="feature-item" style={{ marginRight: "15%" }}>
          <img src={require("./images/camera.png")} alt="Camera"></img>
          <p style={{ color: "#8793AE" }}> Camera</p>
        </div>
        <div className="feature-item">
          <img src={require("./images/settings.png")} alt="Settings"></img>
          <p style={{ color: "#7A9E95" }}>Settings</p>
        </div>
        <div></div>
      </div>
      <div id="recent-header">
        <p style={{ fontWeight: "bold" }}>Recent</p>
      </div>

      {/* Recent item Section */}
      <div id="recent-container">
        <div className="recent-item">
          <img src={require("./images/greystatus.png")} alt="Status"></img>
          <div className="row-status">
            <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "500" }}>
              Row 2
            </p>
            <p style={{ fontSize: "1vh", color: "#A5A5A5", fontWeight: "500" }}>
              Status
            </p>
          </div>
          <p
            style={{
              marginLeft: "auto",
              marginTop: "0",
              marginBottom: "0",
              paddingRight: "2%",
              fontSize: "3.5vh",
            }}
          >
            &gt;
          </p>
        </div>

        <div className="recent-item">
          <img src={require("./images/greystatus.png")} alt="Status"></img>
          <div className="row-status">
            <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "500" }}>
              Row 5
            </p>
            <p style={{ fontSize: "1vh", color: "#A5A5A5", fontWeight: "500" }}>
              Status
            </p>
          </div>
          <p
            style={{
              marginLeft: "auto",
              marginTop: "0",
              marginBottom: "0",
              paddingRight: "2%",
              fontSize: "3.5vh",
            }}
          >
            &gt;
          </p>
        </div>

        <div className="recent-item">
          <img src={require("./images/greycamera.png")} alt="Camera"></img>
          <div className="row-status">
            <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "500" }}>
              Row 2
            </p>
            <p style={{ fontSize: "1vh", color: "#A5A5A5", fontWeight: "500" }}>
              Camera
            </p>
          </div>
          <p
            style={{
              marginLeft: "auto",
              marginTop: "0",
              marginBottom: "0",
              paddingRight: "2%",
              fontSize: "3.5vh",
            }}
          >
            &gt;
          </p>
        </div>
      </div>
    </div>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
