```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import Portal from 'react-dom-portal';

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

        <Portal className="portal-class-name" name="portal-name">
          <p>`className` and `name` attributes example</p>
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

        <Portal containerRef={(containerRef) => console.log(containerRef)}>
          <p>`containerRef` attribute example</p>
        </Portal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```
