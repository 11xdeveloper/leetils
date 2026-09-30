import { TreeNode } from "../../structures/tree-node";

/**
 * 701. Insert into a Binary Search Tree
 *
 * Inserts `val`, which isn't already in the tree, into a binary search tree
 * and returns the root. The tree is modified in place; an empty tree
 * becomes a single node.
 *
 * Walks down from the root to the empty spot where `val` belongs and
 * attaches a new leaf there.
 *
 * @see https://leetcode.com/problems/insert-into-a-binary-search-tree/
 * @difficulty Medium
 * @timeComplexity O(h) where h is the height of the tree
 * @spaceComplexity O(1)
 *
 * @example
 * treeToArray(insertIntoABinarySearchTree(treeFromArray([4, 2, 7, 1, 3]), 5)); // [4, 2, 7, 1, 3, 5]
 */
export const insertIntoABinarySearchTree = (
	root: TreeNode | null,
	val: number,
): TreeNode | null => {
	const leaf = new TreeNode(val);
	if (!root) return leaf;
	for (let node = root; ; ) {
		const side = val < node.val ? "left" : "right";
		const child = node[side];
		if (!child) {
			node[side] = leaf;
			return root;
		}
		node = child;
	}
};
