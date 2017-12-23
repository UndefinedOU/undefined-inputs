import React from 'react';
import _ from 'lodash';
import styled, { css } from 'styled-components';
import 'font-awesome/css/font-awesome.css';
import FontAwesome from 'react-fontawesome';

export const InputContainer = styled.span`
  background: #FFF;
  border: 1px solid #EEE;
  border-radius: 2px;
  height: 25px;
  display: inline-block;
  font-size: 12px;
  position: relative;
  ${props => props.transparent && css`
    background: transparent;
    border: none;
  `}
`;

export const TextField = styled.input`
  background: transparent;
  border: none;
  padding-left: 5px;
  padding-right: 5px;
  height: 25px;
  &:after {
    content: '%';
  }
  ${props => props.transparent && css`
    &:focus, &:active {
      outline: none;
    }
  `}
  ${props => !_.isUndefined(props.paddingLeft) && css`padding-left: ${props.paddingLeft}px;`}
  ${props => !_.isUndefined(props.paddingRight) && css`padding-right: ${props.paddingRight}px;`}
`;

const StyledIcon = styled(FontAwesome)`
  display: inline-block;
  width: 10px;
  height: 25px;
  line-height: 25px;
  font-size: 10px;
  position: absolute;
`;

export const StyledStartIcon = styled(StyledIcon)`
  left: 5px;
`;
export const StyledEndIcon = styled(StyledIcon)`
  right: 5px;
`;

export const StepperUp = styled((props) => <button {...props}><FontAwesome name='caret-up'/></button>)`
  position: absolute;
  line-height: 12px;
  font-size: 10px;
  width: 12px;
  height: 12px;
  top: 1px;
  right: 0;
  padding: 0;
  border-radius: 2px;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
`;
export const StepperDown = styled((props) => <button {...props}><FontAwesome name='caret-down'/></button>)`
  position: absolute;
  line-height: 12px;
  font-size: 10px;
  width: 12px;
  height: 12px;
  bottom: 1px;
  right: 0;
  padding: 0;
  border-radius: 2px;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
`;
