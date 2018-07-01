import { createElement, Component, ReactElement, CSSProperties } from 'react';
import AniPortal from 'react-aniportal';
import { computeVerticalMeasure, computeLeftPosition } from './utils';

interface Props {
  children: ReactElement<any>;
  target: HTMLElement;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
  classNames?: {
    enter?: string;
    enterActive?: string;
    exit?: string;
    exitActive?: string;
  };
  style?: CSSProperties;
  styles?: {
    enter?: CSSProperties;
    enterActive?: CSSProperties;
    exit?: CSSProperties;
    exitActive?: CSSProperties;
  };
  timeout: number | { enter: number; exit: number };
}

interface State {
  childStyle?: CSSProperties;
}

class DropPortal extends Component<Props, State> {
  childContainer: HTMLDivElement | null = null;

  static defaultProps = {
    alignment: 'center',
  };

  constructor(props: Props) {
    super(props);

    this.state = {};

    this.setChildContainer = this.setChildContainer.bind(this);
  }

  setChildContainer(ref: HTMLDivElement | null) {
    this.childContainer = ref;
    if (this.childContainer !== null) {
      // init position here instead of in `componentDidMount`
      // because `componentDidMount` is call before
      this.updatePositionStyle();
    }
  }

  updatePositionStyle() {
    const { alignment, target } = this.props;
    const {
      top: targetTop,
      left: targetLeft,
      height: targetHeight,
      width: targetWidth,
    } = target.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const childrenWidth = this.childContainer!.offsetWidth;
    const childrenHeight = this.childContainer!.offsetHeight;

    const verticalMeasure = computeVerticalMeasure({
      windowHeight,
      childrenHeight,
      targetHeight,
      targetTop,
    });
    const leftPosition = computeLeftPosition({
      windowWidth,
      childrenWidth,
      targetWidth,
      targetLeft,
      alignment: alignment!,
    });

    const style = {
      position: 'absolute' as 'absolute',
      top: `${verticalMeasure.top}px`,
      left: `${leftPosition}px`,
      height: `${verticalMeasure.height}px`,
    };

    this.setState({
      childStyle: style,
    });
  }

  render() {
    const { children, className, classNames, timeout } = this.props;
    const { childStyle } = this.state;
    return (
      <AniPortal className={className} classNames={classNames} style={childStyle} timeout={timeout}>
        <div ref={this.setChildContainer}>{children}</div>
      </AniPortal>
    );
  }
}

export default DropPortal;
