import type { TreeNode } from "../../structures/tree-node";

/**
 * 404. Sum of Left Leaves
 *
 * Returns the sum of every leaf in a binary tree that is the left child of
 * its parent.
 *
 * Walks the tree with an explicit stack, adding each left child that has no
 * children of its own.
 *
 * @see https://leetcode.com/problems/sum-of-left-leaves/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * sumOfLeftLeaves(treeFromArray([3, 9, 20, null, null, 15, 7])); // 24: 9 + 15
 */
export const sumOfLeftLeaves = (root: TreeNode | null): number => {
	let sum = 0;
	const stack = root ? [root] : [];

	for (let node = stack.pop(); node; node = stack.pop()) {
		const left = node.left;
		if (left && !left.left && !left.right) sum += left.val;
		else if (left) stack.push(left);
		if (node.right) stack.push(node.right);
	}

	return sum;
};
