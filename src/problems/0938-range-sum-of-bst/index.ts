import type { TreeNode } from "../../structures/tree-node";

/**
 * 938. Range Sum of BST
 *
 * Returns the sum of the values in a binary search tree that lie between
 * `low` and `high` inclusive.
 *
 * Walks the tree with an explicit stack, skipping subtrees that the
 * ordering puts entirely outside the range.
 *
 * @see https://leetcode.com/problems/range-sum-of-bst/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * rangeSumOfBst(treeFromArray([10, 5, 15, 3, 7, null, 18]), 7, 15); // 32
 */
export const rangeSumOfBst = (
	root: TreeNode | null,
	low: number,
	high: number,
): number => {
	let sum = 0;
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (node.val >= low && node.val <= high) sum += node.val;
		if (node.left && node.val > low) stack.push(node.left);
		if (node.right && node.val < high) stack.push(node.right);
	}
	return sum;
};
