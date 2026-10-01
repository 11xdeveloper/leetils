/**
 * 797. All Paths From Source to Target
 *
 * Returns every path from node 0 to node `n - 1` in a directed acyclic
 * graph, where `graph[i]` lists the nodes reachable from `i`. Any order is
 * accepted; here paths come in depth-first order.
 *
 * Depth-first search with an explicit stack of partial paths. The graph is
 * acyclic, so no node repeats on a path.
 *
 * @see https://leetcode.com/problems/all-paths-from-source-to-target/
 * @difficulty Medium
 * @timeComplexity O(2^n · n) in the worst case, the size of the output
 * @spaceComplexity O(2^n · n)
 *
 * @example
 * allPathsFromSourceToTarget([[1, 2], [3], [3], []]); // [[0, 1, 3], [0, 2, 3]]
 */
export const allPathsFromSourceToTarget = (
	graph: readonly (readonly number[])[],
): number[][] => {
	const target = graph.length - 1;
	const paths: number[][] = [];
	const stack = [[0]];
	for (let path = stack.pop(); path; path = stack.pop()) {
		const node = path.at(-1) ?? 0;
		if (node === target) {
			paths.push(path);
			continue;
		}
		const next = graph[node] ?? [];
		for (let i = next.length - 1; i >= 0; i--)
			stack.push([...path, next[i] ?? 0]);
	}
	return paths;
};
