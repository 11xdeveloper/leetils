/**
 * 2919. Minimum Increment Operations to Make Array Beautiful
 *
 * An array is beautiful if every subarray of length 3 or more has a
 * maximum of at least `k`. Each operation increments one element.
 * Returns the fewest operations.
 *
 * Equivalently every window of three needs an element raised to `k`.
 * DP: the cheapest way to fix a prefix with its last raised element at
 * `i` adds `i`'s cost to the best ending within the three before it.
 *
 * @see https://leetcode.com/problems/minimum-increment-operations-to-make-array-beautiful/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumIncrementOperationsToMakeArrayBeautiful([2, 3, 0, 0, 2], 4); // 3
 */
export const minimumIncrementOperationsToMakeArrayBeautiful = (
	nums: readonly number[],
	k: number,
): number => {
	let [a, b, c] = [0, 0, 0];
	for (const num of nums)
		[a, b, c] = [b, c, Math.max(0, k - num) + Math.min(a, b, c)];
	return Math.min(a, b, c);
};
