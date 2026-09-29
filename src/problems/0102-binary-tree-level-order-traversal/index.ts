import type { TreeNode } from "../../structures/tree-node";

/**
 * 102. Binary Tree Level Order Traversal
 *
 * Returns the values of a binary tree level by level, from the root down,
 * each level from left to right.
 *
 * Breadth-first search, taking one whole level off the queue at a time.
 *
 * @see https://leetcode.com/problems/binary-tree-level-order-traversal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * binaryTreeLevelOrderTraversal(treeFromArray([3, 9, 20, null, null, 15, 7])); // [[3], [9, 20], [15, 7]]
 */
export const binaryTreeLevelOrderTraversal = (
	root: TreeNode | null,
): number[][] => {
	const levels: number[][] = [];
	let level = root ? [root] : [];

	while (level.length > 0) {
		levels.push(level.map((node) => node.val));
		level = level.flatMap((node) =>
			[node.left, node.right].filter((child) => child !== null),
		);
	}

	return levels;
};
