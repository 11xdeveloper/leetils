import type { TreeNode } from "../../structures/tree-node";

/**
 * 993. Cousins in Binary Tree
 *
 * Returns whether the nodes with values `x` and `y` (values are unique) are
 * cousins: at the same depth with different parents.
 *
 * Breadth-first search recording each value's depth and parent.
 *
 * @see https://leetcode.com/problems/cousins-in-binary-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * cousinsInBinaryTree(treeFromArray([1, 2, 3, null, 4, null, 5]), 5, 4); // true
 */
export const cousinsInBinaryTree = (
	root: TreeNode | null,
	x: number,
	y: number,
): boolean => {
	const found = new Map<number, [depth: number, parent: TreeNode | null]>();
	const queue: [TreeNode, number, TreeNode | null][] = root
		? [[root, 0, null]]
		: [];
	for (const [node, depth, parent] of queue) {
		if (node.val === x || node.val === y) found.set(node.val, [depth, parent]);
		if (node.left) queue.push([node.left, depth + 1, node]);
		if (node.right) queue.push([node.right, depth + 1, node]);
	}
	const [a, b] = [found.get(x), found.get(y)];
	return a !== undefined && b !== undefined && a[0] === b[0] && a[1] !== b[1];
};
