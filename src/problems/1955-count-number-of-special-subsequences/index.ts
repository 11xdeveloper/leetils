/**
 * 1955. Count Number of Special Subsequences
 *
 * A special sequence is some 0s, then some 1s, then some 2s (each at least
 * one). Counts the special subsequences of `nums`, modulo 10^9 + 7.
 *
 * Count subsequences that are currently all 0s, 0s-then-1s, and complete;
 * each new element can extend the subsequences of its own stage or start
 * its stage from the previous one.
 *
 * @see https://leetcode.com/problems/count-number-of-special-subsequences/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countNumberOfSpecialSubsequences([0, 1, 2, 0, 1, 2]); // 7
 */
export const countNumberOfSpecialSubsequences = (
	nums: readonly number[],
): number => {
	const MOD = 1_000_000_007;
	let [zeros, ones, twos] = [0, 0, 0];
	for (const num of nums) {
		if (num === 0) zeros = (2 * zeros + 1) % MOD;
		else if (num === 1) ones = (2 * ones + zeros) % MOD;
		else twos = (2 * twos + ones) % MOD;
	}
	return twos;
};
