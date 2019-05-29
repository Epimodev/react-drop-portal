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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.top).toBe(expectedTop);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
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

      const result = measure.computePortalMesure(content, target, options);

      expect(result.position).toBe(expectedPosition);
      expect(result.left).toBe(expectedLeft);
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
        alignement: 'start',
      };

      const expectedLeft = 100;
      const expectedOffsetX = 0;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.left).toBe(expectedLeft);
      expect(result.alignOffsetX).toBe(expectedOffsetX);
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
        alignement: 'start',
      };

      const expectedLeft = 100;
      const expectedOffsetX = -100;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.left).toBe(expectedLeft);
      expect(result.alignOffsetX).toBe(expectedOffsetX);
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
        alignement: 'middle',
      };

      const expectedLeft = 500;
      const expectedOffsetX = 0;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.left).toBe(expectedLeft);
      expect(result.alignOffsetX).toBe(expectedOffsetX);
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
        alignement: 'middle',
      };

      const expectedLeft = 100;
      const expectedOffsetX = -100;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.left).toBe(expectedLeft);
      expect(result.alignOffsetX).toBe(expectedOffsetX);
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
        alignement: 'middle',
      };

      const expectedLeft = 0;
      const expectedOffsetX = 100;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.left).toBe(expectedLeft);
      expect(result.alignOffsetX).toBe(expectedOffsetX);
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
        alignement: 'end',
      };

      const expectedLeft = target.left + target.width - content.width;
      const expectedOffsetX = 0;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.left).toBe(expectedLeft);
      expect(result.alignOffsetX).toBe(expectedOffsetX);
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
        alignement: 'end',
      };

      const expectedLeft = 0;
      const expectedOffsetX = 100;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.left).toBe(expectedLeft);
      expect(result.alignOffsetX).toBe(expectedOffsetX);
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
        alignement: 'start',
      };

      const expectedTop = 100;
      const expectedOffsetY = 0;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.top).toBe(expectedTop);
      expect(result.alignOffsetY).toBe(expectedOffsetY);
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
        alignement: 'start',
      };

      const expectedTop = 60;
      const expectedOffsetY = -40;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.top).toBe(expectedTop);
      expect(result.alignOffsetY).toBe(expectedOffsetY);
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
        alignement: 'middle',
      };

      const expectedTop = 350;
      const expectedOffsetY = 0;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.top).toBe(expectedTop);
      expect(result.alignOffsetY).toBe(expectedOffsetY);
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
        alignement: 'middle',
      };

      const expectedTop = 200;
      const expectedOffsetY = -50;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.top).toBe(expectedTop);
      expect(result.alignOffsetY).toBe(expectedOffsetY);
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
        alignement: 'middle',
      };

      const expectedTop = 0;
      const expectedOffsetY = 50;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.top).toBe(expectedTop);
      expect(result.alignOffsetY).toBe(expectedOffsetY);
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
        alignement: 'end',
      };

      const expectedTop = target.top + target.height - content.height;
      const expectedOffsetY = 0;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.top).toBe(expectedTop);
      expect(result.alignOffsetY).toBe(expectedOffsetY);
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
        alignement: 'end',
      };

      const expectedTop = 0;
      const expectedOffsetY = 40;

      const result = measure.computePortalMesure(content, target, options);

      expect(result.top).toBe(expectedTop);
      expect(result.alignOffsetY).toBe(expectedOffsetY);
    });
  });
});
