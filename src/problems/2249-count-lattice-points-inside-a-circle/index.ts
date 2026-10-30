/**
 * 2249. Count Lattice Points Inside a Circle
 *
 * Counts the integer points inside or on at least one of the circles
 * `[x, y, r]`.
 *
 * Check every point in the circles' bounding box (coordinates are small).
 *
 * @see https://leetcode.com/problems/count-lattice-points-inside-a-circle/
 * @difficulty Medium
 * @timeComplexity O(W · H · c)
 * @spaceComplexity O(1)
 *
 * @example
 * countLatticePointsInsideACircle([[2, 2, 1]]); // 5
 */
export const countLatticePointsInsideACircle = (
	circles: readonly (readonly number[])[],
): number => {
	const xs = circles.flatMap(([x = 0, , r = 0]) => [x - r, x + r]);
	const ys = circles.flatMap(([, y = 0, r = 0]) => [y - r, y + r]);
	let count = 0;
	for (let px = Math.min(...xs); px <= Math.max(...xs); px++) {
		for (let py = Math.min(...ys); py <= Math.max(...ys); py++) {
			if (
				circles.some(
					([x = 0, y = 0, r = 0]) => (px - x) ** 2 + (py - y) ** 2 <= r * r,
				)
			)
				count++;
		}
	}
	return count;
};
