import type { TreeNode } from "../../structures/tree-node";

/**
 * 814. Binary Tree Pruning
 *
 * Removes every subtree that contains no 1 from a binary tree of 0s and 1s,
 * and returns the root (or `null` if nothing is left). The tree is modified
 * in place.
 *
 * In postorder, a node's subtree contains a 1 if the node is 1 or either
 * kept child does; children without one are cut off. An explicit stack
 * keeps deep trees from overflowing the call stack.
 *
 * @see https://leetcode.com/problems/binary-tree-pruning/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeToArray(binaryTreePruning(treeFromArray([1, null, 0, 0, 1]))); // [1, null, 0, null, 1]
 */
export const binaryTreePruning = (root: TreeNode | null): TreeNode | null => {
	const hasOne = new Map<TreeNode | null, boolean>([[null, false]]);
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, childrenDone] = entry;
		if (!childrenDone) {
			stack.push([node, true]);
			if (node.left) stack.push([node.left, false]);
			if (node.right) stack.push([node.right, false]);
			continue;
		}
		if (!hasOne.get(node.left)) node.left = null;
		if (!hasOne.get(node.right)) node.right = null;
		hasOne.set(
			node,
			node.val === 1 || node.left !== null || node.right !== null,
		);
	}
	return hasOne.get(root) ? root : null;
};
