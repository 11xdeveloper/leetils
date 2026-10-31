/**
 * 3311. Construct 2D Grid Matching Graph Layout
 *
 * Arrange the nodes of a graph, known to be a grid, in a 2D grid so that
 * nodes are side by side exactly when they share an edge.
 *
 * A node of degree 1 means the grid is a single line: walk it from that
 * end. Otherwise start at a corner (degree 2) and build the first row by
 * always stepping to the unvisited neighbour of lowest degree, which keeps
 * to the edge, until reaching another corner. Each later row is then
 * forced: every node's only unvisited neighbour is the one below it.
 *
 * @see https://leetcode.com/problems/construct-2d-grid-matching-graph-layout/
 * @difficulty Hard
 * @timeComplexity O(n + e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * construct2dGridMatchingGraphLayout(4, [[0, 1], [0, 2], [1, 3], [2, 3]]); // [[3, 1], [2, 0]]
 */
export const construct2dGridMatchingGraphLayout = (
	n: number,
	edges: readonly (readonly number[])[],
): number[][] => {
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const degree = (node: number): number => adjacent[node]?.length ?? 0;
	const visited = new Uint8Array(n);
	let start = 0;
	for (let node = 1; node < n; node++)
		if (degree(node) < degree(start)) start = node;
	const first = [start];
	visited[start] = 1;
	const lowest = degree(start);
	for (let current = start; ; ) {
		let next = -1;
		for (const neighbour of adjacent[current] ?? [])
			if (
				!visited[neighbour] &&
				(next === -1 || degree(neighbour) < degree(next))
			)
				next = neighbour;
		if (next === -1) break;
		first.push(next);
		visited[next] = 1;
		current = next;
		if (degree(next) === lowest) break;
	}
	const grid = [first];
	while (grid.length * first.length < n) {
		const previous = grid.at(-1) ?? [];
		const row = previous.map((node) => {
			const below =
				(adjacent[node] ?? []).find((neighbour) => !visited[neighbour]) ?? -1;
			visited[below] = 1;
			return below;
		});
		grid.push(row);
	}
	return grid;
};
