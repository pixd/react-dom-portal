```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import Portal from 'react-dom-portal';

const nodeFabric = () => document.createElement('section');
const node = document.createElement('section');

class App extends React.Component {
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

        {portalIsOpen && (
          <Portal>
            <div>Base functionality example</div>
          </Portal>
        )}

        <Portal isContentMount={portalIsOpen}>
          <div>`isContentMount` attribute example</div>
        </Portal>

        <Portal portalName="portal-name">
          <div>`portalName` attribute example</div>
        </Portal>

        <Portal node="section">
          <div>`node` attribute example (tag name)</div>
        </Portal>

        <Portal node={nodeFabric}>
          <div>`node` attribute example (HTMLElement)</div>
        </Portal>

        <Portal node={node}>
          <div>`node` attribute example (HTMLElement fabric)</div>
        </Portal>

        <Portal className="some-class">
          <div>`className` attribute example</div>
        </Portal>

        <Portal zIndex="1">
          <div>`zIndex` attribute example</div>
        </Portal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```
