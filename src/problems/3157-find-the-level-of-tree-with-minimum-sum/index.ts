import type { TreeNode } from "../../structures/tree-node";

/**
 * 3157. Find the Level of Tree with Minimum Sum
 *
 * The level (1 for the root) whose values add up to the least, the
 * shallowest on a tie.
 *
 * Breadth-first search, one level at a time.
 *
 * @see https://leetcode.com/problems/find-the-level-of-tree-with-minimum-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(w), for the tree's widest level
 *
 * @example
 * findTheLevelOfTreeWithMinimumSum(treeFromArray([50, 6, 2, 30, 80, 7])); // 2
 */
export const findTheLevelOfTreeWithMinimumSum = (
	root: TreeNode | null,
): number => {
	let best = 0;
	let bestSum = Number.POSITIVE_INFINITY;
	let level = root ? [root] : [];
	for (let depth = 1; level.length > 0; depth++) {
		const sum = level.reduce((total, node) => total + node.val, 0);
		if (sum < bestSum) {
			best = depth;
			bestSum = sum;
		}
		level = level.flatMap((node) =>
			[node.left, node.right].filter((child) => child !== null),
		);
	}
	return best;
};
