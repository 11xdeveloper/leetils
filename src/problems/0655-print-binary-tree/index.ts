import type { TreeNode } from "../../structures/tree-node";

/**
 * 655. Print Binary Tree
 *
 * Lays a binary tree out in a grid of strings. With the tree's height `h`
 * (in edges), the grid has `h + 1` rows and `2^(h+1) - 1` columns. The root
 * goes in the middle of the top row, and a node at `(r, c)` has its
 * children at `(r + 1, c ∓ 2^(h - r - 1))`. Empty cells hold `""`.
 *
 * Measures the height with one breadth-first pass, then places the nodes
 * with another.
 *
 * @see https://leetcode.com/problems/print-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(h · 2^h) for the grid
 * @spaceComplexity O(h · 2^h)
 *
 * @example
 * printBinaryTree(treeFromArray([1, 2])); // [["", "1", ""], ["2", "", ""]]
 */
export const printBinaryTree = (root: TreeNode | null): string[][] => {
	let height = -1;
	for (let level = root ? [root] : []; level.length > 0; height++) {
		level = level.flatMap((node) =>
			[node.left, node.right].filter((child) => child !== null),
		);
	}

	const cols = 2 ** (height + 1) - 1;
	const grid = Array.from({ length: height + 1 }, () =>
		new Array<string>(cols).fill(""),
	);
	const queue: [TreeNode, number, number][] = root
		? [[root, 0, (cols - 1) / 2]]
		: [];
	for (const [node, row, col] of queue) {
		const cells = grid[row];
		if (cells) cells[col] = String(node.val);
		const offset = 2 ** (height - row - 1);
		if (node.left) queue.push([node.left, row + 1, col - offset]);
		if (node.right) queue.push([node.right, row + 1, col + offset]);
	}

	return grid;
};
