import type { TreeNode } from "../../structures/tree-node";

/**
 * 872. Leaf-Similar Trees
 *
 * Returns whether two binary trees have the same leaf value sequence, read
 * left to right.
 *
 * Collects each tree's leaves with a left-first traversal using an
 * explicit stack, then compares the sequences.
 *
 * @see https://leetcode.com/problems/leaf-similar-trees/
 * @difficulty Easy
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * leafSimilarTrees(treeFromArray([1, 2, 3]), treeFromArray([1, 3, 2])); // false
 */
export const leafSimilarTrees = (
	root1: TreeNode | null,
	root2: TreeNode | null,
): boolean => {
	const leaves = (root: TreeNode | null): string => {
		const values: number[] = [];
		const stack = root ? [root] : [];
		for (let node = stack.pop(); node; node = stack.pop()) {
			if (!node.left && !node.right) values.push(node.val);
			if (node.right) stack.push(node.right);
			if (node.left) stack.push(node.left);
		}
		return values.join();
	};
	return leaves(root1) === leaves(root2);
};
