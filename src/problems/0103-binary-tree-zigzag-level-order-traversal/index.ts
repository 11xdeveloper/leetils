import type { TreeNode } from "../../structures/tree-node";

/**
 * 103. Binary Tree Zigzag Level Order Traversal
 *
 * Returns the values of a binary tree level by level, from the root down,
 * alternating direction: the first level left to right, the next right to
 * left, and so on.
 *
 * Breadth-first search, one level at a time, reversing every other level's
 * values.
 *
 * @see https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * binaryTreeZigzagLevelOrderTraversal(treeFromArray([3, 9, 20, null, null, 15, 7])); // [[3], [20, 9], [15, 7]]
 */
export const binaryTreeZigzagLevelOrderTraversal = (
	root: TreeNode | null,
): number[][] => {
	const levels: number[][] = [];
	let level = root ? [root] : [];

	while (level.length > 0) {
		const values = level.map((node) => node.val);
		levels.push(levels.length % 2 === 0 ? values : values.reverse());
		level = level.flatMap((node) =>
			[node.left, node.right].filter((child) => child !== null),
		);
	}

	return levels;
};
