import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconInputField from './IconInputField.js';
import Stepper from './Stepper.js';

export default class Input extends PureComponent {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultTypes = {
    type: 'text'
  };

  render () {
    const InputComponent = this.props.type === 'number' ? Stepper : IconInputField;
    return (<InputComponent {...this.props} />);
  }
}
