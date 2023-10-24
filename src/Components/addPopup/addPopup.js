import React, { useEffect, useState, useCallback } from "react";
import PopupContainer from "../../Containers/popupContainer/popupContainer";
import { useCreateUser } from "../../api/api";

const AddPopup = ({ isVisible, onHide }) => {
  const createAction = useCreateUser();


  const handleSubmit = (payload) => {
    onHide();
    createAction(payload);
  };

  return (
    <PopupContainer
      title={"Add User"}
      onSubmit={handleSubmit}
      isVisible={isVisible}
      onClose={onHide}
    />
  );
};

export default AddPopup;
