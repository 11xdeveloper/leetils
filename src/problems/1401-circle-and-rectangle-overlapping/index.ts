/**
 * 1401. Circle and Rectangle Overlapping
 *
 * Returns whether the circle of `radius` around `(xCenter, yCenter)` shares
 * a point with the rectangle from `(x1, y1)` to `(x2, y2)` (both closed).
 *
 * The rectangle's closest point to the centre is the centre clamped into
 * it; they overlap when that point is within the radius.
 *
 * @see https://leetcode.com/problems/circle-and-rectangle-overlapping/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * circleAndRectangleOverlapping(1, 0, 0, 1, -1, 3, 1); // true
 */
export const circleAndRectangleOverlapping = (
	radius: number,
	xCenter: number,
	yCenter: number,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
): boolean => {
	const dx = Math.min(Math.max(xCenter, x1), x2) - xCenter;
	const dy = Math.min(Math.max(yCenter, y1), y2) - yCenter;
	return dx * dx + dy * dy <= radius * radius;
};
