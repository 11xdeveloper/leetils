/**
 * 2370. Longest Ideal Subsequence
 *
 * A subsequence is ideal when adjacent letters are at most `k` apart in
 * the alphabet. Returns the length of the longest.
 *
 * Track the longest ideal subsequence ending in each letter.
 *
 * @see https://leetcode.com/problems/longest-ideal-subsequence/
 * @difficulty Medium
 * @timeComplexity O(n · k)
 * @spaceComplexity O(1)
 *
 * @example
 * longestIdealSubsequence("acfgbd", 2); // 4
 */
export const longestIdealSubsequence = (s: string, k: number): number => {
	const longest = new Array<number>(26).fill(0);
	for (const char of s) {
		const letter = char.charCodeAt(0) - 97;
		let best = 0;
		for (
			let other = Math.max(0, letter - k);
			other <= Math.min(25, letter + k);
			other++
		)
			best = Math.max(best, longest[other] ?? 0);
		longest[letter] = best + 1;
	}
	return Math.max(...longest);
};
