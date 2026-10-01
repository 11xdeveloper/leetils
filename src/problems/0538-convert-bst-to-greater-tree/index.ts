import type { TreeNode } from "../../structures/tree-node";

/**
 * 538. Convert BST to Greater Tree
 *
 * Changes every value in a binary search tree (with distinct values) to
 * itself plus the sum of all larger values. The tree is modified in place
 * and its root returned.
 *
 * A reverse inorder traversal (right, node, left) visits values from
 * largest to smallest, so a running total is exactly what each node needs.
 * The traversal uses an explicit stack, so deep trees don't overflow the
 * call stack.
 *
 * @see https://leetcode.com/problems/convert-bst-to-greater-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * treeToArray(convertBstToGreaterTree(treeFromArray([0, null, 1]))); // [1, null, 1]
 */
export const convertBstToGreaterTree = (
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
