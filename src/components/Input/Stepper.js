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
const PIXEL_TO_VALUE_RATIO = 5;
const MOUSE_DOWN_INTERVAL = 100;

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
    'icon-position': 'start',
    max: 100,
    min: 0,
    step: 1,
    'step-big': 10,
    'step-small': 0.1,
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

  addValue = (inc) => {
    const { max, min } = this.props;
    const { value } = this.state;
    let nextValue = parseFloat((+value + inc).toFixed(10));
    nextValue = nextValue > max ? max : (nextValue < min ? min : nextValue);
    nextValue !== value && this.setState({ value: nextValue }, this.triggerChangeEvent);
  }

  handleMouseEntered = (evt) => {
    this.setState({ hovered: true });
  }

  handleMouseLeft = (evt) => {
    this.setState({ hovered: false });
  }
  // Note: this is native event at body not react event.
  handleMouseMove = (evt) => {
    // use mouseY - pageY for having move up for increasing and down for decreasing.
    const diffY = this.mouseDownY - evt.pageY;
    // It is important to round the value becaues it may have decimals.
    const valueDiff = Math.round(diffY / PIXEL_TO_VALUE_RATIO);
    if (valueDiff) {
      // only set value when the value is not 0
      this.addValue(valueDiff * this.mouseDownStepSize);
      this.mouseDownY = evt.pageY;
    }
  }

  handleMouseDown = (evt) => {
    const {
      step,
      'step-big': stepBig,
      'step-small': stepSmall
    } = this.props;

    // We should keep the value at state because we have to use native event to handle the movement.
    this.mouseDownY = evt.pageY;
    this.mouseDownStepSize = evt.shiftKey ? stepBig : (evt.altKey ? stepSmall : step);
    // We need to put event listener at body to get the mousemove events which are
    // out of this components.
    document.body.addEventListener('mousemove', this.handleMouseMove, true);
    document.body.addEventListener('mouseup', this.handleMouseUp, true);
    document.body.addEventListener('mouseleave', this.handleMouseUp);
  }
  // Note: this is native event at body not react event.
  handleMouseUp = (evt) => {
    // console.log('mouseup', evt.type, evt.target, evt.currentTarget);
    document.body.removeEventListener('mousemove', this.handleMouseMove, true);
    document.body.removeEventListener('mouseup', this.handleMouseUp, true);
    document.body.removeEventListener('mouseleave', this.handleMouseUp);
  }

  handleStepperUpClicked = (evt) => {
    const {
      step,
      'step-big': stepBig,
      'step-small': stepSmall
    } = this.props;

    this.addValue(evt.shiftKey ? stepBig : (evt.altKey ? stepSmall : step));
  }

  handleStepperDownClicked = (evt) => {
    const {
      step,
      'step-big': stepBig,
      'step-small': stepSmall
    } = this.props;
    this.addValue(evt.shiftKey ? -stepBig : (evt.altKey ? -stepSmall : -step));
  }

  handleStepperUpMouseDown = (evt) => {
    evt.persist();
    // TODO: might need to add speed to this
    this.StepperUpInterval = setInterval(() => {
      this.handleStepperUpClicked(evt);
    }, MOUSE_DOWN_INTERVAL);
  }

  handleStepperUpMouseUp = (evt) => {
    clearInterval(this.StepperUpInterval);
  }

  handleStepperDownMouseDown = (evt) => {
    evt.persist();
    this.StepperDownInterval = setInterval(() => {
      this.handleStepperDownClicked(evt);
    }, MOUSE_DOWN_INTERVAL);
  }

  handleStepperDownMouseUp = (evt) => {
    clearInterval(this.StepperDownInterval);
  }

  handleTextChanged = (value) => {
    // to correct the decimal point
    const formatedValue = value.substr(-1, 1) === '.' || value === '-' ? (value + '0') : value;
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


  handleKeyDown = (evt) => {
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
        onMouseEnter={disabled ? null : this.handleMouseEntered}
        onMouseLeave={disabled ? null : this.handleMouseLeft}
        onMouseDown={disabled ? null : this.handleMouseDown}
        onKeyDownCapture={disabled ? null : this.handleKeyDown}
      >
        {iconPosition === 'start' && icon && <StyledStartIcon name={icon} />}
        <InputField
          {...padding}
          {...restProps}
          disabled={disabled}
          innerRef={this.bindInput}
          transparent={transparent}
          type='text'
          value={`${value}`}
          onChange={this.handleTextChanged}
        />
        {hovered &&
          <StepperUp
            disabled={disabled}
            onMouseDown={this.handleStepperUpMouseDown}
            onMouseUp={this.handleStepperUpMouseUp}
            onMouseLeave={this.handleStepperUpMouseUp}
          />
        }
        {hovered &&
          <StepperDown
            disabled={disabled}
            onMouseDown={this.handleStepperDownMouseDown}
            onMouseUp={this.handleStepperDownMouseUp}
            onMouseLeave={this.handleStepperDownMouseUp}
          />
        }
        {iconPosition === 'end' && icon && !hovered && <StyledEndIcon name={icon} />}
      </InputContainer>
    );
  }
}
