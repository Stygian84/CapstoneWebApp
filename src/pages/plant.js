import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../css/pages/plant.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  statusDarkGreen,
  statusDarkRed,
  statusDarkYellow,
  statusLightGreen,
  statusLightRed,
  statusLightYellow,
} from "../javascript/colors";
import CircularSliderwithBg from "../components/CircularSliderwithBg";

function PlantTop() {
  const navigate = useNavigate();
  const location = useLocation();
  const { index } = location.state || {};
  return (
    <div id="top" className="top">
      <div className="img-container" onClick={() => navigate(-1)}>
        <img src={require("../images/arrow.png")} alt=""></img>
      </div>
      <p className="top-title">ROW {index} PLANTS</p>
    </div>
  );
}

function PlantContent() {
  const location = useLocation();
  const [jsonData, setJsonData] = useState(null);
  const { index } = location.state || {};
  const [plantRow, setPlantRow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const suffix = `/api/plant`;
        const tablesuffix = "/api/table";

        // Use Render
        const response = await axios.get(process.env.REACT_APP_RENDER_URL + suffix, {
          params: {
            rowId: index,
          },
        });
        const data = response.data;
        const table_response = await axios.get(process.env.REACT_APP_RENDER_URL + tablesuffix);
        const table_data = table_response.data;

        var plantRow = [];

        for (let i = 0; i < 12; i++) {
          plantRow.push(
            <PlantItem
              key={i}
              plantid={data[i]["plantid"]}
              idx={data[i]["plantid"]}
              name={data[i]["plantname"]}
              airqualityValue={data[i]["airquality"]}
              soilmoistureValue={data[i]["soilmoisture"]}
              temperatureValue={data[i]["temperature"]}
              soilphValue={data[i]["soilph"]}
              humidityValue={data[i]["humidity"]}
              status={data[i]["status"]}
              table_data={table_data}
            />
          );
        }
        setPlantRow(plantRow);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 6000); // 6000 milliseconds (6 seconds)
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="content" className="content">
      <div id="plant-container">
        {/* Start */}
        {plantRow}
        {/* STOP */}
      </div>
    </div>
  );
}

