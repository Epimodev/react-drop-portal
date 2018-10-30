import { createElement, Component, ReactElement, CSSProperties } from 'react';
import AniPortal from 'react-aniportal';
import { computeVerticalMeasure, computeLeftPosition } from './utils';

interface Props {
  children: ReactElement<any>;
  target: HTMLElement;
  alignment: 'left' | 'center' | 'right';
  offset: { x: number; y: number };
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
  childrenWidth: number;
  childrenHeight: number;
}

class DropPortal extends Component<Props, State> {
  childContainer: HTMLDivElement | null = null;

  static defaultProps = {
    alignment: 'center',
    timeout: 0,
    offset: { x: 0, y: 0 },
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      childrenWidth: 0,
      childrenHeight: 0,
    };

    this.setChildContainer = this.setChildContainer.bind(this);
    this.portalDidUpdate = this.portalDidUpdate.bind(this);
    this.updatePositionStyle = this.updatePositionStyle.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updatePositionStyle);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePositionStyle);
  }

  setChildContainer(ref: HTMLDivElement | null) {
    this.childContainer = ref;
    // init position here instead of in `componentDidMount`
    // because `componentDidMount` is call before portal finish render
    this.updatePositionStyle();
  }

  portalDidUpdate() {
    if (this.childContainer) {
      const { childrenWidth, childrenHeight } = this.state;
      const newChildrenWidth = this.childContainer.offsetWidth;
      const newChildrenHeight = this.childContainer.offsetHeight;
      if (newChildrenWidth !== childrenWidth || newChildrenHeight !== childrenHeight) {
        this.updatePositionStyle();
      }
    }
  }

  updatePositionStyle() {
    if (this.childContainer === null) {
      return;
    }
    const { alignment, target, offset } = this.props;
    const {
      top: targetTop,
      left: targetLeft,
      height: targetHeight,
      width: targetWidth,
    } = target.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const childrenWidth = this.childContainer.offsetWidth;
    const childrenHeight = this.childContainer.offsetHeight;

    const verticalMeasure = computeVerticalMeasure({
      windowHeight,
      childrenHeight,
      targetHeight,
      targetTop,
      offset: offset.y,
    });
    const leftPosition = computeLeftPosition({
      windowWidth,
      childrenWidth,
      targetWidth,
      targetLeft,
      alignment,
      offset: offset.x,
    });

    const style = {
      position: 'absolute' as 'absolute',
      top: `${verticalMeasure.top}px`,
      left: `${leftPosition}px`,
      height: `${verticalMeasure.height}px`,
    };

    this.setState({
      childrenWidth,
      childrenHeight,
      childStyle: style,
    });
  }

  render() {
    const { children, className, classNames, style, styles, timeout } = this.props;
    const { childStyle } = this.state;
    const portalStyle = { ...childStyle, ...style };
    return (
      <AniPortal
        className={className}
        classNames={classNames}
        style={portalStyle}
        styles={styles}
        timeout={timeout}
        portalDidUpdate={this.portalDidUpdate}
      >
        <div ref={this.setChildContainer}>{children}</div>
      </AniPortal>
    );
  }
}

export default DropPortal;
