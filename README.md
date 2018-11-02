## Presentation

`react-drop-portal` is a React component which render his children in a portal located under an HTML element.
The goal of this component is to make easier the creation of tooltip, dropdown, autocomplete and other components which need to be placed near an HTML element and over all other elements.

It's possible to have animation on enter and before exit with an api similar to [`react-transition-group`](https://github.com/reactjs/react-transition-group).

## Installation

```sh
yarn add react-drop-portal

# or with npm

npm install --save react-drop-portal
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

## Documentation

#### Props

**target** `HTMLElement`  
Element which define portal position. For example, it can be an `input` for autocompletion or a `button` for a dropdown

**position** `(optional) 'top' | 'bottom'`  
Default to 'bottom', define if portal element is above or below target

**alignment** `(optional) 'left' | 'center' | 'right'`  
Default to 'center', define how created portal element is aligned with target element

**offset** `(optional) { x: number, y: number }`  
Add an offset on `x` and `y` axis for portal position

**className** `(optional) string`  
className to apply on container

**classNames** `(optional) { enter?: string; enterActive?: string; exit?: string; exitActive?: string }`  
classNames which are applied during mount and unmount of the component

**style** `(optional) CSSProperties`  
style to apply on container

**styles** `(optional) { enter?: CSSProperties; enterActive?: CSSProperties; exit?: CSSProperties; exitActive?: CSSProperties }`  
styles which are applied during mount and unmount of the component

**timeout** `(optional) number | { enter: number; exit: number }`  
default to 0, duration of enter and exit animations

**onClickOutside** `(optional) function (): void`  
function called when user click outside portal

**children** `ReactNode | function ({ position: 'top' | 'bottom' }): ReactNode`  
Portal content. You can use a function if you need portal position relative to the target (can be usefull to render tooltip arrow in right orientation)

example :
```jsx
...
<DropPortal target={this.target}>
  {({ position }) => {
    return (
      <div className="tooltip">
        <div className={position === 'top' ? 'arrow_to-bottom' : 'arrow_to-top'} />
        <div className="tooltip-content">{content}</div>
      </div>
    );
  }}
</DropPortal>
```
