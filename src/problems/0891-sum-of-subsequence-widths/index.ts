/**
 * 891. Sum of Subsequence Widths
 *
 * A sequence's width is its largest element minus its smallest. Returns the
 * sum of the widths of every non-empty subsequence of `nums`, modulo
 * 10^9 + 7.
 *
 * After sorting, the element at index `i` is the maximum of `2^i`
 * subsequences and the minimum of `2^(n-1-i)`, so it contributes
 * `(2^i - 2^(n-1-i)) · nums[i]`. Every product stays below 2^53 before
 * reducing.
 *
 * @see https://leetcode.com/problems/sum-of-subsequence-widths/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfSubsequenceWidths([2, 1, 3]); // 6
 */
export const sumOfSubsequenceWidths = (nums: readonly number[]): number => {
	const MOD = 1_000_000_007;
	const n = nums.length;
	const sorted = nums.toSorted((a, b) => a - b);
	const powers = [1];
	for (let i = 1; i < n; i++) powers.push(((powers[i - 1] ?? 1) * 2) % MOD);

	let total = 0;
	for (const [i, num] of sorted.entries()) {
		const weight = ((powers[i] ?? 0) - (powers[n - 1 - i] ?? 0) + MOD) % MOD;
		total = (total + weight * num) % MOD;
	}
	return total;
};
