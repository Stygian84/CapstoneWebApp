import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircularSliderwithBg(props) {
  return (
    <div className="circle-container-plant" onClick={props.onClick}>
      <div
        className="circle-container-plant-background"
        style={{ ...props.style, backgroundImage: `url(${require(`../images/${props.imageSrc}.png`)})` }}
      />
      <CircularProgressbar
        styles={buildStyles({
          textColor: props.fontColor,
          pathColor: props.color,
          trailColor: "transparent",
          strokeLinecap: "round",
          textSize: "3vh",
        })}
        value={props.value}
        text={props.value}
        minValue={props.minValue}
        maxValue={props.maxValue}
        strokeWidth={6}
      />
    </div>
  );
}

export default CircularSliderwithBg;
