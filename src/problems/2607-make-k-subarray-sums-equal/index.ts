/**
 * 2607. Make K-Subarray Sums Equal
 *
 * Each operation adds or subtracts 1 from an element of the circular
 * array. Returns the fewest operations to make every length-`k` subarray
 * sum equal.
 *
 * Equal sums force `arr[i] = arr[i + k]` around the circle, which splits
 * the indices into `gcd(n, k)` cycles that must each become constant.
 * Move each cycle to its median.
 *
 * @see https://leetcode.com/problems/make-k-subarray-sums-equal/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * makeKSubarraySumsEqual([2, 5, 5, 7], 3); // 5
 */
export const makeKSubarraySumsEqual = (
	arr: readonly number[],
	k: number,
): number => {
	const n = arr.length;
	let cycles = n;
	for (let b = k; b; ) [cycles, b] = [b, cycles % b];

	let operations = 0;
	for (let start = 0; start < cycles; start++) {
		const values: number[] = [];
		for (let i = start; i < n; i += cycles) values.push(arr[i] ?? 0);
		values.sort((a, b) => a - b);
		const median = values[values.length >> 1] ?? 0;
		for (const value of values) operations += Math.abs(value - median);
	}
	return operations;
};
