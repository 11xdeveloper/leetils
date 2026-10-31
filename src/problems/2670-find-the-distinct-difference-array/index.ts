/**
 * 2670. Find the Distinct Difference Array
 *
 * Returns, for each index, the number of distinct values up to and
 * including it minus the number of distinct values after it.
 *
 * Count distinct suffix values from the right first, then distinct
 * prefix values from the left.
 *
 * @see https://leetcode.com/problems/find-the-distinct-difference-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheDistinctDifferenceArray([3, 2, 3, 4, 2]); // [-2, -1, 0, 2, 3]
 */
export const findTheDistinctDifferenceArray = (
	nums: readonly number[],
): number[] => {
	const n = nums.length;
	const after = Array.from({ length: n + 1 }, () => 0);
	const suffix = new Set<number>();
	for (let i = n - 1; i >= 0; i--) {
		after[i + 1] = suffix.size;
		suffix.add(nums[i] ?? 0);
	}
	const prefix = new Set<number>();
	return nums.map((num, i) => {
		prefix.add(num);
		return prefix.size - (after[i + 1] ?? 0);
	});
};
