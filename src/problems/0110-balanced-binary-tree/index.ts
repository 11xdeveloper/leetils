import type { TreeNode } from "../../structures/tree-node";

/**
 * 110. Balanced Binary Tree
 *
 * Returns whether a binary tree is height-balanced: the depths of every
 * node's two subtrees differ by at most one.
 *
 * Computes each subtree's height bottom-up, returning -1 as soon as any
 * subtree is unbalanced, so each node is visited once.
 *
 * @see https://leetcode.com/problems/balanced-binary-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * balancedBinaryTree(treeFromArray([3, 9, 20, null, null, 15, 7])); // true
 * balancedBinaryTree(treeFromArray([1, 2, 2, 3, 3, null, null, 4, 4])); // false
 */
export const balancedBinaryTree = (root: TreeNode | null): boolean => {
	const height = (node: TreeNode | null): number => {
		if (!node) return 0;
		const left = height(node.left);
		if (left === -1) return -1;
		const right = height(node.right);
		if (right === -1 || Math.abs(left - right) > 1) return -1;
		return 1 + Math.max(left, right);
	};

	return height(root) !== -1;
};
