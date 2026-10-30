/**
 * 2973. Find Number of Coins to Place in Tree Nodes
 *
 * Each node gets 1 coin if its subtree has fewer than three nodes;
 * otherwise the largest product of three costs in its subtree, or 0 if
 * that's negative. Returns every node's coins.
 *
 * The best product uses the three largest costs or the largest and the
 * two most negative, so carry just those five values up the tree.
 *
 * @see https://leetcode.com/problems/find-number-of-coins-to-place-in-tree-nodes/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findNumberOfCoinsToPlaceInTreeNodes([[0, 1], [0, 2]], [1, 2, -2]); // [0, 1, 1]
 */
export const findNumberOfCoinsToPlaceInTreeNodes = (
	edges: readonly (readonly number[])[],
	cost: readonly number[],
): number[] => {
	const n = cost.length;
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const parent = Array.from({ length: n }, () => -1);
	const order = [0];
	for (let i = 0; i < order.length; i++) {
		const node = order[i] ?? 0;
		for (const next of neighbours[node] ?? [])
			if (next !== parent[node]) {
				parent[next] = node;
				order.push(next);
			}
	}

	const size = Array.from({ length: n }, () => 1);
	const extremes: number[][] = cost.map((c) => [c]);
	const coins = Array.from({ length: n }, () => 1);
	for (const node of order.toReversed()) {
		const values = (extremes[node] ?? []).sort((a, b) => a - b);
		if ((size[node] ?? 0) >= 3) {
			const m = values.length;
			const top =
				(values[m - 1] ?? 0) * (values[m - 2] ?? 0) * (values[m - 3] ?? 0);
			const mixed = (values[0] ?? 0) * (values[1] ?? 0) * (values[m - 1] ?? 0);
			coins[node] = Math.max(0, top, mixed);
		}
		const kept =
			values.length > 5 ? [...values.slice(0, 2), ...values.slice(-3)] : values;
		const up = parent[node] ?? -1;
		if (up >= 0) {
			size[up] = (size[up] ?? 0) + (size[node] ?? 0);
			extremes[up]?.push(...kept);
		}
	}
	return coins;
};
