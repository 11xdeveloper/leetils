/**
 * 836. Rectangle Overlap
 *
 * Returns whether two axis-aligned rectangles `[x1, y1, x2, y2]` overlap
 * with positive area (touching edges or corners don't count).
 *
 * They overlap exactly when their x-ranges and their y-ranges both overlap
 * with positive length.
 *
 * @see https://leetcode.com/problems/rectangle-overlap/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * rectangleOverlap([0, 0, 2, 2], [1, 1, 3, 3]); // true
 */
export const rectangleOverlap = (
	rec1: readonly number[],
	rec2: readonly number[],
): boolean => {
	const [ax1 = 0, ay1 = 0, ax2 = 0, ay2 = 0] = rec1;
	const [bx1 = 0, by1 = 0, bx2 = 0, by2 = 0] = rec2;
	return (
		Math.min(ax2, bx2) > Math.max(ax1, bx1) &&
		Math.min(ay2, by2) > Math.max(ay1, by1)
	);
};
