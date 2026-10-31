/**
 * 3536. Maximum Product of Two Digits
 *
 * The largest product of two digits (at different positions) of `n`.
 *
 * Multiply the two largest digits.
 *
 * @see https://leetcode.com/problems/maximum-product-of-two-digits/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * maximumProductOfTwoDigits(124); // 8
 */
export const maximumProductOfTwoDigits = (n: number): number => {
	const [a = 0, b = 0] = [...String(n)].map(Number).sort((x, y) => y - x);
	return a * b;
};
