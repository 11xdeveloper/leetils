import type { TreeNode } from "../../structures/tree-node";

/**
 * 1214. Two Sum BSTs
 *
 * Returns whether a value from the first binary search tree and one from
 * the second add up to `target`.
 *
 * Lists both trees' values in sorted order, then walks two pointers
 * towards each other: up the first list and down the second.
 *
 * @see https://leetcode.com/problems/two-sum-bsts/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * twoSumBsts(treeFromArray([2, 1, 4]), treeFromArray([1, 0, 3]), 5); // true
 */
export const twoSumBsts = (
	root1: TreeNode | null,
	root2: TreeNode | null,
	target: number,
): boolean => {
	const [first, second] = [sortedValues(root1), sortedValues(root2)];
	let [i, j] = [0, second.length - 1];
	while (i < first.length && j >= 0) {
		const sum = (first[i] ?? 0) + (second[j] ?? 0);
		if (sum === target) return true;
		if (sum < target) i++;
		else j--;
	}
	return false;
};

/** The values of a binary search tree in order, with an explicit stack. */
const sortedValues = (root: TreeNode | null): number[] => {
	const values: number[] = [];
	const stack: TreeNode[] = [];
	for (let node = root; node || stack.length > 0; ) {
		for (; node; node = node.left) stack.push(node);
		const top = stack.pop();
		if (!top) break;
		values.push(top.val);
		node = top.right;
	}
	return values;
};
