var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../components/Input';

var PlainInputDemo = function (_PureComponent) {
  _inherits(PlainInputDemo, _PureComponent);

  function PlainInputDemo(props) {
    _classCallCheck(this, PlainInputDemo);

    var _this = _possibleConstructorReturn(this, (PlainInputDemo.__proto__ || Object.getPrototypeOf(PlainInputDemo)).call(this, props));

    _this.state = {
      input1: '123',
      input2: 'abcdefg',
      input3: '123',
      input4: 'abcdefg...',
      input5: '12344%',
      input6: ''
    };
    return _this;
  }

  _createClass(PlainInputDemo, [{
    key: 'handleTextChanged',
    value: function handleTextChanged(stateKey, value) {
      this.props.changedAction(stateKey + ' text changed ' + value);
      this.setState(_defineProperty({}, stateKey, value));
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          input1 = _state.input1,
          input2 = _state.input2,
          input3 = _state.input3,
          input4 = _state.input4,
          input5 = _state.input5,
          input6 = _state.input6;


      return React.createElement(
        'section',
        null,
        React.createElement(
          'p',
          null,
          'icon at start: ',
          React.createElement('br', null),
          React.createElement(Input, {
            icon: 'rocket',
            value: input1,
            onChange: this.handleTextChanged.bind(this, 'input1')
          })
        ),
        React.createElement(
          'p',
          null,
          'transparent, icon at start: ',
          React.createElement('br', null),
          React.createElement(Input, {
            icon: 'rocket',
            transparent: true,
            value: input2,
            onChange: this.handleTextChanged.bind(this, 'input2')
          })
        ),
        React.createElement(
          'p',
          null,
          'icon at end: ',
          React.createElement('br', null),
          React.createElement(Input, {
            icon: 'rocket',
            'icon-position': 'end',
            value: input3,
            onChange: this.handleTextChanged.bind(this, 'input3')
          })
        ),
        React.createElement(
          'p',
          null,
          'transparent, icon at end: ',
          React.createElement('br', null),
          React.createElement(Input, {
            icon: 'rocket',
            'icon-position': 'end',
            transparent: true,
            value: input4,
            onChange: this.handleTextChanged.bind(this, 'input4')
          })
        ),
        React.createElement(
          'p',
          null,
          'with unit, icon at end: ',
          React.createElement('br', null),
          React.createElement(Input, {
            icon: 'rocket',
            'icon-position': 'end',
            unit: '%',
            value: input5,
            onChange: this.handleTextChanged.bind(this, 'input5')
          })
        ),
        React.createElement(
          'p',
          null,
          'disabled: ',
          React.createElement('br', null),
          React.createElement(Input, {
            disabled: true,
            icon: 'rocket',
            'icon-position': 'end',
            unit: '%',
            value: '1234',
            onChange: this.handleTextChanged.bind(this, 'input5')
          })
        ),
        React.createElement(
          'p',
          null,
          'with placeholder: ',
          React.createElement('br', null),
          React.createElement(Input, {
            icon: 'rocket',
            placeholder: 'please type anything...',
            value: input6,
            onChange: this.handleTextChanged.bind(this, 'input6')
          })
        )
      );
    }
  }]);

  return PlainInputDemo;
}(PureComponent);

PlainInputDemo.propTypes = {
  changedAction: PropTypes.func
};
export default PlainInputDemo;