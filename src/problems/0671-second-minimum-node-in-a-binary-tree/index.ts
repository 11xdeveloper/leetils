import type { TreeNode } from "../../structures/tree-node";

/**
 * 671. Second Minimum Node In a Binary Tree
 *
 * In this special binary tree every node has zero or two children, and a
 * node with children holds the smaller of their values. Returns the second
 * smallest distinct value, or -1 if there isn't one.
 *
 * The root holds the minimum. Searching down, a node larger than the root
 * is a candidate and nothing below it can be smaller, so only nodes equal
 * to the root need their children explored.
 *
 * @see https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * secondMinimumNodeInABinaryTree(treeFromArray([2, 2, 5, null, null, 5, 7])); // 5
 */
export const secondMinimumNodeInABinaryTree = (
	root: TreeNode | null,
): number => {
	if (!root) return -1;
	let second = Number.POSITIVE_INFINITY;
	const stack = [root];
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (node.val > root.val) {
			second = Math.min(second, node.val);
			continue;
		}
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}
	return second === Number.POSITIVE_INFINITY ? -1 : second;
};
