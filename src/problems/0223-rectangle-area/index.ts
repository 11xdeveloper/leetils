/**
 * 223. Rectangle Area
 *
 * Returns the total area covered by two axis-aligned rectangles, each given
 * by its bottom-left corner `(x1, y1)` and top-right corner `(x2, y2)`.
 *
 * Adds both areas and subtracts the overlap, whose width and height are how
 * far the rectangles' ranges overlap on each axis, or 0 if they don't.
 *
 * @see https://leetcode.com/problems/rectangle-area/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * rectangleArea(-3, 0, 3, 4, 0, -1, 9, 2); // 45
 */
export const rectangleArea = (
	ax1: number,
	ay1: number,
	ax2: number,
	ay2: number,
	bx1: number,
	by1: number,
	bx2: number,
	by2: number,
): number => {
	const overlapWidth = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));
	const overlapHeight = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));

	return (
		(ax2 - ax1) * (ay2 - ay1) +
		(bx2 - bx1) * (by2 - by1) -
		overlapWidth * overlapHeight
	);
};
