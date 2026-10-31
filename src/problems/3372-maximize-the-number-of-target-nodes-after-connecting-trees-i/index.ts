/**
 * 3372. Maximize the Number of Target Nodes After Connecting Trees I
 *
 * A node is a target of another if the path between them has at most `k`
 * edges. For each node of the first tree, join it to some node of the
 * second tree with one edge and count its targets; returns the largest
 * count for each.
 *
 * Joining at node i, the second tree's best attachment is the node with
 * the most nodes within k - 1 edges, whatever i is. Count each node's
 * neighbourhood with a breadth-first search in both trees.
 *
 * @see https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-i/
 * @difficulty Medium
 * @timeComplexity O(n² + m²)
 * @spaceComplexity O(n + m)
 *
 * @example
 * maximizeTheNumberOfTargetNodesAfterConnectingTreesI([[0, 1], [0, 2], [2, 3], [2, 4]], [[0, 1], [0, 2], [0, 3], [2, 7], [1, 4], [4, 5], [4, 6]], 2); // [9, 7, 9, 8, 8]
 */
export const maximizeTheNumberOfTargetNodesAfterConnectingTreesI = (
	edges1: readonly (readonly number[])[],
	edges2: readonly (readonly number[])[],
	k: number,
): number[] => {
	const within = (
		edges: readonly (readonly number[])[],
		limit: number,
	): number[] => {
		const n = edges.length + 1;
		const adjacent: number[][] = Array.from({ length: n }, () => []);
		for (const [u = 0, v = 0] of edges) {
			adjacent[u]?.push(v);
			adjacent[v]?.push(u);
		}
		return Array.from({ length: n }, (_, start) => {
			if (limit < 0) return 0;
			const distance = new Int32Array(n).fill(-1);
			distance[start] = 0;
			const queue = [start];
			for (let i = 0; i < queue.length; i++) {
				const node = queue[i] ?? 0;
				if ((distance[node] ?? 0) === limit) continue;
				for (const next of adjacent[node] ?? [])
					if (distance[next] === -1) {
						distance[next] = (distance[node] ?? 0) + 1;
						queue.push(next);
					}
			}
			return queue.length;
		});
	};
	const best = Math.max(...within(edges2, k - 1));
	return within(edges1, k).map((count) => count + best);
};
