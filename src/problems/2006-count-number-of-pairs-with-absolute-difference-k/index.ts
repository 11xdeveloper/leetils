/**
 * 2006. Count Number of Pairs With Absolute Difference K
 *
 * Counts the pairs `i < j` with `|nums[i] - nums[j]| = k`.
 *
 * Count the earlier values `k` above and below each value.
 *
 * @see https://leetcode.com/problems/count-number-of-pairs-with-absolute-difference-k/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countNumberOfPairsWithAbsoluteDifferenceK([1, 2, 2, 1], 1); // 4
 */
export const countNumberOfPairsWithAbsoluteDifferenceK = (
	nums: readonly number[],
	k: number,
): number => {
	const seen = new Map<number, number>();
	let pairs = 0;
	for (const num of nums) {
		pairs += (seen.get(num - k) ?? 0) + (seen.get(num + k) ?? 0);
		seen.set(num, (seen.get(num) ?? 0) + 1);
	}
	return pairs;
};
