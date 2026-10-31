/**
 * 2204. Distance to a Cycle in Undirected Graph
 *
 * A connected undirected graph has exactly one cycle. Returns each node's
 * distance to the nearest node on the cycle.
 *
 * Peel off leaves repeatedly; what remains is the cycle. Then search
 * breadth-first from all cycle nodes at once.
 *
 * @see https://leetcode.com/problems/distance-to-a-cycle-in-undirected-graph/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * distanceToACycleInUndirectedGraph(7, [[1, 2], [2, 4], [4, 3], [3, 1], [0, 1], [5, 2], [6, 5]]); // [1, 0, 0, 0, 0, 1, 2]
 */
export const distanceToACycleInUndirectedGraph = (
	n: number,
	edges: readonly (readonly number[])[],
): number[] => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const degree = neighbours.map((list) => list.length);
	const leaves = degree.flatMap((d, node) => (d === 1 ? [node] : []));
	const distance = new Array<number>(n).fill(0);
	for (let head = 0; head < leaves.length; head++) {
		const leaf = leaves[head] ?? 0;
		distance[leaf] = -1;
		for (const next of neighbours[leaf] ?? []) {
			degree[next] = (degree[next] ?? 0) - 1;
			if (degree[next] === 1) leaves.push(next);
		}
	}
	const queue = distance.flatMap((d, node) => (d === 0 ? [node] : []));
	for (let head = 0; head < queue.length; head++) {
		const node = queue[head] ?? 0;
		for (const next of neighbours[node] ?? []) {
			if (distance[next] !== -1) continue;
			distance[next] = (distance[node] ?? 0) + 1;
			queue.push(next);
		}
	}
	return distance;
};
