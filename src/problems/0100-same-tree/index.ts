import type { TreeNode } from "../../structures/tree-node";

/**
 * 100. Same Tree
 *
 * Returns whether two binary trees have the same shape and the same value at
 * every node.
 *
 * Walks both trees together with an explicit stack of node pairs, so deep
 * trees can't overflow the call stack, and fails at the first difference.
 *
 * @see https://leetcode.com/problems/same-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the trees
 *
 * @example
 * sameTree(treeFromArray([1, 2, 3]), treeFromArray([1, 2, 3])); // true
 */
export const sameTree = (p: TreeNode | null, q: TreeNode | null): boolean => {
	const stack: [TreeNode | null, TreeNode | null][] = [[p, q]];

	for (let pair = stack.pop(); pair; pair = stack.pop()) {
		const [a, b] = pair;
		if (!a && !b) continue;
		if (!a || !b || a.val !== b.val) return false;
		stack.push([a.left, b.left], [a.right, b.right]);
	}

	return true;
};
