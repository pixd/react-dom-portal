import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const PORTAL_NAME_ATTRIBUTE = 'data-react-dom-portal';

class Portal extends React.Component {
  constructor(props) {
    super(props);

    this.node = null;
  }

  componentWillMount() {
    const { name, className, node } = this.props;

    if ( ! node) {
      this.node = document.createElement('div');
    } else if (typeof node === 'string') {
      this.node = document.createElement(node);
    } else if (typeof node === 'function') {
      this.node = node();
    } else {
      this.node = node;
    }
    document.body.appendChild(this.node);

    if (name) {
      this.node.setAttribute(PORTAL_NAME_ATTRIBUTE, name);
    }

    if (className) {
      this.node.className = [...this.node.classList, className].join(' ');
    }
  }

  componentDidMount() {
    const { nodeRef } = this.props;
    if (nodeRef) {
      nodeRef(this.node);
    }
  }

  componentWillUnmount() {
    const { nodeRef } = this.props;
    if (nodeRef) {
      nodeRef(null);
    }

    document.body.removeChild(this.node);
    this.node = null;
  }

  render() {
    const { children, contentMount } = this.props;

    return ('contentMount' in this.props ? contentMount : true)
      ? ReactDOM.createPortal(children, this.node)
      : null;
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  name: PropTypes.string,
  contentMount: PropTypes.bool,
  node: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.instanceOf(window.HTMLElement),
  ]),
  nodeRef: PropTypes.func,
};

export default Portal;
