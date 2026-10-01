/**
 * 1779. Find Nearest Point That Has the Same X or Y Coordinate
 *
 * Among `points` sharing an x or y coordinate with `(x, y)`, returns the
 * index of the one with the smallest Manhattan distance (the smallest
 * index on ties), or -1.
 *
 * One pass keeping the best index.
 *
 * @see https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findNearestPointThatHasTheSameXOrYCoordinate(3, 4, [[1, 2], [3, 1], [2, 4], [2, 3], [4, 4]]); // 2
 */
export const findNearestPointThatHasTheSameXOrYCoordinate = (
	x: number,
	y: number,
	points: readonly (readonly number[])[],
): number => {
	let [best, nearest] = [-1, Infinity];
	for (const [i, [px = 0, py = 0]] of points.entries()) {
		if (px !== x && py !== y) continue;
		const distance = Math.abs(px - x) + Math.abs(py - y);
		if (distance < nearest) [best, nearest] = [i, distance];
	}
	return best;
};
