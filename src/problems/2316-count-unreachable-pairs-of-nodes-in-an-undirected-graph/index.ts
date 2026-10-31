/**
 * 2316. Count Unreachable Pairs of Nodes in an Undirected Graph
 *
 * Counts the pairs of nodes with no path between them.
 *
 * Find component sizes with union-find; each component pairs with every
 * node seen in earlier components.
 *
 * @see https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/
 * @difficulty Medium
 * @timeComplexity O(n + e · α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * countUnreachablePairsOfNodesInAnUndirectedGraph(7, [[0, 2], [0, 5], [2, 4], [1, 6], [5, 4]]); // 14
 */
export const countUnreachablePairsOfNodesInAnUndirectedGraph = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const parent = Array.from({ length: n }, (_, i) => i);
	const find = (x: number): number => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		while (parent[x] !== root) [parent[x], x] = [root, parent[x] ?? root];
		return root;
	};
	for (const [a = 0, b = 0] of edges) parent[find(a)] = find(b);
	const sizes = new Map<number, number>();
	for (let node = 0; node < n; node++) {
		const root = find(node);
		sizes.set(root, (sizes.get(root) ?? 0) + 1);
	}
	let [pairs, seen] = [0, 0];
	for (const size of sizes.values()) {
		pairs += size * seen;
		seen += size;
	}
	return pairs;
};
