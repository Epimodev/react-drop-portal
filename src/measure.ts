import { CSSProperties } from 'react';
import {
  MeasurePortalOptions,
  TargetMeasure,
  PortalMeasure,
  ContentMeasure,
  PortalPosition,
  PortalAlignment,
} from './types';

function getEmptyMeasure(): TargetMeasure {
  return {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  };
}

function computeTargetMeasure(target: HTMLElement): TargetMeasure {
  const pageWidth = document.documentElement.scrollWidth;
  const pageHeight = document.documentElement.scrollHeight;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const targetRect = target.getBoundingClientRect();
  const top = scrollY + targetRect.top;
  const left = scrollX + targetRect.left;
  const right = pageWidth - targetRect.width - left;
  const bottom = pageHeight - targetRect.height - top;

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
  alignement: PortalAlignment,
  offsetX: number,
  offsetY: number,
): { top: number; left: number; height: number } {
  const top =
    position === 'bottom'
      ? target.top + target.height + offsetY
      : Math.max(target.top - content.height - offsetY, 0);
  const height =
    position === 'bottom'
      ? Math.min(target.bottom - offsetY, content.height)
      : Math.min(target.top - offsetY, content.height);
  const left = computeHorizontalAlign(content, target, alignement) + offsetX;

  return { top, height, left };
}

function computePortalHorizontalMeasure(
  content: ContentMeasure,
  target: TargetMeasure,
  position: PortalPosition,
  alignement: PortalAlignment,
  offsetX: number,
  offsetY: number,
): { top: number; left: number; width: number } {
  const left =
    position === 'right'
      ? target.left + target.width + offsetX
      : Math.max(target.left - content.width - offsetX, 0);
  const width =
    position === 'right'
      ? Math.min(target.right - offsetX, content.width)
      : Math.min(target.left - offsetX, content.width);
  const top = computeVerticalAlign(content, target, alignement) + offsetY;

  return { top, width, left };
}

function computeHorizontalAlign(
  content: ContentMeasure,
  target: TargetMeasure,
  alignement: PortalAlignment,
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
  alignement: PortalAlignment,
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

function computePortalMeasure(
  content: ContentMeasure,
  target: TargetMeasure,
  options: MeasurePortalOptions = {},
): PortalMeasure {
  const {
    position = 'bottom',
    alignment: alignement = 'start',
    minWidth = Infinity,
    minHeight = Infinity,
    offsetX = 0,
    offsetY = 0,
  } = options;

  const targetWithOffset: TargetMeasure = {
    width: target.width,
    height: target.height,
    top: target.top - offsetY,
    right: target.right - offsetX,
    bottom: target.bottom - offsetY,
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
        target,
        portalPosition,
        alignement,
        offsetX,
        offsetY,
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
        target,
        portalPosition,
        alignement,
        offsetX,
        offsetY,
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
        target,
        portalPosition,
        alignement,
        offsetX,
        offsetY,
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
        target,
        portalPosition,
        alignement,
        offsetX,
        offsetY,
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
}

function createPortalStyle(portalMesure: PortalMeasure): CSSProperties {
  return {
    position: 'absolute',
    top: `${portalMesure.top}px`,
    left: `${portalMesure.left}px`,
    width: `${portalMesure.width}px`,
    height: `${portalMesure.height}px`,
  };
}

export { getEmptyMeasure, computeTargetMeasure, computePortalMeasure, createPortalStyle };
