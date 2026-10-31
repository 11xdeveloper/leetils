/**
 * 2031. Count Subarrays With More Ones Than Zeros
 *
 * Counts the subarrays of the binary array `nums` with more 1s than 0s,
 * modulo 10^9 + 7.
 *
 * With 1 as +1 and 0 as -1, a subarray qualifies when its end's prefix
 * sum exceeds its start's. The prefix sum moves by one each step, so the
 * count of earlier prefix sums below it updates in constant time.
 *
 * @see https://leetcode.com/problems/count-subarrays-with-more-ones-than-zeros/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countSubarraysWithMoreOnesThanZeros([0, 1, 1, 0, 1]); // 9
 */
export const countSubarraysWithMoreOnesThanZeros = (
	nums: readonly number[],
): number => {
	const MOD = 1_000_000_007;
	const n = nums.length;
	// Prefix sums lie in [-n, n]; offset them to index the counts.
	const seen = new Array<number>(2 * n + 1).fill(0);
	let [sum, below, count] = [n, 0, 0];
	seen[sum] = 1;
	for (const num of nums) {
		if (num === 1) {
			below += seen[sum] ?? 0;
			sum++;
		} else {
			sum--;
			below -= seen[sum] ?? 0;
		}
		count = (count + below) % MOD;
		seen[sum] = (seen[sum] ?? 0) + 1;
	}
	return count;
};
