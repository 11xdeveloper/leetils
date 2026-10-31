/**
 * 2496. Maximum Value of a String in an Array
 *
 * A string of digits is worth its numeric value; any other string its
 * length. Returns the largest value.
 *
 * @see https://leetcode.com/problems/maximum-value-of-a-string-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(total length)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumValueOfAStringInAnArray(["alic3", "bob", "3", "4", "00000"]); // 5
 */
export const maximumValueOfAStringInAnArray = (
	strs: readonly string[],
): number =>
	Math.max(...strs.map((s) => (/^\d+$/.test(s) ? Number(s) : s.length)));
