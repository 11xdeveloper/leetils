/**
 * 973. K Closest Points to Origin
 *
 * Returns the `k` points closest to the origin (by Euclidean distance), in
 * any order; here nearest first.
 *
 * Sorts the points by squared distance and takes the first `k`.
 *
 * @see https://leetcode.com/problems/k-closest-points-to-origin/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * kClosestPointsToOrigin([[1, 3], [-2, 2]], 1); // [[-2, 2]]
 */
export const kClosestPointsToOrigin = (
	points: readonly (readonly number[])[],
	k: number,
): number[][] => {
	const distance = ([x = 0, y = 0]: readonly number[]): number => x * x + y * y;
	return points
		.toSorted((a, b) => distance(a) - distance(b))
		.slice(0, k)
		.map((point) => [...point]);
};
