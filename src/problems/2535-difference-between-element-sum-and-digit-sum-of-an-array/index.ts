/**
 * 2535. Difference Between Element Sum and Digit Sum of an Array
 *
 * Returns the absolute difference between the sum of `nums` and the sum
 * of all their digits.
 *
 * Sum both directly.
 *
 * @see https://leetcode.com/problems/difference-between-element-sum-and-digit-sum-of-an-array/
 * @difficulty Easy
 * @timeComplexity O(n log m), where `m` is the largest number
 * @spaceComplexity O(1)
 *
 * @example
 * differenceBetweenElementSumAndDigitSumOfAnArray([1, 15, 6, 3]); // 9
 */
export const differenceBetweenElementSumAndDigitSumOfAnArray = (
	nums: readonly number[],
): number => {
	let difference = 0;
	for (const num of nums) {
		difference += num;
		for (let rest = num; rest > 0; rest = Math.floor(rest / 10))
			difference -= rest % 10;
	}
	return Math.abs(difference);
};
