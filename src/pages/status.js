import React from "react";
import "../index.css";
import "../css/pages/status.css";
import "../css/components/HollowCircle.css";
import { useNavigate, useLocation } from "react-router-dom";
import { addVisitedPage } from "../javascript/utils";
import ToggleSwitch from "../components/ToggleSwitch";
import CircularSlider from "@fseehawer/react-circular-slider";

function StatusTop() {
  const navigate = useNavigate();
  const location = useLocation();
  const { index } = location.state || {};

  return (
    <div id="top" className="top">
      <div className="img-container" onClick={() => navigate(-1)}>
        <img src={require("../images/arrow.png")} style={{ width: "15.5vw" }} alt=""></img>
      </div>
      <p className="top-title" style={{ marginLeft: "16.5vw" }}>
        ROW {index} STATUS
      </p>
    </div>
  );
}

function StatusContent() {
  addVisitedPage(window.location.href);

  let StatusRow = [];
  let Status = ["LIGHTS", "AIR TEMPERATURE", "SOIL MOISTURE", "HUMIDITY", "SOIL pH", "LIGHT INTENSITY", "AIR QUALITY"];
  for (let i = 0; i < Status.length; i++) {
    StatusRow.push(<StatusItem key={i} type={Status[i]} />);
  }

  return (
    <div id="content" className="content">
      <div id="status-container">{StatusRow}</div>
    </div>
  );
}

function StatusItem(props) {
   if (props.type === "LIGHTS") {
    return (
      <div className="status-item">
        <img src={require(`../images/${props.type}.png`)} alt="Status"></img>

        <div className="status-row-status" style={{ width: "70%" }}>
          <p style={{ fontSize: "1.75vh", color: "#737373", fontWeight: "bold" }}>{props.type}</p>
          <p style={{ fontSize: "1vh", color: "#A5A5A5", fontWeight: "500" }}>Status : GOOD, Value:</p>
        </div>

        <div style={{ width: "30%", height: "90%", display: "flex", alignItems: "center" }}>
          <ToggleSwitch style={{ width: "100%" }} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="status-item">
        <img src={require(`../images/${props.type}.png`)} alt="Status"></img>

        <div className="status-row-status" style={{ width: "70%" }}>
          <p style={{ fontSize: "1.75vh", color: "#737373", fontWeight: "bold" }}>{props.type}</p>
          <p style={{ fontSize: "1vh", color: "#A5A5A5", fontWeight: "500" }}>Status : GOOD, Value :</p>
        </div>

        <div className="circle-container" style={{ width: "30%", height: "90%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularSlider
            label="savings"
            min={0}
            max={360}
            labelColor="#005a58"
            progressColorFrom="#00bfbd"
            progressColorTo="#009c9a"
            progressSize={24}
            trackColor="#eeeeee"
            trackSize={24}
            onChange={(value) => {
              console.log(value);
            }}
            // hideKnob="true"
            // knobDraggable="false"
            labelBottom="true"
            hideLabelValue="true"
          />
        </div>
      </div>
    );
  }
}

export { StatusContent, StatusTop };
