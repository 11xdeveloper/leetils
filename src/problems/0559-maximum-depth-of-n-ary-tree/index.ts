import type { NaryTreeNode } from "../../structures/nary-tree-node";

/**
 * 559. Maximum Depth of N-ary Tree
 *
 * Returns the number of nodes on the longest path from the root of an
 * N-ary tree down to a leaf, or 0 for an empty tree.
 *
 * Breadth-first search, counting the levels.
 *
 * @see https://leetcode.com/problems/maximum-depth-of-n-ary-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(w) where w is the widest level
 *
 * @example
 * maximumDepthOfNAryTree(naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6])); // 3
 */
export const maximumDepthOfNAryTree = (root: NaryTreeNode | null): number => {
	let depth = 0;
	for (
		let level = root ? [root] : [];
		level.length > 0;
		level = level.flatMap((node) => node.children)
	)
		depth++;
	return depth;
};
