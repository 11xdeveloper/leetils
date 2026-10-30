/**
 * 2769. Find the Maximum Achievable Number
 *
 * Each of up to `t` operations moves `x` and `num` by 1 each, in either
 * direction. Returns the largest `x` that can end equal to `num`.
 *
 * Each operation closes the gap by 2.
 *
 * @see https://leetcode.com/problems/find-the-maximum-achievable-number/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheMaximumAchievableNumber(3, 2); // 7
 */
export const findTheMaximumAchievableNumber = (
	num: number,
	t: number,
): number => num + 2 * t;
