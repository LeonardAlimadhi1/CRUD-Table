import React from "react";
import "./input.css";

const CustomInput = React.forwardRef(
  ({ label, name, type, value = "", onChange, placeholder, error }, ref) => {

    const handleInputChange = (e) => {
      const inputValue = e.target.value;

      onChange(name, inputValue);
    };

    return (
      <div>
        <label className="label" htmlFor={name}>
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleInputChange}
          className={"input " + (error ? "Invalid" : "Valid")}
          placeholder={placeholder}
          ref={ref}
        />
        {error && <span className="label">{error}</span>}
      </div>
    );
  }
);

export default CustomInput;
