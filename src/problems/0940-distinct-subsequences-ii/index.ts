/**
 * 940. Distinct Subsequences II
 *
 * Counts the distinct non-empty subsequences of `s`, modulo 10^9 + 7.
 *
 * Tracks, for each letter, how many distinct subsequences end with it.
 * Appending a letter to every distinct subsequence so far (and the empty
 * one) gives exactly the distinct subsequences ending with that letter,
 * replacing its previous count.
 *
 * @see https://leetcode.com/problems/distinct-subsequences-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 26 counts
 *
 * @example
 * distinctSubsequencesII("aba"); // 6
 */
export const distinctSubsequencesII = (s: string): number => {
	const MOD = 1_000_000_007;
	const endingWith = new Array<number>(26).fill(0);
	let total = 0;
	for (let i = 0; i < s.length; i++) {
		const letter = s.charCodeAt(i) - 97;
		const updated = (total + 1) % MOD;
		total = (total - (endingWith[letter] ?? 0) + updated + MOD) % MOD;
		endingWith[letter] = updated;
	}
	return total;
};
