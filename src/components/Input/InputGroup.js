import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import Input from './Input';

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
      containerWidth: null
    };
  }

  componentDidMount () {
    this.calcContainerWidth();
  }

  componentDidUpdate () {
    this.calcContainerWidth();
  }

  bindContainer = (container) => {
    this.container = container;
  }

  calcContainerWidth = () => {
    if (!this.container) {
      return;
    }
    const style = getComputedStyle(this.container);
    const containerWidth = this.container.clientWidth -
      parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    this.setState({ containerWidth });
  }

  handleResized = () => {
    this.calcContainerWidth();
  }

  getAcceptableChildren = () => {
    const { containerWidth } = this.state;
    if (!containerWidth) {
      return;
    }

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

    const widthForSingle = (containerWidth - iconCount * 15) / children.length;
    return children.map((child) => {
      const newProps = {
        ...child.props,
        style: {
          ...child.props.style,
          width: `${widthForSingle + (child.props.icon ? 15 : 0)}px`
        }
      };

      return React.cloneElement(child, newProps);
    });
  }

  render () {
    return (
      <div {...this.props} ref={this.bindContainer}>
        {this.getAcceptableChildren()}
        <ReactResizeDetector handleWidth onResize={this.handleResized} />
      </div>
    );
  }
}
