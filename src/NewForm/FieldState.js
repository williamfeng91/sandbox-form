// @flow

import * as React from "react";
import { unwrapChildren } from "./utils";
import withFormState from "./withFormState";

class FieldState extends React.Component {
  constructor(...args) {
    super(...args);

    if (!this.props.name) {
      throw new Error(`Field name is required`);
    }
  }

  componentDidMount() {
    const { formState, name, validate } = this.props;

    if (validate) {
      formState.setFieldValidators(name, validate);
    }
  }

  getFieldStateAndHelpers() {
    const { formState, name } = this.props;
    const {
      fieldActive,
      fieldDirty,
      fieldPristine,
      fieldTouched,
      fieldVisited,
      getFieldError,
      getFieldValue,
      changeValue
    } = formState;

    return {
      // state
      active: fieldActive(name),
      dirty: fieldDirty(name),
      error: getFieldError(name),
      pristine: fieldPristine(name),
      touched: fieldTouched(name),
      value: getFieldValue(name),
      visited: fieldVisited(name),
      // actions
      changeValue
    };
  }

  render() {
    const render = unwrapChildren(this.props.children);

    return render(this.getFieldStateAndHelpers());
  }
}

export default withFormState(FieldState);
