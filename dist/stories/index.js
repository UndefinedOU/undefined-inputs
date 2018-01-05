import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BackgroundColor } from 'react-storybook-decorator-background';
import PlainInputDemo from './PlainInputDemo.js';
import IconLabelInputDemo from './IconLabelInputDemo.js';
import StepperDemo from './StepperDemo.js';
import InputGroupDemo from './InputGroupDemo.js';
import InputAddonDemo from './InputAddonDemo.js';

var BackgroundDecorator = function BackgroundDecorator(_story) {
  var style = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20
  };
  return React.createElement(BackgroundColor, { colors: ['#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#000000'], story: function story() {
      return React.createElement(
        'section',
        { style: style },
        React.createElement(
          'style',
          null,
          '\n            html, body, #root {\n              width: 100%;\n              height: 100%;\n              padding: 0;\n              margin: 0;\n            }\n          '
        ),
        _story()
      );
    } });
};

storiesOf('Input', module).addDecorator(BackgroundDecorator).add('plain', function () {
  return React.createElement(PlainInputDemo, { changedAction: action('changed') });
}).add('icon label', function () {
  return React.createElement(IconLabelInputDemo, { changedAction: action('changed') });
}).add('stepper', function () {
  return React.createElement(StepperDemo, { changedAction: action('changed') });
}).add('input group', function () {
  return React.createElement(InputGroupDemo, { changedAction: action('changed') });
}).add('input group with addons', function () {
  return React.createElement(InputAddonDemo, { changedAction: action('changed') });
});