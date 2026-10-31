/**
 * 2464. Minimum Subarrays in a Valid Split
 *
 * Splits `nums` into subarrays whose first and last elements share a
 * factor greater than 1. Returns the fewest subarrays, or -1.
 *
 * `best[i]` covers the first `i` elements; the last subarray starts at
 * any `j` where `gcd(nums[j], nums[i - 1]) > 1`.
 *
 * @see https://leetcode.com/problems/minimum-subarrays-in-a-valid-split/
 * @difficulty Medium
 * @timeComplexity O(n^2 log max)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumSubarraysInAValidSplit([2, 6, 3, 4, 3]); // 2
 */
export const minimumSubarraysInAValidSplit = (
	nums: readonly number[],
): number => {
	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	const n = nums.length;
	const best = new Array<number>(n + 1).fill(Infinity);
	best[0] = 0;
	for (let i = 1; i <= n; i++)
		for (let j = 0; j < i; j++)
			if (gcd(nums[j] ?? 0, nums[i - 1] ?? 0) > 1)
				best[i] = Math.min(best[i] ?? Infinity, (best[j] ?? Infinity) + 1);
	return best[n] === Infinity ? -1 : (best[n] ?? -1);
};
