import type { TreeNodeWithParent } from "../../structures/tree-node-with-parent";

/**
 * 510. Inorder Successor in BST II
 *
 * Given a node of a binary search tree whose nodes link to their parents,
 * but not the root, returns the node's inorder successor (the next larger
 * value), or `null` if it has none.
 *
 * With a right subtree, the successor is its leftmost node. Otherwise it's
 * the first ancestor reached from a left child. Neither case compares
 * values, as the follow-up asks.
 *
 * @see https://leetcode.com/problems/inorder-successor-in-bst-ii/
 * @difficulty Medium
 * @timeComplexity O(h) where h is the height of the tree
 * @spaceComplexity O(1)
 *
 * @example
 * inorderSuccessorInBstII(treeWithParentFromArray([2, 1, 3])?.left ?? null)?.val; // 2
 */
export const inorderSuccessorInBstII = (
	node: TreeNodeWithParent | null,
): TreeNodeWithParent | null => {
	if (!node) return null;

	if (node.right) {
		let successor = node.right;
		while (successor.left) successor = successor.left;
		return successor;
	}

	let child = node;
	while (child.parent && child.parent.right === child) child = child.parent;
	return child.parent;
};
