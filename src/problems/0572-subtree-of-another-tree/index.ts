import type { TreeNode } from "../../structures/tree-node";

/**
 * 572. Subtree of Another Tree
 *
 * Returns whether `subRoot` is identical, in structure and values, to some
 * node's whole subtree in `root`.
 *
 * Writes both trees as preorder strings with markers for missing children
 * and a separator before every value, so that a subtree's string appears in
 * the tree's string exactly when the subtree matches. The traversal uses an
 * explicit stack, so deep trees don't overflow the call stack.
 *
 * @see https://leetcode.com/problems/subtree-of-another-tree/
 * @difficulty Easy
 * @timeComplexity O(m + n) to serialise, plus the substring search
 * @spaceComplexity O(m + n)
 *
 * @example
 * subtreeOfAnotherTree(treeFromArray([3, 4, 5, 1, 2]), treeFromArray([4, 1, 2])); // true
 */
export const subtreeOfAnotherTree = (
	root: TreeNode | null,
	subRoot: TreeNode | null,
): boolean => {
	const serialise = (tree: TreeNode | null): string => {
		const parts: string[] = [];
		const stack = [tree];
		while (stack.length > 0) {
			const node = stack.pop();
			if (!node) {
				parts.push(",#");
				continue;
			}
			parts.push(`,${node.val}`);
			stack.push(node.right, node.left);
		}
		return parts.join("");
	};

	return serialise(root).includes(serialise(subRoot));
};
