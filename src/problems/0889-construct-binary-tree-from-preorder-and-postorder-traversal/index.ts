import { TreeNode } from "../../structures/tree-node";

/**
 * 889. Construct Binary Tree from Preorder and Postorder Traversal
 *
 * Builds a binary tree of distinct values from its preorder and postorder
 * traversals. Several trees can fit (a lone child could be either side);
 * any is accepted, and here a lone child goes on the left.
 *
 * Reads the preorder, keeping a stack of nodes whose subtrees are still
 * open. Each new node is a child of the node on top; whenever the top of
 * the stack matches the next postorder value, that subtree is complete and
 * is popped.
 *
 * @see https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeToArray(constructBinaryTreeFromPreorderAndPostorderTraversal([1, 2, 4, 5, 3, 6, 7], [4, 5, 2, 6, 7, 3, 1])); // [1, 2, 3, 4, 5, 6, 7]
 */
export const constructBinaryTreeFromPreorderAndPostorderTraversal = (
	preorder: readonly number[],
	postorder: readonly number[],
): TreeNode | null => {
	const stack: TreeNode[] = [];
	let root: TreeNode | null = null;
	let done = 0;
	for (const value of preorder) {
		const node = new TreeNode(value);
		const parent = stack.at(-1);
		if (!parent) root = node;
		else if (!parent.left) parent.left = node;
		else parent.right = node;
		stack.push(node);
		while (stack.length > 0 && stack.at(-1)?.val === postorder[done]) {
			stack.pop();
			done++;
		}
	}
	return root;
};
