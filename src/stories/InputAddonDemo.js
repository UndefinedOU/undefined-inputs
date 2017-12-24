import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputAddon } from '../components/Input';

export default class InputGroupDemo extends PureComponent {
  static propTypes = {
    changedAction: PropTypes.func
  };

  constructor (props) {
    super(props);
    this.state = {
      input1: '123',
      input2: 'abcdefg',
      buttonVisible: true
    };
  }

  handleTextChanged (stateKey, value) {
    this.props.changedAction(`${stateKey} text changed ${value}`);
    this.setState({ [stateKey]: value });
  }

  toggleButtonVisible = () => {
    this.setState({ buttonVisible: !this.state.buttonVisible });
  }

  render () {
    const { input1, input2, buttonVisible } = this.state;

    return (
      <section>
        <div>
          6 children with 1 addon at start, 1 addon at end, 1 addon at middle: <br/>
          <InputGroup>
            <InputAddon onClick={this.toggleButtonVisible}>Pure Text</InputAddon>
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
            {buttonVisible &&
              <InputAddon>
                <button onClick={this.toggleButtonVisible}>abcdefg</button>
              </InputAddon>
            }
          </InputGroup>
        </div>
        <hr/>
        <div>
          fixed size (400px): <br/>
          <InputGroup style={{width: '400px'}}>
            <InputAddon onClick={this.toggleButtonVisible}>Pure Text</InputAddon>
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
            {buttonVisible &&
              <InputAddon>
                <button onClick={this.toggleButtonVisible}>abcdefg</button>
              </InputAddon>
            }
          </InputGroup>
        </div>
        <hr/>
        <div>
          dynamic size (60%): <br/>
          <InputGroup style={{width: '60%'}}>
            <InputAddon onClick={this.toggleButtonVisible}>Pure Text</InputAddon>
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
            <InputAddon>
              {buttonVisible && <button onClick={this.toggleButtonVisible}>abcdefg</button>}
            </InputAddon>
          </InputGroup>
        </div>
        <hr/>
        <div>
          vertical, fixed size (400px): <br/>
          <InputGroup direction='vertical' style={{width: '400px'}}>
            <InputAddon onClick={this.toggleButtonVisible}>Pure Text</InputAddon>
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
            {buttonVisible &&
              <InputAddon>
                <button onClick={this.toggleButtonVisible}>abcdefg</button>
              </InputAddon>
            }
          </InputGroup>
        </div>
        <hr/>
        <div>
          vertical, dynamic size (60%): <br/>
          <InputGroup direction='vertical' style={{width: '60%'}}>
            <InputAddon onClick={this.toggleButtonVisible}>Pure Text</InputAddon>
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
            {buttonVisible &&
              <InputAddon>
                <button onClick={this.toggleButtonVisible}>abcdefg</button>
              </InputAddon>
            }
          </InputGroup>
        </div>
      </section>
    );
  }
}
