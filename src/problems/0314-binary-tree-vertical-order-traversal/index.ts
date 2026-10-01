import type { TreeNode } from "../../structures/tree-node";

/**
 * 314. Binary Tree Vertical Order Traversal
 *
 * Returns a binary tree's values column by column, from left to right, where
 * a left child is one column left of its parent and a right child one
 * column right. Within a column, values are top to bottom, and left to right
 * within a row.
 *
 * Breadth-first search, recording each node's column. Visiting level by
 * level, left to right, puts each column's values in the required order
 * without sorting.
 *
 * @see https://leetcode.com/problems/binary-tree-vertical-order-traversal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * binaryTreeVerticalOrderTraversal(treeFromArray([3, 9, 20, null, null, 15, 7])); // [[9], [3, 15], [20], [7]]
 */
export const binaryTreeVerticalOrderTraversal = (
	root: TreeNode | null,
): number[][] => {
	const columns = new Map<number, number[]>();
	const queue: [TreeNode, number][] = root ? [[root, 0]] : [];

	for (let head = 0; head < queue.length; head++) {
		const [node, column] = queue[head] ?? [];
		if (!node || column === undefined) break;
		const values = columns.get(column);
		if (values) values.push(node.val);
		else columns.set(column, [node.val]);
		if (node.left) queue.push([node.left, column - 1]);
		if (node.right) queue.push([node.right, column + 1]);
	}

	return [...columns].toSorted(([a], [b]) => a - b).map(([, values]) => values);
};
