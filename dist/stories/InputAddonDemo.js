var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputAddon } from '../components/Input';

var InputGroupDemo = function (_PureComponent) {
  _inherits(InputGroupDemo, _PureComponent);

  function InputGroupDemo(props) {
    _classCallCheck(this, InputGroupDemo);

    var _this = _possibleConstructorReturn(this, (InputGroupDemo.__proto__ || Object.getPrototypeOf(InputGroupDemo)).call(this, props));

    _this.toggleButtonVisible = function () {
      _this.setState({ buttonVisible: !_this.state.buttonVisible });
    };

    _this.state = {
      input1: '123',
      input2: 'abcdefg',
      buttonVisible: true
    };
    return _this;
  }

  _createClass(InputGroupDemo, [{
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
          buttonVisible = _state.buttonVisible;


      return React.createElement(
        'section',
        null,
        React.createElement(
          'div',
          null,
          '6 children with 1 addon at start, 1 addon at end, 1 addon at middle: ',
          React.createElement('br', null),
          React.createElement(
            InputGroup,
            null,
            React.createElement(
              InputAddon,
              { onClick: this.toggleButtonVisible },
              'Pure Text'
            ),
            React.createElement(Input, {
              icon: 'heart',
              value: input1,
              onChange: this.handleTextChanged.bind(this, 'input1')
            }),
            React.createElement(Input, {
              type: 'number',
              max: 10,
              min: 0,
              value: input2,
              onChange: this.handleTextChanged.bind(this, 'input2')
            }),
            React.createElement(Input, {
              icon: 'heart',
              value: input1,
              onChange: this.handleTextChanged.bind(this, 'input1')
            }),
            buttonVisible && React.createElement(
              InputAddon,
              null,
              React.createElement(
                'button',
                { onClick: this.toggleButtonVisible },
                'abcdefg'
              )
            )
          )
        ),
        React.createElement('hr', null),
        React.createElement(
          'div',
          null,
          'fixed size (400px): ',
          React.createElement('br', null),
          React.createElement(
            InputGroup,
            { style: { width: '400px' } },
            React.createElement(
              InputAddon,
              { onClick: this.toggleButtonVisible },
              'Pure Text'
            ),
            React.createElement(Input, {
              icon: 'heart',
              value: input1,
              onChange: this.handleTextChanged.bind(this, 'input1')
            }),
            React.createElement(Input, {
              type: 'number',
              max: 10,
              min: 0,
              value: input2,
              onChange: this.handleTextChanged.bind(this, 'input2')
            }),
            React.createElement(Input, {
              icon: 'heart',
              value: input1,
              onChange: this.handleTextChanged.bind(this, 'input1')
            }),
            buttonVisible && React.createElement(
              InputAddon,
              null,
              React.createElement(
                'button',
                { onClick: this.toggleButtonVisible },
                'abcdefg'
              )
            )
          )
        ),
        React.createElement('hr', null),
        React.createElement(
          'div',
          null,
          'dynamic size (60%): ',
          React.createElement('br', null),
          React.createElement(
            InputGroup,
            { style: { width: '60%' } },
            React.createElement(
              InputAddon,
              { onClick: this.toggleButtonVisible },
              'Pure Text'
            ),
            React.createElement(Input, {
              icon: 'heart',
              value: input1,
              onChange: this.handleTextChanged.bind(this, 'input1')
            }),
            React.createElement(Input, {
              type: 'number',
              max: 10,
              min: 0,
              value: input2,
              onChange: this.handleTextChanged.bind(this, 'input2')
            }),
            React.createElement(Input, {
              icon: 'heart',
              value: input1,
              onChange: this.handleTextChanged.bind(this, 'input1')
            }),
            React.createElement(
              InputAddon,
              null,
              buttonVisible && React.createElement(
                'button',
                { onClick: this.toggleButtonVisible },
                'abcdefg'
              )
            )
          )
        ),
        React.createElement('hr', null),
        React.createElement(
          'div',
          null,
          'vertical, fixed size (400px): ',
          React.createElement('br', null),
          React.createElement(
            InputGroup,
            { direction: 'vertical', style: { width: '400px' } },
            React.createElement(
              InputAddon,
              { onClick: this.toggleButtonVisible },
              'Pure Text'
            ),
            React.createElement(Input, {
              icon: 'heart',
              value: input1,
              onChange: this.handleTextChanged.bind(this, 'input1')
            }),
            React.createElement(Input, {
              type: 'number',
              max: 10,
              min: 0,
              value: input2,
              onChange: this.handleTextChanged.bind(this, 'input2')
            }),
            React.createElement(Input, {
              icon: 'heart',
              value: input1,
              onChange: this.handleTextChanged.bind(this, 'input1')
            }),
            buttonVisible && React.createElement(
              InputAddon,
              null,
              React.createElement(
                'button',
                { onClick: this.toggleButtonVisible },
                'abcdefg'
              )
            )
          )
        ),
        React.createElement('hr', null),
        React.createElement(
          'div',
          null,
          'vertical, dynamic size (60%): ',
          React.createElement('br', null),
          React.createElement(
            InputGroup,
            { direction: 'vertical', style: { width: '60%' } },
            React.createElement(
              InputAddon,
              { onClick: this.toggleButtonVisible },
              'Pure Text'
            ),
            React.createElement(Input, {
              icon: 'heart',
              value: input1,
              onChange: this.handleTextChanged.bind(this, 'input1')
            }),
            React.createElement(Input, {
              type: 'number',
              max: 10,
              min: 0,
              value: input2,
              onChange: this.handleTextChanged.bind(this, 'input2')
            }),
            React.createElement(Input, {
              icon: 'heart',
              value: input1,
              onChange: this.handleTextChanged.bind(this, 'input1')
            }),
            buttonVisible && React.createElement(
              InputAddon,
              null,
              React.createElement(
                'button',
                { onClick: this.toggleButtonVisible },
                'abcdefg'
              )
            )
          )
        )
      );
    }
  }]);

  return InputGroupDemo;
}(PureComponent);

InputGroupDemo.propTypes = {
  changedAction: PropTypes.func
};
export default InputGroupDemo;