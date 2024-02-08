import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../css/pages/status.css";
import { useNavigate, useLocation } from "react-router-dom";
import { addVisitedPage, fetchDataFromLinks } from "../javascript/utils";
import ToggleSwitch from "../components/ToggleSwitch";
import CircularSlider from "@fseehawer/react-circular-slider";
import { minMaxTable } from "../javascript/table";
import getStatus from "../javascript/threshold";
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
        <img src={require("../images/arrow.png")} alt=""></img>
      </div>
      <p className="top-title">ROW {index} STATUS</p>
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
  const navigate = useNavigate();

  useEffect(() => {
    const Status = [];

    const fetchData = async () => {
      try {
        const suffix = "/api/status";
        // Use Render
        const response = await axios.get(process.env.REACT_APP_RENDER_URL + suffix);
        const data = response.data;

        // Use AWS
        // const data = await fetchDataFromLinks(suffix);
        setJsonData(data);

        // const response = await axios.get(process.env.REACT_APP_AWS_STATUS_URL + statusNumber);
        // setJsonData(response.data);

        // Mapping to convert string from DB to its respective display name
        const keyToDisplayName = {
          avgairquality: "AIR QUALITY",
          avghumidity: "HUMIDITY",
          avgsoilmoisture: "SOIL MOISTURE",
          avgsoilph: "SOIL pH",
          avgtemperature: "AIR TEMPERATURE",
        };

        const initialStatusRow = [];
        const excludedKeys = ["rowid", "timestamp", "status"];
        for (const key in data[0]) {
          if (data[0].hasOwnProperty(key) && !excludedKeys.includes(key.toLowerCase())) {
            Status.push(key);
          }
        }

        // TODO getStatus logic
        for (let i = 0; i < Status.length; i++) {
          initialStatusRow.push(
            <StatusItem
              key={i}
              type={keyToDisplayName[Status[i]]}
              min={minMaxTable[Status[i]].min}
              max={minMaxTable[Status[i]].max}
              value={data[0][Status[i]]}
              status={getStatus([Status[i]], data[0][Status[i]])}
            />
          );
        }
        setStatusRow(initialStatusRow);
        // ** old code without aws **
        // const response = await axios.get(process.env.REACT_APP_JSON_URL);
        // setJsonData(response.data);

        // const initialStatusRow = [];

        // // Extract keys from the first object in the array (assuming it's not empty)
        // if (response.data.Rows && response.data.Rows.length > 0) {
        //   const firstObject = response.data.Rows[index - 1];

        //   for (const key in firstObject) {
        //     if (firstObject.hasOwnProperty(key)) {
        //       Status.push(key);
        //     }
        //   }
        // }
        // for (let i = 0; i < Status.length - 1; i++) {
        //   initialStatusRow.push(
        //     <StatusItem
        //       key={i}
        //       type={Status[i]}
        //       min="0"
        //       max="360"
        //       value={response.data.Rows[index - 1][Status[i]].Value}
        //       status={response.data.Rows[index - 1][Status[i]].Status}
        //     />
        //   );
        // }
        // setStatusRow(initialStatusRow);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 120000); // 120000 milliseconds (2 minutes)
    return () => clearInterval(intervalId);
  }, []);

  // For ToggleSwitch Lights Display
  const [isToggleOn, setIsToggleOn] = useState(false);
  const LightStatus = isToggleOn ? "On" : "Off";
  const lightColor = isToggleOn ? statusDarkGreen : statusDarkRed;

  return (
    <div id="content" className="content">
      <div id="status-container">
        <div
          className="status-item"
          onClick={() => {
            navigate(`/plant/${statusNumber}`, { state: { index: statusNumber } });
          }}
        >
          <img src={require(`../images/plant.png`)} alt="Status"></img>

          <div className="status-row-status" style={{ width: "70%" }}>
            <p style={{ fontSize: "1.75vh", color: "#737373", fontWeight: "bold" }}>PLANTS DETAILS</p>
          </div>
          <p
            style={{
              marginLeft: "0",
              marginTop: "0",
              marginBottom: "0",
              paddingRight: "5%",
              fontSize: "5.5vh",
              color: "#C8C8C8",
            }}
          >
            &gt;
          </p>
        </div>
        <div className="status-item">
          <img src={require(`../images/LIGHTS.png`)} alt="Status"></img>

          <div className="status-row-status" style={{ width: "70%" }}>
            <p style={{ fontSize: "1.75vh", color: "#737373", fontWeight: "bold" }}>LIGHTS</p>
            <p style={{ fontSize: "1vh", color: "#A5A5A5", fontWeight: "500" }}>
              Status : <span style={{ color: lightColor }}>{LightStatus}</span>
            </p>
          </div>

          <div style={{ width: "30%", height: "90%", display: "flex", alignItems: "center" }}>
            <ToggleSwitch checked={isToggleOn} onChange={() => setIsToggleOn(!isToggleOn)} />
          </div>
        </div>
        {statusRow}
      </div>
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
            dataIndex={props.value - props.min} // bug where min is added to dataindex so need to minus here
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
