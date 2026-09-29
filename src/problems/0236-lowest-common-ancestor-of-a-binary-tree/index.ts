import type { TreeNode } from "../../structures/tree-node";

/**
 * 236. Lowest Common Ancestor of a Binary Tree
 *
 * Returns the lowest node in a binary tree that has both `p` and `q` as
 * descendants, where a node counts as a descendant of itself.
 *
 * Records each node's parent with an explicit stack (so deep trees can't
 * overflow the call stack) until both targets are found, then collects
 * `p`'s ancestors and walks up from `q` to the first one they share.
 *
 * @see https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * lowestCommonAncestorOfABinaryTree(root, p, q); // the deepest node above both p and q
 */
export const lowestCommonAncestorOfABinaryTree = (
	root: TreeNode | null,
	p: TreeNode,
	q: TreeNode,
): TreeNode | null => {
	if (!root) return null;

	const parents = new Map<TreeNode, TreeNode | null>([[root, null]]);
	const stack = [root];
	while (!parents.has(p) || !parents.has(q)) {
		const node = stack.pop();
		if (!node) return null;
		for (const child of [node.left, node.right]) {
			if (child) {
				parents.set(child, node);
				stack.push(child);
			}
		}
	}

	const ancestors = new Set<TreeNode>();
	for (let node: TreeNode | null = p; node; node = parents.get(node) ?? null)
		ancestors.add(node);
	for (let node: TreeNode | null = q; node; node = parents.get(node) ?? null) {
		if (ancestors.has(node)) return node;
	}

	return null;
};
