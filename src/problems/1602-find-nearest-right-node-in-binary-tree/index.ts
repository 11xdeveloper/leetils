import type { TreeNode } from "../../structures/tree-node";

/**
 * 1602. Find Nearest Right Node in Binary Tree
 *
 * Returns the node immediately to the right of `u` on its level, or `null`
 * if `u` is last on its level.
 *
 * Breadth-first search level by level; once `u` turns up, the next node in
 * the same level is the answer.
 *
 * @see https://leetcode.com/problems/find-nearest-right-node-in-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(w) for the widest level w
 *
 * @example
 * findNearestRightNodeInBinaryTree(root, u)?.val; // the value to u's right
 */
export const findNearestRightNodeInBinaryTree = (
	root: TreeNode | null,
	u: TreeNode,
): TreeNode | null => {
	let level = root ? [root] : [];
	while (level.length > 0) {
		const index = level.indexOf(u);
		if (index !== -1) return level[index + 1] ?? null;
		level = level.flatMap((node) =>
			[node.left, node.right].filter((child) => child !== null),
		);
	}
	return null;
};
