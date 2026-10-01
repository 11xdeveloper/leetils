import type { NaryTreeNode } from "../../structures/nary-tree-node";

/**
 * 590. N-ary Tree Postorder Traversal
 *
 * Returns the values of an N-ary tree in postorder: each node's children's
 * subtrees from left to right, then the node.
 *
 * Iterative, as the follow-up asks: a node-first traversal that visits
 * children right to left gives exactly the reverse of postorder.
 *
 * @see https://leetcode.com/problems/n-ary-tree-postorder-traversal/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * nAryTreePostorderTraversal(naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6])); // [5, 6, 3, 2, 4, 1]
 */
export const nAryTreePostorderTraversal = (
	root: NaryTreeNode | null,
): number[] => {
	const values: number[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		values.push(node.val);
		stack.push(...node.children);
	}
	return values.reverse();
};
