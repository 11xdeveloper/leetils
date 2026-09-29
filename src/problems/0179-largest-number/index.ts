/**
 * 179. Largest Number
 *
 * Arranges the non-negative integers in `nums` into the largest number their
 * digits can form when written one after another, returned as a string.
 *
 * Sorts the numbers as strings so that `a` comes before `b` whenever `a + b`
 * is larger than `b + a`. This ordering is transitive, so sorting by it
 * gives the largest concatenation. A result made only of zeros becomes
 * `"0"`.
 *
 * @see https://leetcode.com/problems/largest-number/
 * @difficulty Medium
 * @timeComplexity O(n log n * d) where d is the number of digits in the largest value
 * @spaceComplexity O(n * d)
 *
 * @example
 * largestNumber([3, 30, 34, 5, 9]); // "9534330"
 */
export const largestNumber = (nums: readonly number[]): string => {
	const joined = nums
		.map(String)
		// Both concatenations have the same length, so comparing them as strings
		// compares them as numbers.
		.sort((a, b) => (a + b > b + a ? -1 : a + b < b + a ? 1 : 0))
		.join("");

	return joined.startsWith("0") ? "0" : joined;
};
