/**
 * 2165. Smallest Value of the Rearranged Number
 *
 * Rearranges the digits of `num` into the smallest number without leading
 * zeros, keeping its sign.
 *
 * A negative number wants its digits descending. A positive one wants
 * them ascending, with the smallest non-zero digit moved to the front.
 *
 * @see https://leetcode.com/problems/smallest-value-of-the-rearranged-number/
 * @difficulty Medium
 * @timeComplexity O(d log d) for d digits
 * @spaceComplexity O(d)
 *
 * @example
 * smallestValueOfTheRearrangedNumber(310); // 103
 */
export const smallestValueOfTheRearrangedNumber = (num: number): number => {
	const digits = [...String(Math.abs(num))].sort();
	if (num < 0) return -Number(digits.reverse().join(""));
	const first = digits.findIndex((digit) => digit !== "0");
	if (first > 0) digits.unshift(...digits.splice(first, 1));
	return Number(digits.join(""));
};
