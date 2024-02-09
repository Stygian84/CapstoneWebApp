import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../css/pages/plantstatus.css";
import { useNavigate, useLocation } from "react-router-dom";
import {  fetchDataFromLinks } from "../javascript/utils";
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

function PlantStatusTop() {
  const navigate = useNavigate();
  const location = useLocation();
  const { row_idx, plant_id } = location.state || {};
  const properties = location.pathname.split("/")[4];
  console.log(properties);

  return (
    <div id="top" className="top">
      <div className="img-container" onClick={() => navigate(-1)}>
        <img src={require("../images/arrow.png")} alt=""></img>
      </div>
      <p className="top-title">
        ROW {row_idx} PLANT {plant_id} {capitalizeAllLetters(properties)}
      </p>
    </div>
  );
}

function PlantStatusContent() {
  const location = useLocation();
  const { row_idx, plant_id } = location.state || {};
  const properties = location.pathname.split("/")[4];
  console.log(properties);
  var statusNumber = 1;
  const { index = statusNumber } = location.state || {};
  const [statusRow, setStatusRow] = useState([]);
  const [jsonData, setJsonData] = useState(null);
  const navigate = useNavigate();

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
        // Use AWS
        // const data = await fetchDataFromLinks(suffix);
        setJsonData(data);

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

    const intervalId = setInterval(fetchData, 6000); // 6000 milliseconds (6 seconds)
    return () => clearInterval(intervalId);
  }, []);

  // For ToggleSwitch Lights Display
  const [isToggleOn, setIsToggleOn] = useState(false);
  const LightStatus = isToggleOn ? "On" : "Off";
  const lightColor = isToggleOn ? statusDarkGreen : statusDarkRed;

  return (
    <div id="content" className="content">
      <div id="plant-status-container">
        <div className="plant-status-item">
          <div className="plant-item-first-row">
            <p>asdfads</p>
            <div
              className="first-row-bg"
              style={{
                margin: "0 0 0 5%",
                width: "20%",
                position: "absolute",

                // backgroundImage: `url(${require(`../images/bg.jpg`)})`,
              }}
            >
              <div className="plant-img-container">
                {/* <img src={require("../images/plant.png")} style={{ width: "12vw", margin: " 5% 0 0 0" }} alt=""></img> */}
              </div>
            </div>
          </div>
          <div className="plant-item-second-row">
            fdsfdsa
            {/* <LineChart /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
function capitalizeAllLetters(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += str[i].toUpperCase();
  }
  return result.replace(/%20/g, " ");
}
export { PlantStatusContent, PlantStatusTop };
