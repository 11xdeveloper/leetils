import { TreeNode } from "../../structures/tree-node";

/**
 * 105. Construct Binary Tree from Preorder and Inorder Traversal
 *
 * Rebuilds a binary tree with distinct values from its preorder and inorder
 * traversals.
 *
 * The next value in preorder is the root of the current subtree, and its
 * position in inorder splits the remaining values into the left and right
 * subtrees. A map from value to inorder position makes each split constant
 * time.
 *
 * @see https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * constructBinaryTreeFromPreorderAndInorderTraversal([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
 * // the tree [3, 9, 20, null, null, 15, 7]
 */
export const constructBinaryTreeFromPreorderAndInorderTraversal = (
	preorder: readonly number[],
	inorder: readonly number[],
): TreeNode | null => {
	const inorderIndex = new Map(inorder.map((value, i) => [value, i]));
	let next = 0;

	const build = (low: number, high: number): TreeNode | null => {
		if (low > high) return null;
		const value = preorder[next++] ?? 0;
		const split = inorderIndex.get(value) ?? low;
		const left = build(low, split - 1);
		const right = build(split + 1, high);
		return new TreeNode(value, left, right);
	};

	return build(0, inorder.length - 1);
};
