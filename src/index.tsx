import { createElement, Component, ReactElement, CSSProperties } from 'react';
import AniPortal from 'react-aniportal';
import { computeVerticalMeasure, computeLeftPosition, getScrollableParents } from './utils';

interface ChildrenProps {
  position: 'top' | 'bottom';
}

interface Props {
  children: ((props: ChildrenProps) => ReactElement<any>) | ReactElement<any>;
  target: HTMLElement;
  position: 'top' | 'bottom';
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
  onClickOutside?: () => void;
}

interface State {
  childStyle?: CSSProperties;
  childrenWidth: number;
  childrenHeight: number;
  position: 'top' | 'bottom';
}

class DropPortal extends Component<Props, State> {
  childContainer: HTMLDivElement | null = null;
  scrollableParents: HTMLElement[] = [];

  static defaultProps = {
    position: 'bottom',
    alignment: 'center',
    timeout: 0,
    offset: { x: 0, y: 0 },
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      childrenWidth: 0,
      childrenHeight: 0,
      position: props.position,
    };

    this.setChildContainer = this.setChildContainer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.portalDidUpdate = this.portalDidUpdate.bind(this);
    this.updatePositionStyle = this.updatePositionStyle.bind(this);
  }

  componentDidMount() {
    setTimeout(() => window.addEventListener('click', this.handleClick), 20);
    window.addEventListener('resize', this.updatePositionStyle);

    this.scrollableParents = getScrollableParents(this.props.target);
    this.scrollableParents.forEach(element => {
      element.addEventListener('scroll', this.updatePositionStyle);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClick);
    window.removeEventListener('resize', this.updatePositionStyle);

    this.scrollableParents.forEach(element => {
      if (element) {
        element.removeEventListener('scroll', this.updatePositionStyle);
      }
    });
    this.scrollableParents = [];
  }

  setChildContainer(ref: HTMLDivElement | null) {
    this.childContainer = ref;
    // init position here instead of in `componentDidMount`
    // because `componentDidMount` is call before portal finish render
    this.updatePositionStyle();
  }

  handleClick(event: MouseEvent) {
    const { onClickOutside } = this.props;
    if (onClickOutside && this.childContainer) {
      const target = event.target as Element;
      if (!this.childContainer.contains(target)) {
        onClickOutside();
      }
    }
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
    const { position, alignment, target, offset, onClickOutside } = this.props;
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
      position,
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

    const isInScreen =
      verticalMeasure.top + verticalMeasure.height > 0 && verticalMeasure.top < windowHeight;

    if (isInScreen) {
      const style: CSSProperties = {
        position: 'absolute',
        top: `${verticalMeasure.top}px`,
        left: `${leftPosition}px`,
        height: `${verticalMeasure.height}px`,
      };

      this.setState({
        childrenWidth,
        childrenHeight,
        childStyle: style,
        position: verticalMeasure.position,
      });
    } else {
      if (onClickOutside) {
        onClickOutside();
      }
    }
  }

  render() {
    const { children, className, classNames, style, styles, timeout } = this.props;
    const { childStyle, position } = this.state;
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
        <div ref={this.setChildContainer}>
          {typeof children === 'function' ? children({ position }) : children}
        </div>
      </AniPortal>
    );
  }
}

export default DropPortal;
