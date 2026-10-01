/**
 * 1192. Critical Connections in a Network
 *
 * Returns the connections of a connected network whose removal would
 * disconnect it (its bridges), in any order.
 *
 * Tarjan's bridge-finding algorithm, run with an explicit stack: an edge
 * from `u` down to `v` in the depth-first search tree is a bridge if nothing
 * in `v`'s subtree has an edge back to `u` or above.
 *
 * @see https://leetcode.com/problems/critical-connections-in-a-network/
 * @difficulty Hard
 * @timeComplexity O(n + e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * criticalConnectionsInANetwork(4, [[0, 1], [1, 2], [2, 0], [1, 3]]); // [[1, 3]]
 */
export const criticalConnectionsInANetwork = (
	n: number,
	connections: readonly (readonly number[])[],
): number[][] => {
	// Adjacency lists of [neighbour, edge index].
	const adjacent = Array.from({ length: n }, (): [number, number][] => []);
	connections.forEach(([a = 0, b = 0], edge) => {
		adjacent[a]?.push([b, edge]);
		adjacent[b]?.push([a, edge]);
	});
	const order = new Int32Array(n).fill(-1);
	const low = new Int32Array(n);
	const bridges: number[][] = [];
	let time = 0;
	for (let root = 0; root < n; root++) {
		if (order[root] !== -1) continue;
		// Each frame is [node, edge used to reach it, next adjacency index].
		const stack: [number, number, number][] = [[root, -1, 0]];
		order[root] = low[root] = time++;
		while (stack.length > 0) {
			const frame = stack[stack.length - 1];
			if (!frame) break;
			const [node, parentEdge, next] = frame;
			const neighbours = adjacent[node] ?? [];
			if (next < neighbours.length) {
				frame[2]++;
				const [neighbour = 0, edge = 0] = neighbours[next] ?? [];
				if (edge === parentEdge) continue;
				if (order[neighbour] === -1) {
					order[neighbour] = low[neighbour] = time++;
					stack.push([neighbour, edge, 0]);
				} else {
					low[node] = Math.min(low[node] ?? 0, order[neighbour] ?? 0);
				}
				continue;
			}
			stack.pop();
			const parent = stack[stack.length - 1]?.[0];
			if (parent === undefined) continue;
			low[parent] = Math.min(low[parent] ?? 0, low[node] ?? 0);
			if ((low[node] ?? 0) > (order[parent] ?? 0)) bridges.push([parent, node]);
		}
	}
	return bridges;
};
