/**
 * 553. Optimal Division
 *
 * `nums` are divided left to right (`a / b / c / …`). Returns the
 * expression, with parentheses added, that makes the result as large as
 * possible, without any redundant parentheses.
 *
 * However it's parenthesised, the first number ends up in the numerator
 * and the second in the denominator. Every other number can be moved to
 * the numerator at once by dividing the first by the rest as one block:
 * `a / (b / c / …) = a · c · … / b`, which is as large as it gets.
 *
 * @see https://leetcode.com/problems/optimal-division/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * optimalDivision([1000, 100, 10, 2]); // "1000/(100/10/2)"
 */
export const optimalDivision = (nums: readonly number[]): string => {
	if (nums.length <= 2) return nums.join("/");
	return `${nums[0]}/(${nums.slice(1).join("/")})`;
};
