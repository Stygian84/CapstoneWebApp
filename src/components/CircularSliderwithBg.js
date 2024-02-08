import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircularSliderwithBg(props) {
  return (
    <div className="circle-container-plant">
      <div
        className="circle-container-plant-background"
        style={{ ...props.style, backgroundImage: `url(${require(`../images/${props.imageSrc}.png`)})` }}
      />
      <CircularProgressbar
          styles={buildStyles({
            textColor:props.fontColor,
            pathColor:props.color,
            trailColor: "transparent",
            strokeLinecap: 'round',
          })}
          value={props.value}
          text={props.value}
          minValue={props.minValue}
          maxValue={props.maxValue}
        />
    </div>
  );
}

export default CircularSliderwithBg;
