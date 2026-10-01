import { TreeNode } from "../../structures/tree-node";

/**
 * 654. Maximum Binary Tree
 *
 * Builds the maximum binary tree of `nums` (distinct values): the root is
 * the largest value, its left subtree is built the same way from the
 * values before it, and its right subtree from those after it.
 *
 * A monotonic stack in one pass: each new value adopts the smaller values
 * it pops as its left subtree (the last one popped), and becomes the right
 * child of the larger value left on top. The bottom of the stack is the
 * root.
 *
 * @see https://leetcode.com/problems/maximum-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeToArray(maximumBinaryTree([3, 2, 1, 6, 0, 5])); // [6, 3, 5, null, 2, 0, null, null, 1]
 */
export const maximumBinaryTree = (nums: readonly number[]): TreeNode | null => {
	const stack: TreeNode[] = [];
	for (const num of nums) {
		const node = new TreeNode(num);
		while (stack.length > 0 && (stack.at(-1)?.val ?? 0) < num)
			node.left = stack.pop() ?? null;
		const parent = stack.at(-1);
		if (parent) parent.right = node;
		stack.push(node);
	}
	return stack[0] ?? null;
};
