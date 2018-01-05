var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import triggerReactChangeEvent from 'react-trigger-change';
import { InputContainer, StyledEndIcon, StyledStartIcon, StepperDown, StepperUp } from './StyledComponents.js';
import InputField from './InputField';

var KEY_UP = 'ArrowUp';
var KEY_DOWN = 'ArrowDown';
var PIXEL_TO_VALUE_RATIO = 5;
var MOUSE_DOWN_INTERVAL = 100;

var Stepper = function (_PureComponent) {
  _inherits(Stepper, _PureComponent);

  function Stepper(props) {
    _classCallCheck(this, Stepper);

    var _this = _possibleConstructorReturn(this, (Stepper.__proto__ || Object.getPrototypeOf(Stepper)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      hovered: false,
      value: _this.getLimitedValue(props)
    };
    return _this;
  }

  _createClass(Stepper, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.value !== nextProps.value) {
        this.setState({ value: this.getLimitedValue(nextProps) });
      }
    }
    // Note: this is native event at body not react event.

    // Note: this is native event at body not react event.

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          disabled = _props.disabled,
          icon = _props.icon,
          iconPosition = _props['icon-position'],
          transparent = _props.transparent,
          restProps = _objectWithoutProperties(_props, ['disabled', 'icon', 'icon-position', 'transparent']);

      var _state = this.state,
          hovered = _state.hovered,
          value = _state.value;

      // The styled icon is position absolute, we should add padding left or right to textfield.

      var padding = icon && _defineProperty({}, iconPosition === 'end' ? 'paddingRight' : 'paddingLeft', 20);

      return React.createElement(
        InputContainer,
        {
          onMouseEnter: disabled ? null : this.handleMouseEntered,
          onMouseLeave: disabled ? null : this.handleMouseLeft,
          onMouseDown: disabled ? null : this.handleMouseDown,
          onKeyDownCapture: disabled ? null : this.handleKeyDown
        },
        iconPosition === 'start' && icon && React.createElement(StyledStartIcon, { name: icon }),
        React.createElement(InputField, Object.assign({}, padding, restProps, {
          disabled: disabled,
          innerRef: this.bindInput,
          transparent: transparent,
          type: 'text',
          value: '' + value,
          onChange: this.handleTextChanged
        })),
        hovered && React.createElement(StepperUp, {
          disabled: disabled,
          onMouseDown: this.handleStepperUpMouseDown,
          onMouseUp: this.handleStepperUpMouseUp,
          onMouseLeave: this.handleStepperUpMouseUp
        }),
        hovered && React.createElement(StepperDown, {
          disabled: disabled,
          onMouseDown: this.handleStepperDownMouseDown,
          onMouseUp: this.handleStepperDownMouseUp,
          onMouseLeave: this.handleStepperDownMouseUp
        }),
        iconPosition === 'end' && icon && !hovered && React.createElement(StyledEndIcon, { name: icon })
      );
    }
  }]);

  return Stepper;
}(PureComponent);

