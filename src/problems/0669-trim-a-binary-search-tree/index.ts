import type { TreeNode } from "../../structures/tree-node";

/**
 * 669. Trim a Binary Search Tree
 *
 * Removes every node of a binary search tree with a value outside
 * `[low, high]`, keeping the remaining nodes in their relative positions,
 * and returns the new root. The tree is modified in place.
 *
 * First walks down to the new root, the first node in range. Then, down
 * its left side, any left child below `low` is replaced by its right
 * subtree (everything to its left is smaller still); the right side is
 * trimmed the same way against `high`. No recursion, so deep trees are
 * fine.
 *
 * @see https://leetcode.com/problems/trim-a-binary-search-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * treeToArray(trimABinarySearchTree(treeFromArray([3, 0, 4, null, 2, null, null, 1]), 1, 3)); // [3, 2, null, 1]
 */
export const trimABinarySearchTree = (
	root: TreeNode | null,
	low: number,
	high: number,
): TreeNode | null => {
	while (root && (root.val < low || root.val > high))
		root = root.val < low ? root.right : root.left;
	if (!root) return null;

	for (let node: TreeNode | null = root; node; node = node.left) {
		while (node.left && node.left.val < low) node.left = node.left.right;
	}
	for (let node: TreeNode | null = root; node; node = node.right) {
		while (node.right && node.right.val > high) node.right = node.right.left;
	}

	return root;
};
