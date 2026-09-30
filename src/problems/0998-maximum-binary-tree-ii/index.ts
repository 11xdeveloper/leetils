import { TreeNode } from "../../structures/tree-node";

/**
 * 998. Maximum Binary Tree II
 *
 * `root` is the maximum binary tree of some array (see Maximum Binary
 * Tree). Returns the maximum binary tree of that array with `val` appended,
 * where `val` is distinct from its values. The tree is modified in place.
 *
 * An appended value only ever sits on the right spine: walk down right
 * children while they're larger than `val`, then insert a node there with
 * the rest of the spine as its left subtree.
 *
 * @see https://leetcode.com/problems/maximum-binary-tree-ii/
 * @difficulty Medium
 * @timeComplexity O(h) for the right spine's length h
 * @spaceComplexity O(1)
 *
 * @example
 * treeToArray(maximumBinaryTreeII(treeFromArray([4, 1, 3, null, null, 2]), 5)); // [5, 4, null, 1, 3, null, null, 2]
 */
export const maximumBinaryTreeII = (
	root: TreeNode | null,
	val: number,
): TreeNode | null => {
	if (!root || root.val < val) return new TreeNode(val, root);
	let node = root;
	while (node.right && node.right.val > val) node = node.right;
	node.right = new TreeNode(val, node.right);
	return root;
};
