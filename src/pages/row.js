import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../css/pages/row.css";
import { useNavigate, useLocation } from "react-router-dom";
import { statusDarkGreen, statusDarkRed, statusDarkYellow } from "../javascript/colors";
import JSONurl from "../javascript/config.js";

function RowTop() {
  const navigate = useNavigate();

  return (
    <div id="top" className="top">
      <div className="img-container" onClick={() => navigate(-1)}>
        <img src={require("../images/arrow.png")} style={{ width: "15.5vw" }} alt=""></img>
      </div>
      <p className="top-title">ROW SELECTION</p>
    </div>
  );
}

function RowContent() {
  const [jsonData, setJsonData] = useState(null);
  const [rowStatus, setRowStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(JSONurl);
        setJsonData(response.data);

        const newStatus = [];

        for (let i = 0; i < 12; i++) {
          var overallStatusObject = response.data.Rows[i]["Overall Status"];
          newStatus[i] = overallStatusObject.Status;
        }

        setRowStatus(newStatus);
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
      <div id="row-selection-container">
        {rowStatus.map((status, index) => (
          <RowItem key={index + 1} idx={index + 1} status={status} />
        ))}
      </div>
    </div>
  );
}

function RowItem(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { prev } = location.state;
  var i = props.idx;

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
    <div
      className="row-selection-item"
      onClick={() => {
        if (prev === "Status") {
          navigate(`/status/${i}`, { state: { index: i } });
        } else if (prev === "Camera") {
          navigate(`/camera/${i}`, { state: { index: i } });
        }
      }}
      key={i}
    >
      <div
        style={{
          margin: "0 0 0 10%",
          width: "10%",
        }}
      >
        <p style={{ fontSize: "2vh", color: "#7AA0B8" }}>{i}</p>
      </div>
      <div className="row-selection-status" style={{ width: "70%" }}>
        <p style={{ fontSize: "1.75vh", color: "#737373", fontWeight: "bold" }}>ROW {i}</p>
        <p style={{ fontSize: "1vh", color: "#A5A5A5", fontWeight: "500" }}>
          Overall Status : <span style={{ color: fontColor }}>{Status}</span>
        </p>
      </div>
      <div style={{ width: "10%" }}>
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
    </div>
  );
}

export { RowTop, RowContent };
