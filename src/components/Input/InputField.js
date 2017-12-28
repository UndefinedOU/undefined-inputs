import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { TextField } from './StyledComponents.js';

const KEY_BLUR = 'Enter';

export default class InputField extends PureComponent {
  static propTypes = {
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    transparent: PropTypes.bool,
    unit: PropTypes.string,
    defaultUnit: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func
  };

  static defaultProps = {
    defaultValue: '',
    value: ''
  };

  constructor (props) {
    super(props);

    this.state = {
      value: this.getFormatedValue(props)
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: this.getFormatedValue(nextProps) });
    }
  }

  getFormatedValue = (props) => {
    const { value, unit } = props;
    let formatedValue = value || '';
    if (unit && formatedValue.substr(-1, unit.length) !== unit) {
      formatedValue += unit;
    }
    return formatedValue;
  }

  getUnformatedValue = (value = '') => {
    const { unit } = this.props;
    return unit ? value.replace(new RegExp(_.escapeRegExp(unit), 'g'), '') : value;
  }

  handleTextChanged = (evt) => {
    // We don't update the state here because we will wait for the value changed through props.
    this.props.onChange && this.props.onChange(this.getUnformatedValue(evt.target.value));
  }

  handleKeyUp = (evt) => {
    evt.key === KEY_BLUR && evt.target.blur();
    this.props.onKeyUp && this.props.onKeyUp(evt);
  }

  handleBurred = (evt) => {
    const {
      defaultValue,
      onChange,
      onBlur,
      defaultUnit,
      unit,
    } = this.props;

    // TODO: not working fix default unit display behavior
    if (unit === defaultUnit) {
      const value = this.getUnformatedValue(evt.target.value);
      !value && defaultValue && onChange && onChange(getUnformatedValue(defaultValue));
      onBlur && onBlur(evt);
    } else {
      const value = this.getUnformatedValue(evt.target.value);
      !value && defaultValue && onChange && onChange(defaultValue);
      onBlur && onBlur(evt);
    }
  }

  render () {
    const {
      defaultValue,
      transparent,
      unit,
      value,
      ...restProps
    } = this.props;
    return (
      <TextField
        transparent={transparent}
        value={this.state.value}
        {...restProps}
        onBlur={this.handleBurred}
        onChange={this.handleTextChanged}
        onKeyUp={this.handleKeyUp}
      />
    );
  }
}
