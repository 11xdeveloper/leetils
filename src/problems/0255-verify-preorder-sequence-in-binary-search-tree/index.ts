/**
 * 255. Verify Preorder Sequence in Binary Search Tree
 *
 * Returns whether the distinct values in `preorder` could be a preorder
 * traversal (node, left subtree, right subtree) of some binary search tree.
 *
 * Keeps a stack of the path of nodes whose right subtree hasn't started. A
 * value larger than the top of the stack starts a right subtree, popping the
 * nodes it's to the right of; everything after it must then be larger than
 * the last node popped. The input isn't modified, so the stack takes O(n)
 * space rather than reusing the array for the follow-up's O(1).
 *
 * @see https://leetcode.com/problems/verify-preorder-sequence-in-binary-search-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * verifyPreorderSequenceInBinarySearchTree([5, 2, 1, 3, 6]); // true
 * verifyPreorderSequenceInBinarySearchTree([5, 2, 6, 1, 3]); // false
 */
export const verifyPreorderSequenceInBinarySearchTree = (
	preorder: readonly number[],
): boolean => {
	const stack: number[] = [];
	let lowerBound = Number.NEGATIVE_INFINITY;

	for (const value of preorder) {
		if (value < lowerBound) return false;
		while (stack.length > 0 && value > (stack.at(-1) ?? 0))
			lowerBound = stack.pop() ?? lowerBound;
		stack.push(value);
	}

	return true;
};
