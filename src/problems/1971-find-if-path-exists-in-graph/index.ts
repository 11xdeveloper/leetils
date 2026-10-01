/**
 * 1971. Find if Path Exists in Graph
 *
 * Returns whether `source` and `destination` are connected in the
 * undirected graph.
 *
 * Union–find over the edges.
 *
 * @see https://leetcode.com/problems/find-if-path-exists-in-graph/
 * @difficulty Easy
 * @timeComplexity O((n + e) · α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * findIfPathExistsInGraph(3, [[0, 1], [1, 2], [2, 0]], 0, 2); // true
 */
export const findIfPathExistsInGraph = (
	n: number,
	edges: readonly (readonly number[])[],
	source: number,
	destination: number,
): boolean => {
	const parent = Array.from({ length: n }, (_, i) => i);
	const find = (x: number) => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		for (let node = x; node !== root; ) {
			const next = parent[node] ?? root;
			parent[node] = root;
			node = next;
		}
		return root;
	};
	for (const [u = 0, v = 0] of edges) parent[find(u)] = find(v);
	return find(source) === find(destination);
};
