import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../css/pages/plant.css";
import { useNavigate, useLocation } from "react-router-dom";
import { statusDarkGreen, statusDarkRed, statusDarkYellow } from "../javascript/colors";
import fetchDataFromLinks from "../javascript/utils";
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
        const suffix = `/api/plant/${index}`;
        // Use Render
        const response = await axios.get(process.env.REACT_APP_RENDER_URL + suffix);
        const data = response.data;

        // Use AWS
        // const data = await fetchDataFromLinks(suffix);
        // setJsonData(data);

        console.log(data[0]);
        var plantRow = [];

        for (let i = 0; i < 12; i++) {
          plantRow.push(
            <PlantItem
              key={i}
              idx={data[i]["plantid"]}
              name={data[i]["plantname"]}
              airQualityValue={data[i]["airquality"]}
              soilMoistureValue={data[i]["soilmoisture"]}
              airTemperatureValue={data[i]["temperature"]}
              soilPHValue={data[i]["soilph"]}
              humidityValue={data[i]["humidity"]}
              status={data[i]["status"]}
            />
          );
        }

        setPlantRow(plantRow);
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
  const prev = location.state ? location.state.prev : null;

  var i = props.idx;
  var name = props.name;
  var Status = props.status;
  var AirTemperatureValue = props.airTemperatureValue;
  var SoilMoistureValue = props.soilMoistureValue;
  var AirQualityValue = props.airQualityValue;
  var SoilPHValue = props.soilPHValue;
  var HumidityValue = props.humidityValue;
  var Status = props.status;

  var fontColor = statusDarkGreen;

  if (Status == "Bad") {
    fontColor = statusDarkRed;
  } else if (Status == "Moderate") {
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
          <p style={{ fontSize: "1.75vh", color: "#737373", fontWeight: "bold", margin: "0", marginTop: "1vh" }}>
            {i}. {name}
          </p>
          <p style={{ fontSize: "1.2vh", color: "#A5A5A5", fontWeight: "500", margin: "0" }}>
            Status : <span style={{ color: fontColor }}>{Status}</span>
          </p>
        </div>
      </div>

      <div className="plant-item-second-row">
        <div className="airtemperature" style={{ width: "33%" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularSliderwithBg imageSrc="AIR TEMPERATURE" style={{ left: "55%" }} value={AirTemperatureValue} />
          </div>
          <div style={{ fontSize: "1.5vh", color: "#A5A5A5", display: "flex", justifyContent: "space-evenly" }}>
            Air Temperature
          </div>
        </div>
        <div className="soilmoisture" style={{ width: "33%" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularSliderwithBg imageSrc="SOIL MOISTURE" value={SoilMoistureValue} />
          </div>
          <div style={{ fontSize: "1.5vh", color: "#A5A5A5", display: "flex", justifyContent: "space-evenly" }}>
            Soil Moisture
          </div>
        </div>
        <div className="airquality" style={{ width: "33%" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularSliderwithBg imageSrc="AIR QUALITY" value={AirQualityValue} />
          </div>
          <div style={{ fontSize: "1.5vh", color: "#A5A5A5", display: "flex", justifyContent: "space-evenly" }}>
            Air Quality
          </div>
        </div>
      </div>

      <div className="plant-item-third-row">
        <div className="soilph" style={{ width: "33%" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularSliderwithBg imageSrc="SOIL pH" value={SoilPHValue} />
          </div>
          <div style={{ fontSize: "1.5vh", color: "#A5A5A5", display: "flex", justifyContent: "space-evenly" }}>
            Soil pH
          </div>
        </div>
        <div className="humidity" style={{ width: "33%" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularSliderwithBg imageSrc="HUMIDITY" value={HumidityValue} />
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
