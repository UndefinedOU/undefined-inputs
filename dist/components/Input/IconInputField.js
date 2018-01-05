var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InputContainer, StyledEndIcon, StyledStartIcon } from './StyledComponents.js';
import InputField from './InputField';

var IconInputField = function (_PureComponent) {
  _inherits(IconInputField, _PureComponent);

  function IconInputField() {
    _classCallCheck(this, IconInputField);

    return _possibleConstructorReturn(this, (IconInputField.__proto__ || Object.getPrototypeOf(IconInputField)).apply(this, arguments));
  }

  _createClass(IconInputField, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          icon = _props.icon,
          iconPosition = _props['icon-position'],
          transparent = _props.transparent,
          value = _props.value,
          restProps = _objectWithoutProperties(_props, ['icon', 'icon-position', 'transparent', 'value']);
      // The styled icon is position absolute, we should add padding left or right to textfield.


      var padding = icon && _defineProperty({}, iconPosition === 'end' ? 'paddingRight' : 'paddingLeft', 20);
      return React.createElement(
        InputContainer,
        null,
        iconPosition === 'start' && icon && React.createElement(StyledStartIcon, { name: icon }),
        React.createElement(InputField, Object.assign({}, padding, {
          transparent: transparent,
          value: value
        }, restProps)),
        iconPosition === 'end' && icon && React.createElement(StyledEndIcon, { name: icon })
      );
    }
  }]);

  return IconInputField;
}(PureComponent);

IconInputField.propTypes = {
  icon: PropTypes.string,
  'icon-position': PropTypes.oneOf(['start', 'end']),
  transparent: PropTypes.bool,
  type: PropTypes.string,
  unit: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};
IconInputField.defaultProps = {
  'icon-position': 'start',
  value: ''
};
export default IconInputField;