import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../css/pages/plantstatus.css";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchDataFromLinks } from "../javascript/utils";
import { LineChart } from "@mui/x-charts/LineChart";

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
  const properties = location.pathname.split("/")[3];

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
  const properties = location.pathname.split("/")[3];
  var statusNumber = 1;
  const { index = statusNumber } = location.state || {};
  const [statusRow, setStatusRow] = useState([]);
  const [jsonData, setJsonData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const Status = [];
    const fetchData = async () => {
      try {
        const suffix = `/api/plant`;
        const tablesuffix = "/api/table";
        // Use Render
        const response = await axios.get(process.env.REACT_APP_RENDER_URL + suffix, {
          params: {
            rowId: row_idx,
            plantId: plant_id,
            property: properties,
          },
        });
        const data = response.data;
        console.log("Data :\n", data);
        const table_response = await axios.get(process.env.REACT_APP_RENDER_URL + tablesuffix);
        const table_data = table_response.data;
        console.log("Table_data:\n", table_data);
        
        setJsonData(data);

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
          <div className="plant-status-first-row">
            <div className="plant-item-name">
              <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "bold", margin: "0", marginTop: "1vh" }}>
                Plantid Aloe Vera
              </p>
              <p style={{ fontSize: "1.5vh", color: "#A5A5A5", fontWeight: "500", margin: "0" }}>
                Status : <span style={{ color: "red" }}>Good</span> Value : 2134
              </p>
            </div>
            <div
              className="plant-status-graph-left-icon"
              style={{
                left: "8%",
                width: "20%",
                position: "absolute",

                // backgroundImage: `url(${require(`../images/bg.jpg`)})`,
              }}
            >
              <div className="plant-img-container">
                <img src={require("../images/plant.png")} style={{ width: "12vw", margin: " 5% 0 0 0" }} alt=""></img>
              </div>
            </div>
            <div
              className="plant-status-graph-left-icon"
              style={{
                width: "20%",
                position: "absolute",
                right: "8%",
                // backgroundImage: `url(${require(`../images/bg.jpg`)})`,
              }}
            >
              <div className="plant-img-container">
                <img src={require("../images/plant.png")} style={{ width: "12vw", margin: " 5% 0 0 0" }} alt=""></img>
              </div>
            </div>
          </div>
          <div className="plant-status-second-row">
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={500}
              height={300}
            />
          </div>
        </div>
      </div>

      <div id="plant-status-container">
        <div className="plant-status-description-container">
          <div className="plant-description-title">
            <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "bold", margin: "0", marginTop: "1vh" }}>
              {capitalizeAllLetters(properties)}
            </p>
            <p style={{ fontSize: "1.5vh", color: "#A5A5A5", fontWeight: "500", margin: "0" }}>
              Status : <span style={{ color: "red" }}>Good</span> Value : 2134
            </p>
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
