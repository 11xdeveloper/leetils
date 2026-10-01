import type { TreeNode } from "../../structures/tree-node";

/**
 * 1161. Maximum Level Sum of a Binary Tree
 *
 * With the root at level 1, returns the smallest level whose values have the
 * largest sum.
 *
 * Breadth-first search, summing one level at a time.
 *
 * @see https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(w) for the widest level w
 *
 * @example
 * maximumLevelSumOfABinaryTree(treeFromArray([1, 7, 0, 7, -8, null, null])); // 2
 */
export const maximumLevelSumOfABinaryTree = (root: TreeNode | null): number => {
	let [best, bestLevel] = [-Infinity, 0];
	let level = root ? [root] : [];
	for (let depth = 1; level.length > 0; depth++) {
		let sum = 0;
		const next: TreeNode[] = [];
		for (const node of level) {
			sum += node.val;
			if (node.left) next.push(node.left);
			if (node.right) next.push(node.right);
		}
		if (sum > best) [best, bestLevel] = [sum, depth];
		level = next;
	}
	return bestLevel;
};
