/**
 * 785. Is Graph Bipartite?
 *
 * Returns whether the undirected graph (`graph[u]` lists `u`'s neighbours)
 * can be split into two sets with every edge between them.
 *
 * Two-colours each component by breadth-first search; a neighbour with the
 * same colour means an odd cycle, which can't be split.
 *
 * @see https://leetcode.com/problems/is-graph-bipartite/
 * @difficulty Medium
 * @timeComplexity O(V + E)
 * @spaceComplexity O(V)
 *
 * @example
 * isGraphBipartite([[1, 3], [0, 2], [1, 3], [0, 2]]); // true
 */
export const isGraphBipartite = (
	graph: readonly (readonly number[])[],
): boolean => {
	const colour = new Int8Array(graph.length);
	for (let start = 0; start < graph.length; start++) {
		if (colour[start]) continue;
		colour[start] = 1;
		const queue = [start];
		for (const node of queue) {
			for (const next of graph[node] ?? []) {
				if (colour[next] === colour[node]) return false;
				if (!colour[next]) {
					colour[next] = -(colour[node] ?? 1);
					queue.push(next);
				}
			}
		}
	}
	return true;
};
