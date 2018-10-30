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

storiesOf('DropPortal/Top Left', module)
  .add('left', () => <DropdownExample buttonClassName="button_top-left" alignment="left" />)
  .add('center', () => <DropdownExample buttonClassName="button_top-left" alignment="center" />)
  .add('right', () => <DropdownExample buttonClassName="button_top-left" alignment="right" />);
storiesOf('DropPortal/Top Center', module)
  .add('left', () => <DropdownExample buttonClassName="button_top-center" alignment="left" />)
  .add('center', () => <DropdownExample buttonClassName="button_top-center" alignment="center" />)
  .add('right', () => <DropdownExample buttonClassName="button_top-center" alignment="right" />);
storiesOf('DropPortal/Top Right', module)
  .add('left', () => <DropdownExample buttonClassName="button_top-right" alignment="left" />)
  .add('center', () => <DropdownExample buttonClassName="button_top-right" alignment="center" />)
  .add('right', () => <DropdownExample buttonClassName="button_top-right" alignment="right" />);
storiesOf('DropPortal/Bottom Left', module)
  .add('left', () => <DropdownExample buttonClassName="button_bottom-left" alignment="left" />)
  .add('center', () => <DropdownExample buttonClassName="button_bottom-left" alignment="center" />)
  .add('right', () => <DropdownExample buttonClassName="button_bottom-left" alignment="right" />);
storiesOf('DropPortal/Bottom Center', module)
  .add('left', () => <DropdownExample buttonClassName="button_bottom-center" alignment="left" />)
  .add('center', () => (
    <DropdownExample buttonClassName="button_bottom-center" alignment="center" />
  ))
  .add('right', () => <DropdownExample buttonClassName="button_bottom-center" alignment="right" />);
storiesOf('DropPortal/Bottom Right', module)
  .add('left', () => <DropdownExample buttonClassName="button_bottom-right" alignment="left" />)
  .add('center', () => <DropdownExample buttonClassName="button_bottom-right" alignment="center" />)
  .add('right', () => <DropdownExample buttonClassName="button_bottom-right" alignment="right" />);
storiesOf('DropPortal/Offset', module)
  .add('offset x', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="center"
      offset={{ x: 50, y: 0 }}
    />
  ))
  .add('offset y', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="center"
      offset={{ x: 0, y: 50 }}
    />
  ))
  .add('offset x negative', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="center"
      offset={{ x: -50, y: 0 }}
    />
  ))
  .add('offset y negative', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="center"
      offset={{ x: 150, y: -50 }}
    />
  ))
  .add('offset x + y', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="center"
      offset={{ x: 50, y: 50 }}
    />
  ))
  .add('offset x + y negative', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="center"
      offset={{ x: -150, y: -50 }}
    />
  ));
storiesOf('DropPortal/Top', module)
  .add('default', () => (
    <DropdownExample buttonClassName="button_center-center" alignment="center" position="top" />
  ))
  .add('at top', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="center"
      position="top"
      offset={{ x: 10, y: 10 }}
    />
  ))
  .add('with offset', () => (
    <DropdownExample
      buttonClassName="button_center-center"
      alignment="left"
      position="top"
      offset={{ x: 10, y: 10 }}
    />
  ));

interface ExampleProps {
  buttonClassName: string;
  alignment: 'left' | 'center' | 'right';
  position?: 'top' | 'bottom';
  offset?: { x: number; y: number };
}

const CHOICES_1 = ['Choice 1', 'Choice 2', 'Choice 3'];
const CHOICES_2 = ['Choice 4', 'Choice 5'];

class DropdownExample extends Component<ExampleProps, { opened: boolean; choices: string[] }> {
  button: HTMLButtonElement | null = null;
  constructor(props: ExampleProps) {
    super(props);
    this.state = { opened: false, choices: CHOICES_1 };
    this.setButton = this.setButton.bind(this);
    this.toogleDropdown = this.toogleDropdown.bind(this);
    this.toogleChoices = this.toogleChoices.bind(this);
  }
  setButton(ref: HTMLButtonElement | null) {
    this.button = ref;
  }
  toogleDropdown() {
    this.setState(({ opened }) => ({
      opened: !opened,
    }));
  }
  toogleChoices() {
    this.setState(({ choices }) => ({
      choices: choices === CHOICES_1 ? CHOICES_2 : CHOICES_1,
    }));
  }
  render() {
    const { buttonClassName, alignment, position = 'bottom', offset } = this.props;
    const { opened, choices } = this.state;
    const buttonLabel = opened ? 'Close' : 'Open';
    return (
      <div>
        <button ref={this.setButton} onClick={this.toogleDropdown} className={buttonClassName}>
          {buttonLabel}
        </button>
        <button onClick={this.toogleChoices}>Change choices</button>
        {opened &&
          this.button && (
            <DropPortal
              target={this.button}
              alignment={alignment}
              className={dropdownClassName}
              classNames={dropdownClassNames}
              timeout={300}
              position={position}
              offset={offset}
            >
              <div>{choices.map(choice => <div key={choice}>{choice}</div>)}</div>
            </DropPortal>
          )}
      </div>
    );
  }
}
