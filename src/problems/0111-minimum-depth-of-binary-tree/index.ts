import type { TreeNode } from "../../structures/tree-node";

/**
 * 111. Minimum Depth of Binary Tree
 *
 * Returns the number of nodes on the shortest path from the root down to a
 * leaf (a node with no children), or 0 for an empty tree.
 *
 * Breadth-first search, stopping at the first leaf, so deeper levels are
 * never visited.
 *
 * @see https://leetcode.com/problems/minimum-depth-of-binary-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumDepthOfBinaryTree(treeFromArray([3, 9, 20, null, null, 15, 7])); // 2
 */
export const minimumDepthOfBinaryTree = (root: TreeNode | null): number => {
	let depth = 0;
	let level = root ? [root] : [];

	while (level.length > 0) {
		depth++;
		if (level.some((node) => !node.left && !node.right)) return depth;
		level = level.flatMap((node) =>
			[node.left, node.right].filter((child) => child !== null),
		);
	}

	return depth;
};
