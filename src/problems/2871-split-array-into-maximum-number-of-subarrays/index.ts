/**
 * 2871. Split Array Into Maximum Number of Subarrays
 *
 * Splits `nums` into subarrays so the sum of their bitwise ANDs is as
 * small as possible. Returns the most subarrays such a split can have.
 *
 * The smallest sum is the AND of everything. If that's positive, any
 * split only adds, so keep one piece. If it's 0, cut greedily whenever a
 * piece's AND reaches 0.
 *
 * @see https://leetcode.com/problems/split-array-into-maximum-number-of-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * splitArrayIntoMaximumNumberOfSubarrays([1, 0, 2, 0, 1, 2]); // 3
 */
export const splitArrayIntoMaximumNumberOfSubarrays = (
	nums: readonly number[],
): number => {
	let pieces = 0;
	let current = -1;
	for (const num of nums) {
		current &= num;
		if (current === 0) {
			pieces++;
			current = -1;
		}
	}
	return Math.max(1, pieces);
};
