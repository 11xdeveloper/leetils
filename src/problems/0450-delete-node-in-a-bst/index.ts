import type { TreeNode } from "../../structures/tree-node";

/**
 * 450. Delete Node in a BST
 *
 * Removes the node with value `key` (if any) from a binary search tree and
 * returns the root, keeping it a valid binary search tree. The tree is
 * modified in place.
 *
 * Finds the node by walking down from the root. A node with at most one
 * child is replaced by that child. A node with two children takes the value
 * of its inorder successor (the leftmost node of its right subtree), which
 * is then removed from there instead. No recursion is used.
 *
 * @see https://leetcode.com/problems/delete-node-in-a-bst/
 * @difficulty Medium
 * @timeComplexity O(h) where h is the height of the tree
 * @spaceComplexity O(1)
 *
 * @example
 * treeToArray(deleteNodeInABst(treeFromArray([5, 3, 6, 2, 4, null, 7]), 3)); // [5, 4, 6, 2, null, null, 7]
 */
export const deleteNodeInABst = (
	root: TreeNode | null,
	key: number,
): TreeNode | null => {
	let parent: TreeNode | null = null;
	let node = root;
	while (node && node.val !== key) {
		parent = node;
		node = key < node.val ? node.left : node.right;
	}
	if (!node) return root;

	let replacement: TreeNode | null;
	if (!node.left || !node.right) {
		replacement = node.left ?? node.right;
	} else {
		// Unlink the successor from the right subtree and move its value up.
		let successorParent = node;
		let successor = node.right;
		while (successor.left) {
			successorParent = successor;
			successor = successor.left;
		}
		if (successorParent === node) successorParent.right = successor.right;
		else successorParent.left = successor.right;
		node.val = successor.val;
		return root;
	}

	if (!parent) return replacement;
	if (parent.left === node) parent.left = replacement;
	else parent.right = replacement;
	return root;
};
