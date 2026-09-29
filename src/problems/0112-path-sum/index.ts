import type { TreeNode } from "../../structures/tree-node";

/**
 * 112. Path Sum
 *
 * Returns whether some path from the root down to a leaf has values adding up
 * to `targetSum`.
 *
 * Depth-first search with an explicit stack of nodes and the sums of the
 * paths leading to them.
 *
 * @see https://leetcode.com/problems/path-sum/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * pathSum(treeFromArray([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]), 22); // true
 */
export const pathSum = (root: TreeNode | null, targetSum: number): boolean => {
	const stack: [TreeNode, number][] = root ? [[root, root.val]] : [];

	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, sum] = entry;
		if (!node.left && !node.right && sum === targetSum) return true;
		if (node.right) stack.push([node.right, sum + node.right.val]);
		if (node.left) stack.push([node.left, sum + node.left.val]);
	}

	return false;
};
