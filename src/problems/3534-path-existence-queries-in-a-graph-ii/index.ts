/**
 * 3534. Path Existence Queries in a Graph II
 *
 * Nodes i and j are joined when `nums[i]` and `nums[j]` differ by at most
 * `maxDiff`. Returns, for each query, the length of the shortest path
 * between its nodes, or -1.
 *
 * Sort the nodes by value. From any node, one step reaches at best the
 * farthest node in sorted order within `maxDiff`, so the shortest path
 * hops greedily forwards. Binary lifting over those farthest jumps counts
 * the hops in logarithmic time.
 *
 * @see https://leetcode.com/problems/path-existence-queries-in-a-graph-ii/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n log n)
 *
 * @example
 * pathExistenceQueriesInAGraphII(5, [1, 8, 3, 4, 2], 3, [[0, 3], [2, 4]]); // [1, 1]
 */
export const pathExistenceQueriesInAGraphII = (
	n: number,
	nums: readonly number[],
	maxDiff: number,
	queries: readonly (readonly number[])[],
): number[] => {
	const order = Array.from({ length: n }, (_, i) => i).sort(
		(a, b) => (nums[a] ?? 0) - (nums[b] ?? 0),
	);
	const position = new Int32Array(n);
	order.forEach((node, p) => {
		position[node] = p;
	});
	const sorted = order.map((node) => nums[node] ?? 0);
	const levels = Math.max(1, Math.ceil(Math.log2(n + 1)));
	const jump: Int32Array[] = [new Int32Array(n)];
	for (let p = 0, reach = 0; p < n; p++) {
		reach = Math.max(reach, p);
		while (
			reach + 1 < n &&
			(sorted[reach + 1] ?? 0) - (sorted[p] ?? 0) <= maxDiff
		)
			reach++;
		const first = jump[0];
		if (first) first[p] = reach;
	}
	for (let level = 1; level <= levels; level++) {
		const previous = jump[level - 1] ?? new Int32Array(n);
		jump.push(Int32Array.from(previous, (to) => previous[to] ?? to));
	}
	return queries.map(([u = 0, v = 0]) => {
		if (u === v) return 0;
		let from = Math.min(position[u] ?? 0, position[v] ?? 0);
		const to = Math.max(position[u] ?? 0, position[v] ?? 0);
		if ((jump[levels]?.[from] ?? 0) < to) return -1;
		let steps = 0;
		for (let level = levels; level >= 0; level--) {
			const next = jump[level]?.[from] ?? from;
			if (next < to) {
				from = next;
				steps += 2 ** level;
			}
		}
		return steps + 1;
	});
};
