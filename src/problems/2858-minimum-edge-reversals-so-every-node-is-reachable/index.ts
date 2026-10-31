/**
 * 2858. Minimum Edge Reversals So Every Node Is Reachable
 *
 * The edges of a tree are directed. For each node, returns how many
 * edges must be reversed so every node can be reached from it.
 *
 * Count the edges pointing towards node 0 when it's the root. Moving the
 * root across an edge flips only that edge's cost: one more if it pointed
 * the right way, one fewer otherwise.
 *
 * @see https://leetcode.com/problems/minimum-edge-reversals-so-every-node-is-reachable/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumEdgeReversalsSoEveryNodeIsReachable(4, [[2, 0], [2, 1], [1, 3]]); // [1, 1, 0, 2]
 */
export const minimumEdgeReversalsSoEveryNodeIsReachable = (
	n: number,
	edges: readonly (readonly number[])[],
): number[] => {
	// neighbours[u] holds [v, 1] when the edge points u → v, else [v, 0].
	const neighbours: [number, number][][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push([b, 1]);
		neighbours[b]?.push([a, 0]);
	}
	const parent = Array.from({ length: n }, () => -1);
	const forward = Array.from({ length: n }, () => 0);
	const order = [0];
	let reversals = 0;
	for (let i = 0; i < order.length; i++) {
		const node = order[i] ?? 0;
		for (const [next, along] of neighbours[node] ?? [])
			if (next !== 0 && parent[next] === -1) {
				parent[next] = node;
				forward[next] = along;
				if (!along) reversals++;
				order.push(next);
			}
	}
	const answer = Array.from({ length: n }, () => 0);
	answer[0] = reversals;
	for (const node of order.slice(1))
		answer[node] = (answer[parent[node] ?? 0] ?? 0) + (forward[node] ? 1 : -1);
	return answer;
};
