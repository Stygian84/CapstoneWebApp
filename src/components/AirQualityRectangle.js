import React from "react";
import "../css/components/Rectangle.css";

import {
  statusDarkGreen,
  statusDarkRed,
  statusDarkYellow,
  statusLightGreen,
  statusLightRed,
  statusLightYellow,
} from "../javascript/colors";

const AirQualityRectangle = ({
  redWidth,
  yellowWidth,
  greenWidth,
  style,
  type,
  redValue,
  yellowValue,
  greenValue,
  totalValue,
  propertyValue,
}) => {
  redWidth = ((redValue - yellowValue) / totalValue) * 100;
  yellowWidth = ((yellowValue - greenValue) / totalValue) * 100;
  greenWidth = (greenValue / totalValue) * 100;
  return (
    <div className="rectangle" style={{ position: "absolute", width: "50%", ...style }}>
      <div className="green" style={{ backgroundColor: `lightgreen`, width: `${greenWidth}%` }}></div>
      <div className="yellow" style={{ backgroundColor: `yellow`, width: `${yellowWidth}%` }}></div>
      <div className="red" style={{ backgroundColor: `red`, width: `${redWidth}%` }}></div>

      <div
        style={{
          position: "absolute",
          left: `1%`,
          top: "4px",
          transform: "translateX(-50%)",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          zIndex: 1,
          fontSize: "1.75vh",
          color: "#737373",
        }}
      >
        ^
      </div>
      <div
        style={{
          position: "absolute",
          left: "0%",
          top: "16px",
          transform: "translateX(-50%)",
          transform: type === "right" ? "translateX(-50%) scaleX(-1)" : "translateX(-50%)",

          zIndex: 1,
          fontSize: "1.75vh",
          color: "#737373",
        }}
      >
        {0}
      </div>
      {/* Green Pointer */}
      <div
        style={{
          position: "absolute",
          left: `${greenWidth + 1}%`,
          top: "4px",
          transform: "translateX(-50%)",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          zIndex: 1,
          fontSize: "1.75vh",
          color: "#737373",
        }}
      >
        ^
      </div>
      <div
        style={{
          position: "absolute",
          left: `${greenWidth}%`,
          top: "16px",
          transform: "translateX(-50%)",
          transform: type === "right" ? "translateX(-50%) scaleX(-1)" : "translateX(-50%)",
          zIndex: 1,
          fontSize: "1.75vh",
          color: "#737373",
        }}
      >
        {greenValue}
      </div>

      {/* Yellow Pointer */}
      <div
        style={{
          position: "absolute",
          left: `${yellowWidth + greenWidth + 1}%`,
          top: "4px",
          transform: "translateX(-50%)",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          zIndex: 1,
          fontSize: "1.75vh",
          color: "#737373",
        }}
      >
        ^
      </div>
      <div
        style={{
          position: "absolute",
          left: `${yellowWidth + greenWidth + 1}%`,
          top: "16px",
          transform: "translateX(-50%)",
          transform: type === "right" ? "translateX(-50%) scaleX(-1)" : "translateX(-50%)",

          zIndex: 1,
          fontSize: "1.75vh",
          color: "#737373",
        }}
      >
        {yellowValue}
      </div>

      {/* Red Pointer */}
      <div
        style={{
          position: "absolute",
          left: `101%`,
          top: "4px",
          transform: "translateX(-50%)",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          zIndex: 1,
          fontSize: "1.75vh",
          color: "#737373",
        }}
      >
        ^
      </div>
      <div
        style={{
          position: "absolute",
          left: "100%",
          top: "16px",
          transform: "translateX(-50%)",
          transform: type === "right" ? "translateX(-50%) scaleX(-1)" : "translateX(-50%)",

          zIndex: 1,
          fontSize: "1.75vh",
          color: "#737373",
        }}
      >
        {redValue}
      </div>
    </div>
  );
};

export default AirQualityRectangle;
