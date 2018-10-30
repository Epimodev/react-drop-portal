interface VerticalOptions {
  position: 'top' | 'bottom';
  windowHeight: number;
  childrenHeight: number;
  targetHeight: number;
  targetTop: number;
  offset: number;
}

interface VerticalMeasure {
  top: number;
  height: number;
  position: 'top' | 'bottom';
}

interface HorizontalOptions {
  windowWidth: number;
  childrenWidth: number;
  targetWidth: number;
  targetLeft: number;
  alignment: 'left' | 'center' | 'right';
  offset: number;
}

function computeBottomPortalVertical(options: VerticalOptions): VerticalMeasure {
  const basicTop = options.targetTop + options.targetHeight + options.offset;
  const fixedTop = Math.max(0, basicTop);
  const maxHeight = options.windowHeight - fixedTop;
  const bottomFreeSpace = maxHeight - options.childrenHeight;
  const isBottomOverflow = bottomFreeSpace < 0;

  if (isBottomOverflow) {
    const moreSpaceAtTop = options.targetTop > maxHeight;

    if (moreSpaceAtTop) {
      const topPosition = options.targetTop - options.childrenHeight;
      const isTopOverflow = topPosition < 0;
      const height = isTopOverflow ? options.targetTop : options.childrenHeight;
      return {
        height,
        top: Math.max(0, topPosition),
        position: 'top',
      };
    }

    return {
      top: fixedTop,
      height: maxHeight,
      position: 'bottom',
    };
  }

  return {
    top: fixedTop,
    height: options.childrenHeight,
    position: 'bottom',
  };
}

function computeTopPortalVertical(options: VerticalOptions): VerticalMeasure {
  const topPosition = options.targetTop - options.childrenHeight + options.offset;
  const isTopOverflow = topPosition < 0;

  if (isTopOverflow) {
    const bottomSpace = options.windowHeight - (options.targetTop + options.targetHeight);
    const moreSpaceAtBottom = bottomSpace > options.targetTop;

    if (moreSpaceAtBottom) {
      const top = options.targetTop + options.targetHeight;
      const maxHeight = options.windowHeight - top;
      const bottomFreeSpace = maxHeight - options.childrenHeight;
      const isBottomOverflow = bottomFreeSpace < 0;
      const height = isBottomOverflow ? maxHeight : options.childrenHeight;
      return {
        top,
        height,
        position: 'bottom',
      };
    }

    return {
      top: Math.max(0, topPosition),
      height: options.targetTop,
      position: 'top',
    };
  }

  return {
    top: Math.max(0, topPosition),
    height: options.childrenHeight,
    position: 'top',
  };
}

export function computeVerticalMeasure(options: VerticalOptions): VerticalMeasure {
  if (options.position === 'bottom') {
    return computeBottomPortalVertical(options);
  }
  return computeTopPortalVertical(options);
}

function computeChildLeftPosition(options: HorizontalOptions): number {
  switch (options.alignment) {
    case 'left': {
      return options.targetLeft + options.offset;
    }
    case 'right': {
      return options.targetLeft + options.targetWidth - options.childrenWidth + options.offset;
    }
    case 'center': {
      const leftOffset = (options.childrenWidth - options.targetWidth) / 2;
      return options.targetLeft - leftOffset + options.offset;
    }
  }
}

function fixLeftPosition(childrenLeft: number, childrenWidth: number, windowWidth: number): number {
  if (childrenLeft < 0) {
    return 0;
  }
  if (childrenLeft + childrenWidth > windowWidth) {
    return windowWidth - childrenWidth;
  }
  return childrenLeft;
}

export function computeLeftPosition(options: HorizontalOptions): number {
  const childLeft = computeChildLeftPosition(options);
  return fixLeftPosition(childLeft, options.childrenWidth, options.windowWidth);
}
