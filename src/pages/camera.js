import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../css/pages/camera.css";
import { useNavigate, useLocation } from "react-router-dom";
import { addVisitedPage } from "../javascript/utils";
import { statusDarkGreen, statusDarkRed, statusDarkYellow } from "../javascript/colors";

function CameraTop() {
  const navigate = useNavigate();
  const location = useLocation();
  const { index } = location.state || {};
  return (
    <div id="top" className="top">
      <div className="img-container" onClick={() => navigate(-1)}>
        <img src={require("../images/arrow.png")} alt=""></img>
      </div>
      <p className="top-title">ROW {index} CAMERA</p>
    </div>
  );
}

function CameraContent() {
  addVisitedPage(window.location.href);
  const location = useLocation();
  const cameraNumber = location.pathname.split("/")[2];
  const { index = cameraNumber, overallstatus } = location.state || {};
  const [cameraRow, setCameraRow] = useState([]);
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    let initialCameraRow = [];
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

        initialCameraRow = [];
        const excludedKeys = ["rowid", "timestamp", "status"];
        for (const key in data[index - 1]) {
          if (data[index - 1].hasOwnProperty(key) && !excludedKeys.includes(key.toLowerCase())) {
            Status.push(key);
          }
        }
        initialCameraRow.push(<CameraItem type="Overall Status" status={overallstatus} />);
        for (let i = 0; i < Status.length; i++) {
          let data_value = data[index - 1][Status[i]];
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
          initialCameraRow.push(<CameraItem key={i} type={keyToDisplayName[Status[i]]} status={properties_status} />);
        }
        setCameraRow(initialCameraRow);
        // const response = await axios.get(process.env.REACT_APP_JSON_URL);
        // setJsonData(response.data);

        // const CameraRow = [];
        // let Status = ["Overall Status", "Soil pH", "Soil Moisture", "Humidity"];

        // for (let i = 0; i < Status.length; i++) {
        //   let name = Status[i];
        //   if (name == "Overall Status") {
        //     var overallStatusObject = response.data.Rows[i]["Overall Status"];
        //     CameraRow.push(<CameraItem type={name} status={overallStatusObject.Status} key={i} />);
        //   } else {
        //     if (name == "Soil pH") {
        //       var status = response.data.Rows[i]["SOIL pH"];
        //       CameraRow.push(<CameraItem type={name} status={status.Status} key={i} />);
        //     } else {
        //       var status = response.data.Rows[i][name.toUpperCase()];
        //       CameraRow.push(<CameraItem type={name} status={status.Status} key={i} />);
        //     }
        //   }
        // }

        // setCameraRow(CameraRow);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 120000); // 120000 milliseconds
    return () => {
      clearInterval(intervalId);
      initialCameraRow = [];
      setCameraRow([]);
    };
  }, []);
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
        {cameraRow}

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
  var Status = props.status;
  var fontColor = statusDarkGreen;
  const type = props.type.toLowerCase().replace(/\s/g, "");
  console.log(require(`../images/blue${type}.png`))

  if (Status == "Bad") {
    fontColor = statusDarkRed;
  } else if (Status == "Moderate") {
    fontColor = statusDarkYellow;
  } else {
    fontColor = statusDarkGreen;
  }

  return (
    <div className="camera-item">
      <div>
        <img src={require(`../images/blue${type}.png`)} alt="Status"></img>
      </div>
      <div className="camera-row-status">
        <p>
          {props.type} : <span style={{ color: fontColor }}>{props.status}</span>
        </p>
      </div>
    </div>
  );
}
export { CameraContent, CameraTop };
