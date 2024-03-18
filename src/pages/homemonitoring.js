// Possible Navigation
// Home -> Graphic -> Parameterdetails -> PlantStatus
// Home -> Level -> Status -> Plant -> PlantStatus
// Home -> Harvest
import React, { useState, useEffect } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { usePreventMobileHoldImage } from "../javascript/utils";
import fetchDataFromFirestore from "../javascript/fetchFireStoreData";

function HomeMonitoringTop() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchDataFromFirestore();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (data.length !== 0) {
    console.log(data);
  }
  return (
    <div
      id="top"
      className="top"
      style={{
        justifyContent: "space-evenly",
      }}
    >
      <p className="top-title">HOME MONITORING</p>
    </div>
  );
}
function HomeMonitoringContent() {
  usePreventMobileHoldImage();
  const navigate = useNavigate();
  const [cleared, setCleared] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLoaded2, setImageLoaded2] = useState(false);
  const [imageLoaded3, setImageLoaded3] = useState(false);

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

          const newFormattedDate = new Date(data.dt * 1000).toLocaleDateString("en-US", {
            weekday: "long",
            hour: "numeric",
            minute: "numeric",
            timeZone: "Asia/Singapore",
          });
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

  // To Clear Recent Items
  const clearVisitedPages = () => {
    localStorage.removeItem("visitedPages");
    setCleared(true);
    console.log("visitedPages is cleared");
  };

  // For Recent Items logic
  const storedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];
  let Recent = [];
  for (let i = 0; i < storedPages.length; i++) {
    let levelID = storedPages[i].charAt(0);
    let rowID = storedPages[i].slice(1);
    Recent.push(<RecentItem type={"status"} levelidx={levelID} idx={rowID} key={i} />);
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
        <div className="feature-item" id="feature1" onClick={() => navigate("/row", { state: { prev: "Status" } })}>
          {!imageLoaded && (
            <Skeleton
              className="skeleton"
              variant="rounded"
              style={{ width: "25vw", height: "11.5vh", marginTop: "2vh" }}
            />
          )}
          <img src={require("../images/greenstatus.png")} alt="Status" onLoad={() => setImageLoaded(true)} />
          <img
            src={require("../images/whitestatus.png")}
            className="new-image"
            alt="Status"
            onLoad={() => setImageLoaded(true)}
          />

          <p style={{ color: "#8FA586" }}>Status</p>
        </div>

        <div
          className="feature-item"
          id="feature2"
          onClick={() => navigate("/camera/1", { state: { prev: "Camera" } })}
        >
          {!imageLoaded2 && (
            <Skeleton
              className="skeleton"
              variant="rounded"
              style={{ width: "25vw", height: "11.5vh", marginTop: "2vh" }}
            />
          )}
          <img src={require("../images/equalizer.png")} alt="Camera" onLoad={() => setImageLoaded2(true)}></img>
          <img
            src={require("../images/whiteequalizer.png")}
            className="new-image"
            alt="Status"
            onLoad={() => setImageLoaded2(true)}
          ></img>

          <p style={{ color: "#8793AE" }}> Graphic</p>
        </div>
        <div
          className="feature-item"
          id="feature3"
          onClick={() => navigate("/harvest", { state: { prev: "Harvest" } })}
        >
          {!imageLoaded3 && (
            <Skeleton
              className="skeleton"
              variant="rounded"
              style={{ width: "25vw", height: "11.5vh", marginTop: "2vh" }}
            />
          )}
          <img src={require("../images/harvest.png")} alt="Status" onLoad={() => setImageLoaded3(true)} />
          <img
            src={require("../images/whiteharvest.png")}
            className="new-image"
            alt="Status"
            onLoad={() => setImageLoaded3(true)}
          />

          <p style={{ color: "#8FA586" }}>Status</p>
        </div>
        {/* <div className="feature-item" id="feature3" onClick={() => navigate("/settings")}>
          <img src={require("../images/settings.png")} alt="Settings"></img>
          <img src={require("../images/whitesettings.png")} className="new-image" alt="Status"></img>
          <p style={{ color: "#7A9E95" }}>Settings</p>
        </div>
        <div></div> */}
      </div>
      <div id="recent-header">
        <p style={{ fontWeight: "bold" }}>Recent</p>
        <p onClick={clearVisitedPages} style={{ fontSize: "1.5vh", textDecoration: "underline" }}>
          Clear Recent
        </p>
      </div>

      {/* Recent item Section */}
      <div id="recent-container">{Recent}</div>
    </div>
  );
}

function RecentItem(props) {
  const navigate = useNavigate();
  return (
    <div
      className="recent-item"
      onClick={() => navigate("/parameterdetails", { state: { index: props.idx, levelid: props.levelidx } })}
    >
      <img src={require(`../images/grey${props.type}.png`)} alt={props.type}></img>
      <img src={require(`../images/white${props.type}.png`)} className="new-image" alt="Status"></img>
      <div className="row-status">
        <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "500" }}>
          Level {props.levelidx} Row {props.idx}
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

export { HomeMonitoringContent, HomeMonitoringTop };
