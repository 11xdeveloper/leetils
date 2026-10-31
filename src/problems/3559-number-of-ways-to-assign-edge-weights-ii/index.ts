const MOD = 1_000_000_007;

/**
 * 3559. Number of Ways to Assign Edge Weights II
 *
 * For each query `[u, v]` in a tree, the number of ways to give the edges
 * on the path between them weights of 1 or 2 so the path's cost is odd,
 * modulo 10⁹ + 7.
 *
 * A path of d edges has 2^(d - 1) odd assignments (none if d = 0). Path
 * lengths come from depths and lowest common ancestors by binary lifting.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-assign-edge-weights-ii/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n log n)
 *
 * @example
 * numberOfWaysToAssignEdgeWeightsII([[1, 2], [1, 3], [3, 4], [3, 5]], [[1, 4], [3, 4], [2, 5]]); // [2, 1, 4]
 */
export const numberOfWaysToAssignEdgeWeightsII = (
	edges: readonly (readonly number[])[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = edges.length + 1;
	const adjacent: number[][] = Array.from({ length: n + 1 }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const levels = Math.max(1, Math.ceil(Math.log2(n)) + 1);
	const up = Array.from({ length: levels }, () => new Int32Array(n + 1));
	const depth = new Int32Array(n + 1).fill(-1);
	depth[1] = 0;
	const queue = [1];
	for (let i = 0; i < queue.length; i++) {
		const node = queue[i] ?? 1;
		for (const next of adjacent[node] ?? [])
			if (depth[next] === -1) {
				depth[next] = (depth[node] ?? 0) + 1;
				const first = up[0];
				if (first) first[next] = node;
				queue.push(next);
			}
	}
	for (let level = 1; level < levels; level++) {
		const previous = up[level - 1] ?? new Int32Array(n + 1);
		const current = up[level];
		if (current)
			for (let v = 0; v <= n; v++) current[v] = previous[previous[v] ?? 0] ?? 0;
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
	const powers = [1];
	for (let i = 1; i <= n; i++) powers.push(((powers[i - 1] ?? 1) * 2) % MOD);
	return queries.map(([u = 0, v = 0]) => {
		const d = (depth[u] ?? 0) + (depth[v] ?? 0) - 2 * (depth[lca(u, v)] ?? 0);
		return d === 0 ? 0 : (powers[d - 1] ?? 0);
	});
};
