import React from "react";
import { LinearProgress } from "@mui/material";

const ExpandingProgressBars = ({ value, style }) => {
  // Calculate the widths for the red, orange, and yellow progress bars
  const Value = 100;

  return (
    <div style={{ position: "absolute", width: "100%", ...style }}>
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        {/* Red progress bar */}
        <div style={{ width: "30%" }}>
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
        {/* Orange progress bar */}
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
        {/* Yellow progress bar */}
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
      {/* Cursor */}
      <div
        style={{
          position: "absolute",
          left: "50%", // Center the cursor horizontally
          top: "4px", // Adjust the vertical position as needed
          transform: "translateX(-50%)",
          width: "16px",
          height: "16px",
          background: "#000",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />^
    </div>
  );
};

export { ExpandingProgressBars };
