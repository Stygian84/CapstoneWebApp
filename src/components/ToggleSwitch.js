import React from "react";
import "../css/components/ToggleSwitch.css";

function ToggleSwitch(props) {
 
  return (
    <label className="switch">
      <input type="checkbox" />
      <span className="slider round"></span>
    </label>
  );
}

export default ToggleSwitch;


