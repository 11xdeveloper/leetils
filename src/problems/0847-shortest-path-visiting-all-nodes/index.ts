/**
 * 847. Shortest Path Visiting All Nodes
 *
 * Returns the length of the shortest walk that visits every node of the
 * connected undirected graph (`graph[i]` lists `i`'s neighbours), starting
 * and ending anywhere and reusing nodes and edges as needed.
 *
 * Breadth-first search over (current node, set of nodes visited) states,
 * starting from every node at once. The first state that has visited
 * everything gives the answer.
 *
 * @see https://leetcode.com/problems/shortest-path-visiting-all-nodes/
 * @difficulty Hard
 * @timeComplexity O(2^n · n^2)
 * @spaceComplexity O(2^n · n)
 *
 * @example
 * shortestPathVisitingAllNodes([[1, 2, 3], [0], [0], [0]]); // 4
 */
export const shortestPathVisitingAllNodes = (
	graph: readonly (readonly number[])[],
): number => {
	const n = graph.length;
	const full = (1 << n) - 1;
	const seen = new Uint8Array((1 << n) * n);
	let frontier: [node: number, visited: number][] = graph.map((_, node) => [
		node,
		1 << node,
	]);
	for (const [node, visited] of frontier) seen[visited * n + node] = 1;

	for (let steps = 0; frontier.length > 0; steps++) {
		const next: [number, number][] = [];
		for (const [node, visited] of frontier) {
			if (visited === full) return steps;
			for (const neighbour of graph[node] ?? []) {
				const state = visited | (1 << neighbour);
				if (seen[state * n + neighbour]) continue;
				seen[state * n + neighbour] = 1;
				next.push([neighbour, state]);
			}
		}
		frontier = next;
	}
	return 0;
};
