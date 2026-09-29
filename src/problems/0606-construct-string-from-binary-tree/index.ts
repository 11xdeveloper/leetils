import type { TreeNode } from "../../structures/tree-node";

/**
 * 606. Construct String from Binary Tree
 *
 * Writes a binary tree in preorder as a string, each child's subtree in
 * parentheses after its parent's value: `"1(2(4))(3)"`. Empty parentheses
 * are left out, except `()` for a missing left child when there's a right
 * child, which keeps the string unambiguous.
 *
 * Builds the string from a stack holding nodes still to write and the
 * parentheses around them, so deep trees don't overflow the call stack.
 *
 * @see https://leetcode.com/problems/construct-string-from-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * constructStringFromBinaryTree(treeFromArray([1, 2, 3, null, 4])); // "1(2()(4))(3)"
 */
export const constructStringFromBinaryTree = (
	root: TreeNode | null,
): string => {
	const parts: string[] = [];
	const stack: (TreeNode | string)[] = root ? [root] : [];

	for (let item = stack.pop(); item !== undefined; item = stack.pop()) {
		if (typeof item === "string") {
			parts.push(item);
			continue;
		}
		parts.push(String(item.val));
		if (item.right) stack.push(")", item.right, "(");
		if (item.left) stack.push(")", item.left, "(");
		else if (item.right) stack.push("()");
	}

	return parts.join("");
};
