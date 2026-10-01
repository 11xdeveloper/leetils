import type { TreeNode } from "../../structures/tree-node";

/**
 * 662. Maximum Width of Binary Tree
 *
 * Returns the maximum width over all levels of a binary tree, where a
 * level's width is the distance between its leftmost and rightmost nodes
 * counting the missing nodes between them, as if the tree were complete.
 *
 * Breadth-first search numbering nodes as in a heap (children `2i` and
 * `2i + 1`). The numbers double each level, so each level is renumbered
 * from its leftmost node to keep them small.
 *
 * @see https://leetcode.com/problems/maximum-width-of-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(w) where w is the widest level
 *
 * @example
 * maximumWidthOfBinaryTree(treeFromArray([1, 3, 2, 5, 3, null, 9])); // 4
 */
export const maximumWidthOfBinaryTree = (root: TreeNode | null): number => {
	let widest = 0;
	let level: [TreeNode, number][] = root ? [[root, 0]] : [];

	while (level.length > 0) {
		const first = level[0]?.[1] ?? 0;
		widest = Math.max(widest, (level.at(-1)?.[1] ?? 0) - first + 1);
		const next: [TreeNode, number][] = [];
		for (const [node, position] of level) {
			const relative = position - first;
			if (node.left) next.push([node.left, 2 * relative]);
			if (node.right) next.push([node.right, 2 * relative + 1]);
		}
		level = next;
	}

	return widest;
};
