/**
 * 3543. Maximum Weighted K-Edge Path
 *
 * The largest weight below `t` of a path with exactly `k` edges in a
 * weighted DAG, or -1.
 *
 * Track, for every node and number of edges, which total weights below `t`
 * are reachable, extending by one edge at a time.
 *
 * @see https://leetcode.com/problems/maximum-weighted-k-edge-path/
 * @difficulty Medium
 * @timeComplexity O(k · e · t)
 * @spaceComplexity O(n · t)
 *
 * @example
 * maximumWeightedKEdgePath(3, [[0, 1, 1], [1, 2, 2]], 2, 4); // 3
 */
export const maximumWeightedKEdgePath = (
	n: number,
	edges: readonly (readonly number[])[],
	k: number,
	t: number,
): number => {
	let reachable = Array.from({ length: n }, () => {
		const sums = new Uint8Array(t);
		sums[0] = 1;
		return sums;
	});
	for (let step = 0; step < k; step++) {
		const next = Array.from({ length: n }, () => new Uint8Array(t));
		for (const [u = 0, v = 0, w = 0] of edges) {
			const from = reachable[u];
			const to = next[v];
			if (!from || !to) continue;
			for (let s = 0; s + w < t; s++) if (from[s]) to[s + w] = 1;
		}
		reachable = next;
	}
	let best = -1;
	for (const sums of reachable)
		for (let s = t - 1; s > best; s--) if (sums[s]) best = s;
	return best;
};
