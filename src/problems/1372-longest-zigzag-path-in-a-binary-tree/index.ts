import type { TreeNode } from "../../structures/tree-node";

/**
 * 1372. Longest ZigZag Path in a Binary Tree
 *
 * Returns the most edges on a downward path that alternates between left
 * and right children.
 *
 * Walks the tree with an explicit stack, passing each node the length of
 * the zigzag ending at it by a left step and by a right step. Going left
 * extends a zigzag that arrived by a right step; otherwise one starts
 * afresh.
 *
 * @see https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestZigzagPathInABinaryTree(treeFromArray([1, 1, 1, null, 1, null, null, 1, 1, null, 1])); // 4
 */
export const longestZigzagPathInABinaryTree = (
	root: TreeNode | null,
): number => {
	let longest = 0;
	// Each entry: a node, the zigzag reaching it by a left step, and by a right step.
	const stack: [TreeNode, number, number][] = root ? [[root, 0, 0]] : [];
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [node, byLeft, byRight] = item;
		longest = Math.max(longest, byLeft, byRight);
		if (node.left) stack.push([node.left, byRight + 1, 0]);
		if (node.right) stack.push([node.right, 0, byLeft + 1]);
	}
	return longest;
};
