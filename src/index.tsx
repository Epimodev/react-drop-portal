import { createElement, Component, ReactElement, CSSProperties } from 'react';
import AniPortal from 'react-aniportal';

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

interface State {}

class DropPortal extends Component<Props, State> {
  container: HTMLDivElement = document.createElement('div');

  static defaultProps = {
    alignment: 'center',
  };

  render() {
    const { children, className, classNames, timeout } = this.props;
    return (
      <AniPortal className={className} classNames={classNames} timeout={timeout}>
        {children}
      </AniPortal>
    );
  }
}

export default DropPortal;
