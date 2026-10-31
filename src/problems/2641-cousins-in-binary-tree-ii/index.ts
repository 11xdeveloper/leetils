import type { TreeNode } from "../../structures/tree-node";

/**
 * 2641. Cousins in Binary Tree II
 *
 * Replaces each node's value with the sum of its cousins: nodes at the
 * same depth with a different parent. Returns the root.
 *
 * Go level by level. A child's new value is its level's total minus the
 * sum of it and its sibling.
 *
 * @see https://leetcode.com/problems/cousins-in-binary-tree-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeToArray(cousinsInBinaryTreeII(treeFromArray([3, 1, 2]))); // [0, 0, 0]
 */
export const cousinsInBinaryTreeII = (
	root: TreeNode | null,
): TreeNode | null => {
	if (root) root.val = 0;
	for (let level = root ? [root] : []; level.length > 0; ) {
		const children = level.flatMap((node) =>
			[node.left, node.right].filter((c) => c !== null),
		);
		const total = children.reduce((sum, child) => sum + child.val, 0);
		for (const node of level) {
			const siblings = (node.left?.val ?? 0) + (node.right?.val ?? 0);
			if (node.left) node.left.val = total - siblings;
			if (node.right) node.right.val = total - siblings;
		}
		level = children;
	}
	return root;
};
