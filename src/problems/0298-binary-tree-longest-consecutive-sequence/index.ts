import type { TreeNode } from "../../structures/tree-node";

/**
 * 298. Binary Tree Longest Consecutive Sequence
 *
 * Returns the length of the longest downward path in a binary tree whose
 * values increase by exactly one at each step. The path can start at any
 * node.
 *
 * Depth-first search with an explicit stack of nodes and the length of the
 * consecutive run ending at each: a child continues its parent's run if its
 * value is one more, and starts a new run otherwise.
 *
 * @see https://leetcode.com/problems/binary-tree-longest-consecutive-sequence/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * binaryTreeLongestConsecutiveSequence(treeFromArray([1, null, 3, 2, 4, null, null, null, 5])); // 3, for 3 → 4 → 5
 */
export const binaryTreeLongestConsecutiveSequence = (
	root: TreeNode | null,
): number => {
	let longest = 0;
	const stack: [TreeNode, number][] = root ? [[root, 1]] : [];

	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, length] = entry;
		longest = Math.max(longest, length);
		for (const child of [node.left, node.right]) {
			if (child)
				stack.push([child, child.val === node.val + 1 ? length + 1 : 1]);
		}
	}

	return longest;
};
