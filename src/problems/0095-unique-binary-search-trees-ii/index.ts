import { TreeNode } from "../../structures/tree-node";

const copy = (node: TreeNode | null): TreeNode | null =>
	node && new TreeNode(node.val, copy(node.left), copy(node.right));

/**
 * 95. Unique Binary Search Trees II
 *
 * Returns every structurally different binary search tree holding the values
 * 1 to `n`.
 *
 * Each value from 1 to `n` can be the root, with every tree of the smaller
 * values as its left subtree and every tree of the larger values as its
 * right. Subtrees are memoized and shared while building, then each finished
 * tree is copied, so changing one returned tree never affects another.
 *
 * @see https://leetcode.com/problems/unique-binary-search-trees-ii/
 * @difficulty Medium
 * @timeComplexity O(n * C_n) where C_n is the nth Catalan number of trees
 * @spaceComplexity O(n * C_n) for the returned trees
 *
 * @example
 * uniqueBinarySearchTreesII(3).map(treeToArray);
 * // [[1, null, 2, null, 3], [1, null, 3, 2], [2, 1, 3], [3, 1, null, null, 2], [3, 2, null, 1]]
 */
export const uniqueBinarySearchTreesII = (n: number): TreeNode[] => {
	const memo = new Map<string, (TreeNode | null)[]>();

	const build = (low: number, high: number): (TreeNode | null)[] => {
		if (low > high) return [null];
		const key = `${low},${high}`;
		const cached = memo.get(key);
		if (cached) return cached;

		const trees: (TreeNode | null)[] = [];
		for (let root = low; root <= high; root++) {
			for (const left of build(low, root - 1)) {
				for (const right of build(root + 1, high)) {
					trees.push(new TreeNode(root, left, right));
				}
			}
		}
		memo.set(key, trees);
		return trees;
	};

	return build(1, n).flatMap((tree) => {
		const copied = copy(tree);
		return copied ? [copied] : [];
	});
};
