/**
 * 974. Subarray Sums Divisible by K
 *
 * Counts the non-empty subarrays of `nums` whose sum is divisible by `k`.
 *
 * A subarray's sum is divisible by `k` when the prefix sums at its ends
 * share a remainder, so it counts remainders seen so far (made
 * non-negative, since JavaScript's `%` can return negatives).
 *
 * @see https://leetcode.com/problems/subarray-sums-divisible-by-k/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(k)
 *
 * @example
 * subarraySumsDivisibleByK([4, 5, 0, -2, -3, 1], 5); // 7
 */
export const subarraySumsDivisibleByK = (
	nums: readonly number[],
	k: number,
): number => {
	const counts = new Array<number>(k).fill(0);
	counts[0] = 1;
	let remainder = 0;
	let total = 0;
	for (const num of nums) {
		remainder = (((remainder + num) % k) + k) % k;
		total += counts[remainder] ?? 0;
		counts[remainder] = (counts[remainder] ?? 0) + 1;
	}
	return total;
};
