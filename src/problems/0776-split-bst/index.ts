import { TreeNode } from "../../structures/tree-node";

/**
 * 776. Split BST
 *
 * Splits a binary search tree into one tree of the values at most `target`
 * and one of the values above it, keeping every parent–child link whose
 * two nodes end up in the same tree. Returns the two roots; the tree is
 * modified in place.
 *
 * Walks down the search path for `target`. Each node on it goes to the
 * small tree (with its left subtree) or the large tree (with its right
 * subtree), hanging off the last node added to that tree on the side that
 * keeps it ordered. Everything off the path stays attached.
 *
 * @see https://leetcode.com/problems/split-bst/
 * @difficulty Medium
 * @timeComplexity O(h) where h is the height of the tree
 * @spaceComplexity O(1)
 *
 * @example
 * splitBst(treeFromArray([4, 2, 6, 1, 3, 5, 7]), 2).map(treeToArray); // [[2, 1], [4, 3, 6, null, null, 5, 7]]
 */
export const splitBst = (
	root: TreeNode | null,
	target: number,
): (TreeNode | null)[] => {
	const smallHead = new TreeNode();
	const largeHead = new TreeNode();
	let small = smallHead;
	let large = largeHead;

	for (let node = root; node; ) {
		if (node.val <= target) {
			small.right = node;
			small = node;
			node = node.right;
			small.right = null;
		} else {
			large.left = node;
			large = node;
			node = node.left;
			large.left = null;
		}
	}

	return [smallHead.right, largeHead.left];
};
