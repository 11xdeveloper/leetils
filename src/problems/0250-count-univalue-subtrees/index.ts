import type { TreeNode } from "../../structures/tree-node";

/**
 * 250. Count Univalue Subtrees
 *
 * Returns how many subtrees of a binary tree have every node holding the
 * same value. Each node's subtree is it and all its descendants.
 *
 * A subtree is uni-value when both child subtrees are (or are empty) and
 * hold the node's own value. Visits children before parents (postorder) with
 * an explicit stack, so deep trees can't overflow the call stack.
 *
 * @see https://leetcode.com/problems/count-univalue-subtrees/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countUnivalueSubtrees(treeFromArray([5, 1, 5, 5, 5, null, 5])); // 4
 */
export const countUnivalueSubtrees = (root: TreeNode | null): number => {
	// Visiting node, right, left and then reversing gives postorder.
	const order: TreeNode[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		order.push(node);
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}

	const uniform = new Set<TreeNode>();
	for (const node of order.reverse()) {
		const leftMatches =
			!node.left || (uniform.has(node.left) && node.left.val === node.val);
		const rightMatches =
			!node.right || (uniform.has(node.right) && node.right.val === node.val);
		if (leftMatches && rightMatches) uniform.add(node);
	}

	return uniform.size;
};
