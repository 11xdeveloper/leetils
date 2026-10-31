/**
 * 3313. Find the Last Marked Nodes in Tree
 *
 * Marking node i at time 0, each second every neighbour of a marked node
 * becomes marked. Returns, for each i, a node that's marked last.
 *
 * The last node marked is a farthest node, and the farthest node from
 * anywhere is an end of a diameter. Find both ends with breadth-first
 * searches, then pick whichever end is farther from each node.
 *
 * @see https://leetcode.com/problems/find-the-last-marked-nodes-in-tree/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheLastMarkedNodesInTree([[0, 1], [0, 2]]); // [2, 2, 1]
 */
export const findTheLastMarkedNodesInTree = (
	edges: readonly (readonly number[])[],
): number[] => {
	const n = edges.length + 1;
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const distances = (start: number): Int32Array => {
		const distance = new Int32Array(n).fill(-1);
		distance[start] = 0;
		const queue = [start];
		for (let i = 0; i < queue.length; i++) {
			const node = queue[i] ?? 0;
			for (const next of adjacent[node] ?? [])
				if (distance[next] === -1) {
					distance[next] = (distance[node] ?? 0) + 1;
					queue.push(next);
				}
		}
		return distance;
	};
	const farthest = (distance: Int32Array): number => {
		let best = 0;
		distance.forEach((d, node) => {
			if (d > (distance[best] ?? 0)) best = node;
		});
		return best;
	};
	const a = farthest(distances(0));
	const fromA = distances(a);
	const b = farthest(fromA);
	const fromB = distances(b);
	return Array.from({ length: n }, (_, node) =>
		(fromA[node] ?? 0) >= (fromB[node] ?? 0) ? a : b,
	);
};
