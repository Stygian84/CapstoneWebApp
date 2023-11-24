import React, { useState, useEffect } from "react";
import "../index.css";
import "../css/pages/status.css";
import "../css/components/HollowCircle.css";
import { useNavigate, useLocation } from "react-router-dom";
import { addVisitedPage } from "../javascript/utils";
import ToggleSwitch from "../components/ToggleSwitch";
import CircularSlider from "@fseehawer/react-circular-slider";
import { statusDarkGreen, statusDarkRed, statusDarkYellow, statusLightGreen, statusLightRed, statusLightYellow } from "../javascript/colors";

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

  // let StatusRow = [];
  // let Status = ["LIGHTS", "AIR TEMPERATURE", "SOIL MOISTURE", "HUMIDITY", "SOIL pH", "LIGHT INTENSITY", "AIR QUALITY"];
  // for (let i = 0; i < Status.length; i++) {
  //   StatusRow.push(<StatusItem key={i} type={Status[i]} min="0" max="360" value="320" />);
  // }
  const [statusRow, setStatusRow] = useState([]);

  useEffect(() => {
    const initialStatusRow = [];
    var Status = [
      "LIGHTS",
      "AIR TEMPERATURE",
      "SOIL MOISTURE",
      "HUMIDITY",
      "SOIL pH",
      "LIGHT INTENSITY",
      "AIR QUALITY",
    ];

    for (let i = 0; i < Status.length; i++) {
      initialStatusRow.push(<StatusItem key={i} type={Status[i]} min="0" max="360" value="320" />);
    }
    setStatusRow(initialStatusRow);

    // Set up the interval to update every few seconds
    const intervalId = setInterval(() => {
      const updatedStatusRow = [];
      for (let i = 0; i < Status.length; i++) {
        updatedStatusRow.push(<StatusItem key={i} type={Status[i]} min="0" max="360" value="320" />);
      }
      setStatusRow(updatedStatusRow);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="content" className="content">
      <div id="status-container">{statusRow}</div>
    </div>
  );
}

function StatusItem(props) {
  var fraction = props.value / (props.max - props.min);
  var color = statusLightGreen;
  var fontColor= statusDarkGreen;

  if (fraction <= 1 / 3) {
    color = statusLightRed;
    fontColor= statusDarkRed;
  } else if (fraction <= 2 / 3) {
    color = statusLightYellow;
    fontColor= statusDarkYellow;
  } else {
    color = statusLightGreen;
    fontColor= statusDarkGreen;
  }

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

        <div
          className="circle-container"
          style={{ width: "30%", height: "90%", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <CircularSlider
            dataIndex={props.value}
            min={props.min}
            max={props.max}
            progressColorFrom={color}
            progressColorTo={color}
            trackColor="transparent"

            onChange={(value) => {
              console.log(value);
            }}

            progressSize={24}
            trackSize={24}

            labelColor={fontColor}
            // Uncomment below after debugging
            // hideKnob="true"
            // knobDraggable="false"
            // label="Value" // The label is hidden in status.css
           
          />
        </div>
      </div>
    );
  }
}

export { StatusContent, StatusTop };
