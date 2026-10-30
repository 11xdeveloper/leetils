/**
 * 2497. Maximum Star Sum of a Graph
 *
 * A star is a centre node and up to `k` of its neighbours. Returns the
 * largest sum of a star's node values.
 *
 * For each centre, add its `k` largest positive neighbour values.
 *
 * @see https://leetcode.com/problems/maximum-star-sum-of-a-graph/
 * @difficulty Medium
 * @timeComplexity O(n + e log e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * maximumStarSumOfAGraph([1, 2, 3, 4, 10, -10, -20], [[0, 1], [1, 2], [1, 3], [3, 4], [3, 5], [3, 6]], 2); // 16
 */
export const maximumStarSumOfAGraph = (
	vals: readonly number[],
	edges: readonly (readonly number[])[],
	k: number,
): number => {
	const gains: number[][] = vals.map(() => []);
	for (const [a = 0, b = 0] of edges) {
		if ((vals[b] ?? 0) > 0) gains[a]?.push(vals[b] ?? 0);
		if ((vals[a] ?? 0) > 0) gains[b]?.push(vals[a] ?? 0);
	}
	return Math.max(
		...vals.map(
			(value, node) =>
				value +
				(gains[node] ?? [])
					.sort((a, b) => b - a)
					.slice(0, k)
					.reduce((sum, v) => sum + v, 0),
		),
	);
};
