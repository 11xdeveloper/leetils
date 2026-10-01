import type { TreeNode } from "../../structures/tree-node";

/**
 * 1430. Check If a String Is a Valid Sequence from Root to Leaves Path in a Binary Tree
 *
 * Returns whether `arr` spells out the values along some path from the root
 * to a leaf.
 *
 * Walks down with an explicit stack, following only children that match
 * the next value, and succeeds at a leaf that matches the last one.
 *
 * @see https://leetcode.com/problems/check-if-a-string-is-a-valid-sequence-from-root-to-leaves-path-in-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfAStringIsAValidSequenceFromRootToLeavesPathInABinaryTree(treeFromArray([0, 1, 0, 0, 1, 0, null, null, 1, 0, 0]), [0, 1, 0, 1]); // true
 */
export const checkIfAStringIsAValidSequenceFromRootToLeavesPathInABinaryTree = (
	root: TreeNode | null,
	arr: readonly number[],
): boolean => {
	const stack: [TreeNode, number][] = root ? [[root, 0]] : [];
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [node, i] = item;
		if (node.val !== arr[i]) continue;
		const isLeaf = !node.left && !node.right;
		if (i === arr.length - 1) {
			if (isLeaf) return true;
			continue;
		}
		if (node.left) stack.push([node.left, i + 1]);
		if (node.right) stack.push([node.right, i + 1]);
	}
	return false;
};
