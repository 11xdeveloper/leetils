/**
 * 1037. Valid Boomerang
 *
 * Returns whether the three points are distinct and not on one line.
 *
 * Both hold exactly when the cross product of the two edges from the first
 * point is non-zero.
 *
 * @see https://leetcode.com/problems/valid-boomerang/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * validBoomerang([[1, 1], [2, 3], [3, 2]]); // true
 */
export const validBoomerang = (
	points: readonly (readonly number[])[],
): boolean => {
	const [[x1 = 0, y1 = 0] = [], [x2 = 0, y2 = 0] = [], [x3 = 0, y3 = 0] = []] =
		points;
	return (x2 - x1) * (y3 - y1) !== (y2 - y1) * (x3 - x1);
};
