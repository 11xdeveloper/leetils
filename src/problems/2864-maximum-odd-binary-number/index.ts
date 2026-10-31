/**
 * 2864. Maximum Odd Binary Number
 *
 * Rearranges the bits of `s`, which has at least one 1, into the largest
 * odd binary number. Returns it.
 *
 * Put one 1 last and the rest at the front.
 *
 * @see https://leetcode.com/problems/maximum-odd-binary-number/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumOddBinaryNumber("0101"); // "1001"
 */
export const maximumOddBinaryNumber = (s: string): string => {
	const ones = s.split("1").length - 1;
	return `${"1".repeat(ones - 1)}${"0".repeat(s.length - ones)}1`;
};
