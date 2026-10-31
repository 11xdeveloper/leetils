/**
 * 3512. Minimum Operations to Make Array Sum Divisible by K
 *
 * The fewest decrements of single elements needed to make the sum of
 * `nums` divisible by `k`.
 *
 * Just remove the remainder.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-array-sum-divisible-by-k/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToMakeArraySumDivisibleByK([3, 9, 7], 5); // 4
 */
export const minimumOperationsToMakeArraySumDivisibleByK = (
	nums: readonly number[],
	k: number,
): number => nums.reduce((a, b) => a + b, 0) % k;
