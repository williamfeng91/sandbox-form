import React from "react";
import { render } from "react-dom";
import { Form, FormState, SubmissionError } from "./NewForm";
import { TextInput } from "./Fields";

const required = ({ msg = "Required " } = {}) => value => {
  if (value == null || value === "") return msg;
};

const styles = {
  error: {
    color: "red"
  }
};

const submitToServer = values => {
  console.log(values);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.password !== "ha") {
        const err = new Error("Request error");
        err.response = {
          status: 400,
          data: {
            __formError: "???",
            password: "Incorrect password"
          }
        };
        reject(err);
      }
      resolve();
    }, 1000);
  });
};

const App = () => {
  const handleSubmit = async values => {
    try {
      await submitToServer(values);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        throw new SubmissionError(err.response.data);
      } else {
        throw err;
      }
    }
  };

  return (
    <Form initialValues={{ name: "aliceee" }} onSubmit={handleSubmit}>
      <Form.Field
        name="name"
        component={TextInput}
        label="Name"
        validate={required({ msg: "Email is required" })}
      />
      <Form.Field
        name="password"
        component={TextInput}
        label="Password"
        validate={required({ msg: "Password is required" })}
      />
      <Form.SubmitButton text="Login" />
    </Form>
  );
};

const App1 = () => (
  <FormState
    initialValues={{ email: "wtest@bappo.com" }}
    validate={({ getFieldValue }) => {
      const errors = {};
      if (!getFieldValue("email")) {
        errors.email = "Email is required";
      } else if (!getFieldValue("password")) {
        errors.password = "Password is required";
      }
      return errors;
    }}
  >
    {({
      fieldErrors,
      formError,
      submitting,
      values,
      fieldTouched,
      getFieldError,
      getFieldValue,
      blur,
      changeValue,
      focus,
      submit,
      touchAll
    }) => {
      const handleSubmit = e => {
        e.preventDefault();
        touchAll();
        if (Object.keys(fieldErrors).length === 0) {
          submit(async () => {
            try {
              await submitToServer(values);
            } catch (err) {
              if (err.response && err.response.status === 400) {
                throw new SubmissionError(err.response.data);
              } else {
                throw err;
              }
            }
          });
        }
      };
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <span style={styles.error}>{formError}</span>
          </div>
          <div>
            <label>Email</label>
            <input
              onBlur={() => blur("email")}
              onFocus={() => focus("email")}
              onChange={e => changeValue("email", e.target.value)}
              value={getFieldValue("email") || ""}
            />
            <span style={styles.error}>
              {fieldTouched("email") && getFieldError("email")}
            </span>
          </div>
          <div>
            <label>Password</label>
            <input
              onBlur={() => blur("password")}
              onFocus={() => focus("password")}
              onChange={e => changeValue("password", e.target.value)}
              value={getFieldValue("password") || ""}
            />
            <span style={styles.error}>
              {fieldTouched("password") && getFieldError("password")}
            </span>
          </div>
          <button type="submit">
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>
      );
    }}
  </FormState>
);

render(<App />, document.getElementById("root"));
