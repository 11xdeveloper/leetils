import type { TreeNode } from "../../structures/tree-node";

/**
 * 144. Binary Tree Preorder Traversal
 *
 * Returns the values of a binary tree in preorder: node, left subtree, right
 * subtree.
 *
 * Iterative, with an explicit stack so deep trees can't overflow the call
 * stack. Pushing the right child before the left makes the left come off
 * first.
 *
 * @see https://leetcode.com/problems/binary-tree-preorder-traversal/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * binaryTreePreorderTraversal(treeFromArray([1, null, 2, 3])); // [1, 2, 3]
 */
export const binaryTreePreorderTraversal = (
	root: TreeNode | null,
): number[] => {
	const values: number[] = [];
	const stack = root ? [root] : [];

	for (let node = stack.pop(); node; node = stack.pop()) {
		values.push(node.val);
		if (node.right) stack.push(node.right);
		if (node.left) stack.push(node.left);
	}

	return values;
};
