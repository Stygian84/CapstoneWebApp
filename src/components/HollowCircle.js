import React from "react";
import "../css/components/HollowCircle.css";
import {
  statusLightGreen,
  statusLightRed,
  statusLightYellow,
} from "../javascript/colors";

function HollowCircle(props) {
  const fraction = props.value / props.max;
  const degree = fraction * 360;

  var color = statusLightGreen;

  if (fraction <= 1 / 3) {
    color = statusLightRed;
  } else if (fraction <= 2 / 3) {
    color = statusLightYellow;
  } else {
    color = statusLightGreen;
  }

  return (
    // <span className="inner-circle1">

    // </span>
    <span
      className="inner-circle1"
      style={{background: `conic-gradient(${color} 0deg ${degree}deg, transparent 0deg ${degree}deg)`,
    
        borderImage: `conic-gradient(${color} 0deg ${degree}deg, transparent 0deg ${degree}deg ) 1 / 1 / 0 stretch `,
        borderColor: color,
        borderImageSlice:1,
        borderRadius:"50%"
      }}
    ></span>
  );
}

export default HollowCircle;
