/**
 * 3887. Incremental Even-Weighted Cycle Queries
 *
 * Add edges of weight 0 or 1 in order, skipping any that would create a
 * cycle with odd total weight. Returns how many are added.
 *
 * Every cycle is even exactly when nodes can be labelled so each edge's
 * weight is the XOR of its ends' labels. A union-find keeping each node's
 * label relative to its root checks an edge inside a component and merges
 * components otherwise.
 *
 * @see https://leetcode.com/problems/incremental-even-weighted-cycle-queries/
 * @difficulty Hard
 * @timeComplexity O((n + m) α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * incrementalEvenWeightedCycleQueries(3, [[0, 1, 1], [1, 2, 1], [0, 2, 1]]); // 2
 */
export const incrementalEvenWeightedCycleQueries = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const parent = Array.from({ length: n }, (_, i) => i);
	// label[x]: x's label XOR its parent's.
	const label = new Uint8Array(n);
	const find = (x: number): [root: number, parity: number] => {
		let parity = 0;
		let root = x;
		while (parent[root] !== root) {
			parity ^= label[root] ?? 0;
			root = parent[root] ?? root;
		}
		// Compress, fixing each node's label to be relative to the root.
		let along = parity;
		for (let y = x; parent[y] !== root && y !== root; ) {
			const next = parent[y] ?? root;
			const own = label[y] ?? 0;
			parent[y] = root;
			label[y] = along;
			along ^= own;
			y = next;
		}
		return [root, parity];
	};
	let added = 0;
	for (const [u = 0, v = 0, w = 0] of edges) {
		const [ru, pu] = find(u);
		const [rv, pv] = find(v);
		if (ru === rv) {
			if ((pu ^ pv) === w) added++;
			continue;
		}
		parent[ru] = rv;
		label[ru] = pu ^ pv ^ w;
		added++;
	}
	return added;
};
