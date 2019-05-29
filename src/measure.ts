import {
  MeasureTargetParams,
  MeasurePortalOptions,
  TargetMeasure,
  PortalMeasure,
  ContentMeasure,
} from './types';

function measureAxeSpace({
  bodyWidth,
  bodyHeight,
  scrollY,
  scrollX,
  targetTop,
  targetLeft,
  targetWidth,
  targetHeight,
}: MeasureTargetParams): TargetMeasure {
  const top = scrollY + targetTop;
  const left = scrollX + targetLeft;
  const right = bodyWidth - targetWidth - left;
  const bottom = bodyHeight - targetHeight - top;

  return {
    top,
    left,
    right,
    bottom,
    width: targetWidth,
    height: targetHeight,
  };
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
  } = options;

  return {
    alignement,
    position,
    top: target.top,
    left: target.left,
  };
}

export { measureAxeSpace, computePortalMesure };
