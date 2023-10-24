import React, { useEffect, useState, useRef, useCallback } from "react";
import { ReactComponent as CloseIcon } from "../../Assets/closeIcon.svg";
import SimpleButton from "../../Components/buttons/simpleButton/simpleButton";
import CustomInput from "../../Components/input/input";
import "./popupContainer.css";
import {validateEmail, validateName, validatePhone} from "../../utils/validators";

const PopupContainer = ({
  isVisible,
  title,
  onSubmit,
  onClose,
    initialData,
}) => {
  const [useGoogleLocation, setUseGoogleLocation] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const handleChange = useCallback((name, value) => {
    setFormData((old) => ({
      ...old,
      [name]: value,
    }));
  }, []);

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (initialData && initialData.id && initialData.lat && initialData.lng) {
      setUseGoogleLocation(true);
    }
    if(initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    let errors = {};
    if ('name' in formData) {
      errors.name = validateName(formData.name);
    } else {
      errors.name = '';
    }
    if ('phone' in formData) {
      errors.phone = validatePhone(formData.phone);
    } else {
      errors.phone = '';
    }
    if ('email' in formData) {
      errors.email = validateEmail(formData.email);
    } else {
      errors.email = '';
    }
    setErrors(errors);
  }, [formData]);

  const autocompleteListener = useCallback(async () => {
    if(!useGoogleLocation) {
      return;
    }
    const place = await autoCompleteRef.current.getPlace();

    if (place) {
      const lat = place.geometry.location.lat().toString();
      const lng = place.geometry.location.lng().toString();
      handleChange("lat", lat);
      handleChange("lng", lng);

      let zip, city, street;
      for (const component of place.address_components) {
        if (component.types.includes("postal_code")) {
          zip = component.long_name;
        }
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("route")) {
          street = component.long_name;
        }
      }
      if (zip) {
        handleChange("zipcode", zip);
      }
      if (city) {
        handleChange("city", city);
      }
      if (street) {
        handleChange("street", street);
      }
    }

  }, [handleChange, useGoogleLocation]);

  useEffect(() => {
    if (!useGoogleLocation) {
      return;
    }

    if (!autoCompleteRef.current) {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current
      );
    }
    autoCompleteRef.current.addListener("place_changed", autocompleteListener);

  }, [useGoogleLocation, autocompleteListener]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isValid) {
      return;
    }
    onSubmit(formData)
  }

  if (!isVisible) {
    return null;
  }

  let isValid = Object.keys(formData).length > 0 && Object.values(errors).filter(e => e !== null).length === 0;

  return (
    <div className="popupBackdrop">
      <div className="popupContainer">
        <div className="popupHeader">
          <span className="headerText">{title}</span>
          <div className="popupButton" onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="popupBody">
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <CustomInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="John Gonzalez"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <CustomInput
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={errors.username}
                  placeholder="johngonzales13"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <CustomInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="johngonzales1332@gmail.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Nr</label>
                <CustomInput
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="+355 69 76 76 654"
                />
              </div>
            </div>
            <div className="form-column">
              <div className="use-google-location-container">
                <input
                  id="useGoogleLocation"
                  type="checkbox"
                  name="useGoogleLocation"
                  checked={useGoogleLocation}
                  onChange={() => setUseGoogleLocation(!useGoogleLocation)}
                />
                <label htmlFor="useGoogleLocation">Use Google Location</label>
              </div>

              <div className="form-group">
                <label htmlFor="street">Address</label>
                <CustomInput
                  ref={inputRef}
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Reter 43"
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <CustomInput
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Tirana"
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipcode">Zip Code</label>
                <CustomInput
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  placeholder="1060"
                />
              </div>
              {useGoogleLocation ? (
                <div className="latlngContainer">
                  <div className="form-group">
                    <label htmlFor="lat">Latitude</label>
                    <CustomInput
                      type="text"
                      id="lat"
                      name="lat"
                      value={formData.lat}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lng">Longitude</label>
                    <CustomInput
                      type="text"
                      id="lng"
                      name="lng"
                      value={formData.lng}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : null}
            </div>
            <div className="formBtnContainer">
              <SimpleButton
                Text={"Save"}
                onClick={handleSubmit}
                isDisabled={!isValid}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupContainer;
