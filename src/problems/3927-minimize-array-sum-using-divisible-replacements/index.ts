/**
 * 3927. Minimize Array Sum Using Divisible Replacements
 *
 * Any element may be replaced by another element that divides it, any
 * number of times. Returns the smallest possible sum.
 *
 * Each element ends as the smallest value in the array dividing it (a
 * divisor's divisors divide it too). Mark the multiples of each value,
 * smallest first.
 *
 * @see https://leetcode.com/problems/minimize-array-sum-using-divisible-replacements/
 * @difficulty Medium
 * @timeComplexity O(n + V log V)
 * @spaceComplexity O(V)
 *
 * @example
 * minimizeArraySumUsingDivisibleReplacements([4, 2, 8, 3]); // 9
 */
export const minimizeArraySumUsingDivisibleReplacements = (
	nums: readonly number[],
): number => {
	const limit = Math.max(...nums);
	const smallest = new Int32Array(limit + 1);
	for (const d of [...new Set(nums)].sort((a, b) => a - b))
		for (let x = d; x <= limit; x += d) if (!smallest[x]) smallest[x] = d;
	return nums.reduce((sum, num) => sum + (smallest[num] ?? num), 0);
};
