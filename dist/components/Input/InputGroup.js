var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import { InputGroupContainer, InputAddon } from './StyledComponents.js';
import Input from './Input.js';
import InputAddonGroup from './InputAddonGroup.js';

var InputGroup = function (_PureComponent) {
  _inherits(InputGroup, _PureComponent);

  function InputGroup(props) {
    _classCallCheck(this, InputGroup);

    var _this = _possibleConstructorReturn(this, (InputGroup.__proto__ || Object.getPrototypeOf(InputGroup)).call(this, props));

    _this.bindContainer = function (container) {
      _this.container = container;
      _this.forceUpdate();
    };

    _this.handleResized = function () {
      _this.forceUpdate();
    };

    _this.handleStartGroupResized = function (size) {
      _this.setState({ startGroupSize: size });
    };

    _this.handleEndGroupResized = function (size) {
      _this.setState({ endGroupSize: size });
    };

    _this.layoutVertically = function (children, iconCount, addOnAtStart, addOnAtEnd) {
      return [].concat(_toConsumableArray(addOnAtStart), _toConsumableArray(children), _toConsumableArray(addOnAtEnd)).map(function (child, index) {
        return React.cloneElement(child, Object.assign({}, child.props, {
          key: child.props.key || 'child-' + index,
          style: Object.assign({}, child.props.style, {
            width: '100%'
          })
        }));
      });
    };

    _this.layoutHorizontally = function (children, iconCount, addOnAtStart, addOnAtEnd) {
      var _this$state = _this.state,
          startGroupSize = _this$state.startGroupSize,
          endGroupSize = _this$state.endGroupSize;

      var containerWidth = parseFloat(window.getComputedStyle(_this.container).width);
      var spaceForInputs = containerWidth - (addOnAtStart.length ? startGroupSize : 0) - ( // not need to take care the size if no children
      addOnAtEnd.length ? endGroupSize : 0); // not need to take care the size if no children
      var inputSize = (spaceForInputs - iconCount * 15) / children.length;
      var startGroup = !addOnAtStart.length ? null : React.createElement(
        InputAddonGroup,
        { key: 'before-group', onResize: _this.handleStartGroupResized },
        addOnAtStart
      );
      var endGroup = !addOnAtEnd.length ? null : React.createElement(
        InputAddonGroup,
        { key: 'after-group', onResize: _this.handleEndGroupResized },
        addOnAtEnd
      );
      return [startGroup].concat(_toConsumableArray(children.map(function (child, index) {
        var width = inputSize + (child.props.icon ? 15 : 0);
        var newProps = Object.assign({}, child.props, {
          key: child.props.key || 'child-' + index,
          style: Object.assign({}, child.props.style, {
            width: width + 'px' // if not FF&C, flex: '1 1 auto'
          })
        });

        return React.cloneElement(child, newProps);
      })), [endGroup]);
    };

    _this.getAcceptableChildren = function () {
      if (!_this.container) {
        return null;
      }
      var _this$props = _this.props,
          children = _this$props.children,
          direction = _this$props.direction;


      var iconCount = 0;
      var addOnAtStart = [];
      var addOnAtEnd = [];
      var inputs = [];
      React.Children.forEach(children, function (child) {
        if (!child) {
          return;
        }

        if (child.type === Input) {
          inputs.push(child);
          child.props.icon && iconCount++;
          addOnAtEnd = [];
        } else if (!inputs.length && child.type === InputAddon) {
          addOnAtStart.push(child);
        } else if (inputs.length && child.type === InputAddon) {
          addOnAtEnd.push(child);
        }
      });

      if (!inputs.length && !addOnAtStart.length && !addOnAtEnd.length) {
        // no acceptable children, we don't need to render it.
        return null;
      }

      return direction === 'vertical' ? _this.layoutVertically(inputs, iconCount, addOnAtStart, addOnAtEnd) : _this.layoutHorizontally(inputs, iconCount, addOnAtStart, addOnAtEnd);
    };

    _this.state = {
      startGroupSize: 0,
      endGroupSize: 0
    };
    return _this;
  }

  _createClass(InputGroup, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        InputGroupContainer,
        Object.assign({}, this.props, { innerRef: this.bindContainer }),
        this.getAcceptableChildren(),
        React.createElement(ReactResizeDetector, { handleWidth: true, onResize: this.handleResized })
      );
    }
  }]);

  return InputGroup;
}(PureComponent);

InputGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  direction: PropTypes.oneOf(['horizontal', 'vertical'])
};
InputGroup.defaultProps = {
  direction: 'horizontal'
};
export default InputGroup;