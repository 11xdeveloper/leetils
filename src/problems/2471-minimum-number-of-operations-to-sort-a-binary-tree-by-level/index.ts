import type { TreeNode } from "../../structures/tree-node";

/**
 * 2471. Minimum Number of Operations to Sort a Binary Tree by Level
 *
 * An operation swaps the values of two nodes on the same level. Returns
 * the fewest operations to sort every level ascending (values distinct).
 *
 * Per level, sorting by swaps takes the length of each cycle of the
 * sorting permutation minus one.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-sort-a-binary-tree-by-level/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfOperationsToSortABinaryTreeByLevel(treeFromArray([1, 3, 2, 7, 6, 5, 4])); // 3
 */
export const minimumNumberOfOperationsToSortABinaryTreeByLevel = (
	root: TreeNode | null,
): number => {
	let operations = 0;
	let level = root ? [root] : [];
	while (level.length) {
		const values = level.map((node) => node.val);
		const target = new Map(
			values.toSorted((a, b) => a - b).map((v, i) => [v, i]),
		);
		const seen = new Uint8Array(values.length);
		for (let start = 0; start < values.length; start++) {
			let length = 0;
			for (let i = start; !seen[i]; i = target.get(values[i] ?? 0) ?? i) {
				seen[i] = 1;
				length++;
			}
			if (length > 1) operations += length - 1;
		}
		level = level.flatMap((node) =>
			[node.left, node.right].filter((child) => child !== null),
		);
	}
	return operations;
};
