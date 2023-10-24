import React, {useCallback, useEffect, useState} from "react";
import { useUpdateUser } from "../../api/api";
import PopupContainer from "../../Containers/popupContainer/popupContainer";

const EditPopup = ({ userData, isVisible, onHide }) => {
  const [formData, setFormData] = useState({});
  const updateAction = useUpdateUser();

  useEffect(() => {
    if (!userData) {
      setFormData({});
      return;
    }

    setFormData({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      username: userData.username,
      phone: userData.phone,
      street: userData.address.street,
      city: userData.address.city,
      zipcode: userData.address.zipcode,
      lat: userData.address.geo.lat,
      lng: userData.address.geo.lng,
    });
  }, [userData]);

  const handleSubmit = (payload) => {
    onHide();
    updateAction(payload);
  };

  return (
    <PopupContainer
      title="Edit User"
      isVisible={isVisible}
      onClose={onHide}
      onSubmit={handleSubmit}
      initialData={formData}
    />
  );
};

export default EditPopup;
