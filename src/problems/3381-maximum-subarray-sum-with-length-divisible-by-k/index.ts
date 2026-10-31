/**
 * 3381. Maximum Subarray Sum With Length Divisible by K
 *
 * The largest sum of a subarray of `nums` whose length is a multiple of
 * `k`.
 *
 * A subarray from i to j has such a length when i and j + 1 agree mod k, so
 * keep the smallest prefix sum seen at each position mod k.
 *
 * @see https://leetcode.com/problems/maximum-subarray-sum-with-length-divisible-by-k/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(k)
 *
 * @example
 * maximumSubarraySumWithLengthDivisibleByK([-1, -2, -3, -4, -5], 4); // -10
 */
export const maximumSubarraySumWithLengthDivisibleByK = (
	nums: readonly number[],
	k: number,
): number => {
	const smallest = new Float64Array(k).fill(Number.POSITIVE_INFINITY);
	smallest[0] = 0;
	let prefix = 0;
	let best = Number.NEGATIVE_INFINITY;
	nums.forEach((num, i) => {
		prefix += num;
		const slot = (i + 1) % k;
		best = Math.max(best, prefix - (smallest[slot] ?? 0));
		smallest[slot] = Math.min(smallest[slot] ?? 0, prefix);
	});
	return best;
};
