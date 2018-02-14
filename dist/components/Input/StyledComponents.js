var _templateObject = _taggedTemplateLiteral(['\n  display: inline-block;\n  font-size: 12px;\n  position: relative;\n  box-sizing: border-box;\n'], ['\n  display: inline-block;\n  font-size: 12px;\n  position: relative;\n  box-sizing: border-box;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  box-sizing: border-box;\n  border-radius: 4px;\n  border: 1px solid #d9d9d9;\n  background: #FFF;\n  padding: 7px 6px;\n  height: 100%;\n  &:after {\n    content: \'%\';\n  }\n  &:focus, &:active {\n    outline: none;\n  }\n  ', '\n  ', '\n  ', '\n  ', '\n'], ['\n  box-sizing: border-box;\n  border-radius: 4px;\n  border: 1px solid #d9d9d9;\n  background: #FFF;\n  padding: 7px 6px;\n  height: 100%;\n  &:after {\n    content: \'%\';\n  }\n  &:focus, &:active {\n    outline: none;\n  }\n  ', '\n  ', '\n  ', '\n  ', '\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n    user-select: none !important;\n    cursor: default;\n    ::selection {\n      background: #FFF;\n    }\n  '], ['\n    user-select: none !important;\n    cursor: default;\n    ::selection {\n      background: #FFF;\n    }\n  ']),
    _templateObject4 = _taggedTemplateLiteral(['\n    background: transparent;\n    border: none;\n  '], ['\n    background: transparent;\n    border: none;\n  ']),
    _templateObject5 = _taggedTemplateLiteral(['padding-left: ', 'px;'], ['padding-left: ', 'px;']),
    _templateObject6 = _taggedTemplateLiteral(['padding-right: ', 'px;'], ['padding-right: ', 'px;']),
    _templateObject7 = _taggedTemplateLiteral(['\n  display: inline-block;\n  width: 10px;\n  font-size: 10px;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n'], ['\n  display: inline-block;\n  width: 10px;\n  font-size: 10px;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  left: 5px;\n'], ['\n  left: 5px;\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n  right: 5px;\n'], ['\n  right: 5px;\n']),
    _templateObject10 = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: column;\n  width: 12px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n'], ['\n  display: flex;\n  flex-direction: column;\n  width: 12px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n']),
    _templateObject11 = _taggedTemplateLiteral(['\n  font-size: 10px;\n  padding: 0;\n  border-radius: 2px 2px 0 0;\n  text-align: center;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  outline: none;\n  border-bottom: 0;\n'], ['\n  font-size: 10px;\n  padding: 0;\n  border-radius: 2px 2px 0 0;\n  text-align: center;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  outline: none;\n  border-bottom: 0;\n']),
    _templateObject12 = _taggedTemplateLiteral(['\n  font-size: 10px;\n  padding: 0;\n  border-radius: 0 0 2px 2px;\n  text-align: center;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  outline: none;\n'], ['\n  font-size: 10px;\n  padding: 0;\n  border-radius: 0 0 2px 2px;\n  text-align: center;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  outline: none;\n']),
    _templateObject13 = _taggedTemplateLiteral(['\n  display: flex;\n   ', '\n'], ['\n  display: flex;\n   ', '\n']),
    _templateObject14 = _taggedTemplateLiteral(['flex-direction: column'], ['flex-direction: column']),
    _templateObject15 = _taggedTemplateLiteral(['\n  display: inline-block;\n  flex: 0 0 auto;\n'], ['\n  display: inline-block;\n  flex: 0 0 auto;\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import _ from 'lodash';
import styled, { css } from 'styled-components';
import 'font-awesome/css/font-awesome.css';
import FontAwesome from 'react-fontawesome';

export var InputContainer = styled.span(_templateObject);

export var TextField = styled.input.attrs({ spellCheck: false })(_templateObject2, function (props) {
  return props.disabled && css(_templateObject3);
}, function (props) {
  return props.transparent && css(_templateObject4);
}, function (props) {
  return !_.isUndefined(props.paddingLeft) && css(_templateObject5, props.paddingLeft);
}, function (props) {
  return !_.isUndefined(props.paddingRight) && css(_templateObject6, props.paddingRight);
});

var StyledIcon = styled(FontAwesome)(_templateObject7);

export var StyledStartIcon = styled(StyledIcon)(_templateObject8);

export var StyledEndIcon = styled(StyledIcon)(_templateObject9);

export var StepperWrapper = styled.div(_templateObject10);

export var StepperUp = styled(function (props) {
  return React.createElement(
    'button',
    props,
    React.createElement(FontAwesome, { name: 'caret-up' })
  );
})(_templateObject11);
export var StepperDown = styled(function (props) {
  return React.createElement(
    'button',
    props,
    React.createElement(FontAwesome, { name: 'caret-down' })
  );
})(_templateObject12);

export var InputGroupContainer = styled.div(_templateObject13, function (props) {
  return props.direction === 'vertical' && css(_templateObject14);
});
// The addons
export var InputAddon = styled.div(_templateObject15);