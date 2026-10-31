const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 2842. Count K-Subsequences of a String With Maximum Beauty
 *
 * A k-subsequence uses `k` distinct letters once each; its beauty sums
 * each letter's frequency in `s`. Returns how many k-subsequences have
 * the maximum beauty, modulo 1e9 + 7.
 *
 * Take the `k` most frequent letters. Letters above the cut-off frequency
 * must all be used; among those at the cut-off, choose the rest. Each
 * chosen letter can be any of its occurrences.
 *
 * @see https://leetcode.com/problems/count-k-subsequences-of-a-string-with-maximum-beauty/
 * @difficulty Hard
 * @timeComplexity O(n + 26²)
 * @spaceComplexity O(26)
 *
 * @example
 * countKSubsequencesOfAStringWithMaximumBeauty("bcca", 2); // 4
 */
export const countKSubsequencesOfAStringWithMaximumBeauty = (
	s: string,
	k: number,
): number => {
	const counts = Array.from({ length: 26 }, () => 0);
	for (let i = 0; i < s.length; i++)
		counts[s.charCodeAt(i) - 97] = (counts[s.charCodeAt(i) - 97] ?? 0) + 1;
	const frequencies = counts.filter((c) => c > 0).sort((a, b) => b - a);
	if (k > frequencies.length) return 0;

	const cutoff = frequencies[k - 1] ?? 0;
	let ways = 1;
	let needed = k;
	for (const f of frequencies)
		if (f > cutoff) {
			ways = multiply(ways, f);
			needed--;
		}
	const tied = frequencies.filter((f) => f === cutoff).length;
	// C(tied, needed), small enough to compute exactly.
	let choose = 1;
	for (let i = 0; i < needed; i++) choose = (choose * (tied - i)) / (i + 1);
	for (let i = 0; i < needed; i++) ways = multiply(ways, cutoff);
	return multiply(ways, choose % MOD);
};
