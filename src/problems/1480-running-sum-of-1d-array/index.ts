/**
 * 1480. Running Sum of 1d Array
 *
 * Returns the running totals of `nums`.
 *
 * Adds each element to the total so far.
 *
 * @see https://leetcode.com/problems/running-sum-of-1d-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n), for the result
 *
 * @example
 * runningSumOf1dArray([1, 2, 3, 4]); // [1, 3, 6, 10]
 */
export const runningSumOf1dArray = (nums: readonly number[]): number[] => {
	let total = 0;
	return nums.map((num) => {
		total += num;
		return total;
	});
};
