/**
 * 261. Graph Valid Tree
 *
 * Returns whether the undirected graph with nodes 0 to `n - 1` and the given
 * `edges` is a tree: connected, with no cycles.
 *
 * A tree on `n` nodes has exactly `n - 1` edges. With that many edges, the
 * graph is a tree exactly when no edge joins two nodes already connected,
 * which union–find checks as the edges are added.
 *
 * @see https://leetcode.com/problems/graph-valid-tree/
 * @difficulty Medium
 * @timeComplexity O(n α(n)), nearly linear
 * @spaceComplexity O(n)
 *
 * @example
 * graphValidTree(5, [[0, 1], [0, 2], [0, 3], [1, 4]]); // true
 */
export const graphValidTree = (
	n: number,
	edges: readonly (readonly number[])[],
): boolean => {
	if (edges.length !== n - 1) return false;

	const parent = Array.from({ length: n }, (_, i) => i);
	const find = (x: number): number => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		// Point everything on the path straight at the root.
		for (let node = x; node !== root; ) {
			const next = parent[node] ?? root;
			parent[node] = root;
			node = next;
		}
		return root;
	};

	for (const [a = 0, b = 0] of edges) {
		const rootA = find(a);
		const rootB = find(b);
		if (rootA === rootB) return false;
		parent[rootA] = rootB;
	}

	return true;
};
