/**
 * 1508. Range Sum of Sorted Subarray Sums
 *
 * Sorts the sums of all `n(n + 1) / 2` subarrays of `nums` and returns the
 * total of positions `left` to `right` (1-based), modulo 10^9 + 7.
 *
 * With `n` at most 1000 there are about half a million sums, few enough to
 * list in a typed array and sort.
 *
 * @see https://leetcode.com/problems/range-sum-of-sorted-subarray-sums/
 * @difficulty Medium
 * @timeComplexity O(n^2 log n)
 * @spaceComplexity O(n^2)
 *
 * @example
 * rangeSumOfSortedSubarraySums([1, 2, 3, 4], 4, 1, 5); // 13
 */
export const rangeSumOfSortedSubarraySums = (
	nums: readonly number[],
	n: number,
	left: number,
	right: number,
): number => {
	const sums = new Float64Array((n * (n + 1)) / 2);
	let k = 0;
	for (let i = 0; i < n; i++) {
		let sum = 0;
		for (let j = i; j < n; j++) {
			sum += nums[j] ?? 0;
			sums[k] = sum;
			k++;
		}
	}
	sums.sort();
	let total = 0;
	for (let i = left - 1; i < right; i++)
		total = (total + (sums[i] ?? 0)) % 1_000_000_007;
	return total;
};
