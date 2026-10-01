import type { TreeNode } from "../../structures/tree-node";

/**
 * 1302. Deepest Leaves Sum
 *
 * Returns the sum of the values on the deepest level of a binary tree.
 *
 * Breadth-first search, keeping the sum of the last level visited.
 *
 * @see https://leetcode.com/problems/deepest-leaves-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(w) for the widest level w
 *
 * @example
 * deepestLeavesSum(treeFromArray([1, 2, 3, 4, 5, null, 6, 7, null, null, null, null, 8])); // 15
 */
export const deepestLeavesSum = (root: TreeNode | null): number => {
	let level = root ? [root] : [];
	let sum = 0;
	while (level.length > 0) {
		sum = 0;
		const next: TreeNode[] = [];
		for (const node of level) {
			sum += node.val;
			if (node.left) next.push(node.left);
			if (node.right) next.push(node.right);
		}
		level = next;
	}
	return sum;
};
