/**
 * 1888. Minimum Number of Flips to Make the Binary String Alternating
 *
 * Moving the first character to the end is free; flipping a character
 * costs 1. Returns the fewest flips making the binary string `s`
 * alternate.
 *
 * Every rotation is a window of length `n` in `s + s`. Slide that window,
 * counting mismatches against the pattern `0101…` aligned to positions in
 * `s + s`; the other pattern needs the rest.
 *
 * @see https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-string-alternating/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfFlipsToMakeTheBinaryStringAlternating("111000"); // 2
 */
export const minimumNumberOfFlipsToMakeTheBinaryStringAlternating = (
	s: string,
): number => {
	const n = s.length;
	const mismatch = (i: number) => (s[i % n] === String(i % 2) ? 0 : 1);
	let [count, best] = [0, Infinity];
	for (let i = 0; i < 2 * n; i++) {
		count += mismatch(i);
		if (i >= n) count -= mismatch(i - n);
		if (i >= n - 1) best = Math.min(best, count, n - count);
	}
	return best;
};
