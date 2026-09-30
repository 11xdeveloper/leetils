import type { TreeNode } from "../../structures/tree-node";

/**
 * 971. Flip Binary Tree To Match Preorder Traversal
 *
 * A flip swaps a node's two children. Returns the values of the fewest
 * nodes to flip so the tree's preorder traversal equals `voyage`, or `[-1]`
 * if that's impossible. Values are distinct.
 *
 * Walks the tree in preorder alongside `voyage`, with an explicit stack.
 * Whenever a node's left child isn't the next expected value, the node must
 * be flipped, so the right child is visited first.
 *
 * @see https://leetcode.com/problems/flip-binary-tree-to-match-preorder-traversal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * flipBinaryTreeToMatchPreorderTraversal(treeFromArray([1, 2, 3]), [1, 3, 2]); // [1]
 */
export const flipBinaryTreeToMatchPreorderTraversal = (
	root: TreeNode | null,
	voyage: readonly number[],
): number[] => {
	const flipped: number[] = [];
	let next = 0;
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (node.val !== voyage[next++]) return [-1];
		if (node.left && node.left.val !== voyage[next]) {
			flipped.push(node.val);
			stack.push(node.left);
			if (node.right) stack.push(node.right);
		} else {
			if (node.right) stack.push(node.right);
			if (node.left) stack.push(node.left);
		}
	}
	return flipped;
};
