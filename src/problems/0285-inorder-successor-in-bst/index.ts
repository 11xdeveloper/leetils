import type { TreeNode } from "../../structures/tree-node";

/**
 * 285. Inorder Successor in BST
 *
 * Returns the node in a binary search tree with the smallest value greater
 * than `p`'s, or `null` if `p` has the largest value.
 *
 * Walks down from the root towards `p`'s value. Whenever it goes left, the
 * node it leaves is larger than `p` and becomes the best candidate so far;
 * the last such node is the successor.
 *
 * @see https://leetcode.com/problems/inorder-successor-in-bst/
 * @difficulty Medium
 * @timeComplexity O(h) where h is the height of the tree
 * @spaceComplexity O(1)
 *
 * @example
 * inorderSuccessorInBst(root, p); // the node after p in sorted order, or null
 */
export const inorderSuccessorInBst = (
	root: TreeNode | null,
	p: TreeNode,
): TreeNode | null => {
	let successor: TreeNode | null = null;

	for (let node = root; node; ) {
		if (node.val > p.val) {
			successor = node;
			node = node.left;
		} else {
			node = node.right;
		}
	}

	return successor;
};
