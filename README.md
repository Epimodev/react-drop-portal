## Presentation

`react-drop-portal` is a React component which render his children in a portal located under an HTML element.
The goal of this component is to make easier the creation of tooltip, dropdown, autocomplete and other components which need to be placed near an HTML element and over all other elements.

It's possible to have animation on enter and before exit with an api similar to [`react-transition-group`](https://github.com/reactjs/react-transition-group).

## Installation

```sh
yarn add react-drop-portal

# or with npm

npm install react-drop-portal
```

## Example

```javascript
import React, { Component } from 'react';
import DropPortal from 'react-drop-portal';

class DropdownExample extends Component {
  constructor(props) {
    super(props);
    this.state = { opened: false };
    this.setButton = this.setButton.bind(this);
    this.toogleDropdown = this.toogleDropdown.bind(this);
  }
  setButton(ref) {
    this.button = ref;
  }
  toogleDropdown() {
    this.setState(state => ({
      opened: !state.opened,
    }));
  }
  render() {
    const { opened } = this.state;
    const buttonLabel = opened ? 'Close' : 'Open';
    return (
      <div>
        <button ref={this.setButton} onClick={this.toogleDropdown}>
          {buttonLabel}
        </button>
        {opened && (
            <DropPortal
              target={this.button}
              alignment="left"
            >
              <div>
                <div>Choice 1</div>
                <div>Choice 2</div>
                <div>Choice 3</div>
              </div>
            </DropPortal>
          )}
      </div>
    );
  }
}
```

## Available props

#### target: HTMLElement
Element which define portal position. For example, it can be an `input` for autocompletion or a `button` for a dropdown

#### alignment: 'left' | 'center' | 'right'
Define how created portal element is aligned with target element

#### className: string
className to apply on container

#### classNames: { enter?: string; enterActive?: string; exit?: string; exitActive?: string }
classNames which are applied during mount and unmount of the component

#### style: CSSProperties
style to apply on container

#### styles: { enter?: CSSProperties; enterActive?: CSSProperties; exit?: CSSProperties; exitActive?: CSSProperties }
styles which are applied during mount and unmount of the component

#### timeout: number | { enter: number; exit: number }
duration of enter and exit animations
