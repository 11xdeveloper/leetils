/**
 * 2845. Count of Interesting Subarrays
 *
 * A subarray is interesting if the number of its elements with
 * `nums[i] % modulo === k`, taken modulo `modulo`, equals `k`. Returns the
 * number of interesting subarrays.
 *
 * Count prefix totals of such elements modulo `modulo`; a subarray ending
 * here is interesting when its start's prefix is `k` behind.
 *
 * @see https://leetcode.com/problems/count-of-interesting-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countOfInterestingSubarrays([3, 2, 4], 2, 1); // 3
 */
export const countOfInterestingSubarrays = (
	nums: readonly number[],
	modulo: number,
	k: number,
): number => {
	const seen = new Map([[0, 1]]);
	let prefix = 0;
	let count = 0;
	for (const num of nums) {
		if (num % modulo === k) prefix = (prefix + 1) % modulo;
		count += seen.get((prefix - k + modulo) % modulo) ?? 0;
		seen.set(prefix, (seen.get(prefix) ?? 0) + 1);
	}
	return count;
};
