import { TreeNode } from "../../structures/tree-node";

/**
 * 536. Construct Binary Tree from String
 *
 * Builds a binary tree from a string like `"4(2(3)(1))(6(5))"`: an integer
 * for the root, then up to two parenthesised subtrees, the left one first.
 * Returns `null` for an empty string.
 *
 * Scans the string with a stack of the nodes whose parentheses are open.
 * Each number becomes a node, attached as the left child of the node on
 * top of the stack if it has none yet, otherwise as its right child. A `)`
 * closes the node on top. No recursion, so deep nesting is fine.
 *
 * @see https://leetcode.com/problems/construct-binary-tree-from-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * treeToArray(constructBinaryTreeFromString("4(2(3)(1))(6(5))")); // [4, 2, 6, 3, 1, 5]
 */
export const constructBinaryTreeFromString = (s: string): TreeNode | null => {
	const stack: TreeNode[] = [];
	let root: TreeNode | null = null;

	for (let i = 0; i < s.length; ) {
		const char = s.charAt(i);
		if (char === ")") {
			stack.pop();
			i++;
		} else if (char === "(") {
			i++;
		} else {
			let end = i + 1;
			while (end < s.length && /\d/.test(s.charAt(end))) end++;
			const node = new TreeNode(Number(s.slice(i, end)));
			const parent = stack.at(-1);
			if (!parent) root = node;
			else if (!parent.left) parent.left = node;
			else parent.right = node;
			stack.push(node);
			i = end;
		}
	}

	return root;
};
