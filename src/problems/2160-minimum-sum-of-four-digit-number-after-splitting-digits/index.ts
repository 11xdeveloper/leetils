/**
 * 2160. Minimum Sum of Four Digit Number After Splitting Digits
 *
 * Splits the four digits of `num` into two numbers (leading zeros
 * allowed) with the smallest sum.
 *
 * Put the two smallest digits in the tens places.
 *
 * @see https://leetcode.com/problems/minimum-sum-of-four-digit-number-after-splitting-digits/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumSumOfFourDigitNumberAfterSplittingDigits(2932); // 52
 */
export const minimumSumOfFourDigitNumberAfterSplittingDigits = (
	num: number,
): number => {
	const [a = 0, b = 0, c = 0, d = 0] = [...String(num)]
		.map(Number)
		.sort((x, y) => x - y);
	return 10 * (a + b) + c + d;
};
