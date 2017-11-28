import React from 'react';
import ReactDOM from 'react-dom';

import Portal from '../lib/portal';

const nodeFabric = () => document.createElement('section');
const node = document.createElement('section');

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portalIsOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { portalIsOpen } = this.state;
    this.setState({ portalIsOpen: ! portalIsOpen });
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
          <p>`isContentMount` attribute example</p>
        </Portal>

        <Portal portalName="portal-name">
          <p>`portalName` attribute example</p>
        </Portal>

        <Portal node="section">
          <p>`node` attribute example (tag name)</p>
        </Portal>

        <Portal node={nodeFabric}>
          <p>`node` attribute example (HTMLElement)</p>
        </Portal>

        <Portal node={node}>
          <p>`node` attribute example (HTMLElement fabric)</p>
        </Portal>

        <Portal className="some-class">
          <p>`className` attribute example</p>
        </Portal>

        <Portal zIndex="1">
          <p>`zIndex` attribute example</p>
        </Portal>

        <Portal portalName="portal-name" renderWithParent={(...args) => args.map((arg) => console.log(arg))} >
          <p>`renderWithParent` attribute example</p>
        </Portal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
