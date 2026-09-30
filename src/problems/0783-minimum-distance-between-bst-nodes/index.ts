import type { TreeNode } from "../../structures/tree-node";

/**
 * 783. Minimum Distance Between BST Nodes
 *
 * Returns the smallest difference between the values of any two nodes in a
 * binary search tree with at least two nodes.
 *
 * An inorder traversal visits values in sorted order, so the closest pair
 * is consecutive in it. It uses an explicit stack, so deep trees don't
 * overflow the call stack.
 *
 * @see https://leetcode.com/problems/minimum-distance-between-bst-nodes/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * minimumDistanceBetweenBstNodes(treeFromArray([4, 2, 6, 1, 3])); // 1
 */
export const minimumDistanceBetweenBstNodes = (
	root: TreeNode | null,
): number => {
	let smallest = Number.POSITIVE_INFINITY;
	let previous = Number.NEGATIVE_INFINITY;
	const stack: TreeNode[] = [];
	for (let node = root; node || stack.length > 0; ) {
		for (; node; node = node.left) stack.push(node);
		const current = stack.pop();
		if (!current) break;
		smallest = Math.min(smallest, current.val - previous);
		previous = current.val;
		node = current.right;
	}
	return smallest;
};
