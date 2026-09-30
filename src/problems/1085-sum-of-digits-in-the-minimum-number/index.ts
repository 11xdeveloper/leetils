/**
 * 1085. Sum of Digits in the Minimum Number
 *
 * Returns 0 if the digit sum of the smallest element of `nums` is odd, and
 * 1 if it's even.
 *
 * Finds the minimum and adds up its digits.
 *
 * @see https://leetcode.com/problems/sum-of-digits-in-the-minimum-number/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfDigitsInTheMinimumNumber([34, 23, 1, 24, 75, 33, 54, 8]); // 0
 */
export const sumOfDigitsInTheMinimumNumber = (
	nums: readonly number[],
): number => {
	let sum = 0;
	for (let rest = Math.min(...nums); rest > 0; rest = Math.floor(rest / 10))
		sum += rest % 10;
	return sum % 2 === 0 ? 1 : 0;
};
