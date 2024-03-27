import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/pages/harvest.css";
import { useNavigate } from "react-router-dom";
import { usePreventMobileHoldImage } from "../javascript/utils";
import ToggleSwitch from "../components/ToggleSwitch";
import fetchDataFromFirestore from "../javascript/fetchFireStoreData";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import BoxBar from "../components/Box";
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

function HarvestTop() {
  usePreventMobileHoldImage();
  const navigate = useNavigate();
  return (
    <div id="top" className="top">
      <div className="img-container" onClick={() => navigate(-1)}>
        <img src={require("../images/arrow.png")} alt=""></img>
      </div>
      <p className="top-title">HARVEST TIME</p>
    </div>
  );
}

function HarvestContent() {
  usePreventMobileHoldImage();
  const [level2, setLevel2] = useState();
  const [level3, setLevel3] = useState();
  const [plantLevel2, setPlantLevel2] = useState([]);
  const [plantLevel3, setPlantLevel3] = useState([]);
  const [isContainerVisible, setContainerVisible] = useState(false);
  const [isContainerVisible2, setContainerVisible2] = useState(false);
  const [updateValue, setUpdateValue] = useState(false);
  const toggleContainerVisibility = () => {
    setContainerVisible(!isContainerVisible);
    setContainerVisible2(false);
  };
  const toggleContainerVisibility2 = () => {
    setContainerVisible2(!isContainerVisible2);
    setContainerVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const level2data = await fetchDataFromFirestore(2);
        const level3data = await fetchDataFromFirestore(3);
        setLevel2(level2data);
        setLevel3(level3data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [updateValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const suffix = `/api/row`;

        // Use Render
        const response2 = await axios.get(process.env.REACT_APP_RENDER_URL + suffix, {
          params: {
            levelId: 2,
          },
        });
        const data2 = response2.data;
        const response3 = await axios.get(process.env.REACT_APP_RENDER_URL + suffix, {
          params: {
            levelId: 3,
          },
        });
        const data3 = response3.data;
        var plantLevel2 = [];
        var plantLevel3 = [];

        for (let i = 0; i < 32; i++) {
          plantLevel2.push({
            key: i,
            levelid: 2,
            plantid: data2[i]["rowid"],
            name: data2[i]["plantname"],
            days: level2[i].value,
          });
          plantLevel3.push({
            key: i,
            levelid: 3,
            plantid: data3[i]["rowid"],
            name: data3[i]["plantname"],
            days: level3[i].value,
          });
        }
        setPlantLevel2(plantLevel2);
        setPlantLevel3(plantLevel3);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [level2, level3, updateValue]);

  const updateValueState = () => {
    setUpdateValue(!updateValue);
  };
  const parentDivStyle = {
    height: !isContainerVisible ? "3.4vh" : "325vh",
    width: "90vw",
    transition: "height 0.5s ease-in-out",
    overflow: "hidden",
    backgroundColor: isContainerVisible ? "white" : "#7AA0B8",
    position: "relative",
    marginBottom: isContainerVisible ? "7.5vh" : "2.5vh",
    zIndex: 5,
    top: 0,
  };
  const parentDivStyle2 = {
    height: !isContainerVisible2 ? "3.4vh" : "162.5vh",
    width: "90vw",
    transition: "height 0.5s ease-in-out",
    overflow: "hidden",
    backgroundColor: isContainerVisible2 ? "white" : "#7AA0B8",
    position: "relative",
    zIndex: 5,
    bottom: 0,
  };
  return (
    <div id="content" className="content">
      <div id="harvest-selection-container">
        {/* Level 2 */}
        <div className="harvest-level-container" style={parentDivStyle}>
          <div
            style={{
              fontSize: "2.5vh",
              color: isContainerVisible ? "#7AA0B8" : "white",
              width: "100%",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={toggleContainerVisibility}
          >
            LEVEL 2
          </div>
          <div className="harvest-item-container">
            {plantLevel2.map((item) => (
              <HarvestItem
                isContainerVisible={isContainerVisible}
                key={item.key}
                plantid={item.plantid}
                name={item.name}
                days={item.days}
                level={item.levelid}
                updateValueState={updateValueState}
              />
            ))}
          </div>
        </div>

        {/* Level 3 */}
        <div className="harvest-level-container" style={parentDivStyle2}>
          <div
            style={{
              fontSize: "2.5vh",
              color: isContainerVisible2 ? "#7AA0B8" : "white",
              width: "100%",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={toggleContainerVisibility2}
          >
            LEVEL 3
          </div>
          <div className="harvest-item-container">
            {plantLevel3.map((item) => (
              <HarvestItem
                isContainerVisible={isContainerVisible2}
                key={item.key}
                plantid={item.plantid}
                name={item.name}
                days={item.days}
                level={item.levelid}
                updateValueState={updateValueState}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function HarvestItem({ isContainerVisible, plantid, name, days, level, updateValueState }) {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimeout, setClickTimeout] = useState(null);
  var roundedDays = Math.max(days, 0);
  const [activeBoxes, setActiveBoxes] = useState([0]);

  useEffect(() => {
    const allBoxes = [...Array(7)].map((_, index) => index);
    const newActiveBoxes = allBoxes.slice(0, 7 - roundedDays);
    setActiveBoxes(newActiveBoxes);
  }, [days]);

  useEffect(() => {
    if (parseInt(days) <= 0) {
      setIsToggleOn(true);
    }
  }, [days]);

  const handleToggle = async (level, plantid, newValue) => {
    // If isToggleOn is true, perform a single-click toggle, else double click
    if (isToggleOn) {
      setIsToggleOn((prevState) => !prevState);
      updateValueState();
      try {
        const docRef = doc(firestore, `Level${level}`, plantid); // Reset to 7 days
        await updateDoc(docRef, {
          value: newValue,
        });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      setClickCount((prevCount) => prevCount + 1);
      clearTimeout(clickTimeout);
      setClickTimeout(
        setTimeout(() => {
          if (clickCount >= 2) {
            setIsToggleOn((prevState) => !prevState);
            updateValueState();
            try {
              const docRef = doc(firestore, `Level${level}`, plantid);
              updateDoc(docRef, {
                value: newValue,
              });
            } catch (error) {
              console.error("Error updating document: ", error);
            }
          }
          setClickCount(0);
        }, 300)
      );
    }
  };
  const containerStyle = {
    fontSize: "2vh",
    fontWeight: "600",
    width: "27.5vw",
    height: "5vh",
    borderRadius: "20px",
    marginRight: "2vw",
    backgroundColor: isToggleOn ? "#8FA586" : "#ccc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: "0 2px",
  };
  return (
    <div className={`harvest-item ${isContainerVisible ? "visible" : ""}`}>
      <img src={require(`../images/greenstatus.png`)} alt="Status" />

      <div className="harvest-row-status" style={{ width: "60%" }}>
        <p style={{ paddingLeft: "5px", fontSize: "2vh", color: "#737373", fontWeight: "bold" }}>
          {plantid}. {name}
        </p>
        <BoxBar activeBoxes={activeBoxes} />
        <p style={{ fontSize: "1.5vh", color: "#A5A5A5", fontWeight: "500" }}>Days to harvest: {roundedDays}</p>
      </div>
      {/* after harvest, becomes green, when u want harvest, its red */}
      <div style={{ width: "40%", height: "10vh", display: "flex", alignItems: "center" }}>
        {!isToggleOn ? (
          <div style={containerStyle} onClick={() => handleToggle(level, plantid, 7)}>
            {days} {roundedDays == 1 ? "day" : "days"} left
          </div>
        ) : (
          <div style={containerStyle} onClick={() => handleToggle(level, plantid, 7)}>
            Harvest
          </div>
        )}
      </div>
    </div>
  );
}

export { HarvestTop, HarvestContent };
