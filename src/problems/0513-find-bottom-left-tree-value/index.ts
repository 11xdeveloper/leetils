import type { TreeNode } from "../../structures/tree-node";

/**
 * 513. Find Bottom Left Tree Value
 *
 * Returns the leftmost value in the last row of a non-empty binary tree.
 *
 * Breadth-first search that visits each row right to left, so the last
 * node visited is the bottom row's leftmost.
 *
 * @see https://leetcode.com/problems/find-bottom-left-tree-value/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(w) where w is the widest row
 *
 * @example
 * findBottomLeftTreeValue(treeFromArray([1, 2, 3, 4, null, 5, 6, null, null, 7])); // 7
 */
export const findBottomLeftTreeValue = (root: TreeNode | null): number => {
	let last = root;
	const queue = root ? [root] : [];
	for (let head = 0; head < queue.length; head++) {
		const node = queue[head];
		if (!node) break;
		last = node;
		if (node.right) queue.push(node.right);
		if (node.left) queue.push(node.left);
	}
	return last?.val ?? 0;
};
