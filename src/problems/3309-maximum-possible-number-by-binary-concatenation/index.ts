/**
 * 3309. Maximum Possible Number by Binary Concatenation
 *
 * The largest number whose binary form is the binary forms of the three
 * numbers joined in some order.
 *
 * Try all six orders.
 *
 * @see https://leetcode.com/problems/maximum-possible-number-by-binary-concatenation/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumPossibleNumberByBinaryConcatenation([1, 2, 3]); // 30
 */
export const maximumPossibleNumberByBinaryConcatenation = (
	nums: readonly number[],
): number => {
	const [a = "", b = "", c = ""] = nums.map((num) => num.toString(2));
	return Math.max(
		...[a + b + c, a + c + b, b + a + c, b + c + a, c + a + b, c + b + a].map(
			(bits) => Number.parseInt(bits, 2),
		),
	);
};
