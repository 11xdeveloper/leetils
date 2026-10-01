/**
 * 315. Count of Smaller Numbers After Self
 *
 * Returns, for each element of `nums`, how many elements to its right are
 * smaller than it.
 *
 * Walks from right to left, keeping counts of the values seen so far in a
 * Fenwick tree indexed by value. The count of smaller values seen is then a
 * prefix sum. Values are replaced by their rank among the distinct values
 * first, so the tree's size depends on `n`, not on how large the values are.
 *
 * @see https://leetcode.com/problems/count-of-smaller-numbers-after-self/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countOfSmallerNumbersAfterSelf([5, 2, 6, 1]); // [2, 1, 1, 0]
 */
export const countOfSmallerNumbersAfterSelf = (
	nums: readonly number[],
): number[] => {
	const ranks = new Map(
		[...new Set(nums)].sort((a, b) => a - b).map((value, i) => [value, i + 1]),
	);
	const tree = new Array<number>(ranks.size + 1).fill(0);
	const counts = new Array<number>(nums.length).fill(0);

	for (let i = nums.length - 1; i >= 0; i--) {
		const rank = ranks.get(nums[i] ?? 0) ?? 1;
		let smaller = 0;
		for (let j = rank - 1; j > 0; j -= j & -j) smaller += tree[j] ?? 0;
		counts[i] = smaller;
		for (let j = rank; j < tree.length; j += j & -j)
			tree[j] = (tree[j] ?? 0) + 1;
	}

	return counts;
};
