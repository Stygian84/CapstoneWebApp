import React from "react";
import "../index.css";
import "../css/pages/camera.css";
import { useNavigate, useLocation } from "react-router-dom";
import { addVisitedPage } from "../javascript/utils";

function CameraTop() {
  const navigate = useNavigate();
  const location = useLocation();
  const { index } = location.state || {};
  return (
    <div id="top" className="top">
      <div className="img-container" onClick={() => navigate(-1)}>
        <img src={require("../images/arrow.png")} style={{ width: "15.5vw" }} alt=""></img>
      </div>
      <p className="top-title" style={{ marginLeft: "15.5vw" }}>
        ROW {index} CAMERA
      </p>
    </div>
  );
}
function CameraContent() {
  addVisitedPage(window.location.href);
  const location = useLocation();
  const { index } = location.state || {};

  let CameraRow = [];
  let Status = ["Overall Status", "Soil pH", "Soil Moisture", "Humidity"];

  for (let i = 0; i < Status.length; i++) {
    let name = Status[i];
    CameraRow.push(<CameraItem type={name} value="TBC" key={i} colour="#03A400"/>);
  }

  return (
    <div id="content" className="content">
      {/* Box Feature Section */}
      <div id="camera-container">
        <div className="camera" id="camera1" style={{ display: "flex", justifyContent: "center" }}>
          <img src={require("../images/placeholder.png")} alt="Status" style={{ width: "90vw" }}></img>
        </div>
      </div>
      <div
        id="camera-content-header"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ fontWeight: "bold", color: "#737373" }}>CAMERA ROW {index}</p>
      </div>

      {/* Camera item Section */}
      <div id="camera-item-container">
        {CameraRow}

        <div className="camera-item" style={{ height: "7vh", backgroundColor: "#7AA0B8" }}>
          <div id="water-the-plant">
            <p
              style={{
                fontSize: "2.25vh",
                color: "white",
                fontWeight: "bold",
              }}
            >
              WATER THE PLANT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CameraItem(props) {
  return (
    <div className="camera-item">
      <div>
        <img src={require(`../images/blue${props.type}.png`)} alt="Status"></img>
      </div>
      <div className="camera-row-status">
        <p>
          {props.type} : <span style={{ color: props.colour }}>{props.value}</span>
        </p>
      </div>
    </div>
  );
}
export { CameraContent, CameraTop };
