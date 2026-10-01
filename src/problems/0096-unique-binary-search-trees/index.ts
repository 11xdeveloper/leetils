/**
 * 96. Unique Binary Search Trees
 *
 * Returns how many structurally different binary search trees hold the
 * values 1 to `n`.
 *
 * With `i` values in the left subtree and `n - 1 - i` in the right, the
 * counts multiply, so the number of trees of each size builds up from the
 * smaller sizes. These are the Catalan numbers.
 *
 * @see https://leetcode.com/problems/unique-binary-search-trees/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * uniqueBinarySearchTrees(3); // 5
 */
export const uniqueBinarySearchTrees = (n: number): number => {
	const trees = [1];

	for (let size = 1; size <= n; size++) {
		let count = 0;
		for (let left = 0; left < size; left++) {
			count += (trees[left] ?? 0) * (trees[size - 1 - left] ?? 0);
		}
		trees.push(count);
	}

	return trees[n] ?? 0;
};
