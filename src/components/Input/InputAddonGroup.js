import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';

export default class InputAddonGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    onResize: PropTypes.func
  };

  bindContainer = (container) => {
    this.container = container;
    this.forceUpdate(() => {
      const { onResize } = this.props;
      // might be slow (might need request animation frame 2x to make sure FF & Chro)
      onResize && onResize(parseFloat(window.getComputedStyle(this.container).width));
    });
  }

  handleResized = () => {
    this.forceUpdate(() => {
      const { onResize } = this.props;
      onResize && onResize(parseFloat(window.getComputedStyle(this.container).width));
    });
  }

  render () {
    const { onResize, ...restProps } = this.props;
    return (
      <div {...restProps} ref={this.bindContainer}>
        {this.props.children}
        <ReactResizeDetector handleWidth onResize={this.handleResized} />
      </div>
    );
  }
}
