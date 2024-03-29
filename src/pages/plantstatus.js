import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../css/pages/plantstatus.css";
import { useNavigate, useLocation } from "react-router-dom";
import { storage, firestore } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { addVisitedPage } from "../javascript/utils";
import { usePreventMobileHoldImage } from "../javascript/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer } from "recharts";
import { statusDarkGreen, statusDarkRed, statusDarkYellow, statusLightRed } from "../javascript/colors";
import "react-circular-progressbar/dist/styles.css";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import moment from "moment";
import Rectangle from "../components/Rectangle";
import AirQualityRectangle from "../components/AirQualityRectangle";
// import html2canvas from "html2canvas";
// function captureScreenshot() {
//   const element = document.body; // or any other element you want to capture
//   html2canvas(element).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.download = "screenshot.png";
//     link.href = imgData;
//     link.click();
//   });
// }

function PlantStatusTop() {
  usePreventMobileHoldImage();
  const navigate = useNavigate();
  const location = useLocation();
  const { row_idx, plant_id } = location.state || {};
  const properties = location.pathname.split("/")[3];
  addVisitedPage(row_idx + plant_id);
  return (
    <div id="top" className="top">
      <div className="img-container" onClick={() => navigate(-1)}>
        <img src={require("../images/arrow.png")} alt=""></img>
      </div>
      <p className="top-title">
        LEVEL {row_idx} ROW {plant_id} {capitalizeAllLetters(properties)}
      </p>
    </div>
  );
}

