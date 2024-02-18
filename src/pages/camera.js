import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../css/pages/camera.css";
import { useNavigate, useLocation } from "react-router-dom";
import { backgroundDarkGreen, backgroundDarkYellow, backgroundDarkRed } from "../javascript/colors";

function CameraTop() {
  const navigate = useNavigate();
  const location = useLocation();
  const { index } = location.state || {};
  return (
    <div id="top" className="top">
      <div className="img-container" onClick={() => navigate(-1)}>
        <img src={require("../images/arrow.png")} alt=""></img>
      </div>
      <p className="top-title">ROW SELECTION</p>
    </div>
  );
}

function CameraContent() {
  const location = useLocation();
  const cameraNumber = location.pathname.split("/")[2];
  const { index = cameraNumber, overallstatus } = location.state || {};
  const [cameraRow, setCameraRow] = useState([]);
  const [jsonData, setJsonData] = useState(null);
  const [parameterData, setParameterData] = useState();

  useEffect(() => {
    let initialCameraRow = [];
    const Status = [];
    const fetchData = async () => {
      try {
        const suffix = "/api/parameter";
        const tablesuffix = "/api/table";
        // Use Render
        const response = await axios.get(process.env.REACT_APP_RENDER_URL + suffix);
        const data = response.data;
        // Initialize an empty object to store the transformed data
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
      initialCameraRow = [];
      setCameraRow([]);
    };
  }, []);

  const parentContainerStyle = {
    position: "relative",
    width: "100vw",
    height: "100vh",
  };

  const centeredImageStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95vw",
    height: "50vh",
  };

  // Create grid container style
  const gridContainerStyle = {
    position: "absolute",
    top: "23%",
    left: 0,
    display: "grid",
    gridTemplateColumns: `repeat(4, 1fr)`,
    gridTemplateRows: `repeat(4, 1fr)`,
    gap: "0px",
    margin: "0 2.5vw",

    width: "94.5vw",
  };

  return (
    <div id="content" className="content">
      <div style={parentContainerStyle}>
        <img src={require("../images/LevelView.png")} alt="Status" style={centeredImageStyle}></img>
        <div className="grid-container" style={gridContainerStyle}>
          {parameterData && <Cells level={2} data={parameterData} />}
        </div>
        <div className="grid-container-2" style={{ ...gridContainerStyle, top: "50.5%" }}>
          {parameterData && <Cells level={3} data={parameterData} />}
        </div>
        <div
          style={{
            fontSize: "4vh",
            color: "white",
            textShadow: `
            -2px -2px 5px #7aa0b8,
            2px -2px 10px black,
            -2px 2px 10px black,
            1px 1px 10px black
          `,
            fontWeight: "bold",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "42.5%",
            position: "absolute",
          }}
        >
          LEVEL 3
        </div>
        <div
          style={{
            fontSize: "4vh",
            color: "white",
            textShadow: `
            -2px -2px 5px #7aa0b8,
            2px -2px 10px black,
            -2px 2px 10px black,
            1px 1px 10px black
          `,
            fontWeight: "bold",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "70.5%",
            position: "absolute",
          }}
        >
          LEVEL 2
        </div>
      </div>

      {/* Box Feature Section */}
      {/* <div id="camera-container">
        <div className="camera" id="camera1" style={{ display: "flex", justifyContent: "center" }}>
          <img src={require("../images/LevelView.png")} alt="Status" style={{ width: "90vw", height: "50vh" }}></img>
        </div>
      </div>
      <div
        id="camera-content-header"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ fontWeight: "bold", color: "#737373" }}>CAMERA ROW {index}</p>
      </div> */}

      {/* Camera item Section */}
      {/* <div id="camera-item-container">
        {cameraRow}

        <div className="camera-item" style={{ height: "7vh", backgroundColor: "#7AA0B8" }}>
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
      </div> */}
    </div>
  );
}

function Cells(props) {
  const navigate=useNavigate();
  const cells = [];
  const level = props.level;
  const data = props.data;
  console.log(data);
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
          height: `100%`,
        }}
        onClick={() => navigate("/parameterdetails", {  state: { index: key ,levelid:level} })}
      >
        {`${rowChar}${colNum}`}
      </div>
    );
  }
  return cells;
}
// function CameraItem(props) {
//   var Status = props.status;
//   var fontColor = statusDarkGreen;
//   const type = props.type.toLowerCase().replace(/\s/g, "");
//   console.log(require(`../images/blue${type}.png`));

//   if (Status == "Bad") {
//     fontColor = statusDarkRed;
//   } else if (Status == "Moderate") {
//     fontColor = statusDarkYellow;
//   } else {
//     fontColor = statusDarkGreen;
//   }

//   return (
//     <div className="camera-item">
//       <div>
//         <img src={require(`../images/blue${type}.png`)} alt="Status"></img>
//       </div>
//       <div className="camera-row-status">
//         <p>
//           {props.type} : <span style={{ color: fontColor }}>{props.status}</span>
//         </p>
//       </div>
//     </div>
//   );
// }
export { CameraContent, CameraTop };
