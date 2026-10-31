/**
 * 3530. Maximum Profit from Valid Topological Order in DAG
 *
 * Order the nodes of a DAG topologically; node v at position p (from 1)
 * earns `score[v] · p`. Returns the largest total.
 *
 * Bitmask dynamic programming over the set of nodes placed so far: the next
 * node needs all its predecessors in the set and takes position |set| + 1.
 *
 * @see https://leetcode.com/problems/maximum-profit-from-valid-topological-order-in-dag/
 * @difficulty Hard
 * @timeComplexity O(2ⁿ · n)
 * @spaceComplexity O(2ⁿ)
 *
 * @example
 * maximumProfitFromValidTopologicalOrderInDag(2, [[0, 1]], [2, 3]); // 8
 */
export const maximumProfitFromValidTopologicalOrderInDag = (
	n: number,
	edges: readonly (readonly number[])[],
	score: readonly number[],
): number => {
	const needs = new Int32Array(n);
	for (const [u = 0, v = 0] of edges) needs[v] = (needs[v] ?? 0) | (1 << u);
	const best = new Float64Array(1 << n).fill(-1);
	best[0] = 0;
	for (let mask = 0; mask < 1 << n; mask++) {
		const current = best[mask] ?? -1;
		if (current < 0) continue;
		let placed = 0;
		for (let m = mask; m; m &= m - 1) placed++;
		for (let v = 0; v < n; v++) {
			if ((mask >> v) & 1 || ((needs[v] ?? 0) & mask) !== (needs[v] ?? 0))
				continue;
			const next = mask | (1 << v);
			best[next] = Math.max(
				best[next] ?? 0,
				current + (score[v] ?? 0) * (placed + 1),
			);
		}
	}
	return best[(1 << n) - 1] ?? 0;
};
