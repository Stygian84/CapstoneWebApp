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

const Rectangle = ({
  redWidth,
  yellowWidth,
  greenWidth,
  style,
  type,
  redValue,
  yellowValue,
  greenValue,
  rightRedValue,
  rightYellowValue,
  rightGreenValue,
  totalValue,
  propertyValue,
}) => {
  redWidth = ((yellowValue - redValue) / totalValue) * 100;
  yellowWidth = ((greenValue - yellowValue) / totalValue) * 100;
  greenWidth = ((propertyValue - greenValue) / totalValue) * 100;
  return (
    <div className="rectangle" style={{ position: "absolute", width: "50%", ...style }}>
      <div className="red" style={{ backgroundColor: `red`, width: `${redWidth}%` }}></div>
      <div className="yellow" style={{ backgroundColor: `yellow`, width: `${yellowWidth}%` }}></div>
      <div className="green" style={{ backgroundColor: `lightgreen`, width: `${greenWidth}%` }}></div>
      {/* Red Pointer */}
      <div
        style={{
          position: "absolute",
          left: "3%",
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
          left: "0",
          top: "16px",
          transform: "translateX(-50%)",
          transform: type === "right" ? "translateX(-50%) scaleX(-1)" : "translateX(-50%)",

          zIndex: 1,
          fontSize: "1.75vh",
          color: "#737373",
        }}
      >
        {type === "right" ? rightRedValue : redValue}
      </div>
      {/* Yellow Pointer */}
      <div
        style={{
          position: "absolute",
          left: `${redWidth + 2}%`,
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
          left: `${redWidth}%`,
          top: "16px",
          transform: "translateX(-50%)",
          transform: type === "right" ? "translateX(-50%) scaleX(-1)" : "translateX(-50%)",

          zIndex: 1,
          fontSize: "1.75vh",
          color: "#737373",
        }}
      >
        {type === "right" ? rightYellowValue : yellowValue}
      </div>
      {/* Green Pointer */}
      <div
        style={{
          position: "absolute",
          left: `${yellowWidth + redWidth + 3}%`,
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
          left: `${yellowWidth + redWidth}%`,
          top: "16px",
          transform: "translateX(-50%)",
          transform: type === "right" ? "translateX(-50%) scaleX(-1)" : "translateX(-50%)",
          zIndex: 1,
          fontSize: "1.75vh",
          color: "#737373",
        }}
      >
        {type === "right" ? rightGreenValue : greenValue}
      </div>
    </div>
  );
};

export default Rectangle;
