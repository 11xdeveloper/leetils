/**
 * 1470. Shuffle the Array
 *
 * `nums` is `[x1, …, xn, y1, …, yn]`. Returns `[x1, y1, x2, y2, …, xn, yn]`.
 *
 * Interleaves the two halves.
 *
 * @see https://leetcode.com/problems/shuffle-the-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n), for the result
 *
 * @example
 * shuffleTheArray([2, 5, 1, 3, 4, 7], 3); // [2, 3, 5, 4, 1, 7]
 */
export const shuffleTheArray = (nums: readonly number[], n: number): number[] =>
	Array.from(
		{ length: 2 * n },
		(_, i) => nums[i % 2 === 0 ? i / 2 : n + (i - 1) / 2] ?? 0,
	);
