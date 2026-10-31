/**
 * 3373. Maximize the Number of Target Nodes After Connecting Trees II
 *
 * A node is a target of another if the path between them has an even
 * number of edges. For each node of the first tree, join it to some node of
 * the second tree with one edge and count its targets; returns the largest
 * count for each.
 *
 * Colour each tree in two colours by depth parity: targets in the same tree
 * are the nodes of the same colour. Across the new edge parities flip, so
 * the best is the larger colour class of the second tree.
 *
 * @see https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-ii/
 * @difficulty Hard
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * maximizeTheNumberOfTargetNodesAfterConnectingTreesII([[0, 1], [0, 2], [2, 3], [2, 4]], [[0, 1], [0, 2], [0, 3], [2, 7], [1, 4], [4, 5], [4, 6]]); // [8, 7, 7, 8, 8]
 */
export const maximizeTheNumberOfTargetNodesAfterConnectingTreesII = (
	edges1: readonly (readonly number[])[],
	edges2: readonly (readonly number[])[],
): number[] => {
	const colour = (edges: readonly (readonly number[])[]): Int8Array => {
		const n = edges.length + 1;
		const adjacent: number[][] = Array.from({ length: n }, () => []);
		for (const [u = 0, v = 0] of edges) {
			adjacent[u]?.push(v);
			adjacent[v]?.push(u);
		}
		const colours = new Int8Array(n).fill(-1);
		colours[0] = 0;
		const queue = [0];
		for (let i = 0; i < queue.length; i++) {
			const node = queue[i] ?? 0;
			for (const next of adjacent[node] ?? [])
				if (colours[next] === -1) {
					colours[next] = 1 - (colours[node] ?? 0);
					queue.push(next);
				}
		}
		return colours;
	};
	const first = colour(edges1);
	const second = colour(edges2);
	const ones1 = first.reduce((a, b) => a + b, 0);
	const ones2 = second.reduce((a, b) => a + b, 0);
	const best = Math.max(ones2, second.length - ones2);
	return [...first].map((c) => (c === 1 ? ones1 : first.length - ones1) + best);
};
