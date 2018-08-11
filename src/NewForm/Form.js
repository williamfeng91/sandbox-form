import React from "react";
import FormState from "./FormState";
import Field from "./Field";
import SubmitButton from "./SubmitButton";

class Form extends React.Component {
  static Field = Field;
  static SubmitButton = SubmitButton;

  render() {
    const { children, initialValues, onSubmit } = this.props;

    return (
      <FormState initialValues={initialValues}>
        {({ fieldErrors, values, submit, touchAll }) => {
          const handleFormSubmit = e => {
            e.preventDefault();
            touchAll();
            if (Object.keys(fieldErrors).length === 0) {
              submit(() => onSubmit(values));
            }
          };
          return <form onSubmit={handleFormSubmit}>{children}</form>;
        }}
      </FormState>
    );
  }
}

export default Form;
