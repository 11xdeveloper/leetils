import type { TreeNode } from "../../structures/tree-node";

/**
 * 114. Flatten Binary Tree to Linked List
 *
 * Flattens a binary tree in place, as the problem requires, into a "linked
 * list" of the same nodes in preorder, linked through their `right` pointers
 * with every `left` pointer set to `null`.
 *
 * For each node with a left subtree, splices that subtree in between the
 * node and its right subtree: the right subtree is attached after the left
 * subtree's rightmost node, then the left subtree moves to the right. Uses no
 * stack or recursion.
 *
 * @see https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const root = treeFromArray([1, 2, 5, 3, 4, null, 6]);
 * flattenBinaryTreeToLinkedList(root); // root is now [1, null, 2, null, 3, null, 4, null, 5, null, 6]
 */
export const flattenBinaryTreeToLinkedList = (root: TreeNode | null): void => {
	for (let node = root; node; node = node.right) {
		if (!node.left) continue;

		let rightmost = node.left;
		while (rightmost.right) rightmost = rightmost.right;

		rightmost.right = node.right;
		node.right = node.left;
		node.left = null;
	}
};
