import type { TreeNode } from "../../structures/tree-node";

/**
 * 637. Average of Levels in Binary Tree
 *
 * Returns the average value of the nodes on each level of a binary tree,
 * top to bottom.
 *
 * Breadth-first search one level at a time.
 *
 * @see https://leetcode.com/problems/average-of-levels-in-binary-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(w) where w is the widest level, excluding the returned array
 *
 * @example
 * averageOfLevelsInBinaryTree(treeFromArray([3, 9, 20, null, null, 15, 7])); // [3, 14.5, 11]
 */
export const averageOfLevelsInBinaryTree = (
	root: TreeNode | null,
): number[] => {
	const averages: number[] = [];
	for (let level = root ? [root] : []; level.length > 0; ) {
		averages.push(
			level.reduce((sum, node) => sum + node.val, 0) / level.length,
		);
		level = level.flatMap((node) =>
			[node.left, node.right].filter((child) => child !== null),
		);
	}
	return averages;
};
