import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BackgroundColor } from 'react-storybook-decorator-background';
import PlainInputDemo from './PlainInputDemo.js';
import IconLabelInputDemo from './IconLabelInputDemo.js';
import StepperDemo from './StepperDemo.js';
import InputGroupDemo from './InputGroupDemo.js';
import InputAddonDemo from './InputAddonDemo.js';

const BackgroundDecorator = (story) => {
  const style = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    padding: 20
  };
  return (
    <BackgroundColor colors={['#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#000000']} story={() => (
      <section style={style}>
        {story()}
      </section>
    )}/>

  );
};

storiesOf('Input', module)
  .addDecorator(BackgroundDecorator)
  .add('plain', () => <PlainInputDemo changedAction={action('changed')} />)
  .add('icon label', () => <IconLabelInputDemo changedAction={action('changed')} />)
  .add('stepper', () => <StepperDemo changedAction={action('changed')} />)
  .add('input group', () => <InputGroupDemo changedAction={action('changed')} />)
  .add('input group with addons', () => <InputAddonDemo changedAction={action('changed')} />);
