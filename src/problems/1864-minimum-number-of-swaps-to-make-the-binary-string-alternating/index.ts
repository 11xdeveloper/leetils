/**
 * 1864. Minimum Number of Swaps to Make the Binary String Alternating
 *
 * Returns the fewest swaps of any two characters making the binary string
 * `s` alternate, or -1 if impossible.
 *
 * The counts of zeros and ones must differ by at most one, which fixes the
 * possible patterns. Each swap fixes two mismatches, so it takes half the
 * mismatches against the better pattern.
 *
 * @see https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-binary-string-alternating/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfSwapsToMakeTheBinaryStringAlternating("111000"); // 1
 */
export const minimumNumberOfSwapsToMakeTheBinaryStringAlternating = (
	s: string,
): number => {
	const ones = [...s].filter((c) => c === "1").length;
	const zeros = s.length - ones;
	if (Math.abs(ones - zeros) > 1) return -1;
	const mismatches = (first: string) =>
		[...s].filter((c, i) => (i % 2 === 0 ? c !== first : c === first)).length;
	if (ones > zeros) return mismatches("1") / 2;
	if (zeros > ones) return mismatches("0") / 2;
	return Math.min(mismatches("0"), mismatches("1")) / 2;
};
