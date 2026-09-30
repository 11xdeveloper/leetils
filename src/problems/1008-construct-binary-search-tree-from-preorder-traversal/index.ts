import { TreeNode } from "../../structures/tree-node";

/**
 * 1008. Construct Binary Search Tree from Preorder Traversal
 *
 * Builds the binary search tree (distinct values) whose preorder traversal
 * is `preorder`.
 *
 * Keeps a stack of the path to the latest node. A smaller value is its left
 * child; a larger one is the right child of the last node on the path it
 * exceeds, found by popping.
 *
 * @see https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeToArray(constructBinarySearchTreeFromPreorderTraversal([8, 5, 1, 7, 10, 12])); // [8, 5, 10, 1, 7, null, 12]
 */
export const constructBinarySearchTreeFromPreorderTraversal = (
	preorder: readonly number[],
): TreeNode | null => {
	const [first] = preorder;
	if (first === undefined) return null;
	const root = new TreeNode(first);
	const stack = [root];
	for (const value of preorder.slice(1)) {
		const node = new TreeNode(value);
		let parent = stack.at(-1) ?? root;
		if (value < parent.val) {
			parent.left = node;
		} else {
			while (stack.length > 0 && (stack.at(-1)?.val ?? 0) < value)
				parent = stack.pop() ?? parent;
			parent.right = node;
		}
		stack.push(node);
	}
	return root;
};
