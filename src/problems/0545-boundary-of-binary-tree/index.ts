import type { TreeNode } from "../../structures/tree-node";

/**
 * 545. Boundary of Binary Tree
 *
 * Returns the boundary of a binary tree anticlockwise from the root: the
 * root, the left boundary, the leaves from left to right, then the right
 * boundary bottom-up. The left boundary follows left children from the
 * root's left child (taking a right child only when there's no left one),
 * stopping before the leaf; the right boundary mirrors it. The root isn't a
 * leaf.
 *
 * Walks down each boundary, then collects the leaves with a preorder
 * traversal using an explicit stack, so deep trees don't overflow the call
 * stack.
 *
 * @see https://leetcode.com/problems/boundary-of-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * boundaryOfBinaryTree(treeFromArray([1, null, 2, 3, 4])); // [1, 3, 4, 2]
 */
export const boundaryOfBinaryTree = (root: TreeNode | null): number[] => {
	if (!root) return [];
	const isLeaf = (node: TreeNode): boolean => !node.left && !node.right;
	if (isLeaf(root)) return [root.val];

	const left: number[] = [];
	for (
		let node = root.left;
		node && !isLeaf(node);
		node = node.left ?? node.right
	)
		left.push(node.val);

	const right: number[] = [];
	for (
		let node = root.right;
		node && !isLeaf(node);
		node = node.right ?? node.left
	)
		right.push(node.val);

	const leaves: number[] = [];
	const stack = [root];
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (node !== root && isLeaf(node)) leaves.push(node.val);
		if (node.right) stack.push(node.right);
		if (node.left) stack.push(node.left);
	}

	return [root.val, ...left, ...leaves, ...right.reverse()];
};
