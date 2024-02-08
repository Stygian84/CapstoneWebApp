import React from "react";
import CircularSlider from "@fseehawer/react-circular-slider";

function CircularSliderwithBg(props) {
  return (
    <div className="circle-container-plant">
      <div
        className="circle-container-plant-background"
        style={{ ...props.style, backgroundImage: `url(${require(`../images/${props.imageSrc}.png`)})` }}
      />
      <CircularSlider
        dataIndex={props.value} // bug where min is added to dataindex so need to minus here
        min={props.min}
        max={props.max}
        progressColorFrom={props.color}
        progressColorTo={props.color}
        trackColor="transparent"
        progressSize={24}
        trackSize={24}
        labelColor={props.color}
        // Uncomment below after debugging
        hideKnob="true"
        knobDraggable="false"
        label="Value" // The label is hidden in plant.css
      />
    </div>
  );
}

export default CircularSliderwithBg;
