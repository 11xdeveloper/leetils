import type { TreeNode } from "../../structures/tree-node";
import { binaryTreeLevelOrderTraversal } from "../0102-binary-tree-level-order-traversal";

/**
 * 107. Binary Tree Level Order Traversal II
 *
 * Returns the values of a binary tree level by level, from the deepest level
 * up to the root, each level from left to right.
 *
 * The top-down level order from Binary Tree Level Order Traversal, reversed.
 *
 * @see https://leetcode.com/problems/binary-tree-level-order-traversal-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * binaryTreeLevelOrderTraversalII(treeFromArray([3, 9, 20, null, null, 15, 7])); // [[15, 7], [9, 20], [3]]
 */
export const binaryTreeLevelOrderTraversalII = (
	root: TreeNode | null,
): number[][] => binaryTreeLevelOrderTraversal(root).reverse();
