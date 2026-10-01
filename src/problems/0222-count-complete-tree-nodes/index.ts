import type { TreeNode } from "../../structures/tree-node";

/**
 * 222. Count Complete Tree Nodes
 *
 * Returns the number of nodes in a complete binary tree (every level full
 * except possibly the last, which is filled from the left), in less than
 * linear time.
 *
 * Compares the depth of the leftmost path in each subtree. If the right
 * subtree reaches as deep as the left, the left subtree is perfect and its
 * size is known from its depth; otherwise the right subtree is perfect, one
 * level shorter. Either way only one subtree needs counting further.
 *
 * @see https://leetcode.com/problems/count-complete-tree-nodes/
 * @difficulty Medium
 * @timeComplexity O(log^2 n)
 * @spaceComplexity O(1)
 *
 * @example
 * countCompleteTreeNodes(treeFromArray([1, 2, 3, 4, 5, 6])); // 6
 */
export const countCompleteTreeNodes = (root: TreeNode | null): number => {
	const leftDepth = (start: TreeNode | null): number => {
		let depth = 0;
		for (let node = start; node; node = node.left) depth++;
		return depth;
	};

	let count = 0;
	let node = root;
	while (node) {
		const left = leftDepth(node.left);
		const right = leftDepth(node.right);
		if (left === right) {
			// The left subtree is perfect with `left` levels: 2^left - 1 nodes, plus this node.
			count += 2 ** left;
			node = node.right;
		} else {
			count += 2 ** right;
			node = node.left;
		}
	}

	return count;
};
