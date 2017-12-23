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
      input1: '123',
      input2: 'abcdefg',
      input3: '123',
      input4: 'abcdefg...',
      input5: '12344%'
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
          icon at start: <br/>
          <Input
            icon='rocket'
            value={input1}
            onChange={this.handleTextChanged.bind(this, 'input1')}
          />
        </p>
        <p>
          transparent, icon at start: <br/>
          <Input
            icon='rocket'
            transparent
            value={input2}
            onChange={this.handleTextChanged.bind(this, 'input2')}
          />
        </p>
        <p>
          icon at end: <br/>
          <Input
            icon='rocket'
            icon-position='end'
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
            value={input4}
            onChange={this.handleTextChanged.bind(this, 'input4')}
          />
        </p>
        <p>
          with unit, icon at end: <br/>
          <Input
            icon='rocket'
            icon-position='end'
            unit='%'
            value={input5}
            onChange={this.handleTextChanged.bind(this, 'input5')}
          />
        </p>
      </section>
    );
  }
}