// and navigation
function PlantItem(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const statusNumber = location.pathname.split("/")[2];

  var i = props.idx;

  var {
    plantid,
    status,
    name,
    temperatureValue,
    soilmoistureValue,
    airqualityValue,
    soilphValue,
    humidityValue,
    table_data,
  } = props;

  const thresholdRanges = {};

  for (const item of table_data) {
    const { property_name, value, bad_threshold, good_threshold, moderate_threshold } = item;
    const propertyValue = props[`${property_name}Value`];

    thresholdRanges[property_name] = [
      value - bad_threshold,
      value + bad_threshold,
      value,
      good_threshold,
      moderate_threshold,
      bad_threshold,
    ];

    let color, fontColor;
    if (property_name === "airquality") {
      if (propertyValue <= good_threshold) {
        color = statusLightGreen;
        fontColor = statusDarkGreen;
      } else if (propertyValue <= moderate_threshold) {
        color = statusLightYellow;
        fontColor = statusDarkYellow;
      } else {
        color = statusLightRed;
        fontColor = statusDarkRed;
      }
    } else {
      if (propertyValue >= value - good_threshold && propertyValue <= value + good_threshold) {
        color = statusLightGreen;
        fontColor = statusDarkGreen;
      } else if (propertyValue >= value + moderate_threshold && propertyValue <= value + moderate_threshold) {
        color = statusLightYellow;
        fontColor = statusDarkYellow;
      } else {
        color = statusLightRed;
        fontColor = statusDarkRed;
      }
    }

    thresholdRanges[property_name].unshift(color, fontColor);
  }

  const [airTemperatureColor, airTemperatureFontColor, airTemperatureMin, airTemperatureMax] =
    thresholdRanges["temperature"] || [];
  const [soilMoistureColor, soilMoistureFontColor, soilMoistureMin, soilMoistureMax] =
    thresholdRanges["soilmoisture"] || [];
  const [airQualityColor, airQualityFontColor, airQualityMin, airQualityMax] = thresholdRanges["airquality"] || [];
  const [soilPHColor, soilPHFontColor, soilPHMin, soilPHMax] = thresholdRanges["soilph"] || [];
  const [humidityColor, humidityFontColor, humidityMin, humidityMax] = thresholdRanges["humidity"] || [];

  var fontColor = statusDarkGreen;

  if (status === "Bad") {
    fontColor = statusDarkRed;
  } else if (status === "Moderate") {
    fontColor = statusDarkYellow;
  } else {
    fontColor = statusDarkGreen;
  }

  return (
    <div className="plant-item">
      <div className="plant-item-first-row">
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
        <div
          className="plant-status"
          style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "bold", margin: "0", marginTop: "1vh" }}>
            {i}. {name}
          </p>
          <p style={{ fontSize: "1.5vh", color: "#A5A5A5", fontWeight: "500", margin: "0" }}>
            Status : <span style={{ color: fontColor }}>{status}</span>
          </p>
        </div>
      </div>

      <div className="plant-item-second-row">
        <div className="airtemperature" style={{ width: "33%" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularSliderwithBg
              imageSrc="AIR TEMPERATURE"
              style={{ left: "55%" }}
              value={temperatureValue}
              minValue={airTemperatureMin}
              maxValue={airTemperatureMax}
              color={airTemperatureColor}
              fontColor={airTemperatureFontColor}
              onClick={() => {
                navigate(`/details/${statusNumber}/temperature/${plantid}`, {
                  state: { row_idx: statusNumber, plant_id: plantid },
                });
              }}
            />
          </div>
          <div style={{ fontSize: "1.5vh", color: "#A5A5A5", display: "flex", justifyContent: "space-evenly" }}>
            Air Temperature
          </div>
        </div>
        <div className="soilmoisture" style={{ width: "33%" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularSliderwithBg
              imageSrc="SOIL MOISTURE"
              value={soilmoistureValue}
              minValue={soilMoistureMin}
              maxValue={soilMoistureMax}
              color={soilMoistureColor}
              fontColor={soilMoistureFontColor}
              onClick={() => {
                navigate(`/details/${statusNumber}/soil moisture/${plantid}`, {
                  state: { row_idx: statusNumber, plant_id: plantid },
                });
              }}
            />
          </div>
          <div style={{ fontSize: "1.5vh", color: "#A5A5A5", display: "flex", justifyContent: "space-evenly" }}>
            Soil Moisture
          </div>
        </div>
        <div className="airquality" style={{ width: "33%" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularSliderwithBg
              imageSrc="AIR QUALITY"
              value={airqualityValue}
              minValue={airQualityMin}
              maxValue={airQualityMax}
              color={airQualityColor}
              fontColor={airQualityFontColor}
              onClick={() => {
                navigate(`/details/${statusNumber}/air quality/${plantid}`, {
                  state: { row_idx: statusNumber, plant_id: plantid },
                });
              }}
            />
          </div>
          <div style={{ fontSize: "1.5vh", color: "#A5A5A5", display: "flex", justifyContent: "space-evenly" }}>
            Air Quality
          </div>
        </div>
      </div>

      <div className="plant-item-third-row">
        <div className="soilph" style={{ width: "33%" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularSliderwithBg
              imageSrc="SOIL pH"
              value={soilphValue}
              minValue={soilPHMin}
              maxValue={soilPHMax}
              color={soilPHColor}
              fontColor={soilPHFontColor}
              onClick={() => {
                navigate(`/details/${statusNumber}/soil ph/${plantid}`, {
                  state: { row_idx: statusNumber, plant_id: plantid },
                });
              }}
            />
          </div>
          <div style={{ fontSize: "1.5vh", color: "#A5A5A5", display: "flex", justifyContent: "space-evenly" }}>
            Soil pH
          </div>
        </div>
        <div className="humidity" style={{ width: "33%" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularSliderwithBg
              imageSrc="HUMIDITY"
              value={humidityValue}
              minValue={humidityMin}
              maxValue={humidityMax}
              color={humidityColor}
              fontColor={humidityFontColor}
              onClick={() => {
                navigate(`/details/${statusNumber}/humidity/${plantid}`, {
                  state: { row_idx: statusNumber, plant_id: plantid },
                });
              }}
            />
          </div>
          <div style={{ fontSize: "1.5vh", color: "#A5A5A5", display: "flex", justifyContent: "space-evenly" }}>
            Humidity
          </div>
        </div>
      </div>
    </div>
  );
}

export { PlantTop, PlantContent };
