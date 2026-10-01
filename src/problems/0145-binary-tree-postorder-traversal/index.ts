import type { TreeNode } from "../../structures/tree-node";

/**
 * 145. Binary Tree Postorder Traversal
 *
 * Returns the values of a binary tree in postorder: left subtree, right
 * subtree, node.
 *
 * Iterative, with an explicit stack so deep trees can't overflow the call
 * stack. Visiting node, right, left gives exactly the reverse of postorder,
 * so it collects values that way and reverses them at the end.
 *
 * @see https://leetcode.com/problems/binary-tree-postorder-traversal/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * binaryTreePostorderTraversal(treeFromArray([1, null, 2, 3])); // [3, 2, 1]
 */
export const binaryTreePostorderTraversal = (
	root: TreeNode | null,
): number[] => {
	const values: number[] = [];
	const stack = root ? [root] : [];

	for (let node = stack.pop(); node; node = stack.pop()) {
		values.push(node.val);
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}

	return values.reverse();
};
