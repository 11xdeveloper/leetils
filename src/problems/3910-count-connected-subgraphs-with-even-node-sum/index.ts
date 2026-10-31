/**
 * 3910. Count Connected Subgraphs with Even Node Sum
 *
 * Counts the non-empty node sets (n ≤ 13) whose induced subgraph is
 * connected and whose 0/1 node values add up to an even number.
 *
 * Try every set, checking connectivity with neighbour bitmasks.
 *
 * @see https://leetcode.com/problems/count-connected-subgraphs-with-even-node-sum/
 * @difficulty Hard
 * @timeComplexity O(2ⁿ · n)
 * @spaceComplexity O(n)
 *
 * @example
 * countConnectedSubgraphsWithEvenNodeSum([1, 0, 1], [[0, 1], [1, 2]]); // 2
 */
export const countConnectedSubgraphsWithEvenNodeSum = (
	nums: readonly number[],
	edges: readonly (readonly number[])[],
): number => {
	const n = nums.length;
	const neighbours = new Array<number>(n).fill(0);
	for (const [u = 0, v = 0] of edges) {
		neighbours[u] = (neighbours[u] ?? 0) | (1 << v);
		neighbours[v] = (neighbours[v] ?? 0) | (1 << u);
	}
	let ones = 0;
	nums.forEach((num, i) => {
		if (num) ones |= 1 << i;
	});
	let count = 0;
	for (let mask = 1; mask < 1 << n; mask++) {
		let parity = 0;
		for (let m = mask & ones; m; m &= m - 1) parity ^= 1;
		if (parity) continue;
		let reached = mask & -mask;
		for (let frontier = reached; frontier; ) {
			let next = 0;
			for (let f = frontier; f; f &= f - 1)
				next |= neighbours[31 - Math.clz32(f & -f)] ?? 0;
			frontier = next & mask & ~reached;
			reached |= frontier;
		}
		if (reached === mask) count++;
	}
	return count;
};
