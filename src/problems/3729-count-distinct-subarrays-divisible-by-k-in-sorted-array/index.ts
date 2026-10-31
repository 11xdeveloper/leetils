/**
 * 3729. Count Distinct Subarrays Divisible by K in Sorted Array
 *
 * `nums` is sorted. Counts the distinct (by contents) subarrays whose sum
 * is divisible by `k`.
 *
 * Count all such subarrays with prefix sums mod k, then fix duplicates.
 * In a sorted array, a subarray with two different values sits in only
 * one place; repeats only come from runs of one value v. Within a run of
 * c copies, a length L works when L · v is divisible by k, i.e. L is a
 * multiple of s = k / gcd(v, k): count each such L once instead of
 * c - L + 1 times.
 *
 * @see https://leetcode.com/problems/count-distinct-subarrays-divisible-by-k-in-sorted-array/
 * @difficulty Hard
 * @timeComplexity O(n log k)
 * @spaceComplexity O(n)
 *
 * @example
 * countDistinctSubarraysDivisibleByKInSortedArray([2, 2, 2, 2, 2, 2], 6); // 2
 */
export const countDistinctSubarraysDivisibleByKInSortedArray = (
	nums: readonly number[],
	k: number,
): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const residues = new Map<number, number>([[0, 1]]);
	let prefix = 0;
	let total = 0;
	for (const num of nums) {
		prefix = (prefix + num) % k;
		total += residues.get(prefix) ?? 0;
		residues.set(prefix, (residues.get(prefix) ?? 0) + 1);
	}
	for (let i = 0; i < nums.length; ) {
		let j = i;
		while (j < nums.length && nums[j] === nums[i]) j++;
		const c = j - i;
		const step = k / gcd(nums[i] ?? 0, k);
		const lengths = Math.floor(c / step);
		// Σ over L = step, 2·step, … of (c - L + 1), minus one copy of each.
		const copies = lengths * (c + 1) - (step * lengths * (lengths + 1)) / 2;
		total -= copies - lengths;
		i = j;
	}
	return total;
};
