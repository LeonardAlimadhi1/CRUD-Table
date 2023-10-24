import React from "react";
import "./actionButton.css";
import { ReactComponent as EditIcon } from "../../../Assets/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../Assets/deleteIcon.svg";

const ActionButton = ({ onClick, isEdit }) => {
  return isEdit ? (
    <EditIcon className="imgStyle" onClick={onClick} />
  ) : (
    <DeleteIcon className="imgStyle" onClick={onClick} />
  );
};

export default ActionButton;
