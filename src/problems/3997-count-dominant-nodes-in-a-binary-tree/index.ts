import type { TreeNode } from "../../structures/tree-node";

/**
 * 3997. Count Dominant Nodes in a Binary Tree
 *
 * Counts the nodes whose value is the largest in their own subtree.
 *
 * Post-order: each subtree reports its maximum.
 *
 * @see https://leetcode.com/problems/count-dominant-nodes-in-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(h)
 *
 * @example
 * countDominantNodesInABinaryTree(treeFromArray([5, 3, 8, 2, 4, 7, 1])); // 5
 */
export const countDominantNodesInABinaryTree = (
	root: TreeNode | null,
): number => {
	let count = 0;
	const largest = (node: TreeNode | null): number => {
		if (!node) return Number.NEGATIVE_INFINITY;
		const below = Math.max(largest(node.left), largest(node.right));
		if (node.val >= below) count++;
		return Math.max(node.val, below);
	};
	largest(root);
	return count;
};
