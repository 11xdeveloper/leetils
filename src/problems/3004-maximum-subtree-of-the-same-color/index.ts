/**
 * 3004. Maximum Subtree of the Same Color
 *
 * A tree rooted at node 0, given as `edges`, with a color per node. Returns
 * the size of the largest subtree whose nodes all have the same color.
 *
 * Visit nodes in breadth-first order from the root, then handle them in
 * reverse so children come before parents. A subtree is single-colored if
 * all its children's subtrees are and they share its color.
 *
 * @see https://leetcode.com/problems/maximum-subtree-of-the-same-color/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSubtreeOfTheSameColor([[0, 1], [0, 2], [0, 3]], [1, 1, 2, 3]); // 1
 */
export const maximumSubtreeOfTheSameColor = (
	edges: readonly (readonly number[])[],
	colors: readonly number[],
): number => {
	const n = colors.length;
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const parent = new Int32Array(n).fill(-1);
	const order = [0];
	parent[0] = 0;
	for (let i = 0; i < order.length; i++) {
		const node = order[i] ?? 0;
		for (const next of adjacent[node] ?? [])
			if (parent[next] === -1) {
				parent[next] = node;
				order.push(next);
			}
	}
	const size = new Int32Array(n).fill(1);
	const uniform = new Uint8Array(n).fill(1);
	let best = 1;
	for (let i = n - 1; i > 0; i--) {
		const node = order[i] ?? 0;
		const up = parent[node] ?? 0;
		if (uniform[node]) best = Math.max(best, size[node] ?? 0);
		if (!uniform[node] || colors[node] !== colors[up]) uniform[up] = 0;
		size[up] = (size[up] ?? 0) + (size[node] ?? 0);
	}
	if (uniform[0]) best = n;
	return best;
};
