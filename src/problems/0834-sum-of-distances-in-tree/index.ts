/**
 * 834. Sum of Distances in Tree
 *
 * For a tree of `n` nodes given by its `edges`, returns for every node the
 * sum of its distances to all other nodes.
 *
 * Rerooting: one pass from node 0 computes subtree sizes and node 0's
 * answer. Moving the root from a node to its child brings the child's
 * `size` nodes one closer and the other `n - size` one further, so each
 * child's answer follows from its parent's. Both passes use an explicit
 * traversal order instead of recursion.
 *
 * @see https://leetcode.com/problems/sum-of-distances-in-tree/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfDistancesInTree(6, [[0, 1], [0, 2], [2, 3], [2, 4], [2, 5]]); // [8, 12, 6, 10, 10, 10]
 */
export const sumOfDistancesInTree = (
	n: number,
	edges: readonly (readonly number[])[],
): number[] => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}

	// Breadth-first order from node 0, with each node's parent.
	const order = [0];
	const parent = new Array<number>(n).fill(-1);
	const depth = new Array<number>(n).fill(0);
	for (const node of order) {
		for (const next of neighbours[node] ?? []) {
			if (next === parent[node]) continue;
			parent[next] = node;
			depth[next] = (depth[node] ?? 0) + 1;
			order.push(next);
		}
	}

	const size = new Array<number>(n).fill(1);
	for (let i = order.length - 1; i > 0; i--) {
		const node = order[i] ?? 0;
		const up = parent[node] ?? 0;
		size[up] = (size[up] ?? 0) + (size[node] ?? 0);
	}

	const answer = new Array<number>(n).fill(0);
	answer[0] = depth.reduce((sum, d) => sum + d, 0);
	for (const node of order.slice(1)) {
		answer[node] = (answer[parent[node] ?? 0] ?? 0) + n - 2 * (size[node] ?? 0);
	}
	return answer;
};
