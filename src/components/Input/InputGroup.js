import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import { InputGroupContainer } from './StyledComponents.js';
import Input from './Input.js';

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

  bindContainer = (container) => {
    this.container = container;
    this.forceUpdate();
  }

  handleResized = () => {
    this.forceUpdate();
  }

  getAcceptableChildren = () => {
    if (!this.container) {
      return;
    }
    const { direction } = this.props;

    let iconCount = 0;
    const children = React.Children.toArray(this.props.children).reduce((acc, child) => {
      if (child.type === Input) {
        acc.push(child);
        child.props.icon && iconCount++;
      }
      return acc;
    }, []);

    if (!children.length) {
      // no acceptable children, we don't need to change the size.
      return;
    }

    if (direction === 'vertical') {
      return children.map((child, index) => (
        React.cloneElement(child, {
          ...child.props,
          style: {
            ...child.props.style,
            width: '100%'
          }
        })
      ));
    } else {
      const containerWidth = parseFloat(window.getComputedStyle(this.container).width);
      const widthForSingle = (containerWidth - iconCount * 15) / children.length;
      return children.map((child, index) => {
        const width = widthForSingle + (child.props.icon ? 15 : 0);
        const newProps = {
          ...child.props,
          style: {
            ...child.props.style,
            width: `${width}px`
          }
        };

        return React.cloneElement(child, newProps);
      });
    }
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
