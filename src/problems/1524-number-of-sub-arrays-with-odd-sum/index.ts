/**
 * 1524. Number of Sub-arrays With Odd Sum
 *
 * Counts the subarrays of `arr` with an odd sum, modulo 10^9 + 7.
 *
 * A subarray's sum is odd when the prefix sums at its ends have different
 * parities, so count prefixes of each parity as they come.
 *
 * @see https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfSubArraysWithOddSum([1, 2, 3, 4, 5, 6, 7]); // 16
 */
export const numberOfSubArraysWithOddSum = (arr: readonly number[]): number => {
	const prefixes = [1, 0];
	let [parity, count] = [0, 0];
	for (const value of arr) {
		parity ^= value & 1;
		count = (count + (prefixes[parity ^ 1] ?? 0)) % 1_000_000_007;
		prefixes[parity] = (prefixes[parity] ?? 0) + 1;
	}
	return count;
};
