/**
 * 2733. Neither Minimum nor Maximum
 *
 * Returns any element of `nums`, whose values are distinct, that is
 * neither the smallest nor the largest, or -1 if there is none.
 *
 * The middle of any three elements works.
 *
 * @see https://leetcode.com/problems/neither-minimum-nor-maximum/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * neitherMinimumNorMaximum([2, 1, 3]); // 2
 */
export const neitherMinimumNorMaximum = (nums: readonly number[]): number =>
	nums.length < 3 ? -1 : (nums.slice(0, 3).sort((a, b) => a - b)[1] ?? -1);
