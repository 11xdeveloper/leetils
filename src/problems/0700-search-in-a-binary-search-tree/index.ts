import type { TreeNode } from "../../structures/tree-node";

/**
 * 700. Search in a Binary Search Tree
 *
 * Returns the node of a binary search tree holding `val` (its whole
 * subtree), or `null` if there's none.
 *
 * Walks down from the root, going left for smaller values and right for
 * larger ones.
 *
 * @see https://leetcode.com/problems/search-in-a-binary-search-tree/
 * @difficulty Easy
 * @timeComplexity O(h) where h is the height of the tree
 * @spaceComplexity O(1)
 *
 * @example
 * treeToArray(searchInABinarySearchTree(treeFromArray([4, 2, 7, 1, 3]), 2)); // [2, 1, 3]
 */
export const searchInABinarySearchTree = (
	root: TreeNode | null,
	val: number,
): TreeNode | null => {
	let node = root;
	while (node && node.val !== val)
		node = val < node.val ? node.left : node.right;
	return node;
};
