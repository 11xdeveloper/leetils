import type { TreeNode } from "../../structures/tree-node";

/**
 * 1660. Correct a Binary Tree
 *
 * Exactly one node's right pointer wrongly points to another node on the
 * same level further right. Removes that node and its subtree and returns
 * the root.
 *
 * Breadth-first search taking each level from right to left: the
 * defective node is the one whose right child has already been seen on
 * its level. Detach it from its parent.
 *
 * @see https://leetcode.com/problems/correct-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeToArray(correctABinaryTree(rootWithNode2PointingTo3)); // [1, null, 3]
 */
export const correctABinaryTree = (root: TreeNode | null): TreeNode | null => {
	let level: [node: TreeNode, parent: TreeNode | null][] = root
		? [[root, null]]
		: [];
	while (level.length > 0) {
		const seen = new Set<TreeNode>();
		const next: [TreeNode, TreeNode][] = [];
		for (const [node, parent] of level) {
			if (node.right && seen.has(node.right)) {
				if (parent?.left === node) parent.left = null;
				else if (parent) parent.right = null;
				return root;
			}
			seen.add(node);
			if (node.right) next.push([node.right, node]);
			if (node.left) next.push([node.left, node]);
		}
		level = next;
	}
	return root;
};
