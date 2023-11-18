import React from "react";
import "../css/components/ToggleSwitch.css";

function ToggleSwitch(props) {
  const handleChange = (event) => {
    // setIsSubscribed(event.target.checked);
    // 👇️ this is the checkbox itself
    console.log(event.target);

    // 👇️ this is the checked value of the field
    console.log(`${props.text} value is ${event.target.checked}`);
  };

  return (
    <div className="toggle-switch-container" style={props.style}>
      <p style={{marginLeft:"1%"}}>{props.text} </p>
      <div className="toggle-switch">
        <input
          aria-labelledby=" "
          placeholder=" "
          type="checkbox"
          className="checkbox"
          id={props.text}
          name={props.text}
          onChange={handleChange}
          checked={props.checked}
        />
        <label className="label" htmlFor={props.text}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
}

export default ToggleSwitch;

// const [value, setValue] = useState(1);

// function checkState(input) {
//   return input === 1 ? true : false;
// }

// useEffect(() => {
//   console.log(document.getElementById("Param 1").checked);
// });

//             <ToggleSwitch text="Param 1" checked={checkState(value)} />;
