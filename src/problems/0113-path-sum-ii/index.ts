import type { TreeNode } from "../../structures/tree-node";

/**
 * 113. Path Sum II
 *
 * Returns the values along every path from the root down to a leaf that adds
 * up to `targetSum`, in left-to-right order.
 *
 * Depth-first search that keeps the current path, copying it whenever a leaf
 * completes a matching sum.
 *
 * @see https://leetcode.com/problems/path-sum-ii/
 * @difficulty Medium
 * @timeComplexity O(n * h) where h is the height of the tree
 * @spaceComplexity O(h) excluding the returned paths
 *
 * @example
 * pathSumII(treeFromArray([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]), 22); // [[5, 4, 11, 2], [5, 8, 4, 5]]
 */
export const pathSumII = (
	root: TreeNode | null,
	targetSum: number,
): number[][] => {
	const paths: number[][] = [];
	const path: number[] = [];

	const search = (node: TreeNode | null, remaining: number): void => {
		if (!node) return;
		path.push(node.val);
		const left = remaining - node.val;
		if (!node.left && !node.right && left === 0) paths.push([...path]);
		search(node.left, left);
		search(node.right, left);
		path.pop();
	};

	search(root, targetSum);
	return paths;
};
