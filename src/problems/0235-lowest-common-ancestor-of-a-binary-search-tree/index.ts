import type { TreeNode } from "../../structures/tree-node";

/**
 * 235. Lowest Common Ancestor of a Binary Search Tree
 *
 * Returns the lowest node in a binary search tree that has both `p` and `q`
 * as descendants, where a node counts as a descendant of itself.
 *
 * Walks down from the root: while both values are smaller than the current
 * node's, the answer is to the left; while both are larger, it's to the
 * right. The first node where they split (or that is one of them) is the
 * answer.
 *
 * @see https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
 * @difficulty Medium
 * @timeComplexity O(h) where h is the height of the tree
 * @spaceComplexity O(1)
 *
 * @example
 * lowestCommonAncestorOfABinarySearchTree(root, p, q); // the node where the paths to p and q split
 */
export const lowestCommonAncestorOfABinarySearchTree = (
	root: TreeNode | null,
	p: TreeNode,
	q: TreeNode,
): TreeNode | null => {
	let node = root;

	while (node) {
		if (p.val < node.val && q.val < node.val) node = node.left;
		else if (p.val > node.val && q.val > node.val) node = node.right;
		else return node;
	}

	return null;
};
