import type { TreeNode } from "../../structures/tree-node";

/**
 * 1609. Even Odd Tree
 *
 * Returns whether every even-indexed level holds odd values in strictly
 * increasing order, and every odd-indexed level even values in strictly
 * decreasing order.
 *
 * Breadth-first search, checking each level as it goes.
 *
 * @see https://leetcode.com/problems/even-odd-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(w) for the widest level w
 *
 * @example
 * evenOddTree(treeFromArray([1, 10, 4, 3, null, 7, 9, 12, 8, 6, null, null, 2])); // true
 */
export const evenOddTree = (root: TreeNode | null): boolean => {
	let level = root ? [root] : [];
	for (let depth = 0; level.length > 0; depth++) {
		const even = depth % 2 === 0;
		let previous = even ? -Infinity : Infinity;
		const next: TreeNode[] = [];
		for (const node of level) {
			const value = node.val;
			if (
				even
					? value % 2 === 0 || value <= previous
					: value % 2 === 1 || value >= previous
			)
				return false;
			previous = value;
			if (node.left) next.push(node.left);
			if (node.right) next.push(node.right);
		}
		level = next;
	}
	return true;
};
