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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
        height: 50,
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
});
