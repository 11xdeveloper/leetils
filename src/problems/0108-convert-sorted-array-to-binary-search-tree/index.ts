import { TreeNode } from "../../structures/tree-node";

/**
 * 108. Convert Sorted Array to Binary Search Tree
 *
 * Builds a height-balanced binary search tree from an array sorted in
 * ascending order. In a height-balanced tree, the depths of every node's two
 * subtrees differ by at most one.
 *
 * The middle value becomes the root, and each half of the array becomes a
 * subtree the same way.
 *
 * @see https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(log n) excluding the returned tree
 *
 * @example
 * convertSortedArrayToBinarySearchTree([-10, -3, 0, 5, 9]); // a tree like [0, -10, 5, null, -3, null, 9]
 */
export const convertSortedArrayToBinarySearchTree = (
	nums: readonly number[],
): TreeNode | null => {
	const build = (low: number, high: number): TreeNode | null => {
		if (low > high) return null;
		const mid = Math.floor((low + high) / 2);
		return new TreeNode(
			nums[mid] ?? 0,
			build(low, mid - 1),
			build(mid + 1, high),
		);
	};

	return build(0, nums.length - 1);
};
