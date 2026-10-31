/**
 * 3367. Maximize Sum of Weights after Edge Removals
 *
 * Remove edges from a weighted tree so no node keeps more than `k`. Returns
 * the largest total weight of the edges kept.
 *
 * Tree dynamic programming, children first: for each node, the best total
 * in its subtree when it may keep k child edges (its parent edge dropped)
 * or k - 1 (parent edge kept). Keeping a child edge gains its weight plus
 * the child's k - 1 value over its k value, so take the largest positive
 * gains.
 *
 * @see https://leetcode.com/problems/maximize-sum-of-weights-after-edge-removals/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeSumOfWeightsAfterEdgeRemovals([[0, 1, 4], [0, 2, 2], [2, 3, 12], [2, 4, 6]], 2); // 22
 */
export const maximizeSumOfWeightsAfterEdgeRemovals = (
	edges: readonly (readonly number[])[],
	k: number,
): number => {
	const n = edges.length + 1;
	const adjacent: [next: number, weight: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [u = 0, v = 0, w = 0] of edges) {
		adjacent[u]?.push([v, w]);
		adjacent[v]?.push([u, w]);
	}
	const parent = new Int32Array(n).fill(-1);
	const parentWeight = new Float64Array(n);
	const order = [0];
	parent[0] = 0;
	for (let i = 0; i < order.length; i++) {
		const node = order[i] ?? 0;
		for (const [next, w] of adjacent[node] ?? [])
			if (parent[next] === -1) {
				parent[next] = node;
				parentWeight[next] = w;
				order.push(next);
			}
	}
	const full = new Float64Array(n);
	const short = new Float64Array(n);
	for (let i = n - 1; i >= 0; i--) {
		const node = order[i] ?? 0;
		let base = 0;
		const gains: number[] = [];
		for (const [child] of adjacent[node] ?? []) {
			if (parent[child] !== node || child === 0) continue;
			base += full[child] ?? 0;
			const gain =
				(parentWeight[child] ?? 0) + (short[child] ?? 0) - (full[child] ?? 0);
			if (gain > 0) gains.push(gain);
		}
		gains.sort((a, b) => b - a);
		let kept = base;
		for (let j = 0; j < gains.length && j < k; j++) {
			if (j === k - 1) short[node] = kept;
			kept += gains[j] ?? 0;
		}
		if (gains.length < k) short[node] = kept;
		full[node] = kept;
	}
	return full[0] ?? 0;
};
