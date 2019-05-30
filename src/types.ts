export type PortalPosition = 'top' | 'right' | 'bottom' | 'left';

export type PortalAlignement = 'start' | 'middle' | 'end';

export interface MeasureTargetParams {
  bodyWidth: number;
  bodyHeight: number;
  scrollY: number;
  scrollX: number;
  targetTop: number;
  targetLeft: number;
  targetWidth: number;
  targetHeight: number;
}

export interface MeasurePortalOptions {
  minWidth?: number;
  minHeight?: number;
  position?: PortalPosition;
  alignement?: PortalAlignement;
  offsetX?: number;
  offsetY?: number;
}

export interface TargetMeasure {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface PortalMeasure {
  top: number;
  left: number;
  width: number;
  height: number;
  position: PortalPosition;
  alignement: PortalAlignement;
  target: TargetMeasure;
}

export interface ContentMeasure {
  width: number;
  height: number;
}
