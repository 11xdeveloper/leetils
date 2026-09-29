import type { TreeNode } from "../../structures/tree-node";

/**
 * 366. Find Leaves of Binary Tree
 *
 * Collects a binary tree's values as if repeatedly removing all its leaves:
 * the first group is the leaves, the next is the nodes that became leaves,
 * and so on up to the root.
 *
 * A node is removed in round `h`, where `h` is its height (0 for a leaf,
 * otherwise one more than its taller child), so grouping values by height
 * gives the rounds. Heights are computed children first (postorder) with an
 * explicit stack, which also puts each group in left-to-right order.
 *
 * @see https://leetcode.com/problems/find-leaves-of-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findLeavesOfBinaryTree(treeFromArray([1, 2, 3, 4, 5])); // [[4, 5, 3], [2], [1]]
 */
export const findLeavesOfBinaryTree = (root: TreeNode | null): number[][] => {
	// Visiting node, right, left and then reversing gives postorder.
	const order: TreeNode[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		order.push(node);
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}

	const heights = new Map<TreeNode, number>();
	const rounds: number[][] = [];
	for (const node of order.reverse()) {
		const height =
			1 +
			Math.max(
				node.left ? (heights.get(node.left) ?? 0) : -1,
				node.right ? (heights.get(node.right) ?? 0) : -1,
			);
		heights.set(node, height);
		const round = rounds[height] ?? [];
		round.push(node.val);
		rounds[height] = round;
	}

	return rounds;
};
