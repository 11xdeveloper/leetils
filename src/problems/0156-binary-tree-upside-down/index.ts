import type { TreeNode } from "../../structures/tree-node";

/**
 * 156. Binary Tree Upside Down
 *
 * Turns a binary tree upside down and returns the new root. In the given
 * trees, every right node is a leaf with a left sibling. Level by level,
 * each left child becomes its parent's parent: the original left child
 * becomes the new root, the original root becomes its right child, and the
 * original right child becomes its left child. The nodes are relinked, so
 * the input tree is modified.
 *
 * Walks down the left spine, relinking each node to point at its old parent
 * (as its right child) and its old parent's right child (as its left child).
 *
 * @see https://leetcode.com/problems/binary-tree-upside-down/
 * @difficulty Medium
 * @timeComplexity O(h) where h is the height of the tree
 * @spaceComplexity O(1)
 *
 * @example
 * treeToArray(binaryTreeUpsideDown(treeFromArray([1, 2, 3, 4, 5]))); // [4, 5, 2, null, null, 3, 1]
 */
export const binaryTreeUpsideDown = (
	root: TreeNode | null,
): TreeNode | null => {
	let node = root;
	let parent: TreeNode | null = null;
	let parentRight: TreeNode | null = null;

	while (node) {
		const left: TreeNode | null = node.left;
		const right: TreeNode | null = node.right;
		node.left = parentRight;
		node.right = parent;
		parent = node;
		parentRight = right;
		node = left;
	}

	return parent;
};
