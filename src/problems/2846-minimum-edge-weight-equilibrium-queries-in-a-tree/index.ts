/**
 * 2846. Minimum Edge Weight Equilibrium Queries in a Tree
 *
 * Edge weights in the tree are from 1 to 26. For each query `[a, b]`,
 * returns how many edges on the path between them must change so all its
 * weights are equal.
 *
 * Keep the most common weight and change the rest. Root the tree, store
 * per-node counts of each weight on the path from the root, and combine
 * through the lowest common ancestor, found by binary lifting.
 *
 * @see https://leetcode.com/problems/minimum-edge-weight-equilibrium-queries-in-a-tree/
 * @difficulty Hard
 * @timeComplexity O(26 · n + q (log n + 26))
 * @spaceComplexity O(26 · n + n log n)
 *
 * @example
 * minimumEdgeWeightEquilibriumQueriesInATree(7, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 4, 2], [4, 5, 2], [5, 6, 2]], [[0, 3], [3, 6], [2, 6], [0, 6]]); // [0, 0, 1, 3]
 */
export const minimumEdgeWeightEquilibriumQueriesInATree = (
	n: number,
	edges: readonly (readonly number[])[],
	queries: readonly (readonly number[])[],
): number[] => {
	const neighbours: [number, number][][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0, w = 1] of edges) {
		neighbours[a]?.push([b, w]);
		neighbours[b]?.push([a, w]);
	}
	const levels = Math.max(1, Math.ceil(Math.log2(n + 1)));
	const up = Array.from({ length: levels }, () => new Int32Array(n));
	const depth = new Int32Array(n);
	const counts = new Int32Array(n * 27);
	const seen = new Uint8Array(n);
	seen[0] = 1;
	const stack = [0];
	for (let node = stack.pop(); node !== undefined; node = stack.pop())
		for (const [next, w] of neighbours[node] ?? []) {
			if (seen[next]) continue;
			seen[next] = 1;
			(up[0] ?? new Int32Array(n))[next] = node;
			depth[next] = (depth[node] ?? 0) + 1;
			for (let c = 1; c <= 26; c++)
				counts[next * 27 + c] = counts[node * 27 + c] ?? 0;
			counts[next * 27 + w] = (counts[next * 27 + w] ?? 0) + 1;
			stack.push(next);
		}
	for (let level = 1; level < levels; level++) {
		const below = up[level - 1] ?? new Int32Array(n);
		const here = up[level] ?? new Int32Array(n);
		for (let node = 0; node < n; node++)
			here[node] = below[below[node] ?? 0] ?? 0;
	}
	const ancestor = (a: number, b: number): number => {
		if ((depth[a] ?? 0) < (depth[b] ?? 0)) [a, b] = [b, a];
		for (let level = levels - 1; level >= 0; level--)
			if ((depth[a] ?? 0) - (1 << level) >= (depth[b] ?? 0))
				a = up[level]?.[a] ?? a;
		if (a === b) return a;
		for (let level = levels - 1; level >= 0; level--) {
			const pa = up[level]?.[a] ?? a;
			const pb = up[level]?.[b] ?? b;
			if (pa !== pb) {
				a = pa;
				b = pb;
			}
		}
		return up[0]?.[a] ?? a;
	};

	return queries.map(([a = 0, b = 0]) => {
		const top = ancestor(a, b);
		let most = 0;
		for (let c = 1; c <= 26; c++)
			most = Math.max(
				most,
				(counts[a * 27 + c] ?? 0) +
					(counts[b * 27 + c] ?? 0) -
					2 * (counts[top * 27 + c] ?? 0),
			);
		return (depth[a] ?? 0) + (depth[b] ?? 0) - 2 * (depth[top] ?? 0) - most;
	});
};
