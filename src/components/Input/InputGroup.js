import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import { InputGroupContainer, InputAddon } from './StyledComponents.js';
import Input from './Input.js';
import InputAddonGroup from './InputAddonGroup.js';

export default class InputGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    direction: PropTypes.oneOf(['horizontal', 'vertical'])
  };

  static defaultTypes = {
    direction: 'horizontal'
  };

  constructor (props) {
    super(props);
    this.state = {
      startGroupSize: 0,
      endGroupSize: 0
    };
  }

  bindContainer = (container) => {
    this.container = container;
    this.forceUpdate();
  }

  handleResized = () => {
    this.forceUpdate();
  }

  handleStartGroupResized = (size) => {
    this.setState({ startGroupSize: size });
  }

  handleEndGroupResized = (size) => {
    this.setState({ endGroupSize: size });
  }

  layoutVertically = (children, iconCount, addOnAtStart, addOnAtEnd) => {
    return [...addOnAtStart, ...children, ...addOnAtEnd].map((child, index) => (
      React.cloneElement(child, {
        ...child.props,
        key: child.props.key || `child-${index}`,
        style: {
          ...child.props.style,
          width: '100%'
        }
      })
    ));
  }

  layoutHorizontally = (children, iconCount, addOnAtStart, addOnAtEnd) => {
    const { startGroupSize, endGroupSize } = this.state;
    const containerWidth = parseFloat(window.getComputedStyle(this.container).width);
    const spaceForInputs = containerWidth -
      (addOnAtStart.length ? startGroupSize : 0) - // not need to take care the size if no children
      (addOnAtEnd.length ? endGroupSize : 0); // not need to take care the size if no children
    const inputSize = (spaceForInputs - iconCount * 15) / children.length;
    const startGroup = !addOnAtStart.length ? null : (
      <InputAddonGroup key='before-group' onResize={this.handleStartGroupResized}>
        {addOnAtStart}
      </InputAddonGroup>
    );
    const endGroup = !addOnAtEnd.length ? null : (
      <InputAddonGroup key='after-group' onResize={this.handleEndGroupResized}>
        {addOnAtEnd}
      </InputAddonGroup>
    );
    return [
      startGroup,
      ...children.map((child, index) => {
        const width = inputSize + (child.props.icon ? 15 : 0);
        const newProps = {
          ...child.props,
          key: child.props.key || `child-${index}`,
          style: {
            ...child.props.style,
            width: `${width}px`
          }
        };

        return React.cloneElement(child, newProps);
      }),
      endGroup
    ];
  }

  getAcceptableChildren = () => {
    if (!this.container) {
      return null;
    }
    const { children, direction } = this.props;

    let iconCount = 0;
    const addOnAtStart = [];
    let addOnAtEnd = [];
    const inputs = [];
    React.Children.forEach(children, (child) => {
      if (!child) {
        return;
      }

      if (child.type === Input) {
        inputs.push(child);
        child.props.icon && iconCount++;
        addOnAtEnd = [];
      } else if (!inputs.length && child.type === InputAddon) {
        addOnAtStart.push(child);
      } else if (inputs.length && child.type === InputAddon) {
        addOnAtEnd.push(child);
      }
    });

    if (!inputs.length && !addOnAtStart.length && !addOnAtEnd.length) {
      // no acceptable children, we don't need to render it.
      return null;
    }

    return (direction === 'vertical')
      ? this.layoutVertically(inputs, iconCount, addOnAtStart, addOnAtEnd)
      : this.layoutHorizontally(inputs, iconCount, addOnAtStart, addOnAtEnd);
  }

  render () {
    return (
      <InputGroupContainer {...this.props} innerRef={this.bindContainer}>
        {this.getAcceptableChildren()}
        <ReactResizeDetector handleWidth onResize={this.handleResized} />
      </InputGroupContainer>
    );
  }
}
