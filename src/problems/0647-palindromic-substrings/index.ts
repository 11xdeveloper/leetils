/**
 * 647. Palindromic Substrings
 *
 * Counts the substrings of `s` (by position) that read the same backwards.
 *
 * Every palindrome has a centre, a character or the gap between two, so it
 * expands outwards from each of the `2n - 1` centres while the ends match,
 * counting each step.
 *
 * @see https://leetcode.com/problems/palindromic-substrings/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * palindromicSubstrings("aaa"); // 6
 */
export const palindromicSubstrings = (s: string): number => {
	let count = 0;
	for (let centre = 0; centre < 2 * s.length - 1; centre++) {
		for (
			let left = Math.floor(centre / 2), right = left + (centre % 2);
			left >= 0 && right < s.length && s.charAt(left) === s.charAt(right);
			left--, right++
		) {
			count++;
		}
	}
	return count;
};
