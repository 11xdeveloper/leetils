import type { NaryTreeNode } from "../../structures/nary-tree-node";

/**
 * 429. N-ary Tree Level Order Traversal
 *
 * Returns the values of an N-ary tree level by level, from the root down,
 * each level from left to right.
 *
 * Breadth-first search, one whole level at a time.
 *
 * @see https://leetcode.com/problems/n-ary-tree-level-order-traversal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * nAryTreeLevelOrderTraversal(naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6])); // [[1], [3, 2, 4], [5, 6]]
 */
export const nAryTreeLevelOrderTraversal = (
	root: NaryTreeNode | null,
): number[][] => {
	const levels: number[][] = [];
	let level = root ? [root] : [];

	while (level.length > 0) {
		levels.push(level.map((node) => node.val));
		level = level.flatMap((node) => node.children);
	}

	return levels;
};
