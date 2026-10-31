/**
 * 2903. Find Indices With Index and Value Difference I
 *
 * Returns any `[i, j]` with `|i - j| >= indexDifference` and
 * `|nums[i] - nums[j]| >= valueDifference`, or `[-1, -1]`.
 *
 * For each `j`, the best partner far enough back is the smallest or
 * largest value among indices up to `j - indexDifference`; track both.
 *
 * @see https://leetcode.com/problems/find-indices-with-index-and-value-difference-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findIndicesWithIndexAndValueDifferenceI([5, 1, 4, 1], 2, 4); // [0, 3]
 */
export const findIndicesWithIndexAndValueDifferenceI = (
	nums: readonly number[],
	indexDifference: number,
	valueDifference: number,
): number[] => {
	let low = 0;
	let high = 0;
	for (let j = indexDifference; j < nums.length; j++) {
		const i = j - indexDifference;
		if ((nums[i] ?? 0) < (nums[low] ?? 0)) low = i;
		if ((nums[i] ?? 0) > (nums[high] ?? 0)) high = i;
		const value = nums[j] ?? 0;
		if (value - (nums[low] ?? 0) >= valueDifference) return [low, j];
		if ((nums[high] ?? 0) - value >= valueDifference) return [high, j];
	}
	return [-1, -1];
};
