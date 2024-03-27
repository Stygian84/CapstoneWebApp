// Graphic Page
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../css/pages/camera.css";
import { useNavigate, useLocation } from "react-router-dom";
import { backgroundDarkGreen, backgroundDarkYellow, backgroundDarkRed } from "../javascript/colors";
import { usePreventMobileHoldImage } from "../javascript/utils";
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
function GraphicTop() {
  usePreventMobileHoldImage();
  const navigate = useNavigate();
  return (
    <div id="top" className="top">
      <div className="img-container" onClick={() => navigate(-1)}>
        <img src={require("../images/arrow.png")} alt=""></img>
      </div>
      <p className="top-title">ROW SELECTION</p>
    </div>
  );
}

function GraphicContent() {
  usePreventMobileHoldImage();
  const [parameterData, setParameterData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const suffix = "/api/parameter";
        const response = await axios.get(process.env.REACT_APP_RENDER_URL + suffix);
        const data = response.data;
        const transformedData = {};

        // Iterate over the original data
        data.forEach((item) => {
          // Extract rowid, levelid, and status from the item
          const { rowid, levelid, status } = item;

          // Create a key for the object by combining rowid and levelid
          const key = `${levelid}-${rowid}`;

          // Add the status to the object with the key
          transformedData[key] = status;
        });
        setParameterData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 120000); // 120000 milliseconds
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const parentContainerStyle = {
    position: "relative",
    width: "100vw",
    height: "100vh",
  };
  const centeredImageStyle = {
    position: "absolute",
    top: "10%",
    width: "94.5vw",
    height: "29.5vh",
    margin: "0 2.5vw",
  };
  const centeredImageStyle2 = {
    position: "absolute",
    top: "50.5%",
    width: "94.5vw",
    height: "29.5vh",
    margin: "0 2.5vw",
  };

  const gridContainerStyle = {
    position: "absolute",
    top: "10%",
    left: 0,
    display: "grid",
    gridTemplateColumns: `repeat(4, 1fr)`,
    gridTemplateRows: `repeat(4, 1fr)`,
    gridColumnGap: "3.5px",
    margin: "0 2.5vw",
    width: "94.5vw",

  };

  return (
    <div id="content" className="content">
      <div style={parentContainerStyle}>
        <img src={require("../images/wall.png")} alt="Status" style={centeredImageStyle}></img>
        <img src={require("../images/wall.png")} alt="Status" style={centeredImageStyle2}></img>
        <div className="grid-container" style={gridContainerStyle}>
          {parameterData && <Cells level={3} data={parameterData} />}
          {parameterData && <SoilCells level={3} data={parameterData} />}
        </div>
        <div className="grid-container-2" style={{ ...gridContainerStyle, top: "50.5%" }}>
          {parameterData && <Cells level={2} data={parameterData} />}
          {parameterData && <SoilCells level={2} data={parameterData} />}
        </div>
        <div
          style={{
            fontSize: "4vh",
            color: "#7aa0b8",
            fontWeight: "bold",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "5.5%",
            position: "absolute",
          }}
        >
          LEVEL 3
        </div>
        <div
          style={{
            fontSize: "4vh",
            color: "#7aa0b8",
            fontWeight: "bold",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "85.5%",
            position: "absolute",
          }}
        >
          LEVEL 2
        </div>
      </div>
    </div>
  );
}

function Cells(props) {
  const navigate = useNavigate();
  const cells = [];
  const level = props.level;
  const data = props.data;
  for (let i = 0; i < 16; i++) {
    const rowChar = String.fromCharCode(97 + (i % 4)).toUpperCase();
    const colNum = Math.floor(i / 4) + 1;
    const key = `${rowChar}${colNum}`;
    var status = data[`${level}-${key}`];
    var bgcolor = backgroundDarkRed;
    if (status == "Good") {
      bgcolor = backgroundDarkGreen;
    } else if (status == "Moderate") {
      bgcolor = backgroundDarkYellow;
    } else if (status == "Bad") {
      bgcolor = backgroundDarkRed;
    }
    cells.push(
      <div
        key={key}
        className="cell"
        style={{
          backgroundColor: bgcolor,
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "16px",
          width: `100%`,
          height: `3.5vh`,
        }}
        onClick={() => navigate("/parameterdetails", { state: { index: key, levelid: level } })}
      >
        {`${rowChar}${colNum}`}
      </div>
    );
  }
  return cells;
}
function SoilCells(props) {
  const navigate = useNavigate();
  const cells = [];
  const level = props.level;
  const data = props.data;
  for (let i = 16; i < 40; i++) {
    const rowChar = String.fromCharCode(97 + (i % 4)).toUpperCase();
    const colNum = Math.floor(i / 4) + 1;
    const key = `${rowChar}${colNum}`;
    var status = data[`${level}-${key}`];
    var bgcolor = backgroundDarkRed;
    if (status == "Good") {
      bgcolor = backgroundDarkGreen;
    } else if (status == "Moderate") {
      bgcolor = backgroundDarkYellow;
    } else if (status == "Bad") {
      bgcolor = backgroundDarkRed;
    }
    cells.push(
      <div
        key={key}
        className="cell"
        style={{
          backgroundColor: bgcolor,
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "16px",
          width: `100%`,
          height: `2.25vh`,
        }}
        onClick={() => navigate("/parameterdetails", { state: { index: key, levelid: level } })}
      >
        {`${rowChar}${colNum}`}
      </div>
    );
  }
  return cells;
}

export { GraphicContent, GraphicTop };
