/**
 * 331. Verify Preorder Serialization of a Binary Tree
 *
 * Returns whether `preorder` is a valid preorder serialization of a binary
 * tree, where each node is written as its value and each missing child as
 * `#`, separated by commas, without rebuilding the tree.
 *
 * Counts open slots for nodes: the root fills the one slot there is at the
 * start, every node fills a slot and opens two for its children, and every
 * `#` just fills one. The serialization is valid exactly when no node
 * arrives without a free slot and every slot is filled at the end.
 *
 * @see https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n) for the split string
 *
 * @example
 * verifyPreorderSerializationOfABinaryTree("9,3,4,#,#,1,#,#,2,#,6,#,#"); // true
 */
export const verifyPreorderSerializationOfABinaryTree = (
	preorder: string,
): boolean => {
	let slots = 1;

	for (const node of preorder.split(",")) {
		if (slots === 0) return false;
		slots += node === "#" ? -1 : 1;
	}

	return slots === 0;
};
