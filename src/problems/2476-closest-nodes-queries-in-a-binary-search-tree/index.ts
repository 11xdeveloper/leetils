import type { TreeNode } from "../../structures/tree-node";

/**
 * 2476. Closest Nodes Queries in a Binary Search Tree
 *
 * Returns, for each query, `[largest value <= query, smallest value >=
 * query]` from the BST, with -1 where none exists.
 *
 * Collect the values in order (the tree may be unbalanced) and binary
 * search.
 *
 * @see https://leetcode.com/problems/closest-nodes-queries-in-a-binary-search-tree/
 * @difficulty Medium
 * @timeComplexity O(n + q log n)
 * @spaceComplexity O(n)
 *
 * @example
 * closestNodesQueriesInABinarySearchTree(treeFromArray([4, null, 9]), [3]); // [[-1, 4]]
 */
export const closestNodesQueriesInABinarySearchTree = (
	root: TreeNode | null,
	queries: readonly number[],
): number[][] => {
	const values: number[] = [];
	const stack: TreeNode[] = [];
	for (let node = root; node || stack.length; ) {
		while (node) {
			stack.push(node);
			node = node.left;
		}
		const next = stack.pop();
		if (!next) break;
		values.push(next.val);
		node = next.right;
	}
	return queries.map((query) => {
		let [lo, hi] = [0, values.length];
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if ((values[mid] ?? 0) < query) lo = mid + 1;
			else hi = mid;
		}
		const ceiling = values[lo] ?? -1;
		const floor = ceiling === query ? query : (values[lo - 1] ?? -1);
		return [floor, ceiling];
	});
};