function PlantStatusContent() {
  usePreventMobileHoldImage();
  const [imageURL, setImageURL] = useState();
  const [dot, setDot] = useState(true);
  const [chart, setChart] = useState([]);
  const location = useLocation();
  const { row_idx, plant_id, plant_status, plant_value, plant_name } = location.state || {};
  const properties = location.pathname.split("/")[3];
  const [jsonData, setJsonData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [leftYellowValue, setLeftYellowValue] = useState(0);
  const [leftGreenValue, setLeftGreenValue] = useState(0);
  const [rightGreenValue, setRightGreenValue] = useState(0);
  const [rightYellowValue, setRightYellowValue] = useState(0);
  const [leftRedValue, setLeftRedValue] = useState(0);
  const [rightRedValue, setRightRedValue] = useState(0);
  const [propertyValue, setPropertyValue] = useState(0);
  const [slicedDays, setSlicedDays] = useState(30);
  const [selectedChip, setSelectedChip] = useState("1m");
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
  var unit = "";
  var val = "Value";
  if (properties.replace(/%2520|%20/g, "") === "airquality") {
    val = "PSI";
    unit = "";
  } else if (properties.replace(/%2520|%20/g, "") === "humidity") {
    val = "Value";
    unit = "%";
  } else if (properties.replace(/%2520|%20/g, "") === "soilmoisture") {
    val = "Value";
    unit = "%";
  } else if (properties.replace(/%2520|%20/g, "") === "soilph") {
    val = "pH";
    unit = "";
  } else if (properties.replace(/%2520|%20/g, "") === "temperature") {
    val = "Temp";
    unit = "\u00b0C";
  }
  var fontColor = statusDarkGreen;

  if (plant_status === "Bad") {
    fontColor = statusDarkRed;
  } else if (plant_status === "Moderate") {
    fontColor = statusDarkYellow;
  } else {
    fontColor = statusDarkGreen;
  }
  let pointPosition = ((plant_value - leftRedValue) / (rightRedValue - leftRedValue)) * 100;
  if (properties.replace(/%2520|%20/g, "") === "airquality") {
    pointPosition = (plant_value / rightRedValue) * 100;
  }

  // Get Image
  useEffect(() => {
    const fetchIMGData = async () => {
      try {
        let storageRef;
        if (row_idx<=4){
          storageRef = ref(storage, "images/1.jpg");}
        else{
          storageRef = ref(storage, "images/2.jpg");
        }
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

  // Get Graph Data
  useEffect(() => {
    const Status = [];
    const fetchData = async () => {
      try {
        const suffix = `/api/row`;
        const tablesuffix = "/api/table";
        // Use Render
        const response = await axios.get(process.env.REACT_APP_RENDER_URL + suffix, {
          params: {
            levelId: row_idx,
            rowId: plant_id,
            property: properties.replace(/%2520|%20/g, "").replace("%2520", ""),
          },
        });
        const data = response.data;
        const table_response = await axios.get(process.env.REACT_APP_RENDER_URL + tablesuffix);
        const table_data = table_response.data;
        setTableData(table_data);
        setJsonData(data);

        const aggregateAndCalculateAverage = (data, property) => {
          return data.reduce((acc, currentValue) => {
            const date = moment(currentValue.timestamp, ["YYYY-MM-DD HH:mm:ss.SSSSSS", "YYYY-MM-DD HH:mm:ss"]);
            const day = `${date.date()}/${date.month() + 1}`;

            if (!acc[day]) {
              acc[day] = { date: day.toString() };
              acc[day][property] = [];
            }

            acc[day][property].push(currentValue[property]);

            // Calculate average for the property
            const values = acc[day][property];
            if (Array.isArray(values)) {
              acc[day][`Value`] = (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(1);
            }

            return acc;
          }, {});
        };

        const aggregateDataResult = aggregateAndCalculateAverage(data, properties.replace(/%2520|%20/g, ""));
        const chartData = Object.values(aggregateDataResult);
        setChartData(chartData);

        let chart = [];

        let offsetMin = 0;
        let offsetMax = 0;
        for (const item of table_data) {
          const { property_name, value, bad_threshold, good_threshold, moderate_threshold } = item;
          if (property_name === properties.replace(/%2520|%20/g, "")) {
            if (properties.replace(/%2520|%20/g, "") === "airquality") {
              offsetMin = 0;
              offsetMax = moderate_threshold / 2;
              setLeftYellowValue(value - moderate_threshold);
              setLeftGreenValue(value - good_threshold);
              setRightGreenValue(good_threshold);
              setRightYellowValue(moderate_threshold);
              setLeftRedValue(value - bad_threshold);
              setRightRedValue(bad_threshold);
              setPropertyValue(value);
              break;
            }
            setLeftYellowValue(value - moderate_threshold);
            setLeftGreenValue(value - good_threshold);
            setRightGreenValue(value + good_threshold);
            setRightYellowValue(value + moderate_threshold);
            setLeftRedValue(value - bad_threshold);
            setRightRedValue(value + bad_threshold);
            setPropertyValue(value);
            offsetMin = good_threshold * 2;
            offsetMax = good_threshold * 2;
            break;
          }
        }
        const slicedChartData = chartData.slice(0, slicedDays);
        const dataMin = Math.min(...slicedChartData.map((entry) => entry.Value)) - offsetMin;
        const dataMax = Math.max(...slicedChartData.map((entry) => entry.Value)) + offsetMax;
        const yAxisTickCount = 4;
        const xAxisTickCount = 8;

        const yTicks = [];
        for (let i = 0; i < yAxisTickCount; i++) {
          const value = dataMin + ((dataMax - dataMin) / (yAxisTickCount - 1)) * i;
          yTicks.push(value);
        }
        const xTicks = [];
        for (let i = 0; i < slicedChartData.length; i += Math.floor(slicedChartData.length / (xAxisTickCount - 1))) {
          xTicks.push(slicedChartData[i].date);
        }
        chart.push(
          <ResponsiveContainer width="100%" height={"100%"} key={1}>
            <LineChart data={slicedChartData} margin={{ top: 20, right: 30, bottom: 20, left: -10 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="lightgrey" />
              <XAxis
                tick={{ fontSize: "1.5vh" }}
                dataKey="date"
                interval={Math.floor(slicedChartData.length / (xAxisTickCount - 1))}
              />
              <YAxis
                tick={{ fontSize: "1.5vh" }}
                tickFormatter={(value) => value.toFixed(1)}
                domain={[dataMin, dataMax]}
                ticks={yTicks}
              />
              {/* <Tooltip contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid #ccc" }} /> */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                  boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.12)",
                }}
                labelStyle={{ fontWeight: "bold" }}
                formatter={(value) => [`${parseFloat(value).toFixed(1)} ${unit}`]}
              />
              {/* <Legend /> */}
              {/* <Line type="monotone" dataKey="Value" stroke="#7aa0b8" /> */}{" "}
              <Line type="monotone" dataKey="Value" stroke="#7aa0b8" strokeWidth={1.5} activeDot={{ r: 6 }} dot={dot} />
            </LineChart>
            <div style={{ display: "flex", justifyContent: "center", transform: "translateY(-50%)" }}>
              <Stack direction="row" spacing={1}>
                <div
                  style={{
                    backgroundColor: selectedChip == "1m" ? "#7aa0b8" : "rgba(0, 0, 0, 0.08)",
                    color: selectedChip == "1m" ? "white" : "#7aa0b8",
                    padding: "3.5px 9px",
                    borderRadius: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "1.5vh",
                    height: "70%",
                  }}
                  onClick={() => {
                    setSlicedDays(30);
                    setSelectedChip("1m");
                    setDot(true);
                  }}
                >
                  1 month
                </div>
                <div
                  style={{
                    backgroundColor: selectedChip == "3m" ? "#7aa0b8" : "rgba(0, 0, 0, 0.08)",
                    color: selectedChip == "3m" ? "white" : "#7aa0b8",
                    padding: "3.5px 9px",
                    borderRadius: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "1.5vh",
                    height: "70%",
                  }}
                  onClick={() => {
                    setSlicedDays(90);
                    setSelectedChip("3m");
                    setDot(false);
                  }}
                >
                  3 month
                </div>

                <div
                  style={{
                    backgroundColor: selectedChip === "6m" ? "#7aa0b8" : "rgba(0, 0, 0, 0.08)",
                    color: selectedChip == "6m" ? "white" : "#7aa0b8",
                    padding: "3.5px 9px",
                    borderRadius: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "1.5vh",
                    height: "70%",
                  }}
                  onClick={() => {
                    setSlicedDays(180);
                    setSelectedChip("6m");
                    setDot(false);
                  }}
                >
                  6 month
                </div>
              </Stack>
            </div>
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
  }, [slicedDays, selectedChip]);

  const [isDivVisible, setIsDivVisible] = useState(false);

  const toggleVisibility = () => {
    setIsDivVisible(!isDivVisible);
  };
  const parentDivStyle = {
    height: !isDivVisible ? "3.6vh" : "47.5vh",
    width: "90vw",
    transition: "height 0.5s ease-in-out",
    overflow: "hidden",
  };
  // Water The Plant Button
  // Function to set data in Firestore
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleToggle = async () => {
    if (!isButtonDisabled) {
      setIsToggleOn((prevState) => !prevState);
      setIsButtonDisabled(true); // Disable the button

      try {
        const docRef = doc(firestore, "Pump", "Pump");
        await updateDoc(docRef, { Pump: true });
        console.log("Uploaded");

        // Wait for 7 seconds
        setTimeout(() => {
          setIsButtonDisabled(false); // Enable the button
          setIsToggleOn(false); // Reset to false
          updateDoc(docRef, { Pump: false });
          console.log("Updated to false");
        }, 7000);
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  useEffect(() => {}, [isButtonDisabled]);
  return (
    <div id="content" className="content">
      <div id="plant-status-container">
        <div className="plant-status-item">
          <div id="camera-container">
            <div className="camera" id="camera1" style={{ display: "flex", justifyContent: "center" }}>
              {imageURL ? (
                <img id="myimg" src={imageURL} alt="Status" style={{ borderRadius: "20px", width: "90vw",height:"41.5vh",objectFit: "fill" }}></img>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>

      <div id="plant-status-container">
        <div className="plant-status-item" style={parentDivStyle}>
          <div className="toggle-button-container">
            <div
              className="button-container"
              onClick={toggleVisibility}
              style={{ fontSize: "2vh", fontWeight: "bold" }}
            >
              STATISTICS
            </div>
            <div className={isDivVisible ? "toggle-div visible" : "toggle-div"}>
              <div className="plant-status-first-row">
                <div className="plant-item-name">
                  <p style={{ fontSize: "2vh", color: "#737373", fontWeight: "bold", margin: "0", marginTop: "1vh" }}>
                    {plant_name}
                  </p>
                  <Divider style={{ width: "90%" }}>
                    <p style={{ fontSize: "1.5vh", color: "#A5A5A5", fontWeight: "500", margin: "0" }}>
                      Status : <span style={{ color: fontColor }}>{plant_status}</span> {val} :{" "}
                      <span style={{ color: fontColor }}>
                        {plant_value} {unit}
                      </span>
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
              <div className="plant-status-second-row" style={{ height: "35vh", paddingBottom: 20 }}>
                {chart}
              </div>
            </div>
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
            <div style={{ width: "85%", position: "relative", margin: "6% 0" }}>
              {properties.replace(/%2520|%20/g, "") === "airquality" ? (
                <AirQualityRectangle
                  style={{
                    width: "100%",
                  }}
                  yellowValue={rightYellowValue}
                  greenValue={rightGreenValue}
                  redValue={rightRedValue}
                  totalValue={rightRedValue}
                  propertyValue={propertyValue}
                />
              ) : (
                <>
                  <Rectangle
                    width="50%"
                    yellowValue={leftYellowValue}
                    greenValue={leftGreenValue}
                    redValue={leftRedValue}
                    totalValue={propertyValue - leftRedValue}
                    propertyValue={propertyValue}
                  />
                  <Rectangle
                    width="50%"
                    style={{ transform: "translateX(100%) scaleX(-1)" }}
                    type="right"
                    yellowValue={leftYellowValue}
                    greenValue={leftGreenValue}
                    redValue={leftRedValue}
                    rightYellowValue={rightYellowValue}
                    rightGreenValue={rightGreenValue}
                    rightRedValue={rightRedValue}
                    totalValue={propertyValue - leftRedValue}
                    propertyValue={propertyValue}
                  />
                </>
              )}
              {/* Pointer */}
              <div
                style={{
                  position: "absolute",
                  left: `${pointPosition}%`,
                  bottom: "0px",
                  transform: "translateX(-50%)",
                  width: "16px",
                  height: "16px",
                  zIndex: 1,
                  color: fontColor,
                }}
              >
                ˅
              </div>
              <div
                style={{
                  position: "absolute",
                  left: `${pointPosition - 2}%`,
                  bottom: "10px",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                  fontSize: "1.75vh",
                  color: fontColor,
                }}
              >
                {plant_value}
              </div>
            </div>
          </div>
          <div className="plant-description-content">
            <p
              style={{
                fontSize: "1.5vh",
                color: "#A5A5A5",
                fontWeight: "500",
                margin: "5%",
                marginTop: "0",
                textAlign: "justify",
              }}
            >
              {descriptions[properties.replace(/%2520|%20/g, "")]}
            </p>
          </div>
        </div>
      </div>
      <div id="plant-container">
        {/* IF index <=4 , is hydroponics , no water fertilising button */}
        {plant_id.slice(-1)>4 ? 
        <div id="camera-item-container">
          <div
            className="camera-item"
            style={{ height: "4.5vh", backgroundColor: isButtonDisabled ? statusLightRed : "#7AA0B8" }}
          >
            <div id="water-the-plant" onClick={isButtonDisabled ? null : handleToggle} style={{userSelect: 'none'}}>
              <p
                style={{
                  fontSize: "2vh",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {isButtonDisabled ? "PLANT IS WATERED" : "WATER THE PLANT"}
              </p>
            </div>
          </div>
          <div className="camera-item" style={{ height: "4.5vh", backgroundColor: "#7AA0B8" }}>
            <div id="water-the-plant">
              <p
                style={{
                  fontSize: "2vh",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                FERTILISE THE PLANT
              </p>
            </div>
          </div>
        </div>
        :
        <div></div> }
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
