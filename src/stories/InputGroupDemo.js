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
          5 children with 2 illegal elements: <br/>
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
        <hr/>
        <div>
          fixed size (400px): <br/>
          <InputGroup style={{width: '400px'}}>
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
          </InputGroup>
        </div>
        <hr/>
        <div>
          dynamic size (60%): <br/>
          <InputGroup style={{width: '60%'}}>
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
          </InputGroup>
        </div>
        <hr/>
        <div>
          vertical, fixed size (400px): <br/>
          <InputGroup direction='vertical' style={{width: '400px'}}>
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
          </InputGroup>
        </div>
        <hr/>
        <div>
          vertical, dynamic size (60%): <br/>
          <InputGroup direction='vertical' style={{width: '60%'}}>
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
          </InputGroup>
        </div>
      </section>
    );
  }
}
