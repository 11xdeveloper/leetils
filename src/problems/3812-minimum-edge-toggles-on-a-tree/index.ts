/**
 * 3812. Minimum Edge Toggles on a Tree
 *
 * Toggling a tree edge flips the colours of both its ends. Returns the
 * edges to toggle, in increasing order, that turn `start` into `target`
 * with the fewest toggles, or [-1] if impossible.
 *
 * Toggling an edge twice does nothing, and in a tree the set of edges is
 * forced: the edge above a node is toggled exactly when its subtree holds
 * an odd number of nodes needing a flip. The total must be even.
 *
 * @see https://leetcode.com/problems/minimum-edge-toggles-on-a-tree/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumEdgeTogglesOnATree(3, [[0, 1], [1, 2]], "010", "100"); // [0]
 */
export const minimumEdgeTogglesOnATree = (
	n: number,
	edges: readonly (readonly number[])[],
	start: string,
	target: string,
): number[] => {
	const adjacent: [to: number, edge: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	edges.forEach(([u = 0, v = 0], i) => {
		adjacent[u]?.push([v, i]);
		adjacent[v]?.push([u, i]);
	});
	const odd = Array.from({ length: n }, (_, i): number =>
		start[i] === target[i] ? 0 : 1,
	);
	if (odd.reduce((a, b) => a + b, 0) % 2 === 1) return [-1];
	const parent = new Int32Array(n).fill(-1);
	const parentEdge = new Int32Array(n).fill(-1);
	const order = [0];
	for (let i = 0; i < order.length; i++) {
		const v = order[i] ?? 0;
		for (const [to, edge] of adjacent[v] ?? [])
			if (edge !== parentEdge[v]) {
				parent[to] = v;
				parentEdge[to] = edge;
				order.push(to);
			}
	}
	const chosen: number[] = [];
	for (let i = n - 1; i > 0; i--) {
		const v = order[i] ?? 0;
		if (!odd[v]) continue;
		chosen.push(parentEdge[v] ?? 0);
		odd[parent[v] ?? 0] = 1 - (odd[parent[v] ?? 0] ?? 0);
	}
	return chosen.sort((a, b) => a - b);
};
