import React from "react";
import { LinearProgress } from "@mui/material";

const ExpandingProgressBars = ({ redValue, yellowValue, greenValue, style, type, totalValue, propertyValue }) => {
  // Calculate the widths for the red, orange, and yellow progress bars
  const Value = 100;

  return (
    <div style={{ position: "absolute", width: "100%", ...style }}>
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        {/* Red progress bar */}
        <div style={{ width: `${33}%` }}>
          <LinearProgress
            variant="determinate"
            value={100}
            style={{ flexGrow: 1 }}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: "red",
              },
            }}
          />
        </div>
        {/* Yellow progress bar */}
        <div style={{ width: `${33}%` }}>
          <LinearProgress
            variant="determinate"
            value={100}
            style={{ flexGrow: 1, transform: "translateX(-50%)" }}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: "yellow",
              },
            }}
          />
        </div>
        {/* Green progress bar */}
        <div style={{ width: `${33}%` }}>
          <LinearProgress
            variant="determinate"
            value={100}
            style={{ flexGrow: 1, transform: "translateX(-100%)" }}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: "lightgreen",
              },
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: "1%",
            top: "4px",
            transform: "translateX(-50%)",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            zIndex: 1,
            fontSize: "1.75vh",
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
          }}
        >
          {redValue}
        </div>
        <div
          style={{
            position: "absolute",
            left: "17%", // Center the cursor horizontally
            top: "4px",
            transform: "translateX(-50%)",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            zIndex: 1,
            fontSize: "1.75vh",
          }}
        >
          ^
        </div>
        <div
          style={{
            position: "absolute",
            left: "16%",
            top: "16px",
            transform: "translateX(-50%)",
            transform: type === "right" ? "translateX(-50%) scaleX(-1)" : "translateX(-50%)",

            zIndex: 1,
            fontSize: "1.75vh",
          }}
        >
          {yellowValue}
        </div>
        <div
          style={{
            position: "absolute",
            left: "34%",
            top: "4px",
            transform: "translateX(-50%)",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            zIndex: 1,
            fontSize: "1.75vh",
          }}
        >
          ^
        </div>
        <div
          style={{
            position: "absolute",
            left: "33%",
            top: "16px",
            transform: "translateX(-50%)",
            transform: type === "right" ? "translateX(-50%) scaleX(-1)" : "translateX(-50%)",
            zIndex: 1,
            fontSize: "1.75vh",
          }}
        >
          {greenValue}
        </div>
      </div>
    </div>
  );
};

export { ExpandingProgressBars };
