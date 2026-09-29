import type { TreeNode } from "../../structures/tree-node";

/**
 * 501. Find Mode in Binary Search Tree
 *
 * Returns the most frequent values (the modes) in a binary search tree
 * that may contain duplicates, in ascending order.
 *
 * An inorder traversal visits equal values consecutively, so it only needs
 * the current value's run length and the longest run so far, not a count of
 * every value. The traversal uses an explicit stack, so deep trees don't
 * overflow the call stack.
 *
 * @see https://leetcode.com/problems/find-mode-in-binary-search-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(h) for the stack, where h is the height, excluding the returned array
 *
 * @example
 * findModeInBinarySearchTree(treeFromArray([1, null, 2, 2])); // [2]
 */
export const findModeInBinarySearchTree = (root: TreeNode | null): number[] => {
	let modes: number[] = [];
	let longest = 0;
	let previous: number | undefined;
	let run = 0;

	const stack: TreeNode[] = [];
	let node = root;
	while (node || stack.length > 0) {
		for (; node; node = node.left) stack.push(node);
		const current = stack.pop();
		if (!current) break;

		run = current.val === previous ? run + 1 : 1;
		previous = current.val;
		if (run > longest) {
			longest = run;
			modes = [current.val];
		} else if (run === longest) {
			modes.push(current.val);
		}

		node = current.right;
	}

	return modes;
};
