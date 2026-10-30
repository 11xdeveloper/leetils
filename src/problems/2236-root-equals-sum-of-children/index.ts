import type { TreeNode } from "../../structures/tree-node";

/**
 * 2236. Root Equals Sum of Children
 *
 * Returns whether the root of a three-node tree equals the sum of its two
 * children.
 *
 * @see https://leetcode.com/problems/root-equals-sum-of-children/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * rootEqualsSumOfChildren(treeFromArray([10, 4, 6])); // true
 */
export const rootEqualsSumOfChildren = (root: TreeNode | null): boolean =>
	root?.val === (root?.left?.val ?? 0) + (root?.right?.val ?? 0);
