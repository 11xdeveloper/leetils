import type { TreeNode } from "../../structures/tree-node";

/**
 * 965. Univalued Binary Tree
 *
 * Returns whether every node of a binary tree holds the same value.
 *
 * Compares every node with the root, walking with an explicit stack.
 *
 * @see https://leetcode.com/problems/univalued-binary-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * univaluedBinaryTree(treeFromArray([1, 1, 1, 1, 1, null, 1])); // true
 */
export const univaluedBinaryTree = (root: TreeNode | null): boolean => {
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (node.val !== root?.val) return false;
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}
	return true;
};
