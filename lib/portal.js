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
    const { renderWithParent } = this.props;
    return renderWithParent ? this.renderWithParent() : this.renderPortal();
  }

  renderWithParent() {
    const { portalName, renderWithParent } = this.props;
    const parentProps = {};
    if (portalName) {
      parentProps[PARENT_NAME_ATTRIBUTE] = portalName;
    }
    if (typeof renderWithParent === 'function') {
      parentProps.ref = renderWithParent;
    }
    return <div {...parentProps}>{this.renderPortal()}</div>;
  }
  
  renderPortal() {
    return this.isContentMount
      ? ReactDOM.createPortal(this.props.children, this.node)
      : null;
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  portalName: PropTypes.string,
  isContentMount: PropTypes.bool,
  node: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.instanceOf(window.HTMLElement),
  ]),
  renderWithParent:  PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  zIndex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Portal;
