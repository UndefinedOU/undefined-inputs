var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';

var InputAddonGroup = function (_PureComponent) {
  _inherits(InputAddonGroup, _PureComponent);

  function InputAddonGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InputAddonGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputAddonGroup.__proto__ || Object.getPrototypeOf(InputAddonGroup)).call.apply(_ref, [this].concat(args))), _this), _this.bindContainer = function (container) {
      _this.container = container;
      _this.forceUpdate(function () {
        var onResize = _this.props.onResize;
        // might be slow (might need request animation frame 2x to make sure FF & Chro)

        onResize && onResize(parseFloat(window.getComputedStyle(_this.container).width));
      });
    }, _this.handleResized = function () {
      _this.forceUpdate(function () {
        var onResize = _this.props.onResize;

        onResize && onResize(parseFloat(window.getComputedStyle(_this.container).width));
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InputAddonGroup, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onResize = _props.onResize,
          restProps = _objectWithoutProperties(_props, ['onResize']);

      return React.createElement(
        'div',
        Object.assign({}, restProps, { ref: this.bindContainer }),
        this.props.children,
        React.createElement(ReactResizeDetector, { handleWidth: true, onResize: this.handleResized })
      );
    }
  }]);

  return InputAddonGroup;
}(PureComponent);

InputAddonGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onResize: PropTypes.func
};
export default InputAddonGroup;