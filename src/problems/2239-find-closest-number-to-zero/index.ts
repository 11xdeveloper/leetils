/**
 * 2239. Find Closest Number to Zero
 *
 * Returns the number closest to 0, preferring the larger on a tie.
 *
 * @see https://leetcode.com/problems/find-closest-number-to-zero/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findClosestNumberToZero([-4, -2, 1, 4, 8]); // 1
 */
export const findClosestNumberToZero = (nums: readonly number[]): number =>
	nums.reduce((best, num) =>
		Math.abs(num) < Math.abs(best) ||
		(Math.abs(num) === Math.abs(best) && num > best)
			? num
			: best,
	);
