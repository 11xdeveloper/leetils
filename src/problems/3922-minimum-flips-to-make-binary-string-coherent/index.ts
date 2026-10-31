/**
 * 3922. Minimum Flips to Make Binary String Coherent
 *
 * A binary string is coherent if it has neither "011" nor "110" as a
 * subsequence. Returns the fewest flips making `s` coherent.
 *
 * With two or more 1s, no 0 may come before the last two of them or
 * after the first two. So a coherent string has at most one 1, or is all
 * 1s, or is 1, then 0s, then 1. Take the cheapest of those shapes.
 *
 * @see https://leetcode.com/problems/minimum-flips-to-make-binary-string-coherent/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumFlipsToMakeBinaryStringCoherent("1010"); // 1
 */
export const minimumFlipsToMakeBinaryStringCoherent = (s: string): number => {
	const n = s.length;
	let ones = 0;
	for (const c of s) if (c === "1") ones++;
	let best = Math.min(n - ones, Math.max(0, ones - 1));
	if (n >= 2) {
		const ends = (s[0] === "1" ? 1 : 0) + (s[n - 1] === "1" ? 1 : 0);
		best = Math.min(best, 2 - ends + (ones - ends));
	}
	return best;
};
