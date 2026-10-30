import type { TreeNode } from "../../structures/tree-node";

/**
 * 2415. Reverse Odd Levels of Binary Tree
 *
 * Reverses the node values on every odd level of a perfect binary tree,
 * in place, and returns the root.
 *
 * Walk the tree level by level, swapping values from the two ends of each
 * odd level.
 *
 * @see https://leetcode.com/problems/reverse-odd-levels-of-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reverseOddLevelsOfBinaryTree(treeFromArray([2, 3, 5, 8, 13, 21, 34])); // [2, 5, 3, 8, 13, 21, 34]
 */
export const reverseOddLevelsOfBinaryTree = (
	root: TreeNode | null,
): TreeNode | null => {
	let level = root ? [root] : [];
	for (let depth = 0; level.length; depth++) {
		if (depth % 2) {
			for (let [i, j] = [0, level.length - 1]; i < j; i++, j--) {
				const [a, b] = [level[i], level[j]];
				if (a && b) [a.val, b.val] = [b.val, a.val];
			}
		}
		level = level.flatMap((node) =>
			node.left && node.right ? [node.left, node.right] : [],
		);
	}
	return root;
};
