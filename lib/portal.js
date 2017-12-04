import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const PORTAL_NAME_ATTRIBUTE = 'data-react-dom-portal';
const PARENT_NAME_ATTRIBUTE = 'data-react-dom-portal-parent';

class Portal extends React.Component {
  constructor(props) {
    super(props);

    this.node = null;
    this.updateIsContentMount(props, true);
  }

  componentWillMount() {
    const { name, className, node } = this.props;

    if (!node) {
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

  componentWillReceiveProps(nextProps) {
    this.updateIsContentMount(nextProps);
  }

  componentWillUnmount() {
    this.isContentMount = false;
    
    const { nodeRef } = this.props;
    if (nodeRef) {
      nodeRef(null);
    }

    document.body.removeChild(this.node);
    this.node = null;
  }

  updateIsContentMount(props, defaultIsContentMount) {
    const { isContentMount } = props;

    if ('isContentMount' in props) {
      this.isContentMount = isContentMount;
    } else if (defaultIsContentMount != null) {
      this.isContentMount = defaultIsContentMount;
    }
  }
  
  render() {
    return this.isContentMount
      ? ReactDOM.createPortal(this.props.children, this.node)
      : null;
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  name: PropTypes.string,
  isContentMount: PropTypes.bool,
  node: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.instanceOf(window.HTMLElement),
  ]),
  nodeRef: PropTypes.func,
};

export default Portal;
