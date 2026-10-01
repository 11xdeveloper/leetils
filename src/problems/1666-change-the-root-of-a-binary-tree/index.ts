import type { TreeNodeWithParent } from "../../structures/tree-node-with-parent";

/**
 * 1666. Change the Root of a Binary Tree
 *
 * Reroots the tree at `leaf`: walking from the leaf up to (not including)
 * the root, each node moves its left child to the right and takes its old
 * parent as its left child, which in turn drops its link to the node.
 * Returns the new root with every `parent` pointer updated.
 *
 * Walks up from the leaf once, remembering the previous node so it becomes
 * the new parent.
 *
 * @see https://leetcode.com/problems/change-the-root-of-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(h)
 * @spaceComplexity O(1)
 *
 * @example
 * changeTheRootOfABinaryTree(root, nodeWithValue7).val; // 7
 */
export const changeTheRootOfABinaryTree = (
	root: TreeNodeWithParent,
	leaf: TreeNodeWithParent,
): TreeNodeWithParent => {
	let newParent: TreeNodeWithParent | null = null;
	let cur = leaf;
	while (cur !== root) {
		const parent = cur.parent;
		if (!parent) break;
		if (cur.left) cur.right = cur.left;
		cur.left = parent;
		if (parent.left === cur) parent.left = null;
		else parent.right = null;
		cur.parent = newParent;
		newParent = cur;
		cur = parent;
	}
	root.parent = newParent;
	return leaf;
};
