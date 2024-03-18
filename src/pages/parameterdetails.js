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
import Divider from "@mui/material/Divider";
import { addVisitedPage } from "../javascript/utils";
import { usePreventMobileHoldImage } from "../javascript/utils";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

function ParameterDetailsTop() {
  usePreventMobileHoldImage();
  const navigate = useNavigate();
  const location = useLocation();
  const { index, levelid } = location.state || {};
  return (
    <div id="top" className="top">
      <div className="img-container" onClick={() => navigate(-1)}>
        <img src={require("../images/arrow.png")} alt=""></img>
      </div>
      <p className="top-title">
        LEVEL {levelid} ROW {index} PLANTS
      </p>
    </div>
  );
}
function ParameterDetailsContent() {
  usePreventMobileHoldImage();
  const location = useLocation();
  const { index, levelid } = location.state || {};
  const [plantRow, setPlantRow] = useState([]);
  const [imageURL, setImageURL] = useState();
  addVisitedPage(levelid + index);

  // Get Image
  useEffect(() => {
    const fetchIMGData = async () => {
      try {
        const storageRef = ref(storage, "images/1.jpg");
        const url = await getDownloadURL(storageRef);
        setImageURL(url);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };
    fetchIMGData();
    const intervalId = setInterval(fetchIMGData, 120000); // 6000 milliseconds (6 seconds)
    return () => clearInterval(intervalId);
  }, []);

  // Get Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const suffix = `/api/row`;
        const tablesuffix = "/api/table";

        const response = await axios.get(process.env.REACT_APP_RENDER_URL + suffix, {
          params: {
            levelId: levelid,
            rowId: index,
          },
        });
        const data = response.data;
        const table_response = await axios.get(process.env.REACT_APP_RENDER_URL + tablesuffix);
        const table_data = table_response.data;
        var plantRow = [];

        plantRow.push(
          <PlantItem
            key={0}
            levelid={levelid}
            plantid={data[0]["rowid"]}
            idx={data[0]["rowid"]}
            name={data[0]["plantname"]}
            airqualityValue={data[0]["airquality"]}
            soilmoistureValue={data[0]["soilmoisture"]}
            temperatureValue={data[0]["temperature"]}
            soilphValue={data[0]["soilph"]}
            humidityValue={data[0]["humidity"]}
            status={data[0]["status"]}
            table_data={table_data}
          />
        );

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
        <div id="camera-container" style={{ marginBottom: "2vh" }}>
          <div className="camera" id="camera1" style={{ display: "flex", justifyContent: "center" }}>
            {imageURL ? (
              <img src={imageURL} alt="Status" style={{ borderRadius: "20px", width: "90vw" }}></img>
            ) : (
              <div />
            )}
          </div>
        </div>
        {plantRow}

        <div id="camera-item-container">
          <div className="camera-item" style={{ height: "5vh", backgroundColor: "#7AA0B8" }}>
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
          <div className="camera-item" style={{ height: "5vh", backgroundColor: "#7AA0B8" }}>
            <div id="water-the-plant">
              <p
                style={{
                  fontSize: "2.25vh",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                FERTILISE THE PLANT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlantItem(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const statusNumber = props.levelid;

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
  const statusMap = {};

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
    let color, fontColor, individualStatus;
    if (property_name === "airquality") {
      if (propertyValue <= good_threshold) {
        individualStatus = "Good";
        color = statusLightGreen;
        fontColor = statusDarkGreen;
      } else if (propertyValue <= moderate_threshold) {
        individualStatus = "Moderate";
        color = statusLightYellow;
        fontColor = statusDarkYellow;
      } else {
        individualStatus = "Bad";
        color = statusLightRed;
        fontColor = statusDarkRed;
      }
    } else {
      if (propertyValue >= value - good_threshold && propertyValue <= value + good_threshold) {
        individualStatus = "Good";
        color = statusLightGreen;
        fontColor = statusDarkGreen;
      } else if (propertyValue >= value - moderate_threshold && propertyValue <= value + moderate_threshold) {
        individualStatus = "Moderate";
        color = statusLightYellow;
        fontColor = statusDarkYellow;
      } else {
        individualStatus = "Bad";
        color = statusLightRed;
        fontColor = statusDarkRed;
      }
    }

    thresholdRanges[property_name].unshift(color, fontColor, individualStatus);
  }

  const [airTemperatureColor, airTemperatureFontColor, airTemperatureStatus, airTemperatureMin, airTemperatureMax] =
    thresholdRanges["temperature"] || [];
  const [soilMoistureColor, soilMoistureFontColor, soilMoistureStatus, soilMoistureMin, soilMoistureMax] =
    thresholdRanges["soilmoisture"] || [];
  const [airQualityColor, airQualityFontColor, airQualityStatus, airQualityMin, airQualityMax] =
    thresholdRanges["airquality"] || [];
  const [soilPHColor, soilPHFontColor, soilPHStatus, soilPHMin, soilPHMax] = thresholdRanges["soilph"] || [];
  const [humidityColor, humidityFontColor, humidityStatus, humidityMin, humidityMax] =
    thresholdRanges["humidity"] || [];

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
          <Divider style={{ width: "90%" }}>
            <p style={{ fontSize: "1.5vh", color: "#A5A5A5", fontWeight: "500", margin: "0" }}>
              Status : <span style={{ color: fontColor }}>{status}</span>
            </p>
          </Divider>
        </div>
      </div>
      <div className="plant-item-second-row">
        <div className="airtemperature" style={{ width: "33%" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularSliderwithBg
              imageSrc="AIRTEMPERATURE"
              style={{ left: "55%" }}
              value={temperatureValue}
              minValue={airTemperatureMin}
              maxValue={airTemperatureMax}
              color={airTemperatureColor}
              fontColor={airTemperatureFontColor}
              onClick={() => {
                navigate(`/details/${statusNumber}/temperature/${plantid}`, {
                  state: {
                    row_idx: statusNumber,
                    plant_id: plantid,
                    plant_status: airTemperatureStatus,
                    plant_value: temperatureValue,
                    plant_name: name,
                  },
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
              imageSrc="SOILMOISTURE"
              value={soilmoistureValue}
              minValue={soilMoistureMin}
              maxValue={soilMoistureMax}
              color={soilMoistureColor}
              fontColor={soilMoistureFontColor}
              onClick={() => {
                navigate(`/details/${statusNumber}/soil moisture/${plantid}`, {
                  state: {
                    row_idx: statusNumber,
                    plant_id: plantid,
                    plant_status: soilMoistureStatus,
                    plant_value: soilmoistureValue,
                    plant_name: name,
                  },
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
              imageSrc="AIRQUALITY"
              value={airqualityValue}
              minValue={airQualityMin}
              maxValue={airQualityMax}
              color={airQualityColor}
              fontColor={airQualityFontColor}
              onClick={() => {
                navigate(`/details/${statusNumber}/air quality/${plantid}`, {
                  state: {
                    row_idx: statusNumber,
                    plant_id: plantid,
                    plant_status: airQualityStatus,
                    plant_value: airqualityValue,
                    plant_name: name,
                  },
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
              imageSrc="SOILpH"
              value={soilphValue}
              minValue={soilPHMin}
              maxValue={soilPHMax}
              color={soilPHColor}
              fontColor={soilPHFontColor}
              onClick={() => {
                navigate(`/details/${statusNumber}/soil ph/${plantid}`, {
                  state: {
                    row_idx: statusNumber,
                    plant_id: plantid,
                    plant_status: soilPHStatus,
                    plant_value: soilphValue,
                    plant_name: name,
                  },
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
                  state: {
                    row_idx: statusNumber,
                    plant_id: plantid,
                    plant_status: humidityStatus,
                    plant_value: humidityValue,
                    plant_name: name,
                  },
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

export { ParameterDetailsTop, ParameterDetailsContent };
