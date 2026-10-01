/**
 * 684. Redundant Connection
 *
 * A tree of nodes 1 to `n` had one extra edge added. Returns an edge whose
 * removal leaves a tree, the one appearing last in `edges` if there are
 * several.
 *
 * Union–find, adding edges in order: the first edge joining two nodes
 * already connected closes the cycle, and it's the cycle's last edge in
 * the input.
 *
 * @see https://leetcode.com/problems/redundant-connection/
 * @difficulty Medium
 * @timeComplexity O(n · α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * redundantConnection([[1, 2], [1, 3], [2, 3]]); // [2, 3]
 */
export const redundantConnection = (
	edges: readonly (readonly number[])[],
): number[] => {
	const parent = Array.from({ length: edges.length + 1 }, (_, i) => i);
	const find = (node: number): number => {
		while (parent[node] !== node) {
			const grandparent = parent[parent[node] ?? node] ?? node;
			parent[node] = grandparent;
			node = grandparent;
		}
		return node;
	};

	for (const [a = 0, b = 0] of edges) {
		const rootA = find(a);
		const rootB = find(b);
		if (rootA === rootB) return [a, b];
		parent[rootA] = rootB;
	}
	return [];
};
