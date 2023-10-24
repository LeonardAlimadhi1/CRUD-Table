import React from "react";
import "./simpleButton.css";
import { ReactComponent as AddIcon } from "../../../Assets/addIcon.svg";

const SimpleButton = ({ onClick, Text, Icon, isDisabled }) => {
  return (
    <button className="simpleButton" onClick={onClick} disabled={isDisabled}>
      {Icon && <AddIcon className="svgStyle" />}
      <p className="textSimpleButton">{Text}</p>
    </button>
  );
};

export default SimpleButton;
