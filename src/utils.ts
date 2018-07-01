interface VerticalOptions {
  windowHeight: number;
  childrenHeight: number;
  targetHeight: number;
  targetTop: number;
}

interface VerticalMeasure {
  top: number;
  height: number;
}

interface HorizontalOptions {
  windowWidth: number;
  childrenWidth: number;
  targetWidth: number;
  targetLeft: number;
  alignment: 'left' | 'center' | 'right';
}

export function computeVerticalMeasure(options: VerticalOptions): VerticalMeasure {
  const basicTop = options.targetTop + options.targetHeight;
  const maxHeight = options.windowHeight - basicTop;
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
      };
    }

    return {
      top: basicTop,
      height: maxHeight,
    };
  }

  return {
    top: basicTop,
    height: options.childrenHeight,
  };
}

function computeChildLeftPosition(options: HorizontalOptions): number {
  switch (options.alignment) {
    case 'left': {
      return options.targetLeft;
    }
    case 'right': {
      return options.targetLeft + options.targetWidth - options.childrenWidth;
    }
    case 'center': {
      const leftOffset = (options.childrenWidth - options.targetWidth) / 2;
      return options.targetLeft - leftOffset;
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
