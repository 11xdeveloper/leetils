import type { TreeNode } from "../../structures/tree-node";

/**
 * 1305. All Elements in Two Binary Search Trees
 *
 * Returns every value from both binary search trees, sorted.
 *
 * Reads each tree in order (with an explicit stack), then merges the two
 * sorted lists.
 *
 * @see https://leetcode.com/problems/all-elements-in-two-binary-search-trees/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * allElementsInTwoBinarySearchTrees(treeFromArray([2, 1, 4]), treeFromArray([1, 0, 3])); // [0, 1, 1, 2, 3, 4]
 */
export const allElementsInTwoBinarySearchTrees = (
	root1: TreeNode | null,
	root2: TreeNode | null,
): number[] => {
	const [a, b] = [inorder(root1), inorder(root2)];
	const merged: number[] = [];
	let [i, j] = [0, 0];
	while (i < a.length || j < b.length) {
		const [x, y] = [a[i] ?? Infinity, b[j] ?? Infinity];
		if (x <= y) {
			merged.push(x);
			i++;
		} else {
			merged.push(y);
			j++;
		}
	}
	return merged;
};

const inorder = (root: TreeNode | null): number[] => {
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
