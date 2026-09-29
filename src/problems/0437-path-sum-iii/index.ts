import type { TreeNode } from "../../structures/tree-node";

/**
 * 437. Path Sum III
 *
 * Returns how many downward paths in a binary tree (starting at any node and
 * ending at any node below it) have values adding up to `targetSum`.
 *
 * A path's sum is the difference of two prefix sums along the root-to-node
 * path. Walking the tree depth-first, a map counts the prefix sums on the
 * current path; each node adds how many earlier prefixes are exactly
 * `targetSum` below its own. Uses an explicit stack, removing a node's
 * prefix sum once its subtree is done.
 *
 * @see https://leetcode.com/problems/path-sum-iii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * pathSumIII(treeFromArray([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]), 8); // 3
 */
export const pathSumIII = (
	root: TreeNode | null,
	targetSum: number,
): number => {
	const prefixCounts = new Map([[0, 1]]);
	let paths = 0;
	// Each entry is a node to enter with the sum above it, or a sum to remove on leaving.
	const stack: ([node: TreeNode, above: number] | number)[] = root
		? [[root, 0]]
		: [];

	for (let entry = stack.pop(); entry !== undefined; entry = stack.pop()) {
		if (typeof entry === "number") {
			prefixCounts.set(entry, (prefixCounts.get(entry) ?? 1) - 1);
			continue;
		}
		const [node, above] = entry;
		const sum = above + node.val;
		paths += prefixCounts.get(sum - targetSum) ?? 0;
		prefixCounts.set(sum, (prefixCounts.get(sum) ?? 0) + 1);
		stack.push(sum);
		if (node.right) stack.push([node.right, sum]);
		if (node.left) stack.push([node.left, sum]);
	}

	return paths;
};
