import type { TreeNode } from "../../structures/tree-node";

/**
 * 199. Binary Tree Right Side View
 *
 * Returns the values visible when looking at a binary tree from its right
 * side: the rightmost node of each level, from the root down.
 *
 * Breadth-first search, one level at a time, keeping each level's last
 * value.
 *
 * @see https://leetcode.com/problems/binary-tree-right-side-view/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * binaryTreeRightSideView(treeFromArray([1, 2, 3, null, 5, null, 4])); // [1, 3, 4]
 */
export const binaryTreeRightSideView = (root: TreeNode | null): number[] => {
	const view: number[] = [];
	let level = root ? [root] : [];

	while (level.length > 0) {
		view.push(level.at(-1)?.val ?? 0);
		level = level.flatMap((node) =>
			[node.left, node.right].filter((child) => child !== null),
		);
	}

	return view;
};
