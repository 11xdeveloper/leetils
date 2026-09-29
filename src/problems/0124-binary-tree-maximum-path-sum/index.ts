import type { TreeNode } from "../../structures/tree-node";

/**
 * 124. Binary Tree Maximum Path Sum
 *
 * Returns the largest sum of values along any non-empty path in a binary
 * tree. A path follows parent–child links, visits each node at most once,
 * and doesn't need to pass through the root.
 *
 * The best path through a node, turning there, is its value plus the best
 * downward chain from each child, if positive. Visits children before
 * parents (postorder) with an explicit stack, so each node's best downward
 * chain is ready when its parent needs it and deep trees can't overflow the
 * call stack.
 *
 * @see https://leetcode.com/problems/binary-tree-maximum-path-sum/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * binaryTreeMaximumPathSum(treeFromArray([-10, 9, 20, null, null, 15, 7])); // 42, along 15 → 20 → 7
 */
export const binaryTreeMaximumPathSum = (root: TreeNode | null): number => {
	// Visiting node, right, left and then reversing gives postorder.
	const order: TreeNode[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		order.push(node);
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}

	const downward = new Map<TreeNode, number>();
	let best = Number.NEGATIVE_INFINITY;

	for (const node of order.reverse()) {
		const left = Math.max(0, node.left ? (downward.get(node.left) ?? 0) : 0);
		const right = Math.max(0, node.right ? (downward.get(node.right) ?? 0) : 0);
		best = Math.max(best, node.val + left + right);
		downward.set(node, node.val + Math.max(left, right));
	}

	return best;
};
