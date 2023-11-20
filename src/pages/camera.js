import React from "react";
import "../index.css";
import "../css/pages/camera.css";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function CameraTop() {
  const navigate = useNavigate();
  const location = useLocation();
  const { index } = location.state || {};
  return (
    <div id="top" className="top">
      <div className="img-container">
        <img
          src={require("../images/arrow.png")}
          style={{ width: "15.5vw" }}
          alt=""
        ></img>
      </div>
      <p className="top-title">ROW {index} CAMERA</p>
    </div>
  );
}
function CameraContent() {
  return (
    <div id="content" className="content">
      
      {/* Box Feature Section */}
      <div id="feature-container">
        <div className="feature-item" id="feature1">
          <img src={require("../images/greenstatus.png")} alt="Status"></img>
          <img
            src={require("../images/whitestatus.png")}
            className="new-image"
            alt="Status"
          ></img>
          <p style={{ color: "#8FA586" }}>Status</p>
        </div>
        
      </div>
      <div id="recent-header">
        <p style={{ fontWeight: "bold" }}>Recent</p>
      </div>

      {/* Recent item Section */}
      <div id="recent-container">
        <div className="recent-item">
          <img src={require("../images/greystatus.png")} alt="Status"></img>
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
          <img src={require("../images/greystatus.png")} alt="Status"></img>
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
          <img src={require("../images/greycamera.png")} alt="Camera"></img>
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
export { CameraContent, CameraTop };
