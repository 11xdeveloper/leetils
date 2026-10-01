import type { TreeNodeWithParent } from "../../structures/tree-node-with-parent";

/**
 * 1650. Lowest Common Ancestor of a Binary Tree III
 *
 * Given two nodes of a tree whose nodes link to their parents, returns
 * their lowest common ancestor.
 *
 * Two pointers walk up from `p` and `q`, each jumping to the other's start
 * when it passes the root. Both then travel the same distance before
 * meeting, and they first meet at the common ancestor.
 *
 * @see https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii/
 * @difficulty Medium
 * @timeComplexity O(h)
 * @spaceComplexity O(1)
 *
 * @example
 * lowestCommonAncestorOfABinaryTreeIII(nodeWithValue5, nodeWithValue4).val; // 5
 */
export const lowestCommonAncestorOfABinaryTreeIII = (
	p: TreeNodeWithParent,
	q: TreeNodeWithParent,
): TreeNodeWithParent => {
	let [a, b] = [p, q];
	while (a !== b) {
		a = a.parent ?? q;
		b = b.parent ?? p;
	}
	return a;
};
