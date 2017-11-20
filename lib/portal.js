import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const PORTAL_NAME_ATTRIBUTE = 'data-dom-portal';

class Portal extends React.Component {
  constructor(props) {
    super(props);

    this.node = null;
    this.updateIsContentMount(props, true);
  }

  componentWillMount() {
    const { portalName, className, zIndex, node } = this.props;

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

    if (portalName) {
      this.node.setAttribute(PORTAL_NAME_ATTRIBUTE, portalName);
    }

    if (className) {
      this.node.className = [...this.node.classList, className].join(' ');
    }

    if ('zIndex' in this.props) {
      this.node.style.zIndex = zIndex == null ? '' : String(zIndex);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateIsContentMount(nextProps);
  }

  componentWillUnmount() {
    this.isContentMount = false;

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
  isContentMount: PropTypes.bool,
  portalName: PropTypes.string,
  className: PropTypes.string,
  zIndex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  node: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.instanceOf(window.HTMLElement),
  ]),
};

export default Portal;
