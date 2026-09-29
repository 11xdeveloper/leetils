/**
 * 323. Number of Connected Components in an Undirected Graph
 *
 * Returns how many connected components the undirected graph with nodes 0
 * to `n - 1` and the given `edges` has.
 *
 * Union–find: every node starts as its own component, and each edge joining
 * two different components merges them into one.
 *
 * @see https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/
 * @difficulty Medium
 * @timeComplexity O(n + e α(n)), nearly linear
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfConnectedComponentsInAnUndirectedGraph(5, [[0, 1], [1, 2], [3, 4]]); // 2
 */
export const numberOfConnectedComponentsInAnUndirectedGraph = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const parent = Array.from({ length: n }, (_, i) => i);
	const find = (x: number): number => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		for (let node = x; node !== root; ) {
			const next = parent[node] ?? root;
			parent[node] = root;
			node = next;
		}
		return root;
	};

	let components = n;
	for (const [a = 0, b = 0] of edges) {
		const rootA = find(a);
		const rootB = find(b);
		if (rootA !== rootB) {
			parent[rootA] = rootB;
			components--;
		}
	}

	return components;
};
