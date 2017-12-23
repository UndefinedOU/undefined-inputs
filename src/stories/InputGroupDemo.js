import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup } from '../components/Input';

export default class InputGroupDemo extends PureComponent {
  static propTypes = {
    changedAction: PropTypes.func
  };

  constructor (props) {
    super(props);
    this.state = {
      input1: '123',
      input2: 'abcdefg'
    };
  }

  handleTextChanged (stateKey, value) {
    this.props.changedAction(`${stateKey} text changed ${value}`);
    this.setState({ [stateKey]: value });
  }

  render () {
    const { input1, input2 } = this.state;

    return (
      <section>
        <div>
          normal: <br/>
          <InputGroup>
            <label>1234</label>
            <Input
              icon='heart'
              value={input1}
              onChange={this.handleTextChanged.bind(this, 'input1')}
            />
            <Input
              type='number'
              max={10}
              min={0}
              value={input2}
              onChange={this.handleTextChanged.bind(this, 'input2')}
            />
            <Input
              icon='heart'
              value={input1}
              onChange={this.handleTextChanged.bind(this, 'input1')}
            />
            <button>abcdefg</button>
          </InputGroup>
        </div>
      </section>
    );
  }
}
