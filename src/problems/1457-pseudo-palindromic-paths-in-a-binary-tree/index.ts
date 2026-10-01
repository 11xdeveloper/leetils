import type { TreeNode } from "../../structures/tree-node";

/**
 * 1457. Pseudo-Palindromic Paths in a Binary Tree
 *
 * Counts the root-to-leaf paths whose digits (1–9) can be rearranged into
 * a palindrome.
 *
 * A multiset of digits forms a palindrome when at most one digit has an odd
 * count. Walks down with an explicit stack, carrying the digit parities as
 * a bitmask, and checks it at each leaf.
 *
 * @see https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * pseudoPalindromicPathsInABinaryTree(treeFromArray([2, 3, 1, 3, 1, null, 1])); // 2
 */
export const pseudoPalindromicPathsInABinaryTree = (
	root: TreeNode | null,
): number => {
	let count = 0;
	const stack: [TreeNode, number][] = root ? [[root, 0]] : [];
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [node, before] = item;
		const parity = before ^ (1 << node.val);
		if (!node.left && !node.right) {
			if ((parity & (parity - 1)) === 0) count++;
			continue;
		}
		if (node.left) stack.push([node.left, parity]);
		if (node.right) stack.push([node.right, parity]);
	}
	return count;
};
