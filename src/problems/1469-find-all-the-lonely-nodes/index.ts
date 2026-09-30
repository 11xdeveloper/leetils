import type { TreeNode } from "../../structures/tree-node";

/**
 * 1469. Find All The Lonely Nodes
 *
 * A lonely node is the only child of its parent. Returns the values of all
 * lonely nodes, in any order.
 *
 * Walks the tree with an explicit stack, recording a child whenever its
 * sibling is missing.
 *
 * @see https://leetcode.com/problems/find-all-the-lonely-nodes/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findAllTheLonelyNodes(treeFromArray([1, 2, 3, null, 4])); // [4]
 */
export const findAllTheLonelyNodes = (root: TreeNode | null): number[] => {
	const lonely: number[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (node.left && !node.right) lonely.push(node.left.val);
		if (node.right && !node.left) lonely.push(node.right.val);
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}
	return lonely;
};
