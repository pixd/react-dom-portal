import React from 'react';
import ReactDOM from 'react-dom';

import Portal from '../lib';

const nodeFabric = () => document.createElement('section');
const node = document.createElement('section');

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portalIsOpen: false,
    };
  }

  render() {
    const { portalIsOpen } = this.state;

    return (
      <div>
        <button onClick={this.handleClick}>Click me!</button>

        {portalIsOpen
          ? (
            <Portal>
              <p>Base functionality example</p>
            </Portal>
          )
          : null}

        <Portal isContentMount={portalIsOpen}>
          <p>`isContentMount` prop example</p>
        </Portal>

        <Portal className="portal-class-name" name="portal-name">
          <p>`className` and `name` props example</p>
        </Portal>

        <Portal node="section">
          <p>`node` prop example (tag name)</p>
        </Portal>

        <Portal node={nodeFabric}>
          <p>`node` prop example (HTMLElement)</p>
        </Portal>

        <Portal node={node}>
          <p>`node` prop example (HTMLElement fabric)</p>
        </Portal>

        <Portal nodeRef={(nodeRef) => console.log(nodeRef)}>
          <p>`nodeRef` prop example</p>
        </Portal>
      </div>
    );
  }

  handleClick = () => {
    const { portalIsOpen } = this.state;
    this.setState({ portalIsOpen: ! portalIsOpen });
  };
}

ReactDOM.render(<App />, document.getElementById('root'));
