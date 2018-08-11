// @flow

import * as React from "react";
import { FormStateConsumer } from "./Context";

const SubmitButton = ({ text }) => {
  return (
    <FormStateConsumer>
      {({ submitting }) => (
        <button type="submit">{submitting ? "Saving..." : text}</button>
      )}
    </FormStateConsumer>
  );
};

export default SubmitButton;
