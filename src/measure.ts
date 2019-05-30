import {
  MeasurePortalOptions,
  TargetMeasure,
  PortalMeasure,
  ContentMeasure,
  PortalPosition,
  PortalAlignement,
} from './types';

function computeTargetMeasure(target: HTMLElement): TargetMeasure {
  const scrollX = document.body.scrollLeft;
  const scrollY = document.body.scrollTop;
  const targetRect = target.getBoundingClientRect();
  const top = scrollY + targetRect.top;
  const left = scrollX + targetRect.left;
  const right = document.body.scrollWidth - targetRect.width - left;
  const bottom = document.body.scrollHeight - targetRect.height - top;

  return {
    top,
    left,
    right,
    bottom,
    width: targetRect.width,
    height: targetRect.height,
  };
}

function computePortalVerticalMeasure(
  content: ContentMeasure,
  target: TargetMeasure,
  position: PortalPosition,
  alignement: PortalAlignement,
): { top: number; left: number; height: number } {
  const top =
    position === 'bottom' ? target.top + target.height : Math.max(target.top - content.height, 0);
  const height =
    position === 'bottom'
      ? Math.min(target.bottom, content.height)
      : Math.min(target.top, content.height);
  const left = computeHorizontalAlign(content, target, alignement);

  return { top, height, left };
}

function computePortalHorizontalMeasure(
  content: ContentMeasure,
  target: TargetMeasure,
  position: PortalPosition,
  alignement: PortalAlignement,
): { top: number; left: number; width: number } {
  const left =
    position === 'right' ? target.left + target.width : Math.max(target.left - content.width, 0);
  const width =
    position === 'right'
      ? Math.min(target.right, content.width)
      : Math.min(target.left, content.width);
  const top = computeVerticalAlign(content, target, alignement);

  return { top, width, left };
}

function computeHorizontalAlign(
  content: ContentMeasure,
  target: TargetMeasure,
  alignement: PortalAlignement,
): number {
  switch (alignement) {
    case 'start': {
      const overflowRight = content.width - target.width - target.right;
      if (overflowRight > 0) {
        return target.left - overflowRight;
      }
      return target.left;
    }
    case 'middle': {
      const semiWidthDiff = (target.width - content.width) / 2;
      const left = target.left + semiWidthDiff;
      const overflowRight = content.width - target.width - target.right + semiWidthDiff;
      const overflowLeft = content.width - target.width - target.left + semiWidthDiff;

      if (overflowRight > 0) {
        return left - overflowRight;
      }
      if (overflowLeft > 0) {
        return left + overflowLeft;
      }
      return left;
    }
    case 'end': {
      const left = target.left + target.width - content.width;
      return Math.max(0, left);
    }
  }
}

function computeVerticalAlign(
  content: ContentMeasure,
  target: TargetMeasure,
  alignement: PortalAlignement,
): number {
  switch (alignement) {
    case 'start': {
      const overflowBottom = content.height - target.height - target.bottom;
      if (overflowBottom > 0) {
        return target.top - overflowBottom;
      }
      return target.top;
    }
    case 'middle': {
      const semiHeightDiff = (target.height - content.height) / 2;
      const top = target.top + semiHeightDiff;
      const overflowBottom = content.height - target.height - target.bottom + semiHeightDiff;
      const overflowTop = content.height - target.height - target.top + semiHeightDiff;

      if (overflowBottom > 0) {
        return top - overflowBottom;
      }
      if (overflowTop > 0) {
        return top + overflowTop;
      }
      return top;
    }
    case 'end': {
      const top = target.top + target.height - content.height;
      return Math.max(0, top);
    }
  }
}

function computePortalMesure(
  content: ContentMeasure,
  target: TargetMeasure,
  options: MeasurePortalOptions = {},
): PortalMeasure {
  const {
    position = 'bottom',
    alignement = 'start',
    minWidth = Infinity,
    minHeight = Infinity,
    offsetX = 0,
    offsetY = 0,
  } = options;

  const targetWithOffset: TargetMeasure = {
    width: target.width,
    height: target.height,
    top: target.top - offsetY,
    right: target.right + offsetX,
    bottom: target.bottom + offsetY,
    left: target.left - offsetX,
  };

  switch (position) {
    case 'bottom': {
      const overflowBottom = content.height - targetWithOffset.bottom;
      const minHeightOverflowBottom = minHeight - targetWithOffset.bottom;
      const overflowTop = content.height - targetWithOffset.top;
      const portalPosition: PortalPosition =
        overflowBottom < 0 || minHeightOverflowBottom < 0 || overflowBottom < overflowTop
          ? 'bottom'
          : 'top';

      const { top, left, height } = computePortalVerticalMeasure(
        content,
        targetWithOffset,
        portalPosition,
        alignement,
      );

      return {
        target,
        alignement,
        top,
        left,
        height,
        position: portalPosition,
        width: content.width,
      };
    }

    case 'top': {
      const overflowTop = content.height - targetWithOffset.top;
      const minHeightOverflowTop = minHeight - targetWithOffset.top;
      const overflowBottom = content.height - targetWithOffset.bottom;
      const portalPosition: PortalPosition =
        overflowTop < 0 || minHeightOverflowTop < 0 || overflowTop < overflowBottom
          ? 'top'
          : 'bottom';

      const { top, left, height } = computePortalVerticalMeasure(
        content,
        targetWithOffset,
        portalPosition,
        alignement,
      );

      return {
        target,
        alignement,
        top,
        left,
        height,
        position: portalPosition,
        width: content.width,
      };
    }

    case 'left': {
      const overflowLeft = content.width - targetWithOffset.left;
      const minHeightOverflowLeft = minWidth - targetWithOffset.left;
      const overflowRight = content.width - targetWithOffset.right;
      const portalPosition: PortalPosition =
        overflowLeft < 0 || minHeightOverflowLeft < 0 || overflowLeft < overflowRight
          ? 'left'
          : 'right';

      const { top, left, width } = computePortalHorizontalMeasure(
        content,
        targetWithOffset,
        portalPosition,
        alignement,
      );

      return {
        target,
        alignement,
        top,
        left,
        width,
        position: portalPosition,
        height: content.height,
      };
    }

    case 'right': {
      const overflowRight = content.width - targetWithOffset.right;
      const minHeightOverflowRight = minWidth - targetWithOffset.right;
      const overflowLeft = content.width - targetWithOffset.left;
      const portalPosition: PortalPosition =
        overflowRight < 0 || minHeightOverflowRight < 0 || overflowRight < overflowLeft
          ? 'right'
          : 'left';

      const { top, left, width } = computePortalHorizontalMeasure(
        content,
        targetWithOffset,
        portalPosition,
        alignement,
      );

      return {
        target,
        alignement,
        top,
        left,
        width,
        position: portalPosition,
        height: content.height,
      };
    }
  }

  return {
    target,
    alignement,
    position,
    top: target.top,
    left: target.left,
    width: content.width,
    height: content.height,
  };
}

export { computeTargetMeasure, computePortalMesure };
