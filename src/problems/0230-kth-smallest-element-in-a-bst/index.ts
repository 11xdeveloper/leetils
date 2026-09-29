import type { TreeNode } from "../../structures/tree-node";

/**
 * 230. Kth Smallest Element in a BST
 *
 * Returns the `k`th smallest value (counting from 1) in a binary search
 * tree.
 *
 * An inorder traversal visits a binary search tree's values in ascending
 * order, so it walks one with an explicit stack and stops at the `k`th
 * value, without visiting the rest of the tree.
 *
 * @see https://leetcode.com/problems/kth-smallest-element-in-a-bst/
 * @difficulty Medium
 * @timeComplexity O(h + k) where h is the height of the tree
 * @spaceComplexity O(h)
 *
 * @example
 * kthSmallestElementInABst(treeFromArray([3, 1, 4, null, 2]), 1); // 1
 */
export const kthSmallestElementInABst = (
	root: TreeNode | null,
	k: number,
): number => {
	const stack: TreeNode[] = [];
	let node = root;
	let remaining = k;

	while (node || stack.length > 0) {
		while (node) {
			stack.push(node);
			node = node.left;
		}
		const next = stack.pop();
		if (!next) break;
		remaining--;
		if (remaining === 0) return next.val;
		node = next.right;
	}

	return 0;
};
