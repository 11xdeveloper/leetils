/**
 * 1712. Ways to Split Array Into Three Subarrays
 *
 * Counts the splits of `nums` (non-negative) into non-empty left, mid and
 * right parts with `sum(left) ≤ sum(mid) ≤ sum(right)`, modulo 10^9 + 7.
 *
 * For each end of the left part, the valid ends of the middle part form a
 * range whose bounds only move right as the left part grows; two pointers
 * over prefix sums track it.
 *
 * @see https://leetcode.com/problems/ways-to-split-array-into-three-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * waysToSplitArrayIntoThreeSubarrays([1, 2, 2, 2, 5, 0]); // 3
 */
export const waysToSplitArrayIntoThreeSubarrays = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);
	const total = prefix[n] ?? 0;
	let ways = 0;
	// Middle part ends at index j (prefix[j + 1]); it must be in [low, high).
	let [low, high] = [0, 0];
	for (let i = 0; i < n - 2; i++) {
		const left = prefix[i + 1] ?? 0;
		low = Math.max(low, i + 1);
		while (low < n - 1 && (prefix[low + 1] ?? 0) - left < left) low++;
		high = Math.max(high, low);
		while (
			high < n - 1 &&
			(prefix[high + 1] ?? 0) - left <= total - (prefix[high + 1] ?? 0)
		)
			high++;
		ways += high - low;
	}
	return ways % 1_000_000_007;
};
