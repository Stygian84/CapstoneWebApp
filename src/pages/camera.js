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
      <p className="top-title">ROW {index} CAMERA</p>
    </div>
  );
}
function CameraContent() {
  addVisitedPage(window.location.href);
  const location = useLocation();
  const { index } = location.state || {};

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
        <div className="camera-item">
          <div>
            <img src={require("../images/bluestatus.png")} alt="Status"></img>
          </div>
          <div className="row-status">
            <p
              style={{
                fontSize: "1.75vh",
                color: "#A5A5A5",
                fontWeight: "500",
              }}
            >
              Overall Status: <span style={{ color: "#03A400" }}>GOOD</span>
            </p>
          </div>
        </div>

        <div className="camera-item">
          <div>
            <img src={require("../images/bluesoilph.png")} alt="Status"></img>
          </div>
          <div className="row-status">
            <p
              style={{
                fontSize: "1.75vh",
                color: "#A5A5A5",
                fontWeight: "500",
              }}
            >
              Soil pH: <span style={{ color: "#03A400" }}>7.2</span>
            </p>
          </div>
        </div>

        <div className="camera-item">
          <div>
            <img src={require("../images/bluemoisture.png")} alt="Status"></img>
          </div>
          <div className="row-status">
            <p
              style={{
                fontSize: "1.75vh",
                color: "#A5A5A5",
                fontWeight: "500",
              }}
            >
              Soil Moisture: <span style={{ color: "#FF6C02" }}>72%</span>
            </p>
          </div>
        </div>

        <div className="camera-item">
          <div>
            <img src={require("../images/bluehumidity.png")} alt="Status"></img>
          </div>
          <div className="row-status">
            <p
              style={{
                fontSize: "1.75vh",
                color: "#A5A5A5",
                fontWeight: "500",
              }}
            >
              Humidity: <span style={{ color: "#03A400" }}>51%</span>
            </p>
          </div>
        </div>

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
export { CameraContent, CameraTop };
