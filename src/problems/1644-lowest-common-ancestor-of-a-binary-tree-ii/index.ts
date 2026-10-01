import type { TreeNode } from "../../structures/tree-node";
import { lowestCommonAncestorOfABinaryTree } from "../0236-lowest-common-ancestor-of-a-binary-tree";

/**
 * 1644. Lowest Common Ancestor of a Binary Tree II
 *
 * Returns the lowest common ancestor of `p` and `q` in the tree, or `null`
 * if either is missing from it.
 *
 * Lowest Common Ancestor of a Binary Tree already handles this: it records
 * parents until it has found both nodes, and returns `null` when the
 * search runs out first.
 *
 * @see https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * lowestCommonAncestorOfABinaryTreeII(root, nodeWithValue5, new TreeNode(10)); // null
 */
export const lowestCommonAncestorOfABinaryTreeII = (
	root: TreeNode | null,
	p: TreeNode,
	q: TreeNode,
): TreeNode | null => lowestCommonAncestorOfABinaryTree(root, p, q);
