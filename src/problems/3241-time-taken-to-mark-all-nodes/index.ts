/**
 * 3241. Time Taken to Mark All Nodes
 *
 * In a tree, mark one node at time 0. An odd node gets marked a time unit
 * after a neighbour, an even node two units after. Returns, for each
 * starting node, when the whole tree is marked.
 *
 * That's the weighted eccentricity where stepping onto a node costs 1 if
 * it's odd and 2 if even. Root the tree, compute each subtree's deepest
 * path with its two best children, then reroot: a node's longest path
 * either goes down, or up through its parent avoiding its own branch.
 *
 * @see https://leetcode.com/problems/time-taken-to-mark-all-nodes/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * timeTakenToMarkAllNodes([[0, 1], [0, 2]]); // [2, 4, 3]
 */
export const timeTakenToMarkAllNodes = (
	edges: readonly (readonly number[])[],
): number[] => {
	const n = edges.length + 1;
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const cost = (node: number): number => (node % 2 === 0 ? 2 : 1);
	const parent = new Int32Array(n).fill(-1);
	const order = [0];
	parent[0] = 0;
	for (let i = 0; i < order.length; i++) {
		const node = order[i] ?? 0;
		for (const next of adjacent[node] ?? [])
			if (parent[next] === -1) {
				parent[next] = node;
				order.push(next);
			}
	}
	const down1 = new Float64Array(n);
	const down2 = new Float64Array(n);
	const via = new Int32Array(n).fill(-1);
	for (let i = n - 1; i > 0; i--) {
		const node = order[i] ?? 0;
		const up = parent[node] ?? 0;
		const length = (down1[node] ?? 0) + cost(node);
		if (length > (down1[up] ?? 0)) {
			down2[up] = down1[up] ?? 0;
			down1[up] = length;
			via[up] = node;
		} else if (length > (down2[up] ?? 0)) down2[up] = length;
	}
	const upward = new Float64Array(n);
	for (let i = 1; i < n; i++) {
		const node = order[i] ?? 0;
		const up = parent[node] ?? 0;
		const sibling = via[up] === node ? (down2[up] ?? 0) : (down1[up] ?? 0);
		upward[node] = cost(up) + Math.max(upward[up] ?? 0, sibling);
	}
	return Array.from({ length: n }, (_, node) =>
		Math.max(down1[node] ?? 0, upward[node] ?? 0),
	);
};
