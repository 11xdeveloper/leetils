/**
 * 2608. Shortest Cycle in a Graph
 *
 * Returns the length of the shortest cycle in an undirected graph, or -1
 * if it has none.
 *
 * Breadth-first search from every node; an edge to an already-reached
 * node other than the parent closes a cycle through the source no longer
 * than `dist[u] + dist[v] + 1`, and the minimum over all sources is
 * exact.
 *
 * @see https://leetcode.com/problems/shortest-cycle-in-a-graph/
 * @difficulty Hard
 * @timeComplexity O(n · (n + e))
 * @spaceComplexity O(n + e)
 *
 * @example
 * shortestCycleInAGraph(4, [[0, 1], [0, 2]]); // -1
 */
export const shortestCycleInAGraph = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	let shortest = Number.POSITIVE_INFINITY;
	for (let source = 0; source < n; source++) {
		const distance = Array.from({ length: n }, () => -1);
		const parent = Array.from({ length: n }, () => -1);
		distance[source] = 0;
		const queue = [source];
		for (let i = 0; i < queue.length; i++) {
			const node = queue[i] ?? 0;
			for (const next of neighbours[node] ?? []) {
				if (distance[next] === -1) {
					distance[next] = (distance[node] ?? 0) + 1;
					parent[next] = node;
					queue.push(next);
				} else if (parent[node] !== next)
					shortest = Math.min(
						shortest,
						(distance[node] ?? 0) + (distance[next] ?? 0) + 1,
					);
			}
		}
	}
	return shortest === Number.POSITIVE_INFINITY ? -1 : shortest;
};
