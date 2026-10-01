import type { TreeNode } from "../../structures/tree-node";

/**
 * 958. Check Completeness of a Binary Tree
 *
 * Returns whether a binary tree is complete: every level full except
 * perhaps the last, whose nodes are as far left as possible.
 *
 * In a level-order walk that includes missing children, a complete tree
 * has no node after the first gap.
 *
 * @see https://leetcode.com/problems/check-completeness-of-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkCompletenessOfABinaryTree(treeFromArray([1, 2, 3, 4, 5, null, 7])); // false
 */
export const checkCompletenessOfABinaryTree = (
	root: TreeNode | null,
): boolean => {
	const queue: (TreeNode | null)[] = [root];
	let gap = false;
	for (const node of queue) {
		if (!node) {
			gap = true;
			continue;
		}
		if (gap) return false;
		queue.push(node.left, node.right);
	}
	return true;
};
