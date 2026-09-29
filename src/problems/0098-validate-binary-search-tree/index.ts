import type { TreeNode } from "../../structures/tree-node";

/**
 * 98. Validate Binary Search Tree
 *
 * Returns whether a binary tree is a valid binary search tree: every value in
 * a node's left subtree is strictly less than the node's value, and every
 * value in its right subtree is strictly greater.
 *
 * A tree is a valid binary search tree exactly when its inorder traversal is
 * strictly increasing. Walks it in order with an explicit stack, comparing
 * each value with the one before.
 *
 * @see https://leetcode.com/problems/validate-binary-search-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * validateBinarySearchTree(treeFromArray([2, 1, 3])); // true
 * validateBinarySearchTree(treeFromArray([5, 1, 4, null, null, 3, 6])); // false
 */
export const validateBinarySearchTree = (root: TreeNode | null): boolean => {
	const stack: TreeNode[] = [];
	let node = root;
	let previous = Number.NEGATIVE_INFINITY;

	while (node || stack.length > 0) {
		while (node) {
			stack.push(node);
			node = node.left;
		}
		const next = stack.pop();
		if (!next) break;
		if (next.val <= previous) return false;
		previous = next.val;
		node = next.right;
	}

	return true;
};
