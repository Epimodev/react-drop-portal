import { createElement, Component, ReactElement, CSSProperties } from 'react';
import AniPortal from 'react-aniportal';
import {
  getEmptyMeasure,
  computeTargetMeasure,
  computePortalMeasure,
  createPortalStyle,
} from './measure';
import { getScrollableParents, deepEquals } from './utils';
import {
  PortalPosition,
  PortalAlignment,
  ContentMeasure,
  PortalMeasure,
  MeasurePortalOptions,
} from './types';

interface Props {
  children: ((props: PortalMeasure) => ReactElement<any>) | ReactElement<any>;
  target: HTMLElement;
  position: PortalPosition;
  alignment: PortalAlignment;
  canOverflowScreen: boolean;
  offsetX: number;
  offsetY: number;
  minWidth: number;
  minHeight: number;
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
  onLeaveScreen?: () => void;
}

class DropPortal extends Component<Props, PortalMeasure> {
  childContainer: HTMLDivElement | null = null;
  childSize: ContentMeasure = { width: 0, height: 0 };
  scrollableParents: HTMLElement[] = [];

  static defaultProps = {
    position: 'bottom',
    alignment: 'start',
    canOverflowScreen: false,
    offsetX: 0,
    offsetY: 0,
    minWidth: Infinity,
    minHeight: Infinity,
    timeout: 0,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      target: getEmptyMeasure(),
      position: props.position,
      alignement: props.alignment,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    };

    this.portalDidUpdate = this.portalDidUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setChildContainer = this.setChildContainer.bind(this);
    this.updatePortalMeasure = this.updatePortalMeasure.bind(this);
  }

  componentDidMount() {
    // prevent click event just after componentDidMount
    // to avoid call `onClickOutside` when portal is open by a click on a button
    requestAnimationFrame(() => window.addEventListener('click', this.handleClick));
    window.addEventListener('resize', this.updatePortalMeasure);
    window.addEventListener('scroll', this.updatePortalMeasure);

    this.scrollableParents = getScrollableParents(this.props.target);
    this.scrollableParents.forEach(element => {
      element.addEventListener('scroll', this.updatePortalMeasure);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClick);
    window.removeEventListener('resize', this.updatePortalMeasure);
    window.removeEventListener('scroll', this.updatePortalMeasure);

    this.scrollableParents.forEach(element => {
      if (element) {
        element.removeEventListener('scroll', this.updatePortalMeasure);
      }
    });
    this.scrollableParents = [];
  }

  isPortalSizeInit() {
    return this.state.width > 0 && this.state.height > 0;
  }

  portalDidUpdate() {
    this.updatePortalMeasure();
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

  setChildContainer(ref: HTMLDivElement | null) {
    this.childContainer = ref;
    this.updateChildMeasure();

    // avoid setState on unmount
    if (this.childContainer) {
      this.updatePortalMeasure();
    }
  }

  updateChildMeasure() {
    if (this.childContainer) {
      this.childSize = {
        width: this.childContainer.offsetWidth,
        height: this.childContainer.offsetHeight,
      };
    }
  }

  updatePortalMeasure() {
    const {
      target,
      position,
      alignment,
      canOverflowScreen,
      offsetX,
      offsetY,
      minWidth,
      minHeight,
    } = this.props;
    const targetMeasure = computeTargetMeasure(target);
    const options: MeasurePortalOptions = {
      position,
      alignment,
      offsetX,
      offsetY,
      minWidth,
      minHeight,
      canOverflowScreen,
    };
    const portalMeasure = computePortalMeasure(this.childSize, targetMeasure, options);

    this.setState(currentMeasure => {
      if (deepEquals(currentMeasure, portalMeasure)) {
        return null;
      }
      return portalMeasure;
    });
  }

  render() {
    const { children, className, classNames, style, styles, timeout } = this.props;
    const portalStyle = this.isPortalSizeInit()
      ? createPortalStyle(this.state)
      : { display: 'inline-block' };

    return (
      <AniPortal
        className={className}
        classNames={classNames}
        style={{ ...portalStyle, ...style }}
        styles={styles}
        timeout={timeout}
        portalDidUpdate={this.portalDidUpdate}
      >
        <div ref={this.setChildContainer}>
          {typeof children === 'function' ? children(this.state) : children}
        </div>
      </AniPortal>
    );
  }
}

export default DropPortal;
export { PortalPosition, PortalAlignment };
