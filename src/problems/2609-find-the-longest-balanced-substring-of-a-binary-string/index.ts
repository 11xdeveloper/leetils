/**
 * 2609. Find the Longest Balanced Substring of a Binary String
 *
 * A balanced substring is some 0s followed by as many 1s. Returns the
 * length of the longest one.
 *
 * Count each run of 0s and the run of 1s after it; the pair contributes
 * twice the smaller.
 *
 * @see https://leetcode.com/problems/find-the-longest-balanced-substring-of-a-binary-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheLongestBalancedSubstringOfABinaryString("01000111"); // 6
 */
export const findTheLongestBalancedSubstringOfABinaryString = (
	s: string,
): number => {
	let best = 0;
	let zeros = 0;
	let ones = 0;
	for (let i = 0; i < s.length; i++) {
		if (s.charAt(i) === "0") {
			if (ones > 0) {
				zeros = 0;
				ones = 0;
			}
			zeros++;
		} else {
			ones++;
			best = Math.max(best, 2 * Math.min(zeros, ones));
		}
	}
	return best;
};
