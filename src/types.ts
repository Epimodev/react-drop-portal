export type PortalPosition = 'top' | 'right' | 'bottom' | 'left';

export type PortalAlignment = 'start' | 'middle' | 'end';

export interface MeasurePortalOptions {
  minWidth?: number;
  minHeight?: number;
  position?: PortalPosition;
  alignment?: PortalAlignment;
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
  alignement: PortalAlignment;
  target: TargetMeasure;
}

export interface ContentMeasure {
  width: number;
  height: number;
}
