/**
 * 3532. Path Existence Queries in a Graph I
 *
 * Nodes i and j of the sorted array `nums` are joined when their values
 * differ by at most `maxDiff`. Returns, for each query, whether its two
 * nodes are connected.
 *
 * In sorted order, components are runs broken wherever neighbours are too
 * far apart, so label each node with its run.
 *
 * @see https://leetcode.com/problems/path-existence-queries-in-a-graph-i/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * pathExistenceQueriesInAGraphI(2, [1, 3], 1, [[0, 0], [0, 1]]); // [true, false]
 */
export const pathExistenceQueriesInAGraphI = (
	n: number,
	nums: readonly number[],
	maxDiff: number,
	queries: readonly (readonly number[])[],
): boolean[] => {
	const component = new Int32Array(n);
	for (let i = 1; i < n; i++)
		component[i] =
			(component[i - 1] ?? 0) +
			((nums[i] ?? 0) - (nums[i - 1] ?? 0) > maxDiff ? 1 : 0);
	return queries.map(([u = 0, v = 0]) => component[u] === component[v]);
};