Stepper.propTypes = {
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
Stepper.defaultProps = {
  'icon-position': 'start',
  max: 100,
  min: 0,
  step: 1,
  'step-big': 10,
  'step-small': 0.1,
  value: 0
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getLimitedValue = function (props) {
    if (+props.value < props.min) {
      return props.min;
    } else if (+props.value > props.max) {
      return props.max;
    } else {
      return props.value;
    }
  };

  this.bindInput = function (input) {
    _this2.input = input;
  };

  this.triggerChangeEvent = function () {
    if (!_this2.input) {
      return;
    }
    triggerReactChangeEvent(_this2.input);
  };

  this.addValue = function (inc) {
    var _props2 = _this2.props,
        max = _props2.max,
        min = _props2.min;
    var value = _this2.state.value;

    var nextValue = parseFloat((+value + inc).toFixed(10));
    nextValue = nextValue > max ? max : nextValue < min ? min : nextValue;
    nextValue !== value && _this2.setState({ value: nextValue }, _this2.triggerChangeEvent);
  };

  this.handleMouseEntered = function (evt) {
    _this2.setState({ hovered: true });
  };

  this.handleMouseLeft = function (evt) {
    _this2.setState({ hovered: false });
  };

  this.handleMouseMove = function (evt) {
    // use mouseY - pageY for having move up for increasing and down for decreasing.
    var diffY = _this2.mouseDownY - evt.pageY;
    // It is important to round the value becaues it may have decimals.
    var valueDiff = Math.round(diffY / PIXEL_TO_VALUE_RATIO);
    if (valueDiff) {
      // only set value when the value is not 0
      _this2.addValue(valueDiff * _this2.mouseDownStepSize);
      _this2.mouseDownY = evt.pageY;
    }
  };

  this.handleMouseDown = function (evt) {
    var _props3 = _this2.props,
        step = _props3.step,
        stepBig = _props3['step-big'],
        stepSmall = _props3['step-small'];

    // We should keep the value at state because we have to use native event to handle the movement.

    _this2.mouseDownY = evt.pageY;
    _this2.mouseDownStepSize = evt.shiftKey ? stepBig : evt.altKey ? stepSmall : step;
    // We need to put event listener at body to get the mousemove events which are
    // out of this components.
    document.body.addEventListener('mousemove', _this2.handleMouseMove, true);
    document.body.addEventListener('mouseup', _this2.handleMouseUp, true);
    document.body.addEventListener('mouseleave', _this2.handleMouseUp);
  };

  this.handleMouseUp = function (evt) {
    // console.log('mouseup', evt.type, evt.target, evt.currentTarget);
    document.body.removeEventListener('mousemove', _this2.handleMouseMove, true);
    document.body.removeEventListener('mouseup', _this2.handleMouseUp, true);
    document.body.removeEventListener('mouseleave', _this2.handleMouseUp);
  };

  this.handleStepperUpClicked = function (evt) {
    var _props4 = _this2.props,
        step = _props4.step,
        stepBig = _props4['step-big'],
        stepSmall = _props4['step-small'];


    _this2.addValue(evt.shiftKey ? stepBig : evt.altKey ? stepSmall : step);
  };

  this.handleStepperDownClicked = function (evt) {
    var _props5 = _this2.props,
        step = _props5.step,
        stepBig = _props5['step-big'],
        stepSmall = _props5['step-small'];

    _this2.addValue(evt.shiftKey ? -stepBig : evt.altKey ? -stepSmall : -step);
  };

  this.handleStepperUpMouseDown = function (evt) {
    evt.persist();
    // TODO: might need to add speed to this
    _this2.StepperUpInterval = setInterval(function () {
      _this2.handleStepperUpClicked(evt);
    }, MOUSE_DOWN_INTERVAL);
  };

  this.handleStepperUpMouseUp = function (evt) {
    clearInterval(_this2.StepperUpInterval);
  };

  this.handleStepperDownMouseDown = function (evt) {
    evt.persist();
    _this2.StepperDownInterval = setInterval(function () {
      _this2.handleStepperDownClicked(evt);
    }, MOUSE_DOWN_INTERVAL);
  };

  this.handleStepperDownMouseUp = function (evt) {
    clearInterval(_this2.StepperDownInterval);
  };

  this.handleTextChanged = function (value) {
    // to correct the decimal point
    var formatedValue = value.substr(-1, 1) === '.' || value === '-' ? value + '0' : value;
    if (isNaN(+formatedValue)) {
      // eats the non-numeric input event.
      return;
    } else if (+formatedValue > _this2.props.max) {
      // eats wrong value.
      return;
    } else if (+formatedValue < _this2.props.min) {
      // eats wrong value.
      return;
    }

    _this2.props.onChange && _this2.props.onChange(value);
  };

  this.handleKeyDown = function (evt) {
    switch (evt.key) {
      case KEY_UP:
        _this2.handleStepperUpClicked(evt);
        evt.stopPropagation();
        evt.preventDefault();
        break;
      case KEY_DOWN:
        _this2.handleStepperDownClicked(evt);
        evt.stopPropagation();
        evt.preventDefault();
        break;
    }
  };
};

export default Stepper;