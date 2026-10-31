import { Heap } from "../../internal/heap";

/**
 * 3275. K-th Nearest Obstacle Queries
 *
 * Each query places an obstacle at `(x, y)`. Returns, after each, the k-th
 * smallest Manhattan distance from the origin to an obstacle, or -1 if
 * there are fewer than `k`.
 *
 * Keep the `k` nearest in a max-heap.
 *
 * @see https://leetcode.com/problems/k-th-nearest-obstacle-queries/
 * @difficulty Medium
 * @timeComplexity O(q log k)
 * @spaceComplexity O(k)
 *
 * @example
 * kThNearestObstacleQueries([[1, 2], [3, 4], [2, 3], [-3, 0]], 2); // [-1, 7, 5, 3]
 */
export const kThNearestObstacleQueries = (
	queries: readonly (readonly number[])[],
	k: number,
): number[] => {
	const nearest = new Heap<number>((a, b) => b - a);
	return queries.map(([x = 0, y = 0]) => {
		nearest.push(Math.abs(x) + Math.abs(y));
		if (nearest.size > k) nearest.pop();
		return nearest.size === k ? (nearest.peek() ?? -1) : -1;
	});
};
