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

import { ExpandingProgressBars } from "../components/ExpandingLinearProgress";
import "react-circular-progressbar/dist/styles.css";
import Divider from "@mui/material/Divider";

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
  const { row_idx, plant_id, plant_status, plant_value, plant_name } = location.state || {};
  const properties = location.pathname.split("/")[3];
  const [jsonData, setJsonData] = useState(null);
  const navigate = useNavigate();
  const descriptions = {
    temperature:
      "Air temperature plays a crucial role in the growth and development of plants, influencing various physiological processes. Different plant species have specific temperature requirements for optimal growth. Generally, warmer temperatures promote faster metabolic rates, leading to increased photosynthesis and faster growth during the growing season.",
    humidity:
      "Maintaining optimal humidity levels is crucial for the health and growth of plants. Humidity refers to the amount of moisture present in the air, and different plants have varying requirements. Generally, tropical plants thrive in higher humidity environments. ",
    soilph:
      "The pH level of soil plays a critical role in determining the health and vitality of plants. Soil pH measures the acidity or alkalinity of the soil, with a scale ranging from acidic (pH below 7) to alkaline (pH above 7). Most plants thrive in slightly acidic to neutral soil conditions.",
    soilmoisture:
      "Maintaining adequate soil moisture levels is essential for the health and growth of plants. Soil moisture refers to the amount of water present in the soil, and it directly affects plant hydration and nutrient uptake. Insufficient moisture can lead to wilting, stunted growth, and increased susceptibility to pests and diseases.",
    airquality:
      "Air quality plays a vital role in the overall health and growth of plants. Plants rely on a steady supply of clean air for proper respiration, photosynthesis, and transpiration. Poor air quality, characterized by high levels of pollutants such as carbon dioxide, ozone, and particulate matter, can negatively impact plant growth and development. ",
    // Add more descriptions for each property
  };
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
            property: properties.replace("%20", ""),
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

  var fontColor = statusDarkGreen;

  if (plant_status === "Bad") {
    fontColor = statusDarkRed;
  } else if (plant_status === "Moderate") {
    fontColor = statusDarkYellow;
  } else {
    fontColor = statusDarkGreen;
  }

  return (
    <div id="content" className="content">
      <div id="plant-status-container">
        <div className="plant-status-item">
          <div className="plant-status-first-row">
            <div className="plant-item-name">
              <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "bold", margin: "0", marginTop: "1vh" }}>
                {plant_name}
              </p>
              <Divider style={{ width: "90%" }}>
                <p style={{ fontSize: "1.5vh", color: "#A5A5A5", fontWeight: "500", margin: "0" }}>
                  Status : <span style={{ color: fontColor }}>{plant_status}</span> Value : {plant_value}
                </p>
              </Divider>
            </div>
            {/* Below is for putting left and right icon / picture */}
            {/* <div
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
            </div> */}
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
            <div>
              <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "bold", margin: "0", marginTop: "1vh" }}>
                {capitalizeAllLetters(properties)}
              </p>
            </div>
          </div>
          <Divider width="90%" />
          <div className="plant-description-bar">
            <div style={{ width: "80%", position: "relative" }}>
              <ExpandingProgressBars value={100} />
              <ExpandingProgressBars value={100} style={{ transform: "scaleX(-1)" }} />
            </div>
          </div>
          <div className="plant-description-content">
            <p
              style={{
                fontSize: "1.5vh",
                color: "#A5A5A5",
                fontWeight: "500",
                margin: "5%",
                textAlign: "justify",
              }}
            >
              {descriptions[properties.replace("%20", "")]}
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
