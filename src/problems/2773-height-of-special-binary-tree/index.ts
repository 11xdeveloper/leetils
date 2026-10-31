import type { TreeNode } from "../../structures/tree-node";

/**
 * 2773. Height of Special Binary Tree
 *
 * The leaves of this binary tree are linked into a cycle: each leaf's
 * `right` points to the next leaf and its `left` to the previous one.
 * Returns the tree's height in edges.
 *
 * A node is a leaf exactly when its `left` node's `right` points back to
 * it. Walk the tree, not following pointers out of leaves.
 *
 * @see https://leetcode.com/problems/height-of-special-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * heightOfSpecialBinaryTree(root); // the height of the tree
 */
export const heightOfSpecialBinaryTree = (root: TreeNode | null): number => {
	let height = 0;
	const stack: [TreeNode, number][] = root ? [[root, 0]] : [];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, depth] = entry;
		height = Math.max(height, depth);
		if (node.left?.right === node) continue;
		if (node.left) stack.push([node.left, depth + 1]);
		if (node.right) stack.push([node.right, depth + 1]);
	}
	return height;
};
