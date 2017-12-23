import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  InputContainer,
  StyledEndIcon,
  StyledStartIcon
} from './StyledComponents.js';
import InputField from './InputField';

export default class Input extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    'icon-position': PropTypes.oneOf(['start', 'end']),
    transparent: PropTypes.bool,
    type: PropTypes.string,
    unit: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultTypes = {
    'icon-position': 'start', // this doesn't work but we still set it
    value: ''
  };

  render () {
    const {
      icon,
      'icon-position': iconPosition,
      transparent,
      value,
      ...restProps
    } = this.props;
    // The styled icon is position absolute, we should add padding left or right to textfield.
    const padding = icon && { [iconPosition === 'end' ? 'paddingRight' : 'paddingLeft']: 20 };
    return (
      <InputContainer>
        {iconPosition !== 'end' && icon && <StyledStartIcon name={icon} />}
        <InputField
          {...padding}
          transparent={transparent}
          value={value}
          {...restProps}
        />
        {iconPosition === 'end' && icon && <StyledEndIcon name={icon} />}
      </InputContainer>
    );
  }
}
