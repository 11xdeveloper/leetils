/**
 * 2656. Maximum Sum With Exactly K Elements
 *
 * Each of `k` operations takes an element `m` into the score, then puts
 * `m + 1` back. Returns the largest score.
 *
 * Keep taking the maximum: it scores `m, m + 1, …, m + k - 1`.
 *
 * @see https://leetcode.com/problems/maximum-sum-with-exactly-k-elements/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumSumWithExactlyKElements([1, 2, 3, 4, 5], 3); // 18
 */
export const maximumSumWithExactlyKElements = (
	nums: readonly number[],
	k: number,
): number => Math.max(...nums) * k + (k * (k - 1)) / 2;
