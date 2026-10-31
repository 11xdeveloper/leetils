/**
 * 3600. Maximize Spanning Tree Stability with Upgrades
 *
 * Edges are `[u, v, strength, must]`; a spanning tree must use every
 * `must` edge, and up to `k` other edges can have their strength doubled.
 * Returns the largest possible minimum strength in the tree, or -1 if
 * there's no spanning tree.
 *
 * Binary search the answer x. To test it, join the must edges (all need
 * strength x), then free optional edges with strength at least x, then
 * optional edges that reach x when doubled, counting upgrades. Any order
 * of joining needs the same number of edges, so using free edges first
 * minimises upgrades.
 *
 * @see https://leetcode.com/problems/maximize-spanning-tree-stability-with-upgrades/
 * @difficulty Hard
 * @timeComplexity O(m α(n) log S)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeSpanningTreeStabilityWithUpgrades(3, [[0, 1, 2, 1], [1, 2, 3, 0]], 1); // 2
 */
export const maximizeSpanningTreeStabilityWithUpgrades = (
	n: number,
	edges: readonly (readonly number[])[],
	k: number,
): number => {
	const parent = new Int32Array(n);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			parent[x] = parent[parent[x] ?? x] ?? x;
			x = parent[x] ?? x;
		}
		return x;
	};
	/** Builds what it can; returns the components left, or -1 if a must edge forms a cycle. */
	const build = (x: number): number => {
		for (let v = 0; v < n; v++) parent[v] = v;
		let components = n;
		const join = (u: number, v: number): boolean => {
			const [a, b] = [find(u), find(v)];
			if (a === b) return false;
			parent[a] = b;
			components--;
			return true;
		};
		for (const [u = 0, v = 0, s = 0, must = 0] of edges)
			if (must && (s < x || !join(u, v))) return -1;
		for (const [u = 0, v = 0, s = 0, must = 0] of edges)
			if (!must && s >= x) join(u, v);
		let upgrades = 0;
		for (const [u = 0, v = 0, s = 0, must = 0] of edges)
			if (!must && s < x && 2 * s >= x && upgrades < k && join(u, v))
				upgrades++;
		return components;
	};
	if (build(0) !== 1) return -1;
	let [lo, hi] = [0, 2 * Math.max(...edges.map((e) => e[2] ?? 0))];
	while (lo < hi) {
		const mid = lo + Math.ceil((hi - lo) / 2);
		if (build(mid) === 1) lo = mid;
		else hi = mid - 1;
	}
	return lo;
};
