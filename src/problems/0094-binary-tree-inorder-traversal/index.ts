import type { TreeNode } from "../../structures/tree-node";

/**
 * 94. Binary Tree Inorder Traversal
 *
 * Returns the values of a binary tree in inorder: left subtree, node, right
 * subtree.
 *
 * Iterative, with an explicit stack so deep trees can't overflow the call
 * stack: goes as far left as possible, then visits the node and moves to its
 * right subtree.
 *
 * @see https://leetcode.com/problems/binary-tree-inorder-traversal/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * binaryTreeInorderTraversal(treeFromArray([1, null, 2, 3])); // [1, 3, 2]
 */
export const binaryTreeInorderTraversal = (root: TreeNode | null): number[] => {
	const values: number[] = [];
	const stack: TreeNode[] = [];
	let node = root;

	while (node || stack.length > 0) {
		while (node) {
			stack.push(node);
			node = node.left;
		}
		const next = stack.pop();
		if (!next) break;
		values.push(next.val);
		node = next.right;
	}

	return values;
};
