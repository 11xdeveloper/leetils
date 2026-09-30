/**
 * 1180. Count Substrings with Only One Distinct Letter
 *
 * Returns the number of substrings of `s` made of a single repeated letter.
 *
 * Each character ends as many such substrings as the length of the run of
 * its letter so far.
 *
 * @see https://leetcode.com/problems/count-substrings-with-only-one-distinct-letter/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countSubstringsWithOnlyOneDistinctLetter("aaaba"); // 8
 */
export const countSubstringsWithOnlyOneDistinctLetter = (s: string): number => {
	let [run, total] = [0, 0];
	for (let i = 0; i < s.length; i++) {
		run = i > 0 && s[i] === s[i - 1] ? run + 1 : 1;
		total += run;
	}
	return total;
};
