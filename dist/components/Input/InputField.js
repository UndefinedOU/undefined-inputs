var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { TextField } from './StyledComponents.js';

var KEY_BLUR = 'Enter';

var InputField = function (_PureComponent) {
  _inherits(InputField, _PureComponent);

  function InputField(props) {
    _classCallCheck(this, InputField);

    var _this = _possibleConstructorReturn(this, (InputField.__proto__ || Object.getPrototypeOf(InputField)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      value: _this.getFormatedValue(props)
    };
    return _this;
  }

  _createClass(InputField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setState({ value: this.getFormatedValue(nextProps) });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          defaultValue = _props.defaultValue,
          transparent = _props.transparent,
          unit = _props.unit,
          value = _props.value,
          restProps = _objectWithoutProperties(_props, ['defaultValue', 'transparent', 'unit', 'value']);

      return React.createElement(TextField, Object.assign({
        transparent: transparent,
        value: this.state.value
      }, restProps, {
        onBlur: this.handleBurred,
        onChange: this.handleTextChanged,
        onKeyUp: this.handleKeyUp
      }));
    }
  }]);

  return InputField;
}(PureComponent);

InputField.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transparent: PropTypes.bool,
  unit: PropTypes.string,
  defaultUnit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func
};
InputField.defaultProps = {
  defaultValue: '',
  value: ''
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getFormatedValue = function (props) {
    var value = props.value,
        unit = props.unit;

    var formatedValue = value || '';
    if (unit && formatedValue.substr(-1, unit.length) !== unit) {
      formatedValue += unit;
    }
    return formatedValue;
  };

  this.getUnformatedValue = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var unit = _this2.props.unit;

    return unit ? value.replace(new RegExp(_.escapeRegExp(unit), 'g'), '') : value;
  };

  this.handleTextChanged = function (evt) {
    // We don't update the state here because we will wait for the value changed through props.
    _this2.props.onChange && _this2.props.onChange(_this2.getUnformatedValue(evt.target.value));
  };

  this.handleKeyUp = function (evt) {
    evt.key === KEY_BLUR && evt.target.blur();
    _this2.props.onKeyUp && _this2.props.onKeyUp(evt);
  };

  this.handleBurred = function (evt) {
    var _props2 = _this2.props,
        defaultValue = _props2.defaultValue,
        onChange = _props2.onChange,
        onBlur = _props2.onBlur,
        defaultUnit = _props2.defaultUnit,
        unit = _props2.unit;

    // TODO: not working fix default unit display behavior

    if (unit === defaultUnit) {
      var value = _this2.getUnformatedValue(evt.target.value);
      !value && defaultValue && onChange && onChange(getUnformatedValue(defaultValue));
      onBlur && onBlur(evt);
    } else {
      var _value = _this2.getUnformatedValue(evt.target.value);
      !_value && defaultValue && onChange && onChange(defaultValue);
      onBlur && onBlur(evt);
    }
  };
};

export default InputField;