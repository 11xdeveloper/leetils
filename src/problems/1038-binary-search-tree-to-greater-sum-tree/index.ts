import type { TreeNode } from "../../structures/tree-node";

/**
 * 1038. Binary Search Tree to Greater Sum Tree
 *
 * Replaces every value in a binary search tree (distinct values) with
 * itself plus the sum of all larger values, in place, and returns the root.
 *
 * A reverse inorder traversal visits values from largest to smallest, so a
 * running total is what each node needs. It uses an explicit stack.
 *
 * @see https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * treeToArray(binarySearchTreeToGreaterSumTree(treeFromArray([0, null, 1]))); // [1, null, 1]
 */
export const binarySearchTreeToGreaterSumTree = (
	root: TreeNode | null,
): TreeNode | null => {
	let total = 0;
	const stack: TreeNode[] = [];
	for (let node = root; node || stack.length > 0; ) {
		for (; node; node = node.right) stack.push(node);
		const current = stack.pop();
		if (!current) break;
		total += current.val;
		current.val = total;
		node = current.left;
	}
	return root;
};
