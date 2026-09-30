import { TreeNode } from "../../structures/tree-node";

/**
 * 1382. Balance a Binary Search Tree
 *
 * Returns a balanced binary search tree (subtree depths differ by at most
 * one everywhere) with the same values as the given one.
 *
 * Reads the values in order with an explicit stack, then builds a new tree
 * whose root at each step is the middle of its range. The input is left as
 * it is.
 *
 * @see https://leetcode.com/problems/balance-a-binary-search-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeToArray(balanceABinarySearchTree(treeFromArray([1, null, 2, null, 3, null, 4]))); // [2, 1, 3, null, null, null, 4]
 */
export const balanceABinarySearchTree = (
	root: TreeNode | null,
): TreeNode | null => {
	const values: number[] = [];
	const stack: TreeNode[] = [];
	for (let node = root; node || stack.length > 0; ) {
		for (; node; node = node.left) stack.push(node);
		const top = stack.pop();
		if (!top) break;
		values.push(top.val);
		node = top.right;
	}
	const build = (low: number, high: number): TreeNode | null => {
		if (low > high) return null;
		const mid = (low + high) >>> 1;
		return new TreeNode(
			values[mid] ?? 0,
			build(low, mid - 1),
			build(mid + 1, high),
		);
	};
	return build(0, values.length - 1);
};
