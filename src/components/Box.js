import React, { useState } from "react";
import "../css/components/Box.css";

const Box = ({ active }) => {
  return <div className={`box ${active ? "active" : ""}`}></div>;
};

const BoxBar = ({ activeBoxes }) => {
  return (
    <div className="container">
      <div className="box-container">
        {[...Array(7)].map((_, index) => (
          <Box key={index} active={activeBoxes.includes(index)} />
        ))}
      </div>
    </div>
  );
};

export default BoxBar;
