import type { TreeNode } from "../../structures/tree-node";

/**
 * 104. Maximum Depth of Binary Tree
 *
 * Returns the number of nodes on the longest path from the root down to a
 * leaf, or 0 for an empty tree.
 *
 * Breadth-first search, counting the levels.
 *
 * @see https://leetcode.com/problems/maximum-depth-of-binary-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumDepthOfBinaryTree(treeFromArray([3, 9, 20, null, null, 15, 7])); // 3
 */
export const maximumDepthOfBinaryTree = (root: TreeNode | null): number => {
	let depth = 0;
	let level = root ? [root] : [];

	while (level.length > 0) {
		depth++;
		level = level.flatMap((node) =>
			[node.left, node.right].filter((child) => child !== null),
		);
	}

	return depth;
};
