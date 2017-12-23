import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import triggerReactChangeEvent from 'react-trigger-change';
import {
  InputContainer,
  StyledEndIcon,
  StyledStartIcon,
  StepperDown,
  StepperUp
} from './StyledComponents.js';
import InputField from './InputField';

const KEY_UP = 'ArrowUp';
const KEY_DOWN = 'ArrowDown';

export default class Stepper extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    'icon-position': PropTypes.oneOf(['start', 'end']),
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    'step-big': PropTypes.number,
    'step-small': PropTypes.number,
    transparent: PropTypes.bool,
    // We need to keep string in value for user inputing decimal point
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
  };

  static defaultProps = {
    max: 100,
    min: 0,
    step: 1,
    'step-big': 10, // this doesn't work but we still set it
    'step-small': 0.1, // this doesn't work but we still set it
    value: 0
  };

  constructor (props) {
    super(props);
    this.state = {
      hovered: false,
      value: this.getLimitedValue(props)
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: this.getLimitedValue(nextProps) });
    }
  }

  getLimitedValue = (props) => {
    if (+props.value < props.min) {
      return props.min;
    } else if (+props.value > props.max) {
      return props.max;
    } else {
      return props.value;
    }
  }

  bindInput = (input) => {
    this.input = input;
  }

  triggerChangeEvent = () => {
    if (!this.input) {
      return;
    }
    triggerReactChangeEvent(this.input);
  }

  handleMouseEntered = (evt) => {
    this.setState({ hovered: true });
  }

  handleMouseLeft = (evt) => {
    this.setState({ hovered: false });
  }

  handleStepperUpClicked = (evt) => {
    const {
      max,
      step,
      'step-big': stepBig,
      'step-small': stepSmall
    } = this.props;
    const { value } = this.state;
    const inc = evt.shiftKey ? stepBig : (evt.altKey ? stepSmall : step);
    let nextValue = parseFloat((+value + inc).toFixed(14));
    nextValue = nextValue > max ? max : nextValue;
    nextValue !== value && this.setState({ value: nextValue }, this.triggerChangeEvent);
  }

  handleStepperDownClicked = (evt) => {
    const {
      min,
      step,
      'step-big': stepBig,
      'step-small': stepSmall
    } = this.props;
    const { value } = this.state;
    const inc = evt.shiftKey ? stepBig : (evt.altKey ? stepSmall : step);
    let nextValue = parseFloat((+value - inc).toFixed(14));
    nextValue = nextValue < min ? min : nextValue;
    nextValue !== value && this.setState({ value: nextValue }, this.triggerChangeEvent);
  }

  handleTextChanged = (value) => {
    // to correct the decimal point
    const formatedValue = value.substr(-1, 1) === '.' ? (value + '0') : value;
    if (isNaN(+formatedValue)) {
      // eats the non-numeric input event.
      return;
    } else if (+formatedValue > this.props.max) {
      // eats wrong value.
      return;
    } else if (+formatedValue < this.props.min) {
      // eats wrong value.
      return;
    }

    this.props.onChange && this.props.onChange(value);
  }

  handleKeyPressed = (evt) => {
    switch (evt.key) {
      case KEY_UP:
        this.handleStepperUpClicked(evt);
        evt.stopPropagation();
        evt.preventDefault();
        break;
      case KEY_DOWN:
        this.handleStepperDownClicked(evt);
        evt.stopPropagation();
        evt.preventDefault();
        break;
    }
  }

  render () {
    const {
      disabled,
      icon,
      'icon-position': iconPosition,
      transparent,
      ...restProps
    } = this.props;
    const { hovered, value } = this.state;

    // The styled icon is position absolute, we should add padding left or right to textfield.
    const padding = icon && { [iconPosition === 'end' ? 'paddingRight' : 'paddingLeft']: 20 };

    return (
      <InputContainer
        transparent={transparent}
        onMouseEnter={!disabled && this.handleMouseEntered}
        onMouseLeave={!disabled && this.handleMouseLeft}
        onKeyDownCapture={!disabled && this.handleKeyPressed}
      >
        {iconPosition !== 'end' && icon && <StyledStartIcon name={icon} />}
        <InputField
          {...padding}
          {...restProps}
          disabled={disabled}
          innerRef={this.bindInput}
          transparent={transparent}
          type='text'
          value={`${value}` || '0'}
          onChange={this.handleTextChanged}
        />
        {hovered && <StepperUp disabled={disabled} onClick={this.handleStepperUpClicked} />}
        {hovered && <StepperDown disabled={disabled} onClick={this.handleStepperDownClicked} />}
        {iconPosition === 'end' && icon && !hovered && <StyledEndIcon name={icon} />}
      </InputContainer>
    );
  }
}
