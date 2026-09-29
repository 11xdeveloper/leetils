import { TreeNode } from "../../structures/tree-node";

/**
 * 106. Construct Binary Tree from Inorder and Postorder Traversal
 *
 * Rebuilds a binary tree with distinct values from its inorder and postorder
 * traversals.
 *
 * Read backwards, postorder gives each subtree's root before its right and
 * then left subtrees. The root's position in inorder splits the remaining
 * values into the two subtrees. A map from value to inorder position makes
 * each split constant time.
 *
 * @see https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * constructBinaryTreeFromInorderAndPostorderTraversal([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]);
 * // the tree [3, 9, 20, null, null, 15, 7]
 */
export const constructBinaryTreeFromInorderAndPostorderTraversal = (
	inorder: readonly number[],
	postorder: readonly number[],
): TreeNode | null => {
	const inorderIndex = new Map(inorder.map((value, i) => [value, i]));
	let next = postorder.length - 1;

	const build = (low: number, high: number): TreeNode | null => {
		if (low > high) return null;
		const value = postorder[next--] ?? 0;
		const split = inorderIndex.get(value) ?? low;
		const right = build(split + 1, high);
		const left = build(low, split - 1);
		return new TreeNode(value, left, right);
	};

	return build(0, inorder.length - 1);
};
