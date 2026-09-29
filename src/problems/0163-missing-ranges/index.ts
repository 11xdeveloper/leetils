/**
 * 163. Missing Ranges
 *
 * Given a sorted array of distinct integers `nums` within `[lower, upper]`,
 * returns the shortest sorted list of `[start, end]` ranges covering exactly
 * the integers in `[lower, upper]` that aren't in `nums`.
 *
 * Walks the gaps: before the first number, between each pair of numbers,
 * and after the last number, keeping the gaps that aren't empty.
 *
 * @see https://leetcode.com/problems/missing-ranges/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned ranges
 *
 * @example
 * missingRanges([0, 1, 3, 50, 75], 0, 99); // [[2, 2], [4, 49], [51, 74], [76, 99]]
 */
export const missingRanges = (
	nums: readonly number[],
	lower: number,
	upper: number,
): number[][] => {
	const ranges: number[][] = [];
	let next = lower;

	for (const num of nums) {
		if (num > next) ranges.push([next, num - 1]);
		next = num + 1;
	}
	if (next <= upper) ranges.push([next, upper]);

	return ranges;
};
