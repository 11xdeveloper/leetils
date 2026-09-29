import type { TreeNode } from "../../structures/tree-node";

/**
 * 653. Two Sum IV - Input is a BST
 *
 * Returns whether two different nodes of a binary search tree have values
 * adding up to `k`.
 *
 * Walks the tree remembering the values seen, and checks each value's
 * complement. The traversal uses an explicit stack, so deep trees don't
 * overflow the call stack.
 *
 * @see https://leetcode.com/problems/two-sum-iv-input-is-a-bst/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * twoSumIVInputIsABst(treeFromArray([5, 3, 6, 2, 4, null, 7]), 9); // true
 */
export const twoSumIVInputIsABst = (
	root: TreeNode | null,
	k: number,
): boolean => {
	const seen = new Set<number>();
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (seen.has(k - node.val)) return true;
		seen.add(node.val);
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}
	return false;
};
