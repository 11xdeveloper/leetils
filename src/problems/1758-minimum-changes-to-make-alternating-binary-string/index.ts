/**
 * 1758. Minimum Changes To Make Alternating Binary String
 *
 * Returns the fewest flips making the binary string `s` alternate.
 *
 * Count mismatches against the pattern starting with 0; the pattern
 * starting with 1 needs the rest.
 *
 * @see https://leetcode.com/problems/minimum-changes-to-make-alternating-binary-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumChangesToMakeAlternatingBinaryString("0100"); // 1
 */
export const minimumChangesToMakeAlternatingBinaryString = (
	s: string,
): number => {
	let mismatches = 0;
	for (let i = 0; i < s.length; i++) if (s[i] !== String(i % 2)) mismatches++;
	return Math.min(mismatches, s.length - mismatches);
};
