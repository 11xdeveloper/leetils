/**
 * 1828. Queries on Number of Points Inside a Circle
 *
 * For each circle `[x, y, r]`, counts the `points` inside or on it.
 *
 * Compares squared distances for every point and circle.
 *
 * @see https://leetcode.com/problems/queries-on-number-of-points-inside-a-circle/
 * @difficulty Medium
 * @timeComplexity O(p · q)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * queriesOnNumberOfPointsInsideACircle([[1, 3], [3, 3], [5, 3], [2, 2]], [[2, 3, 1], [4, 3, 1], [1, 1, 2]]); // [3, 2, 2]
 */
export const queriesOnNumberOfPointsInsideACircle = (
	points: readonly (readonly number[])[],
	queries: readonly (readonly number[])[],
): number[] =>
	queries.map(
		([x = 0, y = 0, r = 0]) =>
			points.filter(
				([px = 0, py = 0]) => (px - x) ** 2 + (py - y) ** 2 <= r * r,
			).length,
	);
