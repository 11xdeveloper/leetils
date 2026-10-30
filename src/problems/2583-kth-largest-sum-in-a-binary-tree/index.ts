import type { TreeNode } from "../../structures/tree-node";

/**
 * 2583. Kth Largest Sum in a Binary Tree
 *
 * Returns the `k`-th largest of the tree's level sums, or -1 if it has
 * fewer than `k` levels.
 *
 * Sum each level with a breadth-first traversal, then sort.
 *
 * @see https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n + h log h), where `h` is the height
 * @spaceComplexity O(n)
 *
 * @example
 * kthLargestSumInABinaryTree(treeFromArray([1, 2, null, 3]), 1); // 3
 */
export const kthLargestSumInABinaryTree = (
	root: TreeNode | null,
	k: number,
): number => {
	const sums: number[] = [];
	for (let level = root ? [root] : []; level.length > 0; ) {
		sums.push(level.reduce((sum, node) => sum + node.val, 0));
		level = level.flatMap((node) =>
			[node.left, node.right].filter((child) => child !== null),
		);
	}
	sums.sort((a, b) => b - a);
	return sums[k - 1] ?? -1;
};
