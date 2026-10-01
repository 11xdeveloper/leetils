import { QuadTreeNode } from "../../structures/quad-tree-node";

/**
 * 427. Construct Quad Tree
 *
 * Builds a quad tree for an n×n grid of 0s and 1s, where n is a power of 2.
 * A region of one value becomes a leaf; any other region splits into four
 * quarters.
 *
 * Builds bottom-up: the four children of a region are built first, and if
 * they're all leaves with the same value they merge into one leaf. That
 * visits each cell once, rather than rescanning regions to check whether
 * they're uniform. Non-leaf nodes get the value `true`, matching LeetCode's
 * examples (any value is accepted).
 *
 * @see https://leetcode.com/problems/construct-quad-tree/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2) for the tree
 *
 * @example
 * quadTreeToArray(constructQuadTree([[0, 1], [1, 0]])); // [[0, 1], [1, 0], [1, 1], [1, 1], [1, 0]]
 */
export const constructQuadTree = (
	grid: readonly (readonly number[])[],
): QuadTreeNode => {
	const build = (top: number, left: number, size: number): QuadTreeNode => {
		if (size === 1) return new QuadTreeNode(grid[top]?.[left] === 1, true);

		const half = size / 2;
		const children = [
			build(top, left, half),
			build(top, left + half, half),
			build(top + half, left, half),
			build(top + half, left + half, half),
		] as const;
		if (
			children.every((child) => child.isLeaf && child.val === children[0].val)
		) {
			return new QuadTreeNode(children[0].val, true);
		}
		return new QuadTreeNode(true, false, ...children);
	};

	return build(0, 0, grid.length);
};
