import type { RopeTreeNode } from "../../structures/rope-tree-node";

/**
 * 2689. Extract Kth Character From The Rope Tree
 *
 * A rope tree represents a string: a leaf holds its own string, and an
 * internal node the concatenation of its children's. Returns the `k`-th
 * character, counting from 1.
 *
 * Descend from the root, going right and subtracting the left part's
 * length whenever `k` lies beyond it.
 *
 * @see https://leetcode.com/problems/extract-kth-character-from-the-rope-tree/
 * @difficulty Easy
 * @timeComplexity O(h), where `h` is the height
 * @spaceComplexity O(1)
 *
 * @example
 * extractKthCharacterFromTheRopeTree(ropeTreeFromArray([10, 4, "abcpoe", "g", "rta"]), 6); // "b"
 */
export const extractKthCharacterFromTheRopeTree = (
	root: RopeTreeNode | null,
	k: number,
): string => {
	const length = (node: RopeTreeNode | null): number =>
		node === null ? 0 : node.len > 0 ? node.len : node.val.length;
	let node = root;
	while (node && node.len > 0) {
		const left = length(node.left);
		if (k <= left) node = node.left;
		else {
			k -= left;
			node = node.right;
		}
	}
	return node?.val.charAt(k - 1) ?? "";
};
