import type { TreeNode } from "../../structures/tree-node";

/**
 * 226. Invert Binary Tree
 *
 * Mirrors a binary tree by swapping every node's left and right children,
 * and returns its root. The tree is modified in place.
 *
 * Visits every node with an explicit stack, so deep trees can't overflow the
 * call stack, swapping each node's children.
 *
 * @see https://leetcode.com/problems/invert-binary-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * treeToArray(invertBinaryTree(treeFromArray([4, 2, 7, 1, 3, 6, 9]))); // [4, 7, 2, 9, 6, 3, 1]
 */
export const invertBinaryTree = (root: TreeNode | null): TreeNode | null => {
	const stack = root ? [root] : [];

	for (let node = stack.pop(); node; node = stack.pop()) {
		[node.left, node.right] = [node.right, node.left];
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}

	return root;
};
