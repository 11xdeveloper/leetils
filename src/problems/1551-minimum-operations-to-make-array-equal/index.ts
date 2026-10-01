/**
 * 1551. Minimum Operations to Make Array Equal
 *
 * `arr[i] = 2i + 1`. An operation moves 1 from one element to another.
 * Returns the fewest operations to make every element equal.
 *
 * Everything ends at the mean, `n`. The elements below it need
 * `n − (2i + 1)` each, which adds up to `⌊n² / 4⌋`.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-array-equal/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToMakeArrayEqual(6); // 9
 */
export const minimumOperationsToMakeArrayEqual = (n: number): number =>
	Math.floor((n * n) / 4);
