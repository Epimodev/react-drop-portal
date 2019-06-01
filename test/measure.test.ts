import * as measure from '../src/measure';
import { ContentMeasure, TargetMeasure, MeasurePortalOptions } from '../src/types';

describe('computePortalMesure', () => {
  describe('position: bottom', () => {
    test('should be below target if there is enough space', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'bottom',
      };

      const expectedPosition = 'bottom';
      const expectedTop = target.top + target.height;
      const expectedHeight = content.height;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });

    test("should be above target if there isn't enough space", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 400,
        left: 100,
        right: 400,
        bottom: 100,
      };
      const options: MeasurePortalOptions = {
        position: 'bottom',
      };

      const expectedPosition = 'top';
      const expectedTop = target.top - content.height;
      const expectedHeight = content.height;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });

    test("should be below target if there isn't enough space but more than min height", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 400,
        left: 100,
        right: 400,
        bottom: 150,
      };
      const options: MeasurePortalOptions = {
        position: 'bottom',
        minHeight: 100,
      };

      const expectedPosition = 'bottom';
      const expectedTop = target.top + target.height;
      const expectedHeight = target.bottom;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });

    test("should be above target if there isn't enough space and less than min height", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 450,
        left: 100,
        right: 400,
        bottom: 50,
      };
      const options: MeasurePortalOptions = {
        position: 'bottom',
        minHeight: 100,
      };

      const expectedPosition = 'top';
      const expectedTop = target.top - content.height;
      const expectedHeight = content.height;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });

    test("should be below target if there isn't enough space but more than above", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 600,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'bottom',
      };

      const expectedPosition = 'bottom';
      const expectedTop = target.top + target.height;
      const expectedHeight = target.bottom;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });

    test('should move down portal with offsetY', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'bottom',
        offsetY: 50,
      };

      const expectedPosition = 'bottom';
      const expectedTop = target.top + target.height + options.offsetY!;
      const expectedHeight = content.height;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });

    test("should move up portal with offsetX if there isn\'t enough space", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 400,
        left: 100,
        right: 400,
        bottom: 100,
      };
      const options: MeasurePortalOptions = {
        position: 'bottom',
        offsetY: 50,
      };

      const expectedPosition = 'top';
      const expectedTop = target.top - content.height - options.offsetY!;
      const expectedHeight = content.height;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });
  });

  describe('position: top', () => {
    test('should be above target if there is enough space', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 400,
        left: 100,
        right: 400,
        bottom: 100,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
      };

      const expectedPosition = 'top';
      const expectedTop = target.top - content.height;
      const expectedHeight = content.height;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });

    test("should be below target if there isn't enough space", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
      };

      const expectedPosition = 'bottom';
      const expectedTop = target.top + target.height;
      const expectedHeight = content.height;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });

    test("should be above target if there isn't enough space but more than min height", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 150,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
        minHeight: 100,
      };

      const expectedPosition = 'top';
      const expectedTop = 0;
      const expectedHeight = target.top;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });

    test("should be below target if there isn't enough space and less than min height", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 50,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
        minHeight: 100,
      };

      const expectedPosition = 'bottom';
      const expectedTop = target.top + target.height;
      const expectedHeight = content.height;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });

    test("should be above target if there isn't enough space but more than below", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 600,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 400,
        left: 100,
        right: 400,
        bottom: 100,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
      };

      const expectedPosition = 'top';
      const expectedTop = 0;
      const expectedHeight = target.top;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });

    test('should move up portal with offsetY', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 400,
        left: 100,
        right: 400,
        bottom: 100,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
        offsetY: 50,
      };

      const expectedPosition = 'top';
      const expectedTop = target.top - content.height - options.offsetY!;
      const expectedHeight = content.height;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });

    test("should move down portal with offsetX if there isn\'t enough space", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
        offsetY: 50,
      };

      const expectedPosition = 'bottom';
      const expectedTop = target.top + target.height + options.offsetY!;
      const expectedHeight = content.height;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
      expect(result.height).toBe(expectedHeight);
    });
  });

  describe('position: left', () => {
    test('should be at left of target if there is enough space', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 400,
        right: 100,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'left',
      };

      const expectedPosition = 'left';
      const expectedLeft = target.left - content.width;
      const expectedWidth = content.width;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });

    test("should be at right of target if there isn't enough space", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'left',
      };

      const expectedPosition = 'right';
      const expectedLeft = target.left + target.width;
      const expectedWidth = content.width;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });

    test("should be at left of target if there isn't enough space but more than min width", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 150,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'left',
        minWidth: 100,
      };

      const expectedPosition = 'left';
      const expectedLeft = 0;
      const expectedWidth = target.left;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });

    test("should be at right of target if there isn't enough space and less than min width", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 50,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'left',
        minWidth: 100,
      };

      const expectedPosition = 'right';
      const expectedLeft = target.left + target.width;
      const expectedWidth = content.width;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });

    test("should be at left of target if there isn't enough space but more than at right", () => {
      const content: ContentMeasure = {
        width: 600,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 400,
        right: 100,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'left',
      };

      const expectedPosition = 'left';
      const expectedLeft = 0;
      const expectedWidth = target.left;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });

    test('should move left portal with offsetX', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 400,
        right: 100,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'left',
        offsetX: 50,
      };

      const expectedPosition = 'left';
      const expectedLeft = target.left - content.width - options.offsetX!;
      const expectedWidth = content.width;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });

    test("should move right portal with offsetX if there isn\'t enough space", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'left',
        offsetX: 50,
      };

      const expectedPosition = 'right';
      const expectedLeft = target.left + target.width + options.offsetX!;
      const expectedWidth = content.width;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });
  });

  describe('position: right', () => {
    test('should be at right of target if there is enough space', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
      };

      const expectedPosition = 'right';
      const expectedLeft = target.left + target.width;
      const expectedWidth = content.width;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });

    test("should be at left of target if there isn't enough space", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 400,
        right: 100,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
      };

      const expectedPosition = 'left';
      const expectedLeft = target.left - content.width;
      const expectedWidth = content.width;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });

    test("should be at right of target if there isn't enough space but more than min width", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 400,
        right: 150,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
        minWidth: 100,
      };

      const expectedPosition = 'right';
      const expectedLeft = target.left + target.width;
      const expectedWidth = target.right;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });

    test("should be at left of target if there isn't enough space and less than min width", () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 400,
        right: 50,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
        minWidth: 100,
      };

      const expectedPosition = 'left';
      const expectedLeft = target.left - content.width;
      const expectedWidth = content.width;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });

    test("should be at right of target if there isn't enough space but more than at left", () => {
      const content: ContentMeasure = {
        width: 600,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
      };

      const expectedPosition = 'right';
      const expectedLeft = target.left + target.width;
      const expectedWidth = target.right;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });

    test('should move right portal with offsetX', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
        offsetX: 50,
      };

      const expectedPosition = 'right';
      const expectedLeft = target.left + target.width + options.offsetX!;
      const expectedWidth = content.width;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });

    test('should move left portal with offsetX if there isn\'t enough space', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 400,
        right: 100,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
        offsetX: 50,
      };

      const expectedPosition = 'left';
      const expectedLeft = target.left - content.width - options.offsetX!;
      const expectedWidth = content.width;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
      expect(result.width).toBe(expectedWidth);
    });
  });

  describe('alignement: horizontal start', () => {
    test('portal should be left aligned with target', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
        alignment: 'start',
      };

      const expectedLeft = 100;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.left).toBe(expectedLeft);
    });

    test('portal should be move to left to avoid right overflow', () => {
      const content: ContentMeasure = {
        width: 600,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 200,
        right: 100,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
        alignment: 'start',
      };

      const expectedLeft = 100;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.left).toBe(expectedLeft);
    });
  });

  describe('alignement: horizontal middle', () => {
    test('portal should be center with target', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 400,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
        alignment: 'middle',
      };

      const expectedLeft = 500;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.left).toBe(expectedLeft);
    });

    test('portal should be move to left to avoid right overflow', () => {
      const content: ContentMeasure = {
        width: 800,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 400,
        right: 100,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
        alignment: 'middle',
      };

      const expectedLeft = 100;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.left).toBe(expectedLeft);
    });

    test('portal should be move to right to avoid left overflow', () => {
      const content: ContentMeasure = {
        width: 800,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
        alignment: 'middle',
      };

      const expectedLeft = 0;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.left).toBe(expectedLeft);
    });
  });

  describe('alignement: horizontal end', () => {
    test('portal should be right aligned with target', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 400,
        right: 100,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
        alignment: 'end',
      };

      const expectedLeft = target.left + target.width - content.width;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.left).toBe(expectedLeft);
    });

    test('portal should be move to right to avoid left overflow', () => {
      const content: ContentMeasure = {
        width: 600,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 200,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'top',
        alignment: 'end',
      };

      const expectedLeft = 0;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.left).toBe(expectedLeft);
    });
  });

  describe('alignement: vertical start', () => {
    test('portal should be top aligned with target', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
        alignment: 'start',
      };

      const expectedTop = 100;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.top).toBe(expectedTop);
    });

    test('portal should be move to top to avoid bottom overflow', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 100,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
        alignment: 'start',
      };

      const expectedTop = 60;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.top).toBe(expectedTop);
    });
  });

  describe('alignement: vertical middle', () => {
    test('portal should be center with target', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 100,
        top: 400,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
        alignment: 'middle',
      };

      const expectedTop = 350;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.top).toBe(expectedTop);
    });

    test('portal should be move to top to avoid bottom overflow', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 400,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 100,
        top: 400,
        left: 100,
        right: 400,
        bottom: 100,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
        alignment: 'middle',
      };

      const expectedTop = 200;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.top).toBe(expectedTop);
    });

    test('portal should be move to bottom to avoid top overflow', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 400,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 100,
        top: 100,
        left: 100,
        right: 400,
        bottom: 400,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
        alignment: 'middle',
      };

      const expectedTop = 0;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.top).toBe(expectedTop);
    });
  });

  describe('alignement: vertical end', () => {
    test('portal should be bottom aligned with target', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 400,
        left: 100,
        right: 400,
        bottom: 100,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
        alignment: 'end',
      };

      const expectedTop = target.top + target.height - content.height;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.top).toBe(expectedTop);
    });

    test('portal should be move to bottom to avoid top overflow', () => {
      const content: ContentMeasure = {
        width: 200,
        height: 200,
      };
      const target: TargetMeasure = {
        width: 400,
        height: 60,
        top: 100,
        left: 100,
        right: 400,
        bottom: 100,
      };
      const options: MeasurePortalOptions = {
        position: 'right',
        alignment: 'end',
      };

      const expectedTop = 0;

      const result = measure.computePortalMeasure(content, target, options);

      expect(result.top).toBe(expectedTop);
    });
  });
});
