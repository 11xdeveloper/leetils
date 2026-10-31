/**
 * 3249. Count the Number of Good Nodes
 *
 * In a tree rooted at node 0, a node is good if all its children's subtrees
 * have the same size. Returns how many nodes are good.
 *
 * Compute subtree sizes children first, from a breadth-first order run in
 * reverse, and check each node's children.
 *
 * @see https://leetcode.com/problems/count-the-number-of-good-nodes/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countTheNumberOfGoodNodes([[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]]); // 7
 */
export const countTheNumberOfGoodNodes = (
	edges: readonly (readonly number[])[],
): number => {
	const n = edges.length + 1;
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const parent = new Int32Array(n).fill(-1);
	parent[0] = 0;
	const order = [0];
	for (let i = 0; i < order.length; i++) {
		const node = order[i] ?? 0;
		for (const next of adjacent[node] ?? [])
			if (parent[next] === -1) {
				parent[next] = node;
				order.push(next);
			}
	}
	const size = new Int32Array(n).fill(1);
	const childSize = new Int32Array(n);
	const good = new Uint8Array(n).fill(1);
	for (let i = n - 1; i > 0; i--) {
		const node = order[i] ?? 0;
		const up = parent[node] ?? 0;
		const s = size[node] ?? 0;
		if (childSize[up] === 0) childSize[up] = s;
		else if (childSize[up] !== s) good[up] = 0;
		size[up] = (size[up] ?? 0) + s;
	}
	return good.reduce((total, flag) => total + flag, 0);
};
