import { createElement, Component } from 'react';
import { storiesOf } from '@storybook/react';
import DropPortal from './index';
import { PortalPosition, PortalAlignment } from './types';

// classNames are defined in `.storybook/preview-head.html`
const dropdownClassName = 'dropdown-example';
const dropdownClassNames = {
  enter: 'dropdown-example_enter',
  enterActive: 'dropdown-example_enter-active',
  exit: 'dropdown-example_exit',
  exitActive: 'dropdown-example_exit-active',
};

storiesOf('DropPortal/Top Left', module)
  .add('left', () => <DropdownExample buttonClassName="button_top-left" alignment="start" />)
  .add('center', () => <DropdownExample buttonClassName="button_top-left" alignment="middle" />)
  .add('right', () => <DropdownExample buttonClassName="button_top-left" alignment="end" />);
storiesOf('DropPortal/Top Center', module)
  .add('left', () => <DropdownExample buttonClassName="button_top-center" alignment="start" />)
  .add('center', () => <DropdownExample buttonClassName="button_top-center" alignment="middle" />)
  .add('right', () => <DropdownExample buttonClassName="button_top-center" alignment="end" />);
storiesOf('DropPortal/Top Right', module)
  .add('left', () => <DropdownExample buttonClassName="button_top-right" alignment="start" />)
  .add('center', () => <DropdownExample buttonClassName="button_top-right" alignment="middle" />)
  .add('right', () => <DropdownExample buttonClassName="button_top-right" alignment="end" />);
storiesOf('DropPortal/Bottom Left', module)
  .add('left', () => <DropdownExample buttonClassName="button_bottom-left" alignment="start" />)
  .add('center', () => <DropdownExample buttonClassName="button_bottom-left" alignment="middle" />)
  .add('right', () => <DropdownExample buttonClassName="button_bottom-left" alignment="end" />);
storiesOf('DropPortal/Bottom Center', module)
  .add('left', () => <DropdownExample buttonClassName="button_bottom-center" alignment="start" />)
  .add('center', () => (
    <DropdownExample buttonClassName="button_bottom-center" alignment="middle" />
  ))
  .add('right', () => <DropdownExample buttonClassName="button_bottom-center" alignment="end" />);
storiesOf('DropPortal/Bottom Right', module)
  .add('left', () => <DropdownExample buttonClassName="button_bottom-right" alignment="start" />)
  .add('center', () => <DropdownExample buttonClassName="button_bottom-right" alignment="middle" />)
  .add('right', () => <DropdownExample buttonClassName="button_bottom-right" alignment="end" />);
storiesOf('DropPortal/Offset', module)
  .add('offset x', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="middle"
      offsetX={50}
      offsetY={0}
    />
  ))
  .add('offset y', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="middle"
      offsetX={0}
      offsetY={50}
    />
  ))
  .add('offset x negative', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="middle"
      offsetX={-50}
      offsetY={0}
    />
  ))
  .add('offset y negative', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="middle"
      offsetX={150}
      offsetY={-50}
    />
  ))
  .add('offset x + y', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="middle"
      offsetX={50}
      offsetY={50}
    />
  ))
  .add('offset x + y negative', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="middle"
      offsetX={-150}
      offsetY={-50}
    />
  ))
  .add('offset y reverse when position is top', () => (
    <DropdownExample
      buttonClassName="button_center-center"
      alignment="middle"
      position="top"
      offsetX={0}
      offsetY={50}
    />
  ))
  .add('offset y reverse when target is at bottom', () => (
    <DropdownExample
      buttonClassName="button_bottom-center"
      alignment="middle"
      offsetX={0}
      offsetY={50}
    />
  ));
storiesOf('DropPortal/Top', module)
  .add('default', () => (
    <DropdownExample buttonClassName="button_center-center" alignment="middle" position="top" />
  ))
  .add('at top', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="middle"
      position="top"
      offsetX={10}
      offsetY={10}
    />
  ))
  .add('with offset', () => (
    <DropdownExample
      buttonClassName="button_center-center"
      alignment="start"
      position="top"
      offsetX={10}
      offsetY={10}
    />
  ));
storiesOf('DropPortal/Children function', module)
  .add('at bottom', () => (
    <DropdownExample buttonClassName="button_center-center" alignment="middle" withChildFunction />
  ))
  .add('at top', () => (
    <DropdownExample
      buttonClassName="button_center-center"
      alignment="middle"
      position="top"
      withChildFunction
    />
  ))
  .add('at top because of limit size', () => (
    <DropdownExample buttonClassName="button_bottom-center" alignment="middle" withChildFunction />
  ))
  .add('at bottom because of limit size', () => (
    <DropdownExample
      buttonClassName="button_top-center"
      alignment="middle"
      position="top"
      withChildFunction
    />
  ));
storiesOf('DropPortal/With click outside', module).add('default', () => (
  <DropdownExample buttonClassName="button_center-center" alignment="middle" withClickOutside />
));
storiesOf('DropPortal/With long body', module).add('default', () => (
  <div>
    <div>Scroll down to see dropdown button</div>
    <DropdownExample buttonClassName="button_outside-center" alignment="middle" />
  </div>
));

interface ExampleProps {
  buttonClassName: string;
  alignment: PortalAlignment;
  position?: PortalPosition;
  offsetX?: number;
  offsetY?: number;
  withChildFunction?: boolean;
  withClickOutside?: boolean;
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
    const {
      buttonClassName,
      alignment,
      position = 'bottom',
      offsetX,
      offsetY,
      withChildFunction = false,
      withClickOutside = false,
    } = this.props;
    const { opened, choices } = this.state;
    const buttonLabel = opened ? 'Close' : 'Open';
    return (
      <div>
        <button ref={this.setButton} onClick={this.toogleDropdown} className={buttonClassName}>
          {buttonLabel}
        </button>
        <button onClick={this.toogleChoices}>Change choices</button>
        {opened && this.button && (
          <DropPortal
            target={this.button}
            alignment={alignment}
            className={dropdownClassName}
            classNames={dropdownClassNames}
            timeout={300}
            position={position}
            offsetX={offsetX}
            offsetY={offsetY}
            onClickOutside={withClickOutside ? this.toogleDropdown : undefined}
          >
            {withChildFunction ? (
              ({ position }) => (
                <div>
                  <div>{position}</div>
                  {choices.map(choice => (
                    <div key={choice}>{choice}</div>
                  ))}
                </div>
              )
            ) : (
              <div>
                {choices.map(choice => (
                  <div key={choice}>{choice}</div>
                ))}
              </div>
            )}
          </DropPortal>
        )}
      </div>
    );
  }
}
