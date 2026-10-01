import type { TreeNode } from "../../structures/tree-node";
import { smallestSubtreeWithAllTheDeepestNodes } from "../0865-smallest-subtree-with-all-the-deepest-nodes";

/**
 * 1123. Lowest Common Ancestor of Deepest Leaves
 *
 * Returns the lowest common ancestor of the deepest leaves of a binary tree.
 *
 * The same problem as Smallest Subtree with all the Deepest Nodes: the
 * smallest subtree containing every deepest leaf is rooted at their lowest
 * common ancestor.
 *
 * @see https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeToArray(lowestCommonAncestorOfDeepestLeaves(treeFromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]))); // [2, 7, 4]
 */
export const lowestCommonAncestorOfDeepestLeaves = (
	root: TreeNode | null,
): TreeNode | null => smallestSubtreeWithAllTheDeepestNodes(root);
