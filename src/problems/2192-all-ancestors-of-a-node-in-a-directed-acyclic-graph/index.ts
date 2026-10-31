/**
 * 2192. All Ancestors of a Node in a Directed Acyclic Graph
 *
 * Returns, for each node of a DAG, its ancestors in ascending order.
 *
 * Search from each node in increasing order, appending it to every node it
 * reaches; the lists come out sorted.
 *
 * @see https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/
 * @difficulty Medium
 * @timeComplexity O(n · (n + e))
 * @spaceComplexity O(n^2)
 *
 * @example
 * allAncestorsOfANodeInADirectedAcyclicGraph(3, [[0, 1], [1, 2]]); // [[], [0], [0, 1]]
 */
export const allAncestorsOfANodeInADirectedAcyclicGraph = (
	n: number,
	edges: readonly (readonly number[])[],
): number[][] => {
	const next: number[][] = Array.from({ length: n }, () => []);
	for (const [from = 0, to = 0] of edges) next[from]?.push(to);
	const ancestors: number[][] = Array.from({ length: n }, () => []);
	for (let start = 0; start < n; start++) {
		const seen = new Uint8Array(n);
		const stack = [...(next[start] ?? [])];
		for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
			if (seen[node]) continue;
			seen[node] = 1;
			ancestors[node]?.push(start);
			stack.push(...(next[node] ?? []));
		}
	}
	return ancestors;
};
