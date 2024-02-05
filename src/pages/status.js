import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../css/pages/status.css";
import { useNavigate, useLocation } from "react-router-dom";
import { addVisitedPage } from "../javascript/utils";
import ToggleSwitch from "../components/ToggleSwitch";
import CircularSlider from "@fseehawer/react-circular-slider";
import {
  statusDarkGreen,
  statusDarkRed,
  statusDarkYellow,
  statusLightGreen,
  statusLightRed,
  statusLightYellow,
} from "../javascript/colors";

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
  const location = useLocation();
  const statusNumber = location.pathname.split("/")[2];
  const { index = statusNumber } = location.state || {};
  const [statusRow, setStatusRow] = useState([]);
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const Status = [];

    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_JSON_URL);
        setJsonData(response.data);

        const initialStatusRow = [];

        // Extract keys from the first object in the array (assuming it's not empty)
        if (response.data.Rows && response.data.Rows.length > 0) {
          const firstObject = response.data.Rows[index - 1];

          for (const key in firstObject) {
            if (firstObject.hasOwnProperty(key)) {
              Status.push(key);
            }
          }
        }
        for (let i = 0; i < Status.length - 1; i++) {
          initialStatusRow.push(
            <StatusItem
              key={i}
              type={Status[i]}
              min="0"
              max="360"
              value={response.data.Rows[index - 1][Status[i]].Value}
              status={response.data.Rows[index - 1][Status[i]].Status}
            />
          );
        }
        setStatusRow(initialStatusRow);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 120000); // 120000 milliseconds (2 minutes)
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="content" className="content">
      <div id="status-container">{statusRow}</div>
    </div>
  );
}

function StatusItem(props) {
  var Status = capitalizeFirstLetter(props.status);
  var color = statusLightGreen;
  var fontColor = statusDarkGreen;

  if (Status == "Bad") {
    color = statusLightRed;
    fontColor = statusDarkRed;
  } else if (Status == "Moderate") {
    color = statusLightYellow;
    fontColor = statusDarkYellow;
  } else {
    color = statusLightGreen;
    fontColor = statusDarkGreen;
  }
  if (props.type === "LIGHTS") {
    return (
      <div className="status-item">
        <img src={require(`../images/${props.type}.png`)} alt="Status"></img>

        <div className="status-row-status" style={{ width: "70%" }}>
          <p style={{ fontSize: "1.75vh", color: "#737373", fontWeight: "bold" }}>{props.type}</p>
          <p style={{ fontSize: "1vh", color: "#A5A5A5", fontWeight: "500" }}>Status : {Status}</p>
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
          <p style={{ fontSize: "1vh", color: "#A5A5A5", fontWeight: "500" }}>
            Status : <span style={{ color: fontColor }}>{Status}</span>, Value:
            <span style={{ color: fontColor }}>{props.value}</span>
          </p>
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
            progressSize={24}
            trackSize={24}
            labelColor={fontColor}
            // Uncomment below after debugging
            hideKnob="true"
            knobDraggable="false"
            label="Value" // The label is hidden in status.css
          />
        </div>
      </div>
    );
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export { StatusContent, StatusTop };
