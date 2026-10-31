import type { TreeNode } from "../../structures/tree-node";

/**
 * 3319. K-th Largest Perfect Subtree Size in Binary Tree
 *
 * The size of the k-th largest perfect binary subtree (every level full),
 * or -1 if there are fewer than `k`.
 *
 * Recurse, returning each subtree's height if it's perfect (both children
 * perfect with equal heights) and -1 otherwise, collecting the sizes.
 *
 * @see https://leetcode.com/problems/k-th-largest-perfect-subtree-size-in-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * kThLargestPerfectSubtreeSizeInBinaryTree(treeFromArray([5, 3, 6, 5, 2, 5, 7, 1, 8, null, null, 6, 8]), 2); // 3
 */
export const kThLargestPerfectSubtreeSizeInBinaryTree = (
	root: TreeNode | null,
	k: number,
): number => {
	const sizes: number[] = [];
	const height = (node: TreeNode | null): number => {
		if (!node) return 0;
		const left = height(node.left);
		const right = height(node.right);
		if (left === -1 || left !== right) return -1;
		sizes.push(2 ** (left + 1) - 1);
		return left + 1;
	};
	height(root);
	sizes.sort((a, b) => b - a);
	return sizes[k - 1] ?? -1;
};
