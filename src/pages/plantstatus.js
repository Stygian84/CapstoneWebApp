import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../css/pages/plantstatus.css";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchDataFromLinks } from "../javascript/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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
import moment from "moment";

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
  const [chart, setChart] = useState([]);
  const location = useLocation();
  const { row_idx, plant_id, plant_status, plant_value, plant_name } = location.state || {};
  const properties = location.pathname.split("/")[3];
  const [jsonData, setJsonData] = useState(null);
  const [chartData, setChartData] = useState(null);
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
        // console.log("Table_data:\n", table_data);

        setJsonData(data);
        // Calculate Average for each day
        const aggregateData = data.reduce((acc, currentValue) => {
          const date = moment(currentValue.timestamp, ["YYYY-MM-DD HH:mm:ss.SSSSSS", "YYYY-MM-DD HH:mm:ss"]);
          const day = `${date.date()}/${date.month() + 1}`;
          if (!acc[day]) {
            acc[day] = {
              date: day.toString(),
              temperatures: [],
              averageTemperature: 0,
            };
          }
          acc[day].temperatures.push(currentValue.temperature);
          return acc;
        }, {});
        console.log("aggdata", aggregateData);
        Object.values(aggregateData).forEach((dayData) => {
          dayData.averageTemperature = (
            dayData.temperatures.reduce((sum, temp) => sum + temp, 0) / dayData.temperatures.length
          ).toFixed(1);
        });

        const chartData = Object.values(aggregateData);
        console.log("chartData", chartData);
        setChartData(chartData);

        let chart = [];
        let offsetMin = 5;
        let offsetMax = 5;
        const dataMin = Math.min(...chartData.map((entry) => entry.averageTemperature)) - offsetMin;
        const dataMax = Math.max(...chartData.map((entry) => entry.averageTemperature)) + offsetMax;

        chart.push(
          <ResponsiveContainer width="100%" height={"100%"} key={1}>
            <LineChart data={chartData} margin={{ top: 20, right: 40, bottom: 20 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="lightgrey" />
              <XAxis tick={{ fontSize: "1.5vh" }} dataKey="date" interval={3} />
              <YAxis
                tick={{ fontSize: "1.5vh" }}
                tickFormatter={(value) => value.toFixed(1)}
                domain={[dataMin, dataMax]}
              />
              <Tooltip contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid #ccc" }} />
              {/* <Legend /> */}
              <Line type="monotone" dataKey="averageTemperature" stroke="#7aa0b8" />
            </LineChart>
          </ResponsiveContainer>
        );
        setChart(chart);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 120000); // 6000 milliseconds (6 seconds)
    return () => clearInterval(intervalId);
  }, []);

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
                  Status : <span style={{ color: fontColor }}>{plant_status}</span> Value :{" "}
                  <span style={{ color: fontColor }}>{plant_value}</span>
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
          <div className="plant-status-second-row" style={{ height: "35vh" }}>
            {chart}
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
