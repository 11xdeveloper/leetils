import { QuadTreeNode } from "../../structures/quad-tree-node";

/**
 * 558. Logical OR of Two Binary Grids Represented as Quad-Trees
 *
 * Given quad trees for two binary grids of the same size, returns a quad
 * tree for their bitwise OR, with any four identical leaves merged into
 * one. The result may share nodes with the inputs.
 *
 * If either node is a leaf, the answer is immediate: a leaf of 1s gives
 * 1s, and a leaf of 0s gives the other tree. Otherwise it ORs the four
 * quadrants and merges them if they all come out as the same leaf.
 * Internal nodes get `val = true`, though any value is accepted.
 *
 * @see https://leetcode.com/problems/logical-or-of-two-binary-grids-represented-as-quad-trees/
 * @difficulty Medium
 * @timeComplexity O(n) for n nodes in the two trees
 * @spaceComplexity O(log size) for the recursion
 *
 * @example
 * logicalOrOfTwoBinaryGridsRepresentedAsQuadTrees(quadTree1, quadTree2);
 */
export const logicalOrOfTwoBinaryGridsRepresentedAsQuadTrees = (
	quadTree1: QuadTreeNode | null,
	quadTree2: QuadTreeNode | null,
): QuadTreeNode | null => {
	if (!quadTree1 || !quadTree2) return quadTree1 ?? quadTree2;
	if (quadTree1.isLeaf) return quadTree1.val ? quadTree1 : quadTree2;
	if (quadTree2.isLeaf) return quadTree2.val ? quadTree2 : quadTree1;

	const or = logicalOrOfTwoBinaryGridsRepresentedAsQuadTrees;
	const topLeft = or(quadTree1.topLeft, quadTree2.topLeft);
	const topRight = or(quadTree1.topRight, quadTree2.topRight);
	const bottomLeft = or(quadTree1.bottomLeft, quadTree2.bottomLeft);
	const bottomRight = or(quadTree1.bottomRight, quadTree2.bottomRight);

	const quadrants = [topLeft, topRight, bottomLeft, bottomRight];
	if (quadrants.every((node) => node?.isLeaf && node.val === topLeft?.val)) {
		return new QuadTreeNode(topLeft?.val ?? false, true);
	}
	return new QuadTreeNode(
		true,
		false,
		topLeft,
		topRight,
		bottomLeft,
		bottomRight,
	);
};
