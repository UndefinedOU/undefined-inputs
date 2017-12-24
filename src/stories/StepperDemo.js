import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../components/Input';

export default class PlainInputDemo extends PureComponent {
  static propTypes = {
    changedAction: PropTypes.func
  };

  constructor (props) {
    super(props);
    this.state = {
      input1: 5,
      input2: 1,
      input3: 1,
      input4: 1,
      input5: 2
    };
  }

  handleTextChanged (stateKey, value) {
    this.props.changedAction(`${stateKey} text changed ${value}`);
    this.setState({ [stateKey]: value });
  }

  render () {
    const { input1, input2, input3, input4, input5 } = this.state;

    return (
      <section>
        <p>
          normal: <br/>
          <Input
            type='number'
            max={10}
            min={-10}
            value={input1}
            onChange={this.handleTextChanged.bind(this, 'input1')}
          />
        </p>
        <p>
          transparent, icon at start: <br/>
          <Input
            icon='rocket'
            transparent
            type='number'
            value={input2}
            onChange={this.handleTextChanged.bind(this, 'input2')}
          />
        </p>
        <p>
          icon at end: <br/>
          <Input
            icon='rocket'
            icon-position='end'
            type='number'
            value={input3}
            onChange={this.handleTextChanged.bind(this, 'input3')}
          />
        </p>
        <p>
          transparent, icon at end: <br/>
          <Input
            icon='rocket'
            icon-position='end'
            transparent
            type='number'
            value={input4}
            onChange={this.handleTextChanged.bind(this, 'input4')}
          />
        </p>
        <p>
          with default value and unit: <br/>
          <Input
            defaultValue='12'
            type='number'
            unit='$'
            value={input5}
            onChange={this.handleTextChanged.bind(this, 'input5')}
          />
        </p>
        <p>
          disabled: <br/>
          <Input
            disabled
            defaultValue='12'
            icon='rocket'
            icon-position='end'
            type='number'
            unit='$'
            value='123'
          />
        </p>
      </section>
    );
  }
}
