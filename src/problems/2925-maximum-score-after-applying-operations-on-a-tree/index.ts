/**
 * 2925. Maximum Score After Applying Operations on a Tree
 *
 * Taking a node's value scores it and sets it to 0. The tree, rooted at
 * 0, must stay healthy: every root-to-leaf path sum must remain nonzero.
 * Returns the largest score.
 *
 * Equivalently, leave as little as possible behind: a leaf must keep its
 * own value, and any other node either keeps its value or relies on all
 * its subtrees to stay healthy.
 *
 * @see https://leetcode.com/problems/maximum-score-after-applying-operations-on-a-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumScoreAfterApplyingOperationsOnATree([[0, 1], [0, 2], [0, 3], [2, 4], [4, 5]], [5, 2, 5, 2, 1, 1]); // 11
 */
export const maximumScoreAfterApplyingOperationsOnATree = (
	edges: readonly (readonly number[])[],
	values: readonly number[],
): number => {
	const n = values.length;
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const parent = Array.from({ length: n }, () => -1);
	const order = [0];
	for (let i = 0; i < order.length; i++) {
		const node = order[i] ?? 0;
		for (const next of neighbours[node] ?? [])
			if (next !== parent[node]) {
				parent[next] = node;
				order.push(next);
			}
	}
	const keep = Array.from({ length: n }, () => 0);
	const childKeep = Array.from({ length: n }, () => 0);
	const hasChild = new Uint8Array(n);
	for (const node of order.toReversed()) {
		const own = values[node] ?? 0;
		keep[node] = hasChild[node] ? Math.min(own, childKeep[node] ?? 0) : own;
		const up = parent[node] ?? -1;
		if (up >= 0) {
			hasChild[up] = 1;
			childKeep[up] = (childKeep[up] ?? 0) + (keep[node] ?? 0);
		}
	}
	return values.reduce((sum, v) => sum + v, 0) - (keep[0] ?? 0);
};
