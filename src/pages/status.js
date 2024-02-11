import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../css/pages/status.css";
import { useNavigate, useLocation } from "react-router-dom";
import { addVisitedPage, fetchDataFromLinks } from "../javascript/utils";
import ToggleSwitch from "../components/ToggleSwitch";
import {
  statusDarkGreen,
  statusDarkRed,
  statusDarkYellow,
  statusLightGreen,
  statusLightRed,
  statusLightYellow,
} from "../javascript/colors";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
  const { row_index = statusNumber } = location.state || {};
  const [statusRow, setStatusRow] = useState([]);
  const [jsonData, setJsonData] = useState(null);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const Status = [];
    const fetchData = async () => {
      try {
        const suffix = "/api/status";
        const tablesuffix = "/api/table";
        // Use Render
        const response = await axios.get(process.env.REACT_APP_RENDER_URL + suffix);
        const data = response.data;
        const table_response = await axios.get(process.env.REACT_APP_RENDER_URL + tablesuffix);
        const table_data = table_response.data;
        setJsonData(data);

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
        for (const key in data[row_index - 1]) {
          if (data[row_index - 1].hasOwnProperty(key) && !excludedKeys.includes(key.toLowerCase())) {
            Status.push(key);
          }
        }

        for (let i = 0; i < Status.length; i++) {
          let data_value = data[row_index - 1][Status[i]];
          let properties_min;
          let properties_max;
          let properties_status = "";

          for (const item of table_data) {
            if (item.property_name === Status[i].slice(3)) {
              // minmax of the circular slider
              properties_min = item.value - item.bad_threshold;
              properties_max = item.value + item.bad_threshold;

              // special range for psi airquality
              if (item.property_name === "airquality") {
                if (data_value <= item.good_threshold) {
                  properties_status = "Good";
                } else if (data_value <= item.moderate_threshold) {
                  properties_status = "Moderate";
                } else if (data_value <= item.bad_threshold) {
                  properties_status = "Bad";
                }
                properties_min = item.value;
                break;
              }

              // if data is in between thereshold value, it becomes that status
              if (data_value >= item.value - item.good_threshold && data_value <= item.value + item.good_threshold) {
                properties_status = "Good";
              } else if (
                data_value >= item.value - item.moderate_threshold &&
                data_value <= item.value + item.moderate_threshold
              ) {
                properties_status = "Moderate";
              } else if (
                data_value >= item.value - item.bad_threshold &&
                data_value <= item.value + item.bad_threshold
              ) {
                properties_status = "Bad";
              }
              break;
            }
          }
          initialStatusRow.push(
            <StatusItem
              key={i}
              type={keyToDisplayName[Status[i]]}
              min={properties_min}
              max={properties_max}
              value={data_value}
              status={properties_status}
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
        //   const firstObject = response.data.Rows[row_index - 1];

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
        //       value={response.data.Rows[row_index - 1][Status[i]].Value}
        //       status={response.data.Rows[row_index - 1][Status[i]].Status}
        //     />
        //   );
        // }
        // setStatusRow(initialStatusRow);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 120000); // 6000 milliseconds (2 seconds)
    return () => {
      clearInterval(intervalId);
    };
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
          id="plant-details-status-item"
          onClick={() => {
            navigate(`/plant/${statusNumber}`, { state: { index: row_index } });
          }}
        >
          <img src={require(`../images/plant.png`)} alt="Status"></img>
          <img src={require("../images/whiteplant.png")} className="new-image" alt="Status"></img>

          <div className="status-row-status" style={{ width: "70%" }}>
            <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "bold" }}>PLANTS DETAILS</p>
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

          <div className="status-row-status" style={{ width: "60%" }}>
            <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "bold" }}>LIGHTS</p>
            <p style={{ fontSize: "1.5vh", color: "#A5A5A5", fontWeight: "500" }}>
              Status : <span style={{ color: lightColor }}>{LightStatus}</span>
            </p>
          </div>

          <div style={{ width: "25%", height: "90%", display: "flex", alignItems: "center" }}>
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
  var unit = "";
  var val = "Value";
  if (props.type === "AIR QUALITY") {
    val = "PSI";
    unit = "";
  } else if (props.type === "HUMIDITY") {
    val = "Value";
    unit = "%";
  } else if (props.type === "SOIL MOISTURE") {
    val = "Value";
    unit = "%";
  } else if (props.type === "SOIL pH") {
    val = "pH";
    unit = "";
  } else if (props.type === "AIR TEMPERATURE") {
    val = "Temp";
    unit = "\u00b0C";
  }
  if (Status === "Bad") {
    color = statusLightRed;
    fontColor = statusDarkRed;
  } else if (Status === "Moderate") {
    color = statusLightYellow;
    fontColor = statusDarkYellow;
  } else {
    color = statusLightGreen;
    fontColor = statusDarkGreen;
  }

  return (
    <div className="status-item">
      <img src={require(`../images/${props.type}.png`)} alt="Status"></img>

      <div className="status-row-status" style={{ width: "60%" }}>
        <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "bold" }}>{props.type}</p>
        <p style={{ fontSize: "1.5vh", color: "#A5A5A5", fontWeight: "500" }}>
          Status : <span style={{ color: fontColor }}>{Status}</span>, {val}:{" "}
          <span style={{ color: fontColor }}>
            {props.value} {unit}
          </span>
        </p>
      </div>

      <div
        className="circle-container"
        style={{ width: "25%", height: "90%", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgressbar
          styles={buildStyles({
            textColor: fontColor,
            pathColor: color,
            trailColor: "transparent",
            strokeLinecap: "round",
            textSize: "3vh",
          })}
          value={props.value}
          text={props.value}
          minValue={props.min}
          maxValue={props.max}
          strokeWidth={6}
        />
      </div>
    </div>
  );
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export { StatusContent, StatusTop };
