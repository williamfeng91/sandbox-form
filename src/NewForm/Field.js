import React from "react";
import FieldState from "./FieldState";

const Field = ({ name, component, label, validate }) => {
  if (!name) {
    throw new Error(`Field name is required`);
  }
  if (!component) {
    throw new Error(`Field component is required`);
  }

  return (
    <FieldState name={name} validate={validate}>
      {({ error, touched, value, changeValue }) => {
        const inputEl = React.createElement(component, {
          onValueChange: value => changeValue(name, value),
          value
        });
        return (
          <div>
            <label>{label}</label>
            {inputEl}
            {touched && error && <span>{error}</span>}
          </div>
        );
      }}
    </FieldState>
  );
};

export default Field;
