import type { TreeNode } from "../../structures/tree-node";

/**
 * 515. Find Largest Value in Each Tree Row
 *
 * Returns the largest value in each row of a binary tree, top to bottom.
 *
 * Breadth-first search one row at a time, keeping each row's maximum.
 *
 * @see https://leetcode.com/problems/find-largest-value-in-each-tree-row/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(w) where w is the widest row, excluding the returned array
 *
 * @example
 * findLargestValueInEachTreeRow(treeFromArray([1, 3, 2, 5, 3, null, 9])); // [1, 3, 9]
 */
export const findLargestValueInEachTreeRow = (
	root: TreeNode | null,
): number[] => {
	const largest: number[] = [];
	let row = root ? [root] : [];

	while (row.length > 0) {
		const next: TreeNode[] = [];
		let max = Number.NEGATIVE_INFINITY;
		for (const node of row) {
			max = Math.max(max, node.val);
			if (node.left) next.push(node.left);
			if (node.right) next.push(node.right);
		}
		largest.push(max);
		row = next;
	}

	return largest;
};
