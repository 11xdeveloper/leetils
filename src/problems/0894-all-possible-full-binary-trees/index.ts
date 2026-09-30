import { TreeNode } from "../../structures/tree-node";

/**
 * 894. All Possible Full Binary Trees
 *
 * Returns every full binary tree (each node has zero or two children) with
 * `n` nodes, all holding 0.
 *
 * A full tree of `n` nodes is a root over a full left subtree of `i` nodes
 * and a full right subtree of `n - 1 - i`, both odd. Shapes are built from
 * smaller ones; each returned tree is copied so no nodes are shared between
 * trees.
 *
 * @see https://leetcode.com/problems/all-possible-full-binary-trees/
 * @difficulty Medium
 * @timeComplexity O(n · C((n - 1) / 2)) where C is the Catalan number counting the trees
 * @spaceComplexity O(n · C((n - 1) / 2))
 *
 * @example
 * allPossibleFullBinaryTrees(3).map(treeToArray); // [[0, 0, 0]]
 */
export const allPossibleFullBinaryTrees = (n: number): (TreeNode | null)[] => {
	if (n % 2 === 0) return [];
	const copy = (node: TreeNode | null): TreeNode | null =>
		node ? new TreeNode(0, copy(node.left), copy(node.right)) : null;

	const shapes: TreeNode[][] = [[], [new TreeNode(0)]];
	for (let size = 3; size <= n; size += 2) {
		const trees: TreeNode[] = [];
		for (let left = 1; left < size; left += 2) {
			for (const leftTree of shapes[left] ?? []) {
				for (const rightTree of shapes[size - 1 - left] ?? [])
					trees.push(new TreeNode(0, leftTree, rightTree));
			}
		}
		shapes[size] = trees;
	}
	return (shapes[n] ?? []).map(copy);
};
