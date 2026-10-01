import type { TreeNode } from "../../structures/tree-node";

/**
 * 987. Vertical Order Traversal of a Binary Tree
 *
 * Places the root at column 0, each left child one column left and each
 * right child one right. Returns the node values column by column from the
 * left, each column top to bottom, with nodes in the same row and column
 * ordered by value.
 *
 * Records every node's (column, row, value) with an explicit stack, sorts
 * them, and groups by column.
 *
 * @see https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * verticalOrderTraversalOfABinaryTree(treeFromArray([3, 9, 20, null, null, 15, 7])); // [[9], [3, 15], [20], [7]]
 */
export const verticalOrderTraversalOfABinaryTree = (
	root: TreeNode | null,
): number[][] => {
	const entries: [col: number, row: number, value: number][] = [];
	const stack: [TreeNode, number, number][] = root ? [[root, 0, 0]] : [];
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [node, col, row] = item;
		entries.push([col, row, node.val]);
		if (node.left) stack.push([node.left, col - 1, row + 1]);
		if (node.right) stack.push([node.right, col + 1, row + 1]);
	}
	entries.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

	const columns: number[][] = [];
	let currentColumn: number | undefined;
	for (const [col, , value] of entries) {
		if (col !== currentColumn) {
			columns.push([]);
			currentColumn = col;
		}
		columns.at(-1)?.push(value);
	}
	return columns;
};
