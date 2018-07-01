import { createElement, Component } from 'react';
import { storiesOf } from '@storybook/react';
import DropPortal from './index';

// classNames are defined in `.storybook/preview-head.html`
const dropdownClassName = 'dropdown-example';
const dropdownClassNames = {
  enter: 'dropdown-example_enter',
  enterActive: 'dropdown-example_enter-active',
  exit: 'dropdown-example_exit',
  exitActive: 'dropdown-example_exit-active',
};

storiesOf('DropPortal', module).add('default', () => <DropdownExample />);

class DropdownExample extends Component<{}, { opened: boolean }> {
  button: HTMLButtonElement | null = null;
  constructor(props: {}) {
    super(props);
    this.state = { opened: false };
    this.setButton = this.setButton.bind(this);
    this.toogleDropdown = this.toogleDropdown.bind(this);
  }
  setButton(ref: HTMLButtonElement | null) {
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
        {opened &&
          this.button && (
            <DropPortal
              target={this.button}
              className={dropdownClassName}
              classNames={dropdownClassNames}
              timeout={300}
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
