import React from "react";

const SelectField = (props) => {
    const {name, label, onChange, value, defaultValue, options, required} = props
  return (
    <div>
      <label className="text-black" htmlFor={name}>
        {label}
      </label>
      <select
        className="form-control"
        name="jobTypeName"
        required={required}
        value={value}
        onChange={onChange}
      >
        <option selected disabled hidden>
         {defaultValue}
        </option>
        {options.map((value, index) => (
          <option value={value} key={index}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
