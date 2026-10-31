/**
 * 3553. Minimum Weighted Subgraph With the Required Paths II
 *
 * In a weighted tree, for each query `[src1, src2, dest]`, the least total
 * weight of a connected set of edges containing paths from both sources
 * to `dest`.
 *
 * That's the subtree spanning the three nodes, whose weight is half the
 * sum of their three pairwise distances. Distances come from root depths
 * and lowest common ancestors by binary lifting.
 *
 * @see https://leetcode.com/problems/minimum-weighted-subgraph-with-the-required-paths-ii/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n log n)
 *
 * @example
 * minimumWeightedSubgraphWithTheRequiredPathsII([[0, 1, 2], [1, 2, 3], [1, 3, 5], [1, 4, 4], [2, 5, 6]], [[2, 3, 4], [0, 2, 5]]); // [12, 11]
 */
export const minimumWeightedSubgraphWithTheRequiredPathsII = (
	edges: readonly (readonly number[])[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = edges.length + 1;
	const adjacent: [number, number][][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0, w = 0] of edges) {
		adjacent[u]?.push([v, w]);
		adjacent[v]?.push([u, w]);
	}
	const levels = Math.max(1, Math.ceil(Math.log2(n)) + 1);
	const up = Array.from({ length: levels }, () => new Int32Array(n));
	const depth = new Int32Array(n);
	const distance = new Float64Array(n);
	const seen = new Uint8Array(n);
	seen[0] = 1;
	const order = [0];
	for (let i = 0; i < order.length; i++) {
		const node = order[i] ?? 0;
		for (const [next, w] of adjacent[node] ?? [])
			if (!seen[next]) {
				seen[next] = 1;
				const first = up[0];
				if (first) first[next] = node;
				depth[next] = (depth[node] ?? 0) + 1;
				distance[next] = (distance[node] ?? 0) + w;
				order.push(next);
			}
	}
	for (let level = 1; level < levels; level++) {
		const previous = up[level - 1] ?? new Int32Array(n);
		const current = up[level];
		if (current)
			for (let v = 0; v < n; v++) current[v] = previous[previous[v] ?? 0] ?? 0;
	}
	const lca = (a: number, b: number): number => {
		let [x, y] = (depth[a] ?? 0) >= (depth[b] ?? 0) ? [a, b] : [b, a];
		for (let level = levels - 1; level >= 0; level--)
			if ((depth[x] ?? 0) - (1 << level) >= (depth[y] ?? 0))
				x = up[level]?.[x] ?? x;
		if (x === y) return x;
		for (let level = levels - 1; level >= 0; level--) {
			const [px, py] = [up[level]?.[x] ?? x, up[level]?.[y] ?? y];
			if (px !== py) [x, y] = [px, py];
		}
		return up[0]?.[x] ?? x;
	};
	const between = (a: number, b: number): number =>
		(distance[a] ?? 0) + (distance[b] ?? 0) - 2 * (distance[lca(a, b)] ?? 0);
	return queries.map(
		([a = 0, b = 0, c = 0]) =>
			(between(a, b) + between(b, c) + between(a, c)) / 2,
	);
};
