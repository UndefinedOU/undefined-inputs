import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  InputContainer,
  StyledEndIcon,
  StyledStartIcon
} from './StyledComponents.js';
import InputField from './InputField';

export default class IconInputField extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    'icon-position': PropTypes.oneOf(['start', 'end']),
    transparent: PropTypes.bool,
    type: PropTypes.string,
    unit: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    'icon-position': 'start',
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
        {iconPosition === 'start' && icon && <StyledStartIcon name={icon} />}
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
