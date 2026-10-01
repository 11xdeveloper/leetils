import type { TreeNode } from "../../structures/tree-node";

/**
 * 101. Symmetric Tree
 *
 * Returns whether a binary tree is a mirror image of itself around its
 * center.
 *
 * Compares the tree with its own mirror image: each pair of nodes that should
 * match (the outer children, then the inner children) goes on a stack
 * together.
 *
 * @see https://leetcode.com/problems/symmetric-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * symmetricTree(treeFromArray([1, 2, 2, 3, 4, 4, 3])); // true
 */
export const symmetricTree = (root: TreeNode | null): boolean => {
	const stack: [TreeNode | null, TreeNode | null][] = [
		[root?.left ?? null, root?.right ?? null],
	];

	for (let pair = stack.pop(); pair; pair = stack.pop()) {
		const [a, b] = pair;
		if (!a && !b) continue;
		if (!a || !b || a.val !== b.val) return false;
		stack.push([a.left, b.right], [a.right, b.left]);
	}

	return true;
};
