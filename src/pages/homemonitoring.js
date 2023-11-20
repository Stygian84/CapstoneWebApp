import React, { useState, useEffect } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { addVisitedPage } from "../javascript/utils";

function HomeMonitoringTop() {
  return (
    <div id="top" className="top">
      <div className="img-container">
        <img
          src={require("../images/bars.png")}
          style={{ width: "15.5vw" }}
          alt=""
        ></img>
      </div>
      <p className="top-title">HOME MONITORING</p>
    </div>
  );
}

function HomeMonitoringContent() {
  const navigate = useNavigate();

  // For Weather and Date
  const [weatherData, setWeatherData] = useState({
    name: "",
    sys: { country: "" },
    dt: 0,
    weather: [{ description: "" }],
    main: { temp: 0 },
  });
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    const apiKey = "662c2df70979465f90b101456566dea2";
    const city = "Singapore";
    const fetchData = () => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const adjustedTimeStamp = data.dt + 9 * 60;
          setWeatherData({ ...data, dt: adjustedTimeStamp });
          console.log(data);

          const newFormattedDate = new Date(data.dt * 1000).toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              hour: "numeric",
              minute: "numeric",
              timeZone: "Asia/Singapore",
            }
          );
          setFormattedDate(newFormattedDate);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    };
    fetchData();
    const intervalId = setInterval(fetchData, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // For Recent Items logic
  const storedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];
  console.log(storedPages);
  const lastTwoSegmentsArray = storedPages.map((storedPages) => {
    const segments = storedPages.split("/").filter(Boolean);
    return segments.slice(-2);
  });
  console.log(lastTwoSegmentsArray); //[['camera','1'], ['status','1']]

  let Recent = [];
  for (let i = 0; i < lastTwoSegmentsArray.length; i++) {
    if (lastTwoSegmentsArray[i][0] == "camera") {
      Recent.push(
        <div
          className="recent-item"
          onClick={() => {
            navigate(`/camera/${lastTwoSegmentsArray[i][1]}`, {
              state: { index: lastTwoSegmentsArray[i][1] },
            });
          }}
          key={i}
        >
          <img src={require("../images/greycamera.png")} alt="Camera"></img>
          <img
            src={require("../images/whitecamera.png")}
            className="new-image"
            alt="Status"
          ></img>
          <div className="row-status">
            <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "500" }}>
              Row {lastTwoSegmentsArray[i][1]}
            </p>
            <p style={{ fontSize: "1vh", color: "#A5A5A5", fontWeight: "500" }}>
              Camera
            </p>
          </div>
          <p
            style={{
              marginLeft: "auto",
              marginTop: "0",
              marginBottom: "0",
              paddingRight: "2%",
              fontSize: "3.5vh",
              color: "#C8C8C8",
            }}
          >
            &gt;
          </p>
        </div>
      );
    } else {
      Recent.push(
        <div
          className="recent-item"
          onClick={() => {
            navigate(`/status/${lastTwoSegmentsArray[i][1]}`, {
              state: { index: lastTwoSegmentsArray[i][1] },
            });
          }}
          key={i}
        >
          <img src={require("../images/greystatus.png")} alt="Status"></img>
          <img
            src={require("../images/whitestatus.png")}
            className="new-image"
            alt="Status"
          ></img>
          <div className="row-status">
            <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "500" }}>
              Row {lastTwoSegmentsArray[i][1]}
            </p>
            <p style={{ fontSize: "1vh", color: "#A5A5A5", fontWeight: "500" }}>
              Status
            </p>
          </div>
          <p
            style={{
              marginLeft: "auto",
              marginTop: "0",
              marginBottom: "0",
              paddingRight: "2%",
              fontSize: "3.5vh",
              color: "#C8C8C8",
            }}
          >
            &gt;
          </p>
        </div>
      );
    }
  }

  return (
    <div id="content" className="content">
      {/* Header Section */}
      <div id="header-container">
        <div id="morning">
          <p style={{ fontSize: "3vh" }}>Good Morning,</p>
          <p style={{ fontSize: "2.5vh" }}>Ron and Jen!</p>
        </div>
        <div id="weather-container">
          <p style={{ fontSize: "2vh" }}>
            {weatherData.name}, {weatherData.sys.country}
          </p>
          <p>{formattedDate}</p>
          <p>{weatherData.weather[0].description}</p>
          <p style={{ fontWeight: "bold" }}>{weatherData.main.temp} °C</p>
        </div>
      </div>

      {/* Box Feature Section */}
      <div id="feature-container">
        <div
          className="feature-item"
          id="feature1"
          onClick={() => navigate("/row", { state: { prev: "Status" } })}
        >
          <img src={require("../images/greenstatus.png")} alt="Status"></img>
          <img
            src={require("../images/whitestatus.png")}
            className="new-image"
            alt="Status"
          ></img>
          <p style={{ color: "#8FA586" }}>Status</p>
        </div>

        <div
          className="feature-item"
          style={{ marginRight: "15%" }}
          id="feature2"
          onClick={() => navigate("/row", { state: { prev: "Camera" } })}
        >
          <img src={require("../images/camera.png")} alt="Camera"></img>
          <img
            src={require("../images/whitecamera.png")}
            className="new-image"
            alt="Status"
          ></img>
          <p style={{ color: "#8793AE" }}> Camera</p>
        </div>

        <div
          className="feature-item"
          id="feature3"
          onClick={() => navigate("/settings")}
        >
          <img src={require("../images/settings.png")} alt="Settings"></img>
          <img
            src={require("../images/whitesettings.png")}
            className="new-image"
            alt="Status"
          ></img>
          <p style={{ color: "#7A9E95" }}>Settings</p>
        </div>
        <div></div>
      </div>
      <div id="recent-header">
        <p style={{ fontWeight: "bold" }}>Recent</p>
      </div>

      {/* Recent item Section */}
      <div id="recent-container">{Recent}</div>
    </div>
  );
}
export { HomeMonitoringContent, HomeMonitoringTop };
