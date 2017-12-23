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
      input3: '12345%',
      input4: '1',
      input5: ''
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
            style={{ width: '200px' }}
            value={input1}
            onChange={this.handleTextChanged.bind(this, 'input1')}
          />
        </p>
        <p>
          transparent: <br/>
          <Input
            style={{ width: '200px' }}
            transparent
            value={input2}
            onChange={this.handleTextChanged.bind(this, 'input2')}
          />
        </p>
        <p>
          with unit: <br/>
          <Input
            style={{ width: '200px' }}
            unit='%'
            value={input3}
            onChange={this.handleTextChanged.bind(this, 'input3')}
          />
        </p>
        <p>
          with default value and unit: <br/>
          <Input
            style={{ width: '200px' }}
            defaultValue='12'
            unit='%'
            value={input4}
            onChange={this.handleTextChanged.bind(this, 'input4')}
          />
        </p>
        <p>
          with placeholder: <br/>
          <Input
            style={{ width: '200px' }}
            placeholder='please type anything...'
            value={input5}
            onChange={this.handleTextChanged.bind(this, 'input5')}
          />
        </p>
      </section>
    );
  }
}
