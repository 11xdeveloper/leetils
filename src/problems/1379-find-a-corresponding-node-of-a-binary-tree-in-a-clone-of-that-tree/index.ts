import type { TreeNode } from "../../structures/tree-node";

/**
 * 1379. Find a Corresponding Node of a Binary Tree in a Clone of That Tree
 *
 * `cloned` is a copy of `original`. Returns the node of `cloned` in the
 * same position as `target` in `original`.
 *
 * Walks both trees in step with an explicit stack and compares nodes by
 * identity, not value, so it works even when values repeat.
 *
 * @see https://leetcode.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findACorrespondingNodeOfABinaryTreeInACloneOfThatTree(original, cloned, original.right); // cloned.right
 */
export const findACorrespondingNodeOfABinaryTreeInACloneOfThatTree = (
	original: TreeNode | null,
	cloned: TreeNode | null,
	target: TreeNode | null,
): TreeNode | null => {
	const stack: [TreeNode | null, TreeNode | null][] = [[original, cloned]];
	for (let pair = stack.pop(); pair; pair = stack.pop()) {
		const [a, b] = pair;
		if (!a || !b) continue;
		if (a === target) return b;
		stack.push([a.left, b.left], [a.right, b.right]);
	}
	return null;
};
