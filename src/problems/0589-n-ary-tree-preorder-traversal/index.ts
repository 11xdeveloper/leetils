import type { NaryTreeNode } from "../../structures/nary-tree-node";

/**
 * 589. N-ary Tree Preorder Traversal
 *
 * Returns the values of an N-ary tree in preorder: each node, then its
 * children's subtrees from left to right.
 *
 * Iterative, as the follow-up asks: a stack of nodes, pushing each node's
 * children in reverse so the leftmost is visited next.
 *
 * @see https://leetcode.com/problems/n-ary-tree-preorder-traversal/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * nAryTreePreorderTraversal(naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6])); // [1, 3, 5, 6, 2, 4]
 */
export const nAryTreePreorderTraversal = (
	root: NaryTreeNode | null,
): number[] => {
	const values: number[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		values.push(node.val);
		for (let i = node.children.length - 1; i >= 0; i--) {
			const child = node.children[i];
			if (child) stack.push(child);
		}
	}
	return values;
};
