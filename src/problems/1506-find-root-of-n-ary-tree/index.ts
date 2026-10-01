import type { NaryTreeNode } from "../../structures/nary-tree-node";

/**
 * 1506. Find Root of N-Ary Tree
 *
 * Given every node of an N-ary tree (with distinct values) in any order,
 * returns the root.
 *
 * Every node but the root appears once as a child. XORing all the values
 * and then all the children's values cancels everything except the root's
 * value, using constant extra space.
 *
 * @see https://leetcode.com/problems/find-root-of-n-ary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findRootOfNAryTree(nodes)?.val; // the root's value
 */
export const findRootOfNAryTree = (
	tree: readonly NaryTreeNode[],
): NaryTreeNode | null => {
	let value = 0;
	for (const node of tree) {
		value ^= node.val;
		for (const child of node.children) value ^= child.val;
	}
	return tree.find((node) => node.val === value) ?? null;
};
