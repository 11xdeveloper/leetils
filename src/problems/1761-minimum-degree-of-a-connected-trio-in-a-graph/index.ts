/**
 * 1761. Minimum Degree of a Connected Trio in a Graph
 *
 * A trio is three mutually connected nodes, and its degree counts edges
 * from it to the rest of the graph. Returns the smallest trio degree, or
 * -1 if there is no trio.
 *
 * With an adjacency matrix and node degrees, check every triple; a trio's
 * degree is its three degrees minus the 6 edge ends inside it.
 *
 * @see https://leetcode.com/problems/minimum-degree-of-a-connected-trio-in-a-graph/
 * @difficulty Hard
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^2)
 *
 * @example
 * minimumDegreeOfAConnectedTrioInAGraph(6, [[1, 2], [1, 3], [3, 2], [4, 1], [5, 2], [3, 6]]); // 3
 */
export const minimumDegreeOfAConnectedTrioInAGraph = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const linked = Array.from({ length: n + 1 }, () => new Uint8Array(n + 1));
	const degree = new Array<number>(n + 1).fill(0);
	for (const [u = 0, v = 0] of edges) {
		const [rowU, rowV] = [linked[u], linked[v]];
		if (rowU) rowU[v] = 1;
		if (rowV) rowV[u] = 1;
		degree[u] = (degree[u] ?? 0) + 1;
		degree[v] = (degree[v] ?? 0) + 1;
	}
	let best = Infinity;
	for (let a = 1; a <= n; a++) {
		const rowA = linked[a];
		for (let b = a + 1; b <= n; b++) {
			if (!rowA?.[b]) continue;
			const rowB = linked[b];
			for (let c = b + 1; c <= n; c++) {
				if (!rowA[c] || !rowB?.[c]) continue;
				best = Math.min(
					best,
					(degree[a] ?? 0) + (degree[b] ?? 0) + (degree[c] ?? 0) - 6,
				);
			}
		}
	}
	return best === Infinity ? -1 : best;
};
